# Note App (MERN Stack)

A full-stack **MERN (MongoDB, Express.js, React, Node.js)** based Note-Taking application built using **Gemini CLI** for experimentation and development flow improvements. This project allows users to register, log in, create notes, update notes, delete notes, and maintain secure access using **JWT authentication**.

---

## 🚀 Features
### **🔐 Authentication System**
- User Signup
- User Login
- Password Hashing
- Secure JWT-based Authentication
- Protected Routes

### **📝 Note Management**
- Create Notes
- Edit Notes
- Delete Notes
- Fetch all notes for authenticated users

### **⚛️ Frontend (React)**
- React functional components
- React Router for navigation
- Fetch API / Axios for API calls
- Token handling using LocalStorage
- Clean UI for notes listing and creation

### **🖥️ Backend (Express.js + MongoDB)**
- REST API built with Express.js
- MongoDB database using Mongoose
- Middleware-based token validation
- ENV-based configuration

---

## 🧩 Tech Stack
### **Frontend:**
- React.js
- React Router Dom
- CSS / Tailwind
- Axios

### **Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Token)
- bcrypt (for password hashing)

### **Development:**
- Gemini CLI used for exploration, prompts, and code assistance

---



## ⚙️ Installation

### **Clone the Repository**
```
git clone https://github.com/imarifluqman/note-app-gemini-cli.git
cd note-app-gemini-cli
```

---

## ▶️ Backend Setup
```
cd backend
npm install
```

### **Create a .env file**
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### **Run Backend Server**
```
npm start
```

---

## 💻 Frontend Setup
```
cd frontend
npm install
npm run dev
```
The frontend will run on: **http://localhost:5173**

---

## 🔑 Authentication Flow
1. User registers → backend hashes password → stores in MongoDB
2. User logs in → backend validates credentials
3. Backend returns JWT token
4. Frontend stores token in localStorage
5. Protected routes require JWT verification

---

## 📦 API Endpoints
### **Auth Routes**
```
POST /api/auth/signup
POST /api/auth/login
```
### **Note Routes (Protected)**
```
GET    /api/notes
POST   /api/notes
PUT    /api/notes/:id
DELETE /api/notes/:id
```

---

## 🛠️ Future Enhancements
- Add user profile page
- Add note categories & tags
- Dark mode UI


---

## 🤝 Contributing
Feel free to submit issues or pull requests.

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

## ⭐ Show Support
If you like this project, give it a **star** ⭐ on GitHub!
