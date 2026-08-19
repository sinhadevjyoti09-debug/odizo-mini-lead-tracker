# ODIZO Mini Lead Tracker

A beginner-friendly lead management system for adding, viewing, searching, filtering, editing, and deleting potential clients.

## Technologies

- HTML
- CSS
- JavaScript arrays, objects, loops, conditions, functions, and localStorage
- MongoDB practice queries in `mongo-queries.js`

## Features

- Add leads with client, company, contact, service, budget, and status details
- Search by client name
- Filter by budget and status
- Edit and delete leads
- Responsive layout
- Ten initial sample leads

## How to run

1. Open `index.html` directly in a browser, or use VS Code Live Server.
2. Add a lead using the form.
3. Test the search box, budget filter, status filter, Edit, Delete, and Clear filters controls.
4. Browser data is saved in localStorage, so it remains after refreshing the page.

## MongoDB beginner setup

1. Install MongoDB Community Server and MongoDB Shell (`mongosh`) from the official MongoDB website.
2. Open a terminal and run `mongosh`.
3. Open `mongo-queries.js` and run each command one at a time in `mongosh`.
4. `use odizoCRM` selects the database. MongoDB creates it when the first document is inserted.
5. `db.leads.find()` displays the saved leads.

The browser project and MongoDB database are separate at this stage. Connecting them would require Node.js and an API, which are intentionally outside this assignment.

## Git workflow

```bash
git init
git status
git add index.html style.css
git commit -m "Create lead tracker structure"
git add script.js
git commit -m "Add lead form and table functionality"
git add style.css script.js
 git commit -m "Add search and filter functionality"
git add README.md mongo-queries.js
git commit -m "Add MongoDB practice queries and documentation"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Create a `screenshots` folder, place screenshots of the finished app inside it, and add their paths here before submission.
