import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer';
import Home from './pages/Home.jsx';
import Collection from './pages/Collection.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import Orders from './pages/Orders.jsx';
import Product from './pages/Product.jsx';
import Checkout from './pages/Checkout.jsx';
import AdminOrders from './pages/AdminOrders.jsx';



function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;