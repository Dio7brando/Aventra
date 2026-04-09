🌍 Aventra – Travel Listing Web App

Aventra is a full-stack web application inspired by Airbnb where users can explore, create, and review travel listings.


🚀 Features

- 🔐 User Authentication (Signup/Login/Logout)
- 🏡 Create, Edit & Delete Listings
- 📍 Add location, price, images, and description
- ⭐ Add and delete reviews with ratings
- 🧭 Category-based filtering (Mountains, Beaches, Rooms, etc.)
- 🔍 Search functionality
- 🗺️ Interactive map using Leaflet
- 💾 Persistent sessions using MongoDB Store


🛠️ Tech Stack

- Frontend: HTML, CSS, Bootstrap, EJS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: Passport.js
- Image Upload: Cloudinary + Multer
- Maps: Leaflet.js


📂 Project Structure

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


⚙️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/your-username/aventra.git
cd aventra


2️⃣ Install dependencies

npm install


3️⃣ Setup environment variables

Create a ".env" file in the root directory and add:

MONGODB_URL=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
SESSION_SECRET=your_secret


4️⃣ Initialize database

node init/index.js


5️⃣ Run the app

nodemon app.js


🌐 Usage

- Visit: "http://localhost:8080/listings"
- Signup/Login to create listings and reviews
- Explore listings by category or search


📸 Screenshots

Add your project screenshots here


🔮 Future Improvements

- ❤️ Wishlist feature
- 📱 Fully responsive UI
- 🌍 Location-based search
- ⭐ Average rating system
- 🚀 Deployment (Render / Vercel)


👨‍💻 Author

- Lakshya Tyagi


⭐ Show Your Support

If you like this project, give it a ⭐ on GitHub!
