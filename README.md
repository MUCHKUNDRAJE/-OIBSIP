# 🍕 PizzaHunt

**PizzaHunt** is a full-stack web application that lets users create and order custom pizzas while providing an admin dashboard for managing inventory and order status. Developed as part of an internship with **OASIS Infobyte**, this project demonstrates a seamless user experience and efficient backend management.

![User Dashboard](image/pp.png "User Dashboard")
---

## 🎯 Project Overview

### User Features:
1. **Authentication System:**
   - User registration and login.
   - 
 ![User Dashboard](image/register.png "User Dashboard")

   - Email verification during sign-up.
   - 
      ![User Dashboard](image/otp.png "User Dashboard")
     
       ![User Dashboard](image/otpemail.png "User Dashboard")
   - Forgot Password functionality for secure recovery.
     
2.**User Interface:**

   ![User Dashboard](image/user.png "User Dashboard")
![Demo of the feature](image/vedio1.gif)



3. **Interactive Pizza Creation Flow:**
   - Choose a pizza base from 5 options.
   - Select a sauce from 5 available choices.
   - Pick your preferred cheese.
   - Add veggies and customize with multiple options.
   ![User Dashboard](image/custom.png "User Dashboard")

4. **Order Placement:**
   - Integrated Razorpay for payment processing in test mode.
   - Simulated checkout system to place and confirm orders.

5. **Order Tracking:**
   - Real-time order status updates, including:
     - Order Received.
     - In the Kitchen.
     - Sent for Delivery.

---

### Admin Features:
1. **Inventory Management:**
   - Track available stocks of pizza bases, sauces, cheese, veggies, and meats.
   - Automated stock updates after order placement.
    ![Demo of the feature](image/vedio2.gif)
  ![Demo of the feature](image/vedio3.gif)


2. **Stock Monitoring:**
   - Email notifications triggered when stock levels drop below threshold (e.g., pizza base < 20).
     
        ![User Dashboard](image/alert.png "User Dashboard")

3. **Order Control:**
   - View and manage orders.
   - Update order statuses with changes reflected in the user dashboard.

---

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Integration:** Razorpay (Test Mode)

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system.
- MongoDB set up locally or via a cloud service (e.g., MongoDB Atlas).

### Installation Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/PizzaHunt.git
   cd PizzaHunt

