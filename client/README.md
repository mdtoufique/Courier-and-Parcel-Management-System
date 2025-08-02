# 📦 Courier & Parcel Management System – MERN Stack with JWT Authentication

A robust full-stack **Courier & Parcel Management System** built with the **MERN stack** (MongoDB, Express, React, Node.js). It features **role-based dashboards** for Admins, Agents, and Customers, with **JWT-secured routes**, **real-time parcel management**, and **agent assignment**.

---

## 🔧 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, React Router  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT (JSON Web Tokens)  
- **HTTP:** Axios  

---

## 🧩 Features

- **👤 Multi-Role Authentication**  
  - Admin, Agent, and Customer roles  
  - Role-based login redirects and dashboard access  
  - Secure JWT authentication stored in localStorage  

- **📬 Parcel Management**  
  - Admin can edit and delete parcels  
  - Admin can assign delivery agents to a parcel  
  - Parcel editing with confirmation modal  
  - Conditional field toggling (e.g. disable/enable inputs based on edit mode)  

- **📑 Agent Assignment**  
  - Agents fetched from backend  
  - Agent display updates live on selection  
  - Admin can reassign parcels to different agents  

- **🔐 Protected Routes**  
  - Only authenticated users with correct roles can access sensitive features  

---

## ⚙️ Authentication Flow

1. **Register & Login**  
   - POST `/api/auth/register` and `/api/auth/login` to create and access accounts  
   - On success, a signed JWT is returned  

2. **Authorization**  
   - JWT sent via `Authorization: Bearer <token>` in all protected API requests  
   - Middleware verifies role and identity  

3. **Role Redirects**  
   - After login, users are redirected to:  
     - `/admin/dashboard` for Admin  
     - `/agent/dashboard` for Agent  
     - `/customer/dashboard` for Customer  

---

## 🌐 API Endpoints (Sample)

### Auth
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Login and receive JWT  

### Users
- `GET /api/users/:role` – Fetch users by role (admin only)  

### Parcels
- `GET /api/parcels` – Get all parcels (admin/agent)  
- `PUT /api/parcels/:id` – Update a parcel  
- `DELETE /api/parcels/:id` – Delete a parcel  

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/courier-parcel-system.git
cd courier-parcel-system
```

### 2. Install backend dependencies

```bash
cd server
npm install
```

### 3. Setup environment variables in /server/.env

```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

### 4. Run backend server

```bash
npm run dev
```

### 5. Setup frontend environment variables in /client/.env

```ini
VITE_API_BASE_URL=http://localhost:5000
```

### 6. Run frontend

```bash
cd client
npm install
npm run dev
```
## 💻 Usage

- Admin logs in and views dashboard  
- Can view, edit, assign agents, and delete parcels  
- When editing, input fields toggle between read-only and editable  
- Agent and payment method dynamically updated  
- Agent details update live on dropdown selection  

---

## 🛡️ Security Notes

- Passwords are hashed with bcrypt before saving  
- JWT tokens are signed and verified on each request  
- Admin-only routes are protected by role-check middleware  

---

## 📧 Contact

- **GitHub:** [mdtoufique](https://github.com/mdtoufique)  
- **Email:** mdrehmant@email.com