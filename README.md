
<div align="center">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="80" height="80">
    <path d="M12 2L2 22h20L12 2z" />
    <path d="M12 12L2 22" />
    <path d="M12 12l10 10" />
  </svg>
  
  <br/>
  <h1>GigFlow</h1>
  <strong>Pipeline Intelligence, Reduced to the Essential.</strong>
  <br/><br/>
  
  <p>A full-stack, enterprise-grade Smart Leads Dashboard built with the MERN stack and a TypeScript-first architecture.</p>
  
  <p>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </p>

  <br/>
  
  <!-- Add your recorded dashboard GIF here -->
  <a href="#live-demo">
    <img src="https://placehold.co/800x450/09090b/fafafa.gif?text=GigFlow+Animated+Dashboard+Demo&font=Montserrat" alt="GigFlow Animated Demo" width="100%" style="max-width: 800px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);" />
  </a>
</div>

<br/>
<hr/>

## <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/globe.svg" width="24" height="24" align="top" /> Live Demo

* **Frontend:** `https://gigflow-smart-leads-dashboard-pied.vercel.app/`
* **Backend API:** `https://smart-leads-dashboard-api-nkoj.onrender.com`
* **API Health:** `https://smart-leads-dashboard-api-nkoj.onrender.com/api/v1/health`

---

## <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/sparkles.svg" width="24" height="24" align="top" /> Features

### <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/palette.svg" width="20" height="20" align="top" /> Premium UI/UX (Frontend)
* **Cinematic Experience:** High-end, scroll-driven parallax landing page with zero-dependency CSS keyframe animations.
* **Adaptive Theming:** Seamless Dark/Light mode toggle utilizing a sophisticated "Deep Charcoal" & "Zinc" palette with glassmorphism effects.
* **State-of-the-Art Dashboard:** Minimalist, data-focused workspace with interactive KPIs, animated table rows, and polished modal transitions.
* **Component Architecture:** Highly scalable, strictly-typed React components leveraging `framer-motion` for fluid page transitions.

### <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/cpu.svg" width="20" height="20" align="top" /> Robust Engine (Backend & Core)
* **Authentication:** Secure JWT-based auth with register, login, and robust current-user verification flows.
* **Access Control:** Role-aware authorization foundation with granular `admin` and `sales` permissions.
* **Lead Management Workflow:** Complete CRUD operations with server-side filtering, debounced search, sorting, and pagination.
* **Data Export:** Built-in CSV generation and export support for pipeline data.
* **Production-Ready:** Centralized error handling, Zod validation pipelines, and a Docker-ready project structure.

---

## <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/layers.svg" width="24" height="24" align="top" /> Tech Stack

### Frontend Ecosystem
* **Core:** React, TypeScript, Vite
* **Styling & UI:** TailwindCSS v4, Framer Motion, Lucide React icons
* **State & Data:** Zustand (Global State/Theme), TanStack React Query (Server State)
* **Routing:** React Router DOM

### Backend Ecosystem
* **Core:** Node.js, Express.js, TypeScript
* **Database:** MongoDB Atlas, Mongoose
* **Security:** JSON Web Tokens (JWT), bcrypt
* **Validation:** Zod

### DevOps & Tooling
* **Hosting:** Render
* **Containers:** Docker Compose
* **Testing/API:** Postman
* **Version Control:** GitHub

---

## <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/folder-tree.svg" width="24" height="24" align="top" /> Project Structure

```text
smart-leads-dashboard/
├── client/                 # React frontend application
├── server/                 # Node.js/Express backend API
├── docs/                   # Postman collections & architecture docs
├── docker-compose.yml      # Container orchestration
├── package.json            # Root dependencies
└── README.md               # Project documentation
```

---

## <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/monitor.svg" width="24" height="24" align="top" /> Screens & Modules

### Frontend Views
* **Cinematic Landing Page** (Scroll-reveal features & live dashboard mocks)
* **Split-Screen Authentication** (Login/Register slide-switch modal)
* **Protected Dashboard** (KPIs, Toolbar, Animated Leads Table)
* **Lead Details View** (Expanded metadata & routing history)
* **System Pages** (Unauthorized, 404 Not Found)

### Backend Modules
* **Health Check** (Platform monitoring)
* **Authentication API** (JWT generation & validation)
* **Authorization Middleware** (Role-based guarding)
* **Leads API** (Filtering, Pagination, Aggregation)
* **Validation & Error Handling** (Zod schemas & centralized error catching)

---

## <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/server.svg" width="24" height="24" align="top" /> API Overview

**Base URL:** `https://smart-leads-dashboard-api-nkoj.onrender.com/api/v1`

| Method | Endpoint | Description | Access | 
| :--- | :--- | :--- | :--- | 
| `GET` | `/health` | System health check (Render probe) | Public | 
| `POST` | `/auth/register` | Register new user | Public | 
| `POST` | `/auth/login` | Authenticate user & receive JWT | Public | 
| `GET` | `/auth/me` | Fetch current authenticated user | Private | 
| `GET` | `/leads` | Fetch leads (supports search, sort, pagination) | Private | 
| `POST` | `/leads` | Create a new lead | Private | 
| `GET` | `/leads/:id` | Fetch specific lead details | Private | 
| `PATCH` | `/leads/:id` | Update lead information | Private | 
| `DELETE` | `/leads/:id` | Remove a lead from pipeline | Admin | 
| `GET` | `/leads/export/csv` | Download pipeline data as CSV | Admin | 

> *Note: A dedicated health endpoint is implemented for deployment platforms like Render to continuously monitor service uptime.*

---

## <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/terminal-square.svg" width="24" height="24" align="top" /> Local Setup

### 1. Clone the repository
```bash
git clone [https://github.com/Yogarathinam/smart-leads-dashboard.git](https://github.com/Yogarathinam/smart-leads-dashboard.git)
cd smart-leads-dashboard
```

### 2. Configure Environment Variables
Create `.env` files in both the `client` and `server` directories based on the provided examples.

**`client/.env`**
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

**`server/.env`**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
```

### 3. Install Dependencies
```bash
# Setup Backend
cd server
npm install

# Setup Frontend
cd ../client
npm install
```

### 4. Boot Up the Application
Open two separate terminal windows:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```

### 5. Access the App
* **Frontend App:** `http://localhost:5173`
* **Backend API:** `http://localhost:5000`
* **Health Check:** `http://localhost:5000/api/v1/health`

---

## <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/cloud-upload.svg" width="24" height="24" align="top" /> Deployment Notes

The backend is configured for deployment on **Render**. Render supports a configurable health check path. Set your health check path to:

```text
/api/v1/health
```

This avoids failed root-path checks and ensures deployment status is accurately tracked.

For local frontend testing against the deployed production backend, update your client environment variables:

```env
VITE_API_BASE_URL=[https://smart-leads-dashboard-api-nkoj.onrender.com/api/v1](https://smart-leads-dashboard-api-nkoj.onrender.com/api/v1)
```

---

## <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/book-open.svg" width="24" height="24" align="top" /> Documentation

Deep-dive project documentation is available in the `docs/` folder:

* 📄 `docs/api.md` - Complete endpoint parameters and response schemas.
* 🏗️ `docs/architecture.md` - System design and folder structure details.
* ⚙️ `docs/setup.md` - Advanced setup (Docker, Database seeding).
* 🧪 `docs/postman_collection.json` - Importable API test suite.

---

## <img src="https://cdn.jsdelivr.net/npm/lucide-static@0.344.0/icons/flask-conical.svg" width="24" height="24" align="top" /> Postman Testing

Import the provided Postman collection to test the API directly:

```text
docs/postman_collection.json
```

**Recommended Test Flow:**
 1. Health Check
 2. Register User
 3. Login User *(Sets Auth Token)*
 4. Get Current User
 5. Create Lead
 6. Get Leads *(Test filters & pagination)*
 7. Get Lead By Id
 8. Update Lead
 9. Delete Lead
10. Export Leads CSV

<br/>
<div align="center">
  <p>Engineered for focus. Designed to scale.</p>
  <sub>© 2026 GigFlow Systems. All rights reserved.</sub>
</div>
