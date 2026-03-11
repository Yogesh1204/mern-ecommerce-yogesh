import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function Product() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    addToCart(product, selectedSize || '', 1);
    alert('Added to cart');
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading product...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  if (!product) return <div style={{ padding: '20px' }}>Product not found</div>;

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '320px', height: '320px', objectFit: 'cover', borderRadius: '8px' }}
        />
      )}

      <div>
        <h1>{product.name}</h1>
        <p style={{ color: '#666' }}>{product.category}</p>
        <p style={{ marginTop: '8px' }}>{product.description}</p>
        <p style={{ marginTop: '16px', fontSize: '20px', fontWeight: 'bold' }}>₹{product.price}</p>

        {product.sizes && product.sizes.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <p>Select size:</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '16px',
                    border: selectedSize === size ? '2px solid #1976d2' : '1px solid #ccc',
                    backgroundColor: selectedSize === size ? '#1976d2' : '#fff',
                    color: selectedSize === size ? '#fff' : '#333',
                    cursor: 'pointer',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAddToCart}
          style={{
            marginTop: '24px',
            padding: '10px 20px',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;