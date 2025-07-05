const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');

// Load environment variables
dotenv.config();

// Test database connection on startup
async function testDatabaseConnection() {
  try {
    const result = await db.query('SELECT NOW() as current_time');
    console.log('✅ Database connected successfully!');
    console.log(`⏰ Database time: ${result.rows[0].current_time}`);
  } catch (error) {
    console.log('❌ Database connection failed!');
    console.log(`Error: ${error.message}`);
    console.log('Please check your database configuration and .env file');
  }
}

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/attendance', require('./routes/attendance'));
app.use('/api/bills', require('./routes/bills'));
app.use('/api/enquiries', require('./routes/enquiries'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log('🔍 Testing database connection...');
  await testDatabaseConnection();
}); 