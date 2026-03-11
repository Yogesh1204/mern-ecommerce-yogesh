import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API_BASE_URL = 'http://localhost:5000';

function Collection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // URL se category read karna
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
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

  // jab bhi URL ki category change ho (footer se click), state update karo
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) return <div className="page-container">Loading products...</div>;
  if (error)
    return (
      <div className="page-container" style={{ color: 'red' }}>
        {error}
      </div>
    );

  return (
    <div className="page-container">
      <h1 className="page-title">Collection</h1>

      {/* Category filter buttons */}
      <div
        style={{
          margin: '16px 0',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '6px 12px',
              borderRadius: '16px',
              border: selectedCategory === cat ? '2px solid #1976d2' : '1px solid #ccc',
              backgroundColor: selectedCategory === cat ? '#1976d2' : '#fff',
              color: selectedCategory === cat ? '#fff' : '#333',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products grid */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Collection;