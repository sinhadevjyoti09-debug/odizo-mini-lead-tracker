// Run these commands in mongosh after installing MongoDB.
use odizoCRM

// Create the collection and add one sample lead.
db.leads.insertOne({ name: "Rahul Sharma", company: "ABC Foods", email: "rahul@abcfoods.com", phone: "9876543210", service: "Website", budget: 25000, status: "New" })

// Add the remaining sample documents here, or use insertMany with your own data.
db.leads.insertMany([
  { name: "Ananya Mehta", company: "Mehta Textiles", service: "Branding", budget: 42000, status: "Interested" },
  { name: "Vikram Singh", company: "Northstar Realty", service: "SEO", budget: 18000, status: "Contacted" },
  { name: "Priya Nair", company: "Nair Wellness", service: "Social Media", budget: 30000, status: "Converted" },
  { name: "Arjun Kapoor", company: "Kapoor Logistics", service: "Mobile App", budget: 75000, status: "Interested" },
  { name: "Sneha Iyer", company: "Iyer Interiors", service: "Website", budget: 48000, status: "New" },
  { name: "Karan Patel", company: "Patel Motors", service: "SEO", budget: 22000, status: "Lost" },
  { name: "Riya Das", company: "Das Organics", service: "Branding", budget: 35000, status: "Contacted" },
  { name: "Aman Verma", company: "Verma Finance", service: "Website", budget: 55000, status: "Converted" },
  { name: "Neha Joshi", company: "Joshi Education", service: "Mobile App", budget: 90000, status: "New" }
])

db.leads.find({ budget: { $gt: 20000 } })
db.leads.find({ budget: { $lt: 50000 } })
db.leads.find({ status: "Interested" })
db.leads.find({ name: { $regex: "Rahul", $options: "i" } })
db.leads.updateOne({ name: "Rahul Sharma" }, { $set: { status: "Contacted" } })
db.leads.deleteOne({ name: "Rahul Sharma" })
