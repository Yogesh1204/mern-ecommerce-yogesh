import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h3>YogeshStore</h3>
          <p>Everyday clothing for your daily comfort.</p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li>
              <Link to="/collection">All Products</Link>
            </li>
            <li>
              <Link to="/collection?category=T-Shirts">T‑Shirts</Link>
            </li>
            <li>
              <Link to="/collection?category=Hoodies">Hoodies</Link>
            </li>
            <li>
              <Link to="/collection?category=Jeans">Jeans</Link>
            </li>
            <li>
              <Link to="/collection?category=Shoes">Shoes</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="mailto:support@yogeshstore.com">
                support@yogeshstore.com
              </a>
            </li>
            <li>
              <a href="tel:+911234567890">+91 12345 67890</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Follow us</h4>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} YogeshStore. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;