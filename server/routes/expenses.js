const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { auth, checkRole } = require('../middleware/auth');

// Add monthly expenses (Admin only)
router.post('/', auth, checkRole(['admin']), async (req, res) => {
  try {
    const { month, year, total_amount, total_days } = req.body;

    // Check if expenses for this month already exist
    const existingExpenses = await db.query(
      'SELECT * FROM monthly_expenses WHERE month = $1 AND year = $2',
      [month, year]
    );

    if (existingExpenses.rows.length > 0) {
      return res.status(400).json({ message: 'Expenses for this month already exist' });
    }

    const result = await db.query(
      'INSERT INTO monthly_expenses (month, year, total_amount, total_days, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [month, year, total_amount, total_days, req.user.id]
    );

    // Calculate bills for all students
    const students = await db.query('SELECT id FROM users WHERE role = $1', ['student']);
    
    for (const student of students.rows) {
      // Get student's present days for the month
      const attendanceResult = await db.query(
        'SELECT COUNT(*) FROM attendance WHERE student_id = $1 AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3 AND status = $4',
        [student.id, month, year, 'present']
      );
      
      const presentDays = parseInt(attendanceResult.rows[0].count);
      const billAmount = (total_amount / total_days) * presentDays;

      await db.query(
        'INSERT INTO mess_bills (student_id, month, year, total_amount, present_days, bill_amount) VALUES ($1, $2, $3, $4, $5, $6)',
        [student.id, month, year, total_amount, presentDays, billAmount]
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all monthly expenses (Admin only)
router.get('/', auth, checkRole(['admin']), async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM monthly_expenses ORDER BY year DESC, month DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get specific month's expenses
router.get('/:month/:year', auth, async (req, res) => {
  try {
    const { month, year } = req.params;
    const result = await db.query(
      'SELECT * FROM monthly_expenses WHERE month = $1 AND year = $2',
      [month, year]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Expenses not found for this month' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 