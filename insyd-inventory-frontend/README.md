# Inventory Transparency & Insights – Frontend (Next.js)

This repository contains the **frontend application** for the Inventory Transparency & Decision Support POC, developed as part of the **Insyd SDE Intern assignment**.

The frontend consumes backend APIs to provide a simple, clear interface that helps sellers:
- Trust their inventory data
- Understand why stock changes occur
- Make informed decisions based on actionable insights

---

## 🎯 Problem Context

Many inventory systems show only raw numbers, which leads to:
- Confusion about stock changes
- Lack of accountability
- Decision paralysis due to missing insights

This frontend focuses on **clarity over complexity**, ensuring that every stock change and insight is easy to understand.

---

## ✅ Key Features

### 🔹 Inventory Visibility
- Displays all inventory items and current stock levels
- Allows selecting an item to view details

### 🔹 Stock Updates with Accountability
- Stock quantity can be increased or decreased
- A **mandatory reason** is required for every update
- Prevents silent or unexplained stock changes

### 🔹 Transparent Stock History
- Shows a complete audit trail for each item
- Includes:
  - Change amount
  - Reason
  - Timestamp

### 🔹 Actionable Insights
- Low stock item detection
- Fast-moving vs slow-moving items
- Most common reasons for stock changes

These insights help sellers decide **what action to take next**, reducing decision paralysis.

---

## 🛠 Tech Stack

- Next.js (App Router)
- React Hooks
- Fetch API
- Plain CSS (minimal styling)
- Backend: Express.js + MongoDB (consumed via REST APIs)
