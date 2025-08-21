# 🏷️ Online Auction Platform

An online auction system where users can register, list items for sale, place bids, and receive notifications.  
This project is built collaboratively with separate feature branches (auth, bidding, items, notifications, payments).  

---

## 🚀 Features
- User Authentication (Register, Login, JWT)
- Item Listing & Auctions
- Bidding System
- Payment Integration
- Notifications & Audit Logging

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas or local)
- **Auth**: JWT
- **Package Manager**: npm

---

## 📂 Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/<your-org-or-username>/Online-auction-platform.git
cd Online-auction-platform
````

### 2. Install Dependencies

Make sure you have **Node.js (>= 16)** and **npm** installed. Then run:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the project root based on `.env.example` (if provided). Example:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/auction
JWT_SECRET=your_jwt_secret
```

⚠️ Do **not** commit your `.env` file.

### 4. Run the Server

Start the backend in development mode:

```bash
npm run dev
```

Or normal mode:

```bash
npm start
```

The server will run at:

```
http://localhost:5000
```

---

## 📬 API Testing (Postman)

Each feature exposes REST endpoints. Import the `postman_collection.json` (if provided) into Postman and test:

* `POST /api/auth/register` → Register a user
* `POST /api/auth/login` → Login & get token
* `POST /api/items` → Add auction item
* `POST /api/bid/:itemId` → Place bid
* `POST /api/payments` → Payment processing
* `GET /api/notifications` → Fetch notifications

---

## 👨‍💻 Contributing Workflow

1. Create a feature branch:

   ```bash
   git checkout -b feature/<your-feature>
   ```
2. Test your changes with Postman before committing.
3. Push to your branch:

   ```bash
   git push origin feature/<your-feature>
   ```
4. Open a Pull Request → reviewed by team lead → merged into `main`.

---

## ⚠️ Notes

* `node_modules/` and `.env` are ignored (see `.gitignore`).
* Do **not** commit `package-lock.json` to avoid merge conflicts.
* Always run `npm install` after pulling new changes.

---

## 📜 License

This project is licensed under the MIT License.

```
```
