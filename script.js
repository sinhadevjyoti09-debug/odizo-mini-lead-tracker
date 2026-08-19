const startingLeads = [
  { name: "Rahul Sharma", company: "ABC Foods", email: "rahul@abcfoods.com", phone: "9876543210", service: "Website", budget: 25000, status: "New" },
  { name: "Ananya Mehta", company: "Mehta Textiles", email: "ananya@mehtatextiles.com", phone: "9822011456", service: "Branding", budget: 42000, status: "Interested" },
  { name: "Vikram Singh", company: "Northstar Realty", email: "vikram@northstar.in", phone: "9810098765", service: "SEO", budget: 18000, status: "Contacted" },
  { name: "Priya Nair", company: "Nair Wellness", email: "priya@nairwellness.com", phone: "9895123412", service: "Social Media", budget: 30000, status: "Converted" },
  { name: "Arjun Kapoor", company: "Kapoor Logistics", email: "arjun@kapoorlogistics.com", phone: "9911223344", service: "Mobile App", budget: 75000, status: "Interested" },
  { name: "Sneha Iyer", company: "Iyer Interiors", email: "sneha@iyerinteriors.com", phone: "9846011223", service: "Website", budget: 48000, status: "New" },
  { name: "Karan Patel", company: "Patel Motors", email: "karan@patelmotors.in", phone: "9909012345", service: "SEO", budget: 22000, status: "Lost" },
  { name: "Riya Das", company: "Das Organics", email: "riya@dasorganics.com", phone: "9830012345", service: "Branding", budget: 35000, status: "Contacted" },
  { name: "Aman Verma", company: "Verma Finance", email: "aman@vermafinance.com", phone: "9876541230", service: "Website", budget: 55000, status: "Converted" },
  { name: "Neha Joshi", company: "Joshi Education", email: "neha@joshiedu.org", phone: "9825012345", service: "Mobile App", budget: 90000, status: "New" }
];

let leads = JSON.parse(localStorage.getItem("odizoLeads")) || startingLeads;
let editingIndex = -1;
const form = document.getElementById("leadForm");
const tableBody = document.getElementById("leadTableBody");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const budgetFilter = document.getElementById("budgetFilter");
const statusFilter = document.getElementById("statusFilter");

function saveLeads() {
  localStorage.setItem("odizoLeads", JSON.stringify(leads));
}

function formatBudget(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

function getVisibleLeads() {
  const searchText = searchInput.value.toLowerCase().trim();
  return leads.map((lead, index) => ({ lead, index })).filter(({ lead }) => {
    const matchesName = lead.name.toLowerCase().includes(searchText);
    const matchesStatus = statusFilter.value === "all" || lead.status === statusFilter.value;
    const matchesBudget = budgetFilter.value === "all" ||
      (budgetFilter.value === "above" && lead.budget > 20000) ||
      (budgetFilter.value === "below" && lead.budget < 50000);
    return matchesName && matchesStatus && matchesBudget;
  });
}

function renderLeads() {
  const visibleLeads = getVisibleLeads();
  tableBody.innerHTML = visibleLeads.map(({ lead, index }) => `
    <tr>
      <td><span class="client-name">${lead.name}</span></td>
      <td>${lead.company}</td>
      <td class="contact">${lead.email}<br>${lead.phone}</td>
      <td>${lead.service}</td>
      <td class="budget">${formatBudget(lead.budget)}</td>
      <td><span class="status status-${lead.status.toLowerCase()}">${lead.status}</span></td>
      <td><div class="action-buttons"><button class="action-button" data-action="edit" data-index="${index}">Edit</button><button class="action-button delete-button" data-action="delete" data-index="${index}">Delete</button></div></td>
    </tr>`).join("");
  document.getElementById("leadCount").textContent = visibleLeads.length;
  emptyState.classList.toggle("hidden", visibleLeads.length !== 0);
}

function readForm() {
  const formData = new FormData(form);
  return { name: formData.get("clientName").trim(), company: formData.get("companyName").trim(), email: formData.get("email").trim(), phone: formData.get("phone").trim(), service: formData.get("service"), budget: Number(formData.get("budget")), status: formData.get("status") };
}

function startEditing(index) {
  const lead = leads[index];
  document.getElementById("clientName").value = lead.name;
  document.getElementById("companyName").value = lead.company;
  document.getElementById("email").value = lead.email;
  document.getElementById("phone").value = lead.phone;
  document.getElementById("service").value = lead.service;
  document.getElementById("budget").value = lead.budget;
  document.getElementById("status").value = lead.status;
  editingIndex = index;
  document.getElementById("formTitle").textContent = "Edit lead";
  document.getElementById("submitButton").textContent = "Update lead";
  document.getElementById("cancelButton").classList.remove("hidden");
  document.getElementById("clientName").focus();
}

function resetForm() {
  form.reset();
  editingIndex = -1;
  document.getElementById("formTitle").textContent = "Add a lead";
  document.getElementById("submitButton").textContent = "Add lead";
  document.getElementById("cancelButton").classList.add("hidden");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const lead = readForm();
  if (editingIndex === -1) leads.push(lead); else leads[editingIndex] = lead;
  saveLeads();
  resetForm();
  renderLeads();
});

tableBody.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const index = Number(button.dataset.index);
  if (button.dataset.action === "edit") startEditing(index);
  if (button.dataset.action === "delete" && confirm(`Delete ${leads[index].name}?`)) { leads.splice(index, 1); saveLeads(); renderLeads(); }
});

[searchInput, budgetFilter, statusFilter].forEach((control) => control.addEventListener("input", renderLeads));
document.getElementById("cancelButton").addEventListener("click", resetForm);
document.getElementById("clearButton").addEventListener("click", () => { searchInput.value = ""; budgetFilter.value = "all"; statusFilter.value = "all"; renderLeads(); });
renderLeads();
