# Hotel Booking System – Full Stack Web Application

## 📌 Project Overview
This is a **full-stack hotel booking system** built as part of a **Frontend Developer Intern assignment**.  
The application supports **user authentication, role-based access, protected dashboards**, and **complete CRUD operations** through a modern and scalable architecture.

The system allows normal users to book hotels and manage their profiles, while admins can manage the entire platform through a dedicated admin panel.

---

## 🚀 Tech Stack

### Frontend
- React.js (Create React App)
- React Router
- Axios
- Tailwind CSS / Bootstrap 
- JWT-based authentication
- Role-based protected routes

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt (Password hashing)
- RESTful APIs

### Database
- MongoDB (Mongoose)

---

## 🔐 Authentication & Roles

### User Roles
- **User**
- **Admin** (role-based access control)

### Authentication Features
- User registration & login
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes (user dashboard & admin panel)
- Secure logout flow

---

## 👤 User Features

- Register & Login
- View and update user profile
- Browse available hotels
- Book hotels
- View booking history
- Secure access to personal dashboard

---

## 🛠️ Admin Panel Features

Admins have access to a dedicated admin dashboard with full control:

- User Management (view, update, delete users)
- Hotel Management (add, edit, delete hotels)
- Booking Management (view & manage all bookings)
- Role Management (add & assign roles)
- Blog Management (create, update, delete blogs)
- Dashboard analytics (basic)

---

## 📂 Project Structure

hotel-booking-system/
│
├── client/ # React frontend
├── server/ # Node.js backend
├── logs/ # Application log files
├── README.md
└── package.json

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
▶️ How to Run the Project Locally
1️⃣ Clone the repository
bash
Copy code
git clone https://github.com/your-username/hotel-booking-system.git
cd hotel-booking-system
2️⃣ Run Backend
bash
Copy code
cd server
npm install
npm start
3️⃣ Run Frontend
bash
Copy code
cd client
npm install
npm start
Frontend: http://localhost:3000

Backend: http://localhost:5000

🔗 API Endpoints (Sample)
Auth
POST /api/auth/register

POST /api/auth/login

User
GET /api/users/profile

PUT /api/users/profile

Hotels
GET /api/hotels

POST /api/hotels (Admin)

PUT /api/hotels/:id (Admin)

DELETE /api/hotels/:id (Admin)

Bookings
POST /api/bookings

GET /api/bookings/user

GET /api/bookings/all (Admin)

Blogs (Admin)
POST /api/blogs

PUT /api/blogs/:id

DELETE /api/blogs/:id

Postman collection / API documentation is included in the repository.

📊 Logs
Sample log files are provided in the /logs directory for:

Authentication events

Booking actions

API errors & requests