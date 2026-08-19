const leads = [
	{ id: 1, name: "Rahul Sharma", company: "Nova Labs", email: "rahul@novalabs.in", phone: "+91 98765 43210", service: "Brand strategy", budget: 45000, status: "Interested" },
	{ id: 2, name: "Ananya Mehta", company: "Mehta & Co.", email: "ananya@mehtaco.in", phone: "+91 99887 66110", service: "Web development", budget: 72000, status: "Contacted" },
	{ id: 3, name: "Vikram Singh", company: "Greenfield Foods", email: "vikram@greenfield.com", phone: "+91 98111 22334", service: "Digital marketing", budget: 28000, status: "New" },
	{ id: 4, name: "Priya Iyer", company: "Casa Forma", email: "priya@casaforma.in", phone: "+91 97654 32109", service: "UI/UX design", budget: 38000, status: "Converted" },
	{ id: 5, name: "Arjun Kapoor", company: "Orbit Finance", email: "arjun@orbitfin.in", phone: "+91 98989 76767", service: "App development", budget: 125000, status: "Interested" },
	{ id: 6, name: "Sana Khan", company: "Mosaic Studio", email: "sana@mosaicstudio.in", phone: "+91 91234 56789", service: "Content strategy", budget: 18000, status: "New" },
	{ id: 7, name: "Rohan Das", company: "Pixel Cart", email: "rohan@pixelcart.in", phone: "+91 93456 78901", service: "E-commerce setup", budget: 56000, status: "Contacted" },
	{ id: 8, name: "Neha Verma", company: "Aster Wellness", email: "neha@asterwellness.in", phone: "+91 92345 67890", service: "Social media", budget: 24000, status: "Lost" },
	{ id: 9, name: "Karan Malhotra", company: "Northstar Tech", email: "karan@northstar.tech", phone: "+91 98712 34567", service: "SEO consulting", budget: 32000, status: "New" },
	{ id: 10, name: "Ishita Roy", company: "Bloom Events", email: "ishita@bloomevents.in", phone: "+91 90000 11223", service: "Visual identity", budget: 49000, status: "Interested" }
];

const leadForm = document.querySelector("#lead-form");
const tableBody = document.querySelector("#leads-table-body");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");
const budgetFilter = document.querySelector("#budget-filter");
const statusFilter = document.querySelector("#status-filter");
const resultsCount = document.querySelector("#results-count");
const totalLeads = document.querySelector("#total-leads");
const activeLeads = document.querySelector("#active-leads");
const submitButton = document.querySelector("#submit-button");
const cancelEditButton = document.querySelector("#cancel-edit");
let editingLeadId = null;

const formatBudget = (budget) => `₹${budget.toLocaleString("en-IN")}`;

function getFilteredLeads() {
	const searchTerm = searchInput.value.trim().toLowerCase();
	return leads.filter((lead) => {
		const matchesSearch = lead.name.toLowerCase().includes(searchTerm);
		const matchesBudget = budgetFilter.value === "all" || (budgetFilter.value === "above" && lead.budget > 20000) || (budgetFilter.value === "below" && lead.budget < 50000);
		const matchesStatus = statusFilter.value === "all" || lead.status === statusFilter.value;
		return matchesSearch && matchesBudget && matchesStatus;
	});
}

function displayLeads() {
	const filteredLeads = getFilteredLeads();
	tableBody.innerHTML = filteredLeads.map((lead) => `<tr><td class="client-cell">${lead.name}</td><td class="company-cell">${lead.company}</td><td class="email-cell">${lead.email}</td><td class="phone-cell">${lead.phone}</td><td>${lead.service}</td><td class="budget-cell">${formatBudget(lead.budget)}</td><td><span class="status-badge status-${lead.status.toLowerCase()}">${lead.status}</span></td><td><div class="action-buttons"><button class="action-button" data-action="edit" data-id="${lead.id}" type="button">Edit</button><button class="action-button delete" data-action="delete" data-id="${lead.id}" type="button">Delete</button></div></td></tr>`).join("");
	emptyState.classList.toggle("hidden", filteredLeads.length > 0);
	resultsCount.textContent = `Showing ${filteredLeads.length} of ${leads.length} lead${leads.length === 1 ? "" : "s"}`;
	totalLeads.textContent = leads.length;
	activeLeads.textContent = leads.filter((lead) => !["Converted", "Lost"].includes(lead.status)).length;
}

function resetForm() { leadForm.reset(); editingLeadId = null; submitButton.innerHTML = "<span>＋</span> Add lead"; cancelEditButton.classList.add("hidden"); document.querySelector("#form-title").textContent = "Add new lead"; }

function editLead(id) { const lead = leads.find((item) => item.id === id); if (!lead) return; editingLeadId = id; Object.entries(lead).forEach(([key, value]) => { const field = leadForm.elements[key]; if (field) field.value = value; }); submitButton.innerHTML = "<span>↻</span> Update lead"; cancelEditButton.classList.remove("hidden"); document.querySelector("#form-title").textContent = "Edit lead"; document.querySelector(".form-card").scrollIntoView({ behavior: "smooth", block: "start" }); }

function deleteLead(id) { const leadIndex = leads.findIndex((item) => item.id === id); if (leadIndex === -1 || !window.confirm("Delete this lead?")) return; leads.splice(leadIndex, 1); if (editingLeadId === id) resetForm(); displayLeads(); }

leadForm.addEventListener("submit", (event) => { event.preventDefault(); const formData = new FormData(leadForm); const leadDetails = { name: formData.get("name").trim(), company: formData.get("company").trim(), email: formData.get("email").trim(), phone: formData.get("phone").trim(), service: formData.get("service").trim(), budget: Number(formData.get("budget")), status: formData.get("status") }; if (editingLeadId) Object.assign(leads.find((lead) => lead.id === editingLeadId), leadDetails); else leads.push({ id: Date.now(), ...leadDetails }); resetForm(); displayLeads(); });

[searchInput, budgetFilter, statusFilter].forEach((control) => control.addEventListener("input", displayLeads));
cancelEditButton.addEventListener("click", resetForm);
tableBody.addEventListener("click", (event) => { const button = event.target.closest("button[data-action]"); if (!button) return; const id = Number(button.dataset.id); if (button.dataset.action === "edit") editLead(id); if (button.dataset.action === "delete") deleteLead(id); });
displayLeads();
