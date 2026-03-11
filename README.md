# YogeshStore – MERN E‑Commerce 👕👟

Full‑stack e‑commerce web app built using the **MERN stack**:

- Product listing + filtering by category  
- Cart + Checkout (Cash on Delivery + Razorpay Online Payment – Test Mode)  
- Orders page  
- Basic Admin panel for viewing & updating orders  

---

## Features

### 🛍 Customer Side

- Browse products by category:
  - **T‑Shirts, Hoodies, Jeans, Shoes, Dresses, Pants**
- Product details page:
  - Image, name, category, price
  - Size selection
- **Cart**
  - Add to cart from product page
  - Increase / decrease quantity
  - Remove item / clear cart
  - Cart data saved in `localStorage` (page refresh pe bhi cart rahega)
- **Checkout**
  - Address form (name, email, phone, address, city, state, pincode)
  - Choose payment method:
    - **Cash on Delivery (COD)**
    - **Online (Razorpay – Test Mode)**
- **My Orders**
  - List of all placed orders
  - Shows payment method, payment status, order status, items

### 💳 Payments (Razorpay – Test Mode)

- Integrated **Razorpay Checkout** on frontend
- Backend APIs:
  - `POST /api/payments/razorpay/create-order`
  - `POST /api/payments/razorpay/verify`
- Uses HMAC SHA256 with `RAZORPAY_KEY_SECRET` to verify:
  - `razorpay_order_id`
  - `razorpay_payment_id`
  - `razorpay_signature`
- After successful verification:
  - Order is saved in MongoDB with:
    - `paymentMethod: "ONLINE"`
    - `paymentStatus: "PAID"`

### 🧑‍💻 Admin Side

- `/admin/orders` page:
  - View all orders:
    - Order ID
    - Customer name & phone
    - Total amount
    - Payment method & payment status
    - Order items
  - Update order **status**:
    - `PLACED`, `SHIPPED`, `DELIVERED`, `CANCELLED`

*(Currently no login – admin URL is known only to owner. Can be extended with authentication later.)*

---

## 🧱 Tech Stack

**Frontend**

- React (Vite)
- React Router
- Context API (for Cart)
- Razorpay Checkout JS SDK
- Custom CSS (responsive hero + product grid)

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- Razorpay Node SDK + `crypto`
- `dotenv`, `cors`, `nodemon`

---

## 📂 Project Structure

```bash
mern-ecommerce-yogesh/
  frontend/
    src/
      components/
        Navbar.jsx
        Footer.jsx
        ProductCard.jsx
      pages/
        Home.jsx
        Collection.jsx
        Product.jsx
        Cart.jsx
        Checkout.jsx
        Orders.jsx
        AdminOrders.jsx
      App.jsx
      main.jsx
      App.css
      index.css
    package.json
  backend/
    config/
      db.js
    models/
      Product.js
      Order.js
    routes/
      productRoutes.js
      orderRoutes.js
      paymentRoutes.js
    index.js
    package.json
  README.md
  .gitignore