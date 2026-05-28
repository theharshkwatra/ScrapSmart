# ♻️ ScrapSmart

**ScrapSmart** is a smart, modern, and interactive waste management and recycling ecosystem designed to seamlessly connect households and businesses (users) with local waste collectors. By making scrap collection efficient, accessible, and transparent, ScrapSmart empowers individuals to recycle systematically while helping collectors find and organize jobs dynamically.

The application features a gorgeous modern user interface styled with **glassmorphism**, dynamic dark-themed components, premium layouts, and detailed analytical tracking built on top of a highly performant and secure MERN-based architectural backend.

---

## 🚀 Key Features

### 👤 For Users (Scrap Generators)
* **Interactive Pickup Scheduling:** Schedule a new scrap pickup by selecting specific dates, pre-defined time-slots (`9am-12pm`, `12pm-3pm`, `3pm-6pm`), estimated weights, and full pickup addresses.
* **Flexible Booking Management:** Edit or cancel bookings dynamically, modify scrap types (add/remove item categories) on active orders, and view comprehensive order summaries.
* **Analytics Dashboard:** Track personal recycling metrics, total weight recycled, and view monthly trends via aggregated analytical data.

### 🚛 For Waste Collectors (Scrap Pickers)
* **Real-time Job Board:** Browse a dynamic list of pending/available collections, sorted chronologically and prioritized.
* **Job Acceptance & Management:** Accept pickup jobs with a single click, moving bookings to `assigned` status, and view detailed addresses and scheduled times for current routes.
* **Collection Logs & Status Updates:** Update booking status to `completed` in one click when scrap is collected, automatically updating overall logs and stats.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
* **React.js (v19):** Declarative component-driven client-side application.
* **Vite:** Next-generation frontend build tool for instant hot-reloads and lightning-fast bundles.
* **React Router DOM (v7):** Clean, robust client-side multi-page routing.
* **React Icons:** Sleek, lightweight, and modern typography icons.
* **Vanilla CSS:** Full responsive layouts, clean fluid typography (Inter font family), glassmorphic card overlays, custom gradients, and micro-interactive hover transitions.

### **Backend**
* **Node.js & Express.js (v5):** Robust API routing middleware, secure auth controllers, and clean MVC structure.
* **MongoDB:** Fully flexible, scalable NoSQL document database.
* **Mongoose:** High-level schema definition, validation, and object modeling tool.
* **JSON Web Tokens (JWT):** Stateless token-based user authentication and secure headers.
* **BCrypt.js:** Hardware-optimized salt-rounds password hashing for backend user credentials.
* **Joi:** Request body Schema validation protecting endpoints against dirty or malicious input.

---

## 📁 Repository Structure

```text
ScrapSmart/
├── Frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI elements (Navbar, Cards, etc.)
│   │   ├── Pages/           # Application views (HomePage, Dashboards, Auth, Booking forms)
│   │   ├── assets/          # Image assets, SVG elements
│   │   ├── App.jsx          # Route declarations
│   │   ├── index.css        # Base theme, typography, & global CSS styles
│   │   └── main.jsx         # App mounting point
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── src/
│   │   ├── config/          # DB connections and collection initializations
│   │   ├── controllers/     # API logic handling bookings and auth
│   │   ├── middleware/      # Auth protectors and error handlings
│   │   └── routes/          # Express route boundaries (authRoutes, bookingRoutes)
│   ├── server.js            # Entry point for backend Express engine
│   └── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### **Prerequisites**
* [Node.js](https://nodejs.org/en/) installed locally (v18+ recommended)
* [MongoDB Community Server](https://www.mongodb.com/try/download/community) installed and running locally on port `27017` (or an active MongoDB Atlas cluster URI)

---

### **1. Backend Setup**

1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install required dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `Backend/` directory and configure the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/
   MONGO_DB_NAME=scrapsmart
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   JWT_EXPIRE=7d
   ```
4. Run the database configuration script to initialize system collections and indexes:
   ```bash
   npm run setup-db
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start running on* `http://localhost:5000`

---

### **2. Frontend Setup**

1. Open a new terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install required dependencies:
   ```bash
   npm install
   ```
3. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   *Open your browser and navigate to the local URL provided (usually* `http://localhost:5173`*)*

---

## 🔌 API Endpoints Reference

### **Authentication**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/register` | Register a new User or Collector account | No |
| `POST` | `/api/auth/login` | Login to an existing account and fetch JWT | No |
| `GET` | `/api/auth/me` | Fetch detailed profile data for the active user | Yes |

### **Bookings & Collections**
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/bookings` | Create a new scrap pickup reservation | Yes |
| `GET` | `/api/bookings` | Fetch all bookings generated by the active user | Yes |
| `GET` | `/api/bookings/:id` | Fetch specific booking details by ObjectId | Yes |
| `PUT` | `/api/bookings/:id` | Update scheduled details on active bookings | Yes |
| `DELETE` | `/api/bookings/:id` | Cancel/Delete a booking (if status is not completed) | Yes |
| `PUT` | `/api/bookings/:id/scrap/add` | Append new scrap types to the pickup item list | Yes |
| `PUT` | `/api/bookings/:id/scrap/remove` | Pull specific scrap types from the pickup list | Yes |
| `GET` | `/api/bookings/available` | Browse active bookings available for collection | Yes (Collector) |
| `PUT` | `/api/bookings/:id/accept` | Accept a pickup booking (sets status to `assigned`) | Yes (Collector) |
| `PUT` | `/api/bookings/:id/complete` | Close out a collection (sets status to `completed`) | Yes (Collector) |
| `GET` | `/api/bookings/stats` | Aggregate total booking statistics and calculations | Yes |
| `GET` | `/api/bookings/trends/:year` | Extract monthly pickup weights and frequencies | Yes |

---

## 🌟 Future Roadmap
* 🗺️ **GPS Mapping:** Integrated routing API (e.g., Mapbox or Google Maps) to compute optimized driving paths for waste collectors.
* 🎫 **Reward Points System:** Gamified user recycling with points redeemable for discounts or green gift tokens.
* 💬 **Real-time Notifications:** Automated SMS and email alerts notifying users as soon as a collector accepts their booking or approaches their address.
