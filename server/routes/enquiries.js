const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// POST /api/enquiries
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message, status, student_id } = req.body;
  try {
    await pool.query(
      'INSERT INTO enquiries (name, email, phone, subject, message, status, student_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [name, email, phone, subject, message, status || 'pending', student_id || null]
    );
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

module.exports = router; 