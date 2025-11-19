const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Mock Data (Demo only) ---
const products = [
  {
    id: "1",
    title: "Apple iPhone 15",
    description: "128 GB, Black, 6.1-inch display",
    price: 79999,
    mrp: 89999,
    discountPercent: 11,
    image:
      "https://images.pexels.com/photos/7889461/pexels-photo-7889461.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Mobiles",
    rating: 4.6,
    reviewsCount: 1200
  },
  {
    id: "2",
    title: "Samsung Galaxy S24",
    description: "256 GB, Phantom Black, 6.2-inch display",
    price: 74999,
    mrp: 85999,
    discountPercent: 13,
    image:
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Mobiles",
    rating: 4.5,
    reviewsCount: 950
  },
  {
    id: "3",
    title: "Sony WH-1000XM5 Headphones",
    description: "Wireless Noise Cancelling Over-Ear Headphones",
    price: 29999,
    mrp: 34999,
    discountPercent: 14,
    image:
      "https://images.pexels.com/photos/3394664/pexels-photo-3394664.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Electronics",
    rating: 4.8,
    reviewsCount: 2100
  },
  {
    id: "4",
    title: "ASUS VivoBook 15",
    description: "15.6\" FHD, Intel i5, 16GB RAM, 512GB SSD",
    price: 56999,
    mrp: 64999,
    discountPercent: 12,
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    category: "Laptops",
    rating: 4.3,
    reviewsCount: 640
  }
];

// --- Routes ---

// Health check
app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Flipkart clone backend running" });
});

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get single product by id
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// Simple demo login (NOT for production)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Demo credentials
  if (email === "user@example.com" && password === "password") {
    return res.json({
      token: "demo-token-123",
      user: {
        name: "Demo User",
        email
      }
    });
  }

  res.status(401).json({ message: "Invalid email or password" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
