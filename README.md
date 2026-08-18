# ODIZO Mini Lead Tracker

## Project Purpose

ODIZO Mini Lead Tracker is a simple Lead Management System developed as part of the ODIZO Internship Project Assignment.

The project helps users manage potential clients by allowing them to add, view, search, filter, edit, and delete leads.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- MongoDB
- Git
- GitHub

## Features

### 1. Add Lead

Users can add a new lead using the form.

The form contains:

- Client Name
- Company Name
- Email
- Phone
- Service Required
- Budget
- Status

### 2. Display Leads

All leads are displayed in a professional table.

The table contains:

- Client Name
- Company
- Email
- Phone
- Service
- Budget
- Status
- Actions

### 3. Search

Users can search for a client by name.

Example:

Searching for `Rahul` displays leads containing Rahul in the client name.

### 4. Budget Filter

Users can filter leads based on their budget.

Available filters:

- All Budgets
- Greater than ₹20,000
- Less than ₹50,000

### 5. Status Filter

Users can filter leads by their current status.

Available statuses:

- All
- New
- Contacted
- Interested
- Converted
- Lost

### 6. Edit Lead

Users can edit existing lead information and update the lead.

### 7. Delete Lead

Users can delete a lead from the displayed data.

### 8. JavaScript Array and Objects

The initial lead data is stored in a JavaScript array containing lead objects.

Example:

```javascript
const leads = [
    {
        name: "Rahul Sharma",
        company: "ABC Foods",
        service: "Website",
        budget: 25000,
        status: "New"
    }
];
Author

Akash Kumar Mohanty

ODIZO Internship Project
git status