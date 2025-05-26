const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { auth, checkRole } = require('../middleware/auth');

// Get all bills (Admin only)
router.get('/', auth, checkRole(['admin']), async (req, res) => {
  try {
    const result = await db.query(
      `SELECT mb.*, u.username 
       FROM mess_bills mb 
       JOIN users u ON mb.student_id = u.id 
       ORDER BY mb.year DESC, mb.month DESC, u.username`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bills for a specific student
router.get('/student/:student_id', auth, async (req, res) => {
  try {
    const { student_id } = req.params;

    // Check if the requesting user is the student or an admin
    if (req.user.role !== 'admin' && req.user.id !== parseInt(student_id)) {
      return res.status(403).json({ message: 'Not authorized to view these bills' });
    }

    const result = await db.query(
      'SELECT * FROM mess_bills WHERE student_id = $1 ORDER BY year DESC, month DESC',
      [student_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bills for a specific month
router.get('/month/:month/:year', auth, async (req, res) => {
  try {
    const { month, year } = req.params;
    const result = await db.query(
      `SELECT mb.*, u.username 
       FROM mess_bills mb 
       JOIN users u ON mb.student_id = u.id 
       WHERE mb.month = $1 AND mb.year = $2 
       ORDER BY u.username`,
      [month, year]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update bill status (Admin only)
router.put('/:id', auth, checkRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.query(
      'UPDATE mess_bills SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 