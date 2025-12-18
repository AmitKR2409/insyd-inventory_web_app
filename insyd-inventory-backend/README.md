# 🧾 Inventory Transparency Backend – Insyd SDE Intern POC

This repository contains the **backend Proof of Concept (POC)** developed as part of the **Insyd SDE Intern assignment**.

The backend focuses on solving a real-world inventory problem faced by Indian AEC (Architecture, Engineering, Construction) businesses:

> **Lack of trust in inventory data due to missing transparency and accountability**

---

## 🎯 Problem Context

In many inventory systems, stock quantities change without clear explanations.  
This leads to confusion, internal disputes, and eventually a loss of trust in the system.

When users cannot answer:
- What changed?
- Why did it change?
- Who changed it?
- When did it change?

they stop relying on the software altogether.

This backend POC addresses that gap by ensuring **every inventory change is explicit, traceable, and explainable**.

---

## ✅ What This Backend Does

- Manages inventory items with basic attributes
- Allows stock quantity to be increased or decreased
- Requires a **mandatory reason** for every stock update
- Automatically logs each stock change with:
  - Change amount
  - Reason
  - Timestamp
  - User (hardcoded for POC)
- Provides APIs to fetch complete stock change history

This creates a **clear audit trail**, improving trust and accountability.

---

## 🧠 Design Philosophy

- Trust before intelligence
- Transparency over silent automation
- Simplicity over feature overload
- Clear reasoning instead of hidden updates

The scope is intentionally minimal to clearly demonstrate the core idea.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- cors
