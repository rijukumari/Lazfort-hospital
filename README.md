# 🏥 LAZFORT Hospital ERP — v1.0
### MERN Stack | Outpatient & Clinical Operations Platform

> **Multi-tenant, role-based, NABH-ready Hospital ERP with live OPD queue, clinical encounter, billing, audit trail, and 3D UI.**

---

## 🚀 Quick Start (Windows)

### Step 1 — Install Dependencies (Run Once)
Double-click `install_all.bat` OR in PowerShell/CMD:
```bat
install_all.bat
```

### Step 2 — Start Both Servers
Double-click `start_dev.bat` OR in PowerShell/CMD:
```bat
start_dev.bat
```

**Browser will auto-open at:** `http://localhost:5173`

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Access |
|------|-------|----------|--------|
| 🛡️ **Hospital Admin** | `admin@lazfort.com` | `Admin@123` | Full ERP — settings, staff, tariffs, audit |
| 👨‍⚕️ **Senior Doctor** | `dr.rajesh@lazfort.com` | `Doctor@123` | OPD consult, SOAP notes, prescriptions |
| 👩‍💼 **Front Desk** | `reception@lazfort.com` | `Staff@123` | Patient registration, appointments, queue |
| 💳 **Billing Cashier** | `billing@lazfort.com` | `Staff@123` | Invoices, payments, receipts |
| 💉 **OPD Nurse** | `nurse@lazfort.com` | `Staff@123` | Vitals triage, nursing notes |

> 💡 Use **1-Click Quick Login** buttons on the login screen — no password typing needed!

---

## 📁 Project Structure

```
Lazfort_hospital_ERP/
├── install_all.bat        ← Run first to install all npm packages
├── start_dev.bat          ← Starts both backend + frontend
├── live_preview.html      ← Static 3D UI preview (no server needed)
│
├── server/                ← Node.js + Express + MongoDB Backend (Port 5000)
│   ├── src/
│   │   ├── index.js           ← Entry point & app bootstrap
│   │   ├── config/db.js       ← MongoDB + in-memory fallback engine
│   │   ├── models/            ← Mongoose schemas (10 models)
│   │   ├── controllers/       ← Business logic (8 controllers)
│   │   ├── routes/            ← REST API routes (8 route files)
│   │   ├── middleware/        ← JWT auth, RBAC, tenant isolation, audit
│   │   ├── services/          ← In-memory storage engine
│   │   └── data/seedData.js   ← Indian clinical context seed data
│   ├── .env                   ← Environment config
│   └── package.json
│
└── client/                ← React 18 + Vite + Tailwind Frontend (Port 5173)
    ├── src/
    │   ├── main.jsx           ← React entry point
    │   ├── App.jsx            ← Routing & layout shell
    │   ├── index.css          ← 3D animations & glassmorphism
    │   ├── context/
    │   │   └── AuthContext.jsx    ← JWT auth state + quickLogin
    │   ├── services/api.js    ← HTTP client with token injection
    │   ├── components/
    │   │   ├── Navbar.jsx     ← Doctor profile pill + account modal
    │   │   ├── Sidebar.jsx    ← Role-filtered navigation
    │   │   ├── StatCard.jsx   ← 3D metric cards
    │   │   └── Modal.jsx      ← Reusable modal dialog
    │   └── pages/
    │       ├── Login.jsx              ← Login + quick demo accounts
    │       ├── Dashboard.jsx          ← Live metrics + ECG animation
    │       ├── Patients.jsx           ← UHID master + registration
    │       ├── AppointmentsQueue.jsx  ← OPD token board + booking
    │       ├── DoctorEncounter.jsx    ← SOAP notes + prescription
    │       ├── BillingInvoices.jsx    ← Invoicing + payments
    │       ├── ServiceTariffs.jsx     ← Tariff catalogue
    │       ├── StaffManagement.jsx    ← Staff directory
    │       └── AuditLogs.jsx          ← Immutable audit trail
    └── package.json
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js (ES Modules) |
| **Database** | MongoDB + Mongoose (auto-fallback to in-memory store) |
| **Auth** | JWT (24h expiry), bcryptjs password hashing |
| **Security** | RBAC middleware, tenant isolation, audit logging |

---

## 🌐 API Endpoints

| Route | Description |
|-------|-------------|
| `POST /api/auth/login` | Staff authentication |
| `GET /api/auth/me` | Current user profile |
| `GET /api/auth/staff` | Hospital staff directory |
| `GET /api/patients` | Patient list (search/filter) |
| `POST /api/patients` | Register new patient (UHID auto-gen) |
| `GET /api/patients/:uhid` | Patient details + history |
| `GET /api/appointments` | OPD queue with status |
| `POST /api/appointments` | Book new appointment |
| `PATCH /api/appointments/:id/checkin` | Token check-in |
| `PATCH /api/appointments/:id/status` | Status transitions |
| `GET /api/encounters/:id` | Clinical encounter |
| `POST /api/encounters/draft` | Save draft SOAP notes |
| `POST /api/encounters/:id/finalize` | Lock & finalize encounter |
| `GET /api/billing/invoices` | Invoice list |
| `POST /api/billing/invoices` | Create invoice |
| `POST /api/billing/payment` | Record payment + receipt |
| `GET /api/catalog` | Service tariff catalogue |
| `GET /api/dashboard/metrics` | Real-time KPI metrics |
| `GET /api/audit` | Audit trail logs |
| `GET /api/health` | System health check |

---

## ⚡ MongoDB (Optional)

The system works **offline** without MongoDB via an in-memory store with full seed data.

To use real MongoDB:
1. Install [MongoDB Community](https://www.mongodb.com/try/download/community)
2. Start `mongod`
3. Set in `server/.env`: `MONGODB_URI=mongodb://127.0.0.1:27017/lazfort_hospital_erp`
4. Restart the server — it auto-seeds on first run

---

## 🎨 Features

- **3D UI** — glassmorphism, parallax tilt cards, live cardiac ECG waveform animation
- **Doctor Profile Modal** — MCI license, fees, OPD schedule, RBAC privileges
- **Role-based Access** — each role sees only their permitted modules
- **Duplicate Detection** — phone and name matching on patient registration
- **UHID Auto-generation** — `LZF-YYYY-NNNN` format
- **Queue State Machine** — booked → checked_in → in_consultation → completed
- **Encounter Lock** — finalized clinical notes cannot be edited (BR-07)
- **Immutable Audit Logs** — every sensitive action is logged with actor, IP, timestamp
- **Multi-tenant Ready** — all records scoped by `tenantId` server-side

---

## 📋 PRD Compliance (MVP / P0)

| PRD Requirement | Status |
|-----------------|--------|
| Patient Registration + UHID | ✅ |
| Duplicate Detection (phone/name) | ✅ |
| Appointment Booking | ✅ |
| OPD Queue Token Board | ✅ |
| Clinical Encounter (SOAP + Vitals) | ✅ |
| Prescription Builder | ✅ |
| Encounter Finalization Lock (BR-07) | ✅ |
| Service Tariff Catalogue | ✅ |
| Invoice Generation | ✅ |
| Payment Recording (Cash/UPI/Card) | ✅ |
| Receipt Generation | ✅ |
| Immutable Audit Trail (BR-08) | ✅ |
| Role-Based Access Control | ✅ |
| Multi-Tenant Isolation (BR-01) | ✅ |
| JWT Authentication (24h) | ✅ |

---

*Built by Lazfort Studio · India-first Hospital ERP · PRD v1.0 · October 2026*
