# 🌍 Aventra – Travel Listing Web App

Aventra is a full-stack travel listing platform inspired by Airbnb where users can explore, create, and review travel destinations and stays.

---

# 🚀 Features

- 🔐 User Authentication (Signup / Login / Logout)
- 🏡 Create, Edit & Delete Listings
- 📍 Add location, price, images, and descriptions
- ⭐ Add & delete reviews with ratings
- 🧭 Category-based filtering (Mountains, Beaches, Rooms, etc.)
- 🔍 Search functionality
- 🗺️ Interactive maps using Leaflet
- 💾 Persistent sessions with MongoDB Store

---

# 🛠️ Tech Stack

## 🎨 Frontend
- HTML
- CSS
- Bootstrap
- EJS

## ⚙️ Backend
- Node.js
- Express.js

## 🗄️ Database
- MongoDB Atlas

## 🔐 Authentication
- Passport.js

## ☁️ Image Upload
- Cloudinary
- Multer

## 🗺️ Maps
- Leaflet.js

---

# 📂 Project Structure

```bash
.
├── models/
├── routes/
├── controllers/
├── views/
├── public/
├── init/
├── utils/
├── app.js
└── .env
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/aventra.git
cd aventra
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Setup Environment Variables

Create a `.env` file in the root directory and add:

```env
MONGODB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
SESSION_SECRET=your_secret
```

---

## 4️⃣ Initialize Database

```bash
node init/index.js
```

---

## 5️⃣ Run the App

```bash
nodemon app.js
```

---

# 🌐 Usage

## 🚀 Live Demo

👉 https://aventra-d7vv.onrender.com/listings

- Signup/Login to create listings and reviews
- Explore listings by category
- Search destinations and stays

---

# 📸 Screenshots

Add your project screenshots here.

---

# 🔮 Future Improvements

- ❤️ Wishlist feature
- 📱 Fully responsive UI
- 🌍 Location-based search
- ⭐ Average rating system
- 🚀 Better deployment optimization

---

# 👨‍💻 Author

## Lakshya Tyagi

---

# ⭐ Show Your Support

If you like this project, consider giving it a ⭐ on GitHub.
