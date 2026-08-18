// Initial lead data
const leads = [
    {
        name: "Rahul Sharma",
        company: "ABC Foods",
        email: "rahul@abcfoods.com",
        phone: "9876543210",
        service: "Website",
        budget: 25000,
        status: "New"
    },
    {
        name: "Priya Singh",
        company: "TechWorld",
        email: "priya@techworld.com",
        phone: "9876543211",
        service: "Web Application",
        budget: 45000,
        status: "Contacted"
    },
    {
        name: "Amit Kumar",
        company: "Kumar Traders",
        email: "amit@kumartraders.com",
        phone: "9876543212",
        service: "Digital Marketing",
        budget: 18000,
        status: "Interested"
    },
    {
        name: "Sneha Das",
        company: "Creative Studio",
        email: "sneha@creativestudio.com",
        phone: "9876543213",
        service: "UI/UX Design",
        budget: 30000,
        status: "Converted"
    },
    {
        name: "Rohan Patel",
        company: "Patel Enterprises",
        email: "rohan@patelenterprises.com",
        phone: "9876543214",
        service: "SEO",
        budget: 15000,
        status: "New"
    },
    {
        name: "Neha Mishra",
        company: "Mishra Fashion",
        email: "neha@mishrafashion.com",
        phone: "9876543215",
        service: "Website",
        budget: 55000,
        status: "Interested"
    },
    {
        name: "Arjun Das",
        company: "Odisha Foods",
        email: "arjun@odishafoods.com",
        phone: "9876543216",
        service: "Mobile Application",
        budget: 65000,
        status: "Contacted"
    },
    {
        name: "Pooja Roy",
        company: "Roy Enterprises",
        email: "pooja@royenterprises.com",
        phone: "9876543217",
        service: "Website",
        budget: 22000,
        status: "Lost"
    },
    {
        name: "Sahil Khan",
        company: "Khan Solutions",
        email: "sahil@khansolutions.com",
        phone: "9876543218",
        service: "Web Application",
        budget: 48000,
        status: "Converted"
    },
    {
        name: "Ananya Das",
        company: "Smart Education",
        email: "ananya@smarteducation.com",
        phone: "9876543219",
        service: "SEO",
        budget: 27000,
        status: "New"
    }
];


// Get HTML elements
const leadForm = document.getElementById("leadForm");
const clientName = document.getElementById("clientName");
const companyName = document.getElementById("companyName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const service = document.getElementById("service");
const budget = document.getElementById("budget");
const status = document.getElementById("status");

const searchInput = document.getElementById("searchInput");
const budgetFilter = document.getElementById("budgetFilter");
const statusFilter = document.getElementById("statusFilter");

const leadTableBody = document.getElementById("leadTableBody");
const leadCount = document.getElementById("leadCount");
const noLeadsMessage = document.getElementById("noLeadsMessage");

const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");
const formTitle = document.getElementById("formTitle");


// Store the index of the lead being edited
let editIndex = -1;


// Display all leads
function displayLeads() {

    leadTableBody.innerHTML = "";

    const searchValue = searchInput.value.toLowerCase();
    const selectedBudget = budgetFilter.value;
    const selectedStatus = statusFilter.value;

    let filteredLeads = [];

    // Loop through all leads
    for (let i = 0; i < leads.length; i++) {

        const lead = leads[i];

        // Search condition
        const matchesSearch =
            lead.name.toLowerCase().includes(searchValue);

        // Status condition
        const matchesStatus =
            selectedStatus === "All" ||
            lead.status === selectedStatus;

        // Budget condition
        let matchesBudget = true;

        if (selectedBudget === "greater20000") {
            matchesBudget = lead.budget > 20000;
        }

        if (selectedBudget === "less50000") {
            matchesBudget = lead.budget < 50000;
        }

        // Add lead if all conditions are true
        if (matchesSearch && matchesStatus && matchesBudget) {
            filteredLeads.push({
                lead: lead,
                index: i
            });
        }
    }


    // Display filtered leads
    for (let i = 0; i < filteredLeads.length; i++) {

        const lead = filteredLeads[i].lead;
        const originalIndex = filteredLeads[i].index;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${lead.name}</td>
            <td>${lead.company}</td>
            <td>${lead.email}</td>
            <td>${lead.phone}</td>
            <td>${lead.service}</td>
            <td>₹${lead.budget.toLocaleString("en-IN")}</td>
            <td>
                <span class="status ${getStatusClass(lead.status)}">
                    ${lead.status}
                </span>
            </td>
            <td>
                <div class="actions">
                    <button
                        class="btn-edit"
                        onclick="editLead(${originalIndex})">
                        Edit
                    </button>

                    <button
                        class="btn-delete"
                        onclick="deleteLead(${originalIndex})">
                        Delete
                    </button>
                </div>
            </td>
        `;

        leadTableBody.appendChild(row);
    }


    // Update lead count
    leadCount.textContent =
        "Showing " + filteredLeads.length + " of " + leads.length + " leads";


    // Show/hide no leads message
    if (filteredLeads.length === 0) {
        noLeadsMessage.classList.remove("hidden");
    } else {
        noLeadsMessage.classList.add("hidden");
    }
}


// Return CSS class according to status
function getStatusClass(statusValue) {

    if (statusValue === "New") {
        return "status-new";
    }

    if (statusValue === "Contacted") {
        return "status-contacted";
    }

    if (statusValue === "Interested") {
        return "status-interested";
    }

    if (statusValue === "Converted") {
        return "status-converted";
    }

    if (statusValue === "Lost") {
        return "status-lost";
    }

    return "";
}


// Add or update lead
leadForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const leadData = {
        name: clientName.value,
        company: companyName.value,
        email: email.value,
        phone: phone.value,
        service: service.value,
        budget: Number(budget.value),
        status: status.value
    };


    // Check whether we are editing
    if (editIndex === -1) {

        // Add new lead
        leads.push(leadData);

        alert("Lead added successfully.");

    } else {

        // Update existing lead
        leads[editIndex] = leadData;

        alert("Lead updated successfully.");

        editIndex = -1;

        submitButton.textContent = "Add Lead";
        formTitle.textContent = "Add New Lead";

        cancelButton.classList.add("hidden");
    }


    // Clear form
    leadForm.reset();

    // Display updated leads
    displayLeads();
});


// Edit lead
function editLead(index) {

    const lead = leads[index];

    clientName.value = lead.name;
    companyName.value = lead.company;
    email.value = lead.email;
    phone.value = lead.phone;
    service.value = lead.service;
    budget.value = lead.budget;
    status.value = lead.status;

    editIndex = index;

    formTitle.textContent = "Edit Lead";
    submitButton.textContent = "Update Lead";
    cancelButton.classList.remove("hidden");

    // Scroll to form
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// Delete lead
function deleteLead(index) {

    const confirmDelete =
        confirm("Are you sure you want to delete this lead?");

    if (confirmDelete) {

        leads.splice(index, 1);

        // Reset edit mode if necessary
        if (editIndex === index) {
            editIndex = -1;
            leadForm.reset();
            formTitle.textContent = "Add New Lead";
            submitButton.textContent = "Add Lead";
            cancelButton.classList.add("hidden");
        }

        displayLeads();

        alert("Lead deleted successfully.");
    }
}


// Cancel editing
cancelButton.addEventListener("click", function() {

    editIndex = -1;

    leadForm.reset();

    formTitle.textContent = "Add New Lead";
    submitButton.textContent = "Add Lead";

    cancelButton.classList.add("hidden");
});


// Search event
searchInput.addEventListener("input", function() {
    displayLeads();
});


// Budget filter event
budgetFilter.addEventListener("change", function() {
    displayLeads();
});


// Status filter event
statusFilter.addEventListener("change", function() {
    displayLeads();
});


// Display leads when page loads
displayLeads();