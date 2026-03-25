import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- Mock Data ---
  const CATEGORIES = [
    { id: 1, name: 'Pizza', icon: '🍕' },
    { id: 2, name: 'Burger', icon: '🍔' },
    { id: 3, name: 'Sushi', icon: '🍣' },
    { id: 4, name: 'Pasta', icon: '🍝' },
    { id: 5, name: 'Salad', icon: '🥗' },
    { id: 6, name: 'Dessert', icon: '🍰' },
    { id: 7, name: 'Tacos', icon: '🌮' },
    { id: 8, name: 'Coffee', icon: '☕' },
  ];

  const RESTAURANTS = [
    {
      id: 1,
      name: "The Pizza Hub",
      cuisine: "Italian • Pizza",
      rating: 4.8,
      deliveryTime: "20-30 min",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
      isFeatured: true,
      costForTwo: 6.0
    },
    {
      id: 2,
      name: "Burger Kingly",
      cuisine: "American • Burgers",
      rating: 4.5,
      deliveryTime: "15-25 min",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=800",
      costForTwo: 4.8
    },
    {
      id: 3,
      name: "Sushi Zen",
      cuisine: "Japanese • Sushi",
      rating: 4.9,
      deliveryTime: "30-45 min",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800",
      isFeatured: true,
      costForTwo: 12.0
    },
    {
      id: 4,
      name: "Taco Fiesta",
      cuisine: "Mexican • Tacos",
      rating: 4.6,
      deliveryTime: "20-35 min",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=800",
      costForTwo: 5.5
    },
    {
      id: 5,
      name: "Green Garden",
      cuisine: "Healthy • Salads",
      rating: 4.7,
      deliveryTime: "15-20 min",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800",
      costForTwo: 7.2
    },
    {
      id: 6,
      name: "Pasta Palace",
      cuisine: "Italian • Pasta",
      rating: 4.4,
      deliveryTime: "25-40 min",
      image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&q=80&w=800",
      costForTwo: 8.4
    }
  ];

  // --- API Routes ---
  app.get('/api/categories', (req, res) => {
    res.json(CATEGORIES);
  });

  app.get('/api/restaurants', (req, res) => {
    res.json(RESTAURANTS);
  });

  app.get('/api/search', (req, res) => {
    const query = (req.query.q as string || '').toLowerCase();
    if (!query) {
      return res.json([]);
    }
    const results = RESTAURANTS.filter(r => 
      r.name.toLowerCase().includes(query) || 
      r.cuisine.toLowerCase().includes(query)
    );
    res.json(results);
  });

  app.post('/api/order', (req, res) => {
    const { items, address } = req.body;
    console.log('Order received:', { items, address });
    res.status(201).json({ 
      message: 'Order placed successfully!', 
      orderId: Math.floor(Math.random() * 1000000) 
    });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
