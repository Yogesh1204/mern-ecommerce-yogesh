import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import bannerImg from '../assets/banner.jpg'; // yahan apni file ka naam use karo

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="page-container">Loading products...</div>;
  }

  if (error) {
    return (
      <div className="page-container" style={{ color: 'red' }}>
        {error}
      </div>
    );
  }

  // Featured products: first 8
  const featured = products.slice(0, 8);

  return (
    <div className="page-container">
      {/* HERO BANNER */}
      <div className="hero">
        <img src={bannerImg} alt="Yogesh Store banner" />
        <div className="hero-content">
          <h2>New Season, New Style</h2>
          <p>T‑shirts, hoodies, jeans & sneakers curated for daily comfort.</p>
          <button onClick={() => (window.location.href = '/collection')}>
            Shop Collection
          </button>
        </div>
      </div>

      {/* Featured products */}
      <h2 className="page-title">Featured Products</h2>
      <p className="page-subtitle">Handpicked styles just for you</p>

      <div className="product-grid">
        {featured.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;