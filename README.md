# YalaRythms 🎵

YalaRythms is a modern e-commerce platform for buying and selling musical instruments.  
Built with the MERN stack, it features a secure authentication system, a beautiful UI, and a scalable architecture.

---

## 🚀 Tech Stack

- **Frontend:** [Next.js (App Router)](https://nextjs.org/), [shadcn/ui](https://ui.shadcn.com/), [Axios](https://axios-http.com/)
- **Backend:** [Express.js](https://expressjs.com/), [Mongoose](https://mongoosejs.com/), [bcrypt](https://www.npmjs.com/package/bcrypt), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- **Database:** [MongoDB](https://www.mongodb.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)

---

## 📦 Project Structure

```
Yala_Rythms/
├── client/      # Next.js frontend
│   └── src/
│       └── app/
│           ├── login/
│           └── register/
├── server/      # Express backend
│   └── src/
│       ├── model/
│       └── route/
└── README.md
```

---

## 🗂️ Project Phases

### **Phase 1: Project Setup**
- [x] Initialize Next.js frontend and Express backend
- [x] Configure MongoDB with Mongoose
- [x] Set up Tailwind CSS and shadcn/ui for UI components

### **Phase 2: Authentication (Completed)**
- [x] User registration with hashed passwords (bcrypt)
- [x] User login with JWT authentication
- [x] Frontend forms for login and registration
- [x] Error handling and toast notifications
- [x] Responsive UI for authentication pages

### **Phase 3: Product Management**
- [ ] Product schema and API endpoints
- [ ] Product listing and detail pages
- [ ] Image upload and management

### **Phase 4: E-commerce Features**
- [ ] Shopping cart and checkout
- [ ] Order management
- [ ] User dashboard

### **Phase 5: Polish & Deployment**
- [ ] Responsive design improvements
- [ ] Security enhancements
- [ ] Deployment to production

---

## ✨ Features Implemented

- Secure user registration and login
- Passwords hashed with bcrypt
- JWT-based authentication
- Modern, accessible UI with shadcn/ui and Tailwind CSS
- Error and success feedback with toast notifications

---

## 🛠️ Getting Started

### **1. Clone the repository**
```bash
git clone https://github.com/yourusername/Yala_Rythms.git
cd Yala_Rythms
```

### **2. Install dependencies**
```bash
# In /client
cd client
npm install

# In /server
cd ../server
npm install
```

### **3. Environment Variables**

Create a `.env` file in `/server` with your MongoDB URI and JWT secret:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### **4. Run the app**

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

---

## 📋 Next Steps

- Complete product CRUD and display
- Implement cart and order features
- Add user profile and dashboard

---

## 📄 License

MIT

---

**YalaRythms** — Your one-stop shop for musical instruments!
