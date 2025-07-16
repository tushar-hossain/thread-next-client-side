# 🗣️ Forum Frontend

A fully functional **Forum web application frontend** developed using **React**, styled with **Tailwind CSS** and **DaisyUI**. This application supports user authentication, post creation, voting, comments, membership system, admin functionalities, and more.

## 🚀 Live Demo

👉 [View Live Site](https://thread-nest-2b0d5.web.app/)

---

## 🚀 Features

- ✅ User Registration & Login (with social login)
- 📝 Create, View and Delete Posts
- 💬 Add and View Comments
- 👍 Upvote / 👎 Downvote Posts
- 🔄 Sort Posts by Newest or Popularity
- 🔍 Search Posts by Tags
- 🏅 Membership System with Gold Badge
- 🔒 Private Routes for Dashboard
- 🛎️ Announcement Notifications

---

## 🛠️ Tech Stack

- ⚛️ React.js
- 🔁 React Router DOM
- 🎨 Tailwind CSS + DaisyUI
- 📦 TanStack Query
- 📝 React Hook Form
- 🔐 Axios + useAxiosSecure
- 📊 Recharts (Pie Chart)
- 🏷️ React Select
- 📤 React Share
- 🔔 React Toastify + sweetalert2
- 🔑 Firebase Authentication
- 💳 Stripe Integration for Payments

---

## 🔐 Authentication

- 🔑 Firebase Authentication (Email/Password + Google)
- 🌐 React Context for global auth state
- 🔒 `useAxiosSecure` for protected API requests

---

## 📝 Posts

- 🧑 Users can create posts (up to 5 for free users)
- 🏅 Members (Gold badge) can post unlimited
- 📌 Posts include:
  - Author info
  - Title & Description
  - Tags
  - Votes & Comments
- 🔄 Sort by: **Newest | Popular**
- 📄 Pagination: **5 posts per page**

---

## 🔍 Search

- 🔎 Search by Tags (with backend filtering)
- 📋 Results displayed below banner section

---

## 💬 Comments

- 📝 Add comments to any post
- 🚩 Report inappropriate comments
- 👮 Admin reviews and moderates reported comments

---

## 🚜 Membership

- 💳 Stripe-based payment system
- 🥇 Paid users receive **Gold badge**
- 🔐 Unlock advanced features like unlimited posting

---

## 👨‍💼 Admin Dashboard

- 👤 View profile and analytics (Posts, Users, Comments)
- 🏷️ Add tags (used in post creation)
- 👥 Manage all users (role, membership)
- 🚨 Moderate reported comments
- 📣 Create global announcements

---

## 📊 Analytics

Admin dashboard includes:

- 📈 Pie Chart with:
  - Total Posts
  - Total Comments
  - Total Users

---

## 📄 Additional Pages

- ❓ FAQs
- 📃 Privacy Policy
- 📜 Terms of Service

---

## ⚖️ Badge System

- 🥉 Bronze Badge: Registered user
- 🥇 Gold Badge: Paid member

---

## 📖 Environment Setup

Create a `.env` file in the root directory and add:
VITE_API_BASE_URL=your_backend_api_url
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
...

---

<!-- ## 🧪 Run Locally

```
git clone https://github.com/your-username/forum-frontend.git
cd forum-frontend
npm install
npm run dev
``` -->

## ✨ Contribution

Pull requests are welcome. For major changes, please open an issue first to discuss the change.

## ✉️ Contact

For any questions or feedback, reach out via email at [tusharsu97@gmail.com] or open an issue in this repository.
