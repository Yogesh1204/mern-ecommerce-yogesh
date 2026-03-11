const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Dev-only: seed some sample products
router.get('/seed', async (req, res) => {
  try {
    const sampleProducts = [
      // ========== T-SHIRTS ==========
      {
        name: 'Classic White T-Shirt',
        description: 'Soft cotton t-shirt with a regular fit.',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        price: 499,
        stock: 40,
      },
      {
        name: 'Black Graphic Tee',
        description: 'Black t-shirt with minimal graphic print.',
        image: 'https://images.pexels.com/photos/6311650/pexels-photo-6311650.jpeg',
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L', 'XL'],
        price: 599,
        stock: 35,
      },
      {
        name: 'Oversized Beige Tee',
        description: 'Oversized t-shirt in neutral beige color.',
        image: 'https://images.pexels.com/photos/7671165/pexels-photo-7671165.jpeg',
        category: 'T-Shirts',
        sizes: ['M', 'L', 'XL'],
        price: 699,
        stock: 30,
      },
      {
        name: 'Striped Casual T-Shirt',
        description: 'Casual striped tee for everyday wear.',
        image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
        category: 'T-Shirts',
        sizes: ['S', 'M', 'L'],
        price: 549,
        stock: 28,
      },

      // ========== HOODIES ==========
      {
        name: 'Black Oversized Hoodie',
        description: 'Cozy fleece hoodie with an oversized fit.',
        image: 'https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg',
        category: 'Hoodies',
        sizes: ['M', 'L', 'XL'],
        price: 1199,
        stock: 30,
      },
      {
        name: 'Grey Zip-Up Hoodie',
        description: 'Lightweight zip-up hoodie for layering.',
        image: 'https://images.pexels.com/photos/7671164/pexels-photo-7671164.jpeg',
        category: 'Hoodies',
        sizes: ['S', 'M', 'L', 'XL'],
        price: 1299,
        stock: 25,
      },
      {
        name: 'Maroon Pullover Hoodie',
        description: 'Warm pullover hoodie with kangaroo pocket.',
        image: 'https://images.pexels.com/photos/6311577/pexels-photo-6311577.jpeg',
        category: 'Hoodies',
        sizes: ['M', 'L'],
        price: 1399,
        stock: 22,
      },
      {
        name: 'Beige Minimal Hoodie',
        description: 'Minimal design hoodie in beige tone.',
        image: 'https://images.pexels.com/photos/7671162/pexels-photo-7671162.jpeg',
        category: 'Hoodies',
        sizes: ['S', 'M', 'L'],
        price: 1299,
        stock: 20,
      },

      // ========== JEANS ==========
      {
        name: 'Blue Slim-Fit Jeans',
        description: 'Stretchable denim jeans with a slim fit.',
        image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg',
        category: 'Jeans',
        sizes: ['30', '32', '34', '36'],
        price: 1599,
        stock: 40,
      },
      {
        name: 'Black Skinny Jeans',
        description: 'Black skinny fit jeans for a sharp look.',
        image: 'https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg',
        category: 'Jeans',
        sizes: ['28', '30', '32', '34'],
        price: 1699,
        stock: 32,
      },
      {
        name: 'Light Wash Relaxed Jeans',
        description: 'Relaxed fit jeans in light blue wash.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
        category: 'Jeans',
        sizes: ['30', '32', '34', '36'],
        price: 1499,
        stock: 30,
      },
      {
        name: 'Ripped Denim Jeans',
        description: 'Trendy ripped denim jeans.',
        image: 'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg',
        category: 'Jeans',
        sizes: ['30', '32', '34'],
        price: 1799,
        stock: 24,
      },

      // ========== SHOES ==========
      {
        name: 'Running Sneakers',
        description: 'Lightweight sneakers for running and casual outings.',
        image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
        category: 'Shoes',
        sizes: ['7', '8', '9', '10'],
        price: 2499,
        stock: 25,
      },
      {
        name: 'White Low-Top Sneakers',
        description: 'Classic white sneakers for everyday style.',
        image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
        category: 'Shoes',
        sizes: ['6', '7', '8', '9', '10'],
        price: 2299,
        stock: 28,
      },
      {
        name: 'High-Top Canvas Shoes',
        description: 'Casual high-top canvas sneakers.',
        image: 'https://images.pexels.com/photos/2529150/pexels-photo-2529150.jpeg',
        category: 'Shoes',
        sizes: ['7', '8', '9'],
        price: 1999,
        stock: 20,
      },
      {
        name: 'Black Running Shoes',
        description: 'Breathable running shoes with cushioned sole.',
        image: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg',
        category: 'Shoes',
        sizes: ['7', '8', '9', '10'],
        price: 2599,
        stock: 22,
      },

      // ========== DRESSES ==========
      {
        name: 'Red Summer Dress',
        description: 'Flowy cotton dress perfect for the summer season.',
        image: 'https://images.pexels.com/photos/1488313/pexels-photo-1488313.jpeg',
        category: 'Dresses',
        sizes: ['S', 'M', 'L'],
        price: 1799,
        stock: 20,
      },
      {
        name: 'Floral Midi Dress',
        description: 'Floral printed midi dress for outings.',
        image: 'https://images.pexels.com/photos/6311587/pexels-photo-6311587.jpeg',
        category: 'Dresses',
        sizes: ['S', 'M', 'L'],
        price: 1899,
        stock: 18,
      },
      {
        name: 'Black Evening Dress',
        description: 'Elegant black evening dress.',
        image: 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg',
        category: 'Dresses',
        sizes: ['S', 'M', 'L'],
        price: 2199,
        stock: 15,
      },
      {
        name: 'Beige Shirt Dress',
        description: 'Casual shirt dress in beige color.',
        image: 'https://images.pexels.com/photos/7671163/pexels-photo-7671163.jpeg',
        category: 'Dresses',
        sizes: ['S', 'M', 'L'],
        price: 1699,
        stock: 20,
      },

      // ========== PANTS ==========
      {
        name: 'Beige Chinos',
        description: 'Smart casual chinos for office and weekends.',
        image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
        category: 'Pants',
        sizes: ['30', '32', '34', '36'],
        price: 1399,
        stock: 35,
      },
      {
        name: 'Black Formal Trousers',
        description: 'Slim-fit black trousers for formal occasions.',
        image: 'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg',
        category: 'Pants',
        sizes: ['30', '32', '34', '36'],
        price: 1499,
        stock: 28,
      },
      {
        name: 'Olive Cargo Pants',
        description: 'Utility cargo pants with multiple pockets.',
        image: 'https://images.pexels.com/photos/6995702/pexels-photo-6995702.jpeg',
        category: 'Pants',
        sizes: ['30', '32', '34'],
        price: 1599,
        stock: 22,
      },
      {
        name: 'Grey Jogger Pants',
        description: 'Comfortable joggers for everyday use.',
        image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=800&q=80',
        category: 'Pants',
        sizes: ['S', 'M', 'L', 'XL'],
        price: 1299,
        stock: 26,
      },
    ];

    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);

    res.json({ message: 'Sample products seeded', count: sampleProducts.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Seeding failed' });
  }
});

// GET /api/products  → list all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// GET /api/products/:id  -> get single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch product' });
  }
});

module.exports = router;