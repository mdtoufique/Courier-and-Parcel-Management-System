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

- **📡 Real-time Parcel Updates**
  - Live parcel status updates using **Socket.IO**  
  - Admin and customers see changes instantly without refreshing  
  - Real-time alert count for failed parcels in navigation

- **📝 Parcel CRUD operation**  
  - Add, edit, delete, and view parcels 

- **🔒 Secure Management**  
  - Each user only accesses their own tasks  
  - Backend verifies JWT on all protected endpoints

- **📑 Agent Assignment**  
  - Agents fetched from backend  
  - Agent display updates live on selection  
  - Admin can reassign parcels to different agents  

- **🔐 Protected Routes**  
  - Only authenticated users with correct roles can access sensitive features  

- **🔐 Email Notification**  
  - Customer will get notification via email for failed parcel
  
---

- **📊 Dashboard Highlights**

- **Admin Dashboard**  
  - View all parcels  
  - Assign, unassign, update, or delete parcels  
  - View all agents and customers, and their associated parcels  
  - Access full tracking history per parcel  

- **Customer Dashboard**  
  - View only their own booked parcels  
  - See live tracking status and history  

- **Agent Dashboard**  
  - View only assigned parcels  
  - Update parcel status with location and note  

- **📦 Parcel Tracking**
  - Each parcel tracks its full **status history** with     timestamps, locations, and notes  
  - Live socket update when new history is added  
  - Tracking shown in tables with real-time refresh  

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

## 🌐 API Endpoints

### 🔐 Auth
- `POST /api/auth/register` – Register a new user  
- `POST /api/auth/login` – Login and receive JWT  

### 👥 Users
- `GET /api/users/:userRole` – Fetch users by role (admin only)  
  - `:userRole` can be `admin`, `agent`, or `customer`  

### 📦 Parcels
- `POST /api/parcels` – Book a new parcel (customer only)  
- `GET /api/parcels` – Get parcels (based on user role: admin / agent / customer)  
- `PUT /api/parcels/:id` – Update parcel (status, assign agent, etc.)  
- `DELETE /api/parcels/:id` – Delete parcel (admin or owner only)   

---

## 📂 Folder Structure

```plaintext
COURIER-AND-PARCEL-MANAGEMENT-SYSTEM/
│
├── backend/                         
│   ├── controllers/                
│   │   ├── authController.js
│   │   ├── parcelController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── auth.js                 
│   │
│   ├── models/                     
│   │   ├── Counter.js
│   │   ├── Notification.js
│   │   ├── Parcel.js
│   │   └── User.js
│   │
│   ├── routes/                     
│   │   ├── authRoutes.js
│   │   ├── parcelRoutes.js
│   │   └── userRoute.js
│   │
│   ├── utils/
│   │   ├── db.js                   
│   │   └── sendEmail.js           
│   │
│   ├── .env                        
│   ├── app.js                      
│   ├── server.js                   
│   ├── package.json
│   ├── package-lock.json
│   └── test.js                     
│   
│
├── client/                         
│   ├── public/                     
│   ├── src/
│   │   ├── api/
│   │   │   ├── api.js             
│   │   │   └── socket.js          
│   │   │
│   │   ├── assets/               
│   │   │
│   │   ├── components/           
│   │   │   ├── Footer.jsx
│   │   │   └── Header.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx    
│   │   │
│   │   ├── hooks/
│   │   │   └── usePreviousLocation.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── TrackingHistory.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── MoreOptions.jsx
│   │   │   │   ├── ParcelControl.jsx
│   │   │   │   └── TrackingHistory.jsx
│   │   │   │
│   │   │   ├── agent/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── ParcelStateUpdate.jsx
│   │   │   │
│   │   │   └── customer/
│   │   │       ├── Alert.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── ParcelBooking.jsx
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vercel.json                
│   ├── vite.config.js
│   └── .gitignore
│
├── README.md
└── .gitignore
```
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