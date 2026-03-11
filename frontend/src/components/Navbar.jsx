import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../context/CartContext';

function Navbar() {
  const location = useLocation();
  const { getItemCount } = useCart();
  const cartCount = getItemCount();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">Yogesh Store</Link>
      </div>

      <ul className="nav-links">
        <li className={isActive('/') ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={isActive('/collection') ? 'active' : ''}>
          <Link to="/collection">Collection</Link>
        </li>
        <li className={isActive('/orders') ? 'active' : ''}>
          <Link to="/orders">My Orders</Link>
        </li>
      </ul>

      <div className="nav-actions">
        <Link to="/cart" className="nav-link">
          Cart{cartCount > 0 ? ` (${cartCount})` : ''}
        </Link>
        <Link to="/login" className="btn-login">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;