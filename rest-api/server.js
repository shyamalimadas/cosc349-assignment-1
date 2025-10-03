require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection configuration
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'inventory_db'
});

let db;
let isConnected = false;

// Connect to database with retry logic
const connectWithRetry = () => {
  console.log('Attempting to connect to database...');
  console.log(`Host: ${dbConfig.host}, Database: ${dbConfig.database}, User: ${dbConfig.user}`);
  
  db = mysql.createConnection(dbConfig);
  
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.message);
      console.log('Retrying in 5 seconds...');
      isConnected = false;
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('✅ Connected to MySQL database successfully!');
      isConnected = true;
    }
  });

  // Handle connection errors after initial connection
  db.on('error', (err) => {
    console.error('Database error:', err);
    isConnected = false;
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Database connection lost. Reconnecting...');
      connectWithRetry();
    }
  });
};

// Wait a bit before trying to connect
setTimeout(() => {
  connectWithRetry();
}, 3000);

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: isConnected ? 'connected' : 'disconnected',
    environment: {
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER
    }
  });
});

// Get all products (books)
app.get('/api/products', (req, res) => {
  if (!isConnected) {
    return res.status(503).json({ error: 'Database not connected' });
  }

  const query = 'SELECT * FROM products ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products: ' + err.message });
    } else {
      console.log(`Found ${results.length} products`);
      res.json(results);
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Book Rental API is running!',
    database: isConnected ? 'connected' : 'disconnected'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Add new product (book)
app.post('/api/products', (req, res) => {
  if (!isConnected) {
    return res.status(503).json({ error: 'Database not connected' });
  }

  const { name, description, quantity, price, category } = req.body;
  
  if (!name || !price || quantity === undefined) {
    return res.status(400).json({ error: 'Name, price, and quantity are required' });
  }

  const query = 'INSERT INTO products (name, description, quantity, price, category) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, description, quantity, price, category], (err, result) => {
    if (err) {
      console.error('Error adding product:', err);
      res.status(500).json({ error: 'Failed to add product: ' + err.message });
    } else {
      console.log(`Added new product: ${name}`);
      res.status(201).json({ 
        message: 'Product added successfully', 
        id: result.insertId 
      });
    }
  });
});

// Delete product (book)
app.delete('/api/products/:id', (req, res) => {
  if (!isConnected) {
    return res.status(503).json({ error: 'Database not connected' });
  }

  const { id } = req.params;
  
  // Validate ID is a number
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Valid book ID is required' });
  }

  const query = 'DELETE FROM products WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Failed to delete product: ' + err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Book not found' });
    } else {
      console.log(`Deleted book with ID: ${id}`);
      res.json({ message: 'Book deleted successfully' });
    }
  });
});
