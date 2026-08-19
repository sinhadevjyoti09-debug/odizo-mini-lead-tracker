// Initial lead data

let leads = [
    {
        name: "Uttam Mohanty",
        company: "vibe Foods",
        email: "uttam@gmail.com",
        phone: "9876543210",
        service: "Website",
        budget: 25000,
        status: "New"
    },

    {
        name: "satya mohanty",
        company: "larsen Ltd",
        email: "satya@gmail.com",
        phone: "9876543211",
        service: "SEO",
        budget: 40000,
        status: "Interested"
    },

    {
        name: "soumetri panda",
        company: "Tech Solutions",
        email: "soumetri@gmail.com",
        phone: "9876543212",
        service: "Web App",
        budget: 60000,
        status: "Contacted"
    },

    {
        name: "Akash Mohanty",
        company: "V Mart",
        email: "akash@gmail.com",
        phone: "9876543213",
        service: "Website",
        budget: 18000,
        status: "New"
    },

    {
        name: "Sneha Pati",
        company: "Digital World",
        email: "sneha@gmail.com",
        phone: "9876543214",
        service: "Digital Marketing",
        budget: 45000,
        status: "Converted"
    },
    {
        name: "soumya rajhansa",
        company: "Tech Solutions",
        email: "soumya@gmail.com",
        phone: "9876543212",
        service: "Web App",
        budget: 60000,
        status: "Contacted"
    },
    {
        name: "barsha bhuyna",
        company: "Tech Solutions",
        email: "barsha@gmail.com",
        phone: "9876543212",
        service: "website",
        budget: 60000,
        status: "Contacted"
    },
    {
        name: "ankita paricha",
        company: "it Solutions",
        email: "ankita@gmail.com",
        phone: "9876543212",
        service: "web devloper",
        budget: 60000,
        status: "Contacted"
    },
];




const leadForm = document.getElementById("leadForm");
const leadTable = document.getElementById("leadTable");

const searchInput = document.getElementById("search");
const budgetFilter = document.getElementById("budgetFilter");
const statusFilter = document.getElementById("statusFilter");

const submitButton = document.getElementById("submitButton");




let editIndex = -1;




function displayLeads() {

    leadTable.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();

    const selectedBudget = budgetFilter.value;

    const selectedStatus = statusFilter.value;


    for (let i = 0; i < leads.length; i++) {

        const lead = leads[i];

        

        if (!lead.name.toLowerCase().includes(searchText)) {
            continue;
        }


        

        if (
            selectedStatus !== "All" &&
            lead.status !== selectedStatus
        ) {
            continue;
        }


       

        if (
            selectedBudget === "greater" &&
            lead.budget <= 20000
        ) {
            continue;
        }

        if (
            selectedBudget === "less" &&
            lead.budget >= 50000
        ) {
            continue;
        }


        

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${lead.name}</td>
            <td>${lead.company}</td>
            <td>${lead.email}</td>
            <td>${lead.phone}</td>
            <td>${lead.service}</td>
            <td>₹${lead.budget}</td>
            <td>${lead.status}</td>

            <td>
                <button class="edit-btn" onclick="editLead(${i})">
                    Edit
                </button>

                <button class="delete-btn" onclick="deleteLead(${i})">
                    Delete
                </button>
            </td>
        `;

        leadTable.appendChild(row);
    }
}




leadForm.addEventListener("submit", function(event) {

    event.preventDefault();


    

    const name = document.getElementById("name").value;
    const company = document.getElementById("company").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;

    const budget = Number(
        document.getElementById("budget").value
    );

    const status = document.getElementById("status").value;


    

    const lead = {
        name: name,
        company: company,
        email: email,
        phone: phone,
        service: service,
        budget: budget,
        status: status
    };


    

    if (editIndex === -1) {

        

        leads.push(lead);

    } else {

       

        leads[editIndex] = lead;

        editIndex = -1;

        submitButton.innerText = "Add Lead";
    }


   

    leadForm.reset();


    

    displayLeads();

});




function editLead(index) {

    const lead = leads[index];


    document.getElementById("name").value = lead.name;
    document.getElementById("company").value = lead.company;
    document.getElementById("email").value = lead.email;
    document.getElementById("phone").value = lead.phone;
    document.getElementById("service").value = lead.service;
    document.getElementById("budget").value = lead.budget;
    document.getElementById("status").value = lead.status;


    editIndex = index;

    submitButton.innerText = "Update Lead";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}




function deleteLead(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this lead?"
    );


    if (confirmDelete) {

        leads.splice(index, 1);

        displayLeads();
    }
}




searchInput.addEventListener("input", function() {

    displayLeads();

});




budgetFilter.addEventListener("change", function() {

    displayLeads();

});




statusFilter.addEventListener("change", function() {

    displayLeads();

});




displayLeads();