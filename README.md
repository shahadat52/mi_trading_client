# M.I Trading ERP

> **A modern, full-stack Enterprise Resource Planning (ERP) system for managing trading business operations, inventory, sales, purchases, accounts, customers, suppliers, and financial transactions.**

---

## 📌 Overview

**M.I Trading ERP** is a full-stack business management and accounting solution designed to simplify and centralize day-to-day trading operations.

The system provides a unified platform for managing:

* 📦 Products & Inventory
* 🛒 Purchases
* 💰 Sales
* 👥 Customers
* 🏢 Suppliers
* 🏦 Bank Accounts
* 📱 Mobile Financial Services (MFS)
* 💵 Cashbox
* 📊 Receivables & Payables
* 🧾 Invoices
* 📈 Business Reports
* 🔐 Authentication & Authorization

The goal of the system is to replace fragmented manual processes with a centralized, reliable, and scalable ERP platform.

---

## ✨ Core Features

### 📦 Inventory Management

* Product management
* SKU-based product tracking
* Stock-in / Stock-out management
* Real-time stock calculation
* Product-wise stock valuation
* Quantity and purchase-price tracking
* Low-stock monitoring
* Stock history

### 🛒 Purchase Management

* Create purchase transactions
* Purchase invoice management
* Supplier-wise purchase history
* Purchase return support
* Purchase amount calculation
* Date-range purchase reports
* Supplier payable tracking

### 💰 Sales Management

* Create sales transactions
* Customer-wise sales history
* Sales invoice generation
* Sales return support
* Date-range sales reports
* Customer receivable tracking
* Sales performance reporting

### 👥 Customer Management

* Customer registration
* Customer profile
* Contact information
* Customer transaction history
* Total sales
* Total received
* Outstanding receivable
* Customer-wise reports

### 🏢 Supplier Management

* Supplier registration
* Supplier profile
* Supplier transaction history
* Total purchases
* Total payments
* Outstanding payable
* Supplier-wise reports

### 💳 Financial Management

Track the business's major financial resources from a single dashboard:

* 💵 Cashbox balance
* 🏦 Bank balance
* 📱 MFS balance
* 📥 Total receivables
* 📤 Total payables
* 📊 Overall business position

### 🏦 Bank & MFS Management

* Bank account management
* MFS account management
* Deposit transactions
* Withdrawal transactions
* Transfer transactions
* Account-wise transaction history
* Current balance calculation

### 🧾 Invoice & PDF

* Professional invoice generation
* Printable invoices
* A4 print layout
* PDF export
* Customer invoices
* Supplier documents
* Business reports

### 📊 Reports

Generate business reports based on:

* Date range
* Customer
* Supplier
* Product
* Transaction type
* Payment status
* Account

Example reports:

* Sales Report
* Purchase Report
* Stock Report
* Customer Due Report
* Supplier Due Report
* Bank Transaction Report
* MFS Transaction Report
* Cash Transaction Report

---

# 🛠️ Tech Stack

## Frontend

| Technology      | Purpose                     |
| --------------- | --------------------------- |
| React           | UI development              |
| TypeScript      | Type safety                 |
| Tailwind CSS    | Styling                     |
| Redux Toolkit   | Global state management     |
| RTK Query       | API communication & caching |
| React Hook Form | Form management             |
| date-fns        | Date manipulation           |
| Vite            | Development & build tool    |

## Backend

| Technology     | Purpose        |
| -------------- | -------------- |
| Node.js        | Runtime        |
| Express.js     | REST API       |
| TypeScript     | Type safety    |
| MongoDB        | Database       |
| Mongoose       | ODM            |
| JWT            | Authentication |
| PDFKit / jsPDF | PDF generation |

---

# 🏗️ System Architecture

```text
┌───────────────────────────────┐
│          Frontend             │
│       React + TypeScript      │
│                               │
│  Tailwind CSS                 │
│  Redux Toolkit                │
│  RTK Query                    │
└───────────────┬───────────────┘
                │
                │ REST API
                ▼
┌───────────────────────────────┐
│           Backend             │
│      Node.js + Express        │
│          TypeScript           │
│                               │
│ Authentication                │
│ Business Logic                │
│ Validation                    │
│ Transaction Management        │
└───────────────┬───────────────┘
                │
                ▼
┌───────────────────────────────┐
│          Database             │
│           MongoDB             │
│                               │
│ Attendances                   │  
│ Accounts                      │       
│ Purchases                     │
│ Customers                     │
│ Customertxns                  │ 
│ Suppliers                     │
│ Supplierstxns                 │   
│ Sales                         │
│ Beparicouthas                 │
│ Purchases                     │
│ Transactions                  │
│ Accounts                      │
│ Employess                     │
│ Users                         │
└───────────────────────────────┘
```

---

# 📂 Project Structure


## Backend

```text
server/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   ├── routes/
│   │   └── middlewares/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── types/
│   ├── app.ts
│   └── server.ts
│
├── package.json
└── tsconfig.json
```

---

# ⚙️ Installation

## Prerequisites

Make sure the following are installed:

* Node.js version 23.11.0
* npm 
* MongoDB
* Git

Check versions:

```bash
node -v
npm -v
git --version
```

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
```

```bash
cd mi-trading-erp
```

---


# 📊 Dashboard

The dashboard provides a centralized overview of the business.

### Financial Summary

```text
┌───────────────────────────────────────────────┐
│                BUSINESS OVERVIEW              │
├──────────────┬──────────────┬─────────────────┤
│ Cashbox      │ Bank         │ MFS             │
│ Balance      │ Balance      │ Balance         │
├──────────────┼──────────────┼─────────────────┤
│ Receivable   │ Payable      │ Stock Value     │
│              │              │                 │
└──────────────┴──────────────┴─────────────────┘
```

### Operational Summary

* Today's sales
* Today's purchases
* Monthly sales
* Monthly purchases
* Total customers
* Total suppliers
* Total products
* Low-stock products

---



# 🖨️ Printing & PDF

The ERP supports print-friendly business documents using an A4-oriented layout.

Supported documents may include:

* Sales Invoice
* Purchase Invoice
* Customer Due Report
* Supplier Due Report
* Sales Report
* Purchase Report
* Stock Report
* Financial Reports

---

# 🔌 API Design

The backend follows RESTful API conventions.

Example endpoint structure:

```text
/api/auth
/api/products
/api/customers
/api/suppliers
/api/sales
/api/purchases
/api/payments
/api/accounts
/api/transactions
/api/reports
```

Example:

```http
GET /api/products
POST /api/products
GET /api/products/:id
PATCH /api/products/:id
DELETE /api/products/:id
```

---

## ⭐ Project Status

**Status:** 🚧 Active Development

The system is continuously evolving with new business modules, reports, automation, and performance improvements.
