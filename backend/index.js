const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');



const app = express();

// connect to MongoDB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});