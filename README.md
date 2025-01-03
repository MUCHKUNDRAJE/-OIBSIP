# 🍕 PizzaHunt

**PizzaHunt** is a full-stack web application that lets users create and order custom pizzas while providing an admin dashboard for managing inventory and order status. Developed as part of an internship with **OASIS Infobyte**, this project demonstrates a seamless user experience and efficient backend management.

![User Dashboard](image/pp.png "Logo")
---

## 🎯 Project Overview

### User Features:
1. **Authentication System:**
   - User registration and login.
   - 
 ![User Dashboard](image/register.png "Registration page")

   - Email verification during sign-up.
   - 
      ![User Dashboard](image/otp.png "Otp")
     
       ![User Dashboard](image/otpemail.png " Mail ")
   - Forgot Password functionality for secure recovery.
     
2.**User Interface:**

   ![User Dashboard](image/user.png "User Dashboard")
   
![Demo of the feature](image/vedio1.gif)



3. **Interactive Pizza Creation Flow:**
   - Choose a pizza base from 5 options.
   - Select a sauce from 5 available choices.
   - Pick your preferred cheese.
   - Add veggies and customize with multiple options.
   ![User Dashboard](image/custom.png "Custom Dashboard")

4. **Order Placement:**

      ![User Dashboard](image/Payment.png "Razorpay Dashboard")
   - Integrated Razorpay for payment processing in test mode.
   - Simulated checkout system to place and confirm orders.

5. **Order Tracking:**
   - Real-time order status updates, including:
     - Order Received.
     - In the Kitchen.
     - Sent for Delivery.

---

### Admin Features:

1. **Admin Interface:**
   
     ![User Dashboard](image/admin.png "User Dashboard")
2. **Inventory Management:**
   - Track available stocks of pizza bases, sauces, cheese, veggies, and meats.
   - Automated stock updates after order placement.
   

   ![Demo of the feature](image/vedio2.gif)
   ![Demo of the feature](image/vedio3.gif)


3. **Stock Monitoring:**
   - Email notifications triggered when stock levels drop below threshold (e.g., pizza base < 20).
     
        ![User Dashboard](image/alert.png "alert mail")

4. **Order Control:**
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
- MongoDB set up locally ( MongoDB Compass).



