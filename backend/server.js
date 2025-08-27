// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();
connectDB();

const app = express();

// Security headers
app.use(helmet());

// Rate limiter (apply globally or tighten for auth routes)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 requests per windowMs
  message: { message: 'Too many requests, please slow down.' }
});
app.use(limiter);

// CORS - restrict origin to your frontend
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// parse json bodies (and limit body size)
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));

// health
app.get('/', (req, res) => {
  res.send('U-Love API is running 💖');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
