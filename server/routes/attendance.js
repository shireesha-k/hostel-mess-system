const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { auth, checkRole } = require('../middleware/auth');

// Add attendance record (Caretaker only)
router.post('/', auth, checkRole(['caretaker']), async (req, res) => {
  try {
    const { student_id, date, status } = req.body;

    // Check if attendance already exists for this date
    const existingAttendance = await db.query(
      'SELECT * FROM attendance WHERE student_id = $1 AND date = $2',
      [student_id, date]
    );

    if (existingAttendance.rows.length > 0) {
      return res.status(400).json({ message: 'Attendance already recorded for this date' });
    }

    const result = await db.query(
      'INSERT INTO attendance (student_id, date, status, recorded_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [student_id, date, status, req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance for a specific student
router.get('/student/:student_id', auth, async (req, res) => {
  try {
    const { student_id } = req.params;
    const { month, year } = req.query;

    let query = 'SELECT * FROM attendance WHERE student_id = $1';
    const params = [student_id];

    if (month && year) {
      query += ' AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3';
      params.push(month, year);
    }

    query += ' ORDER BY date DESC';

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get attendance for a specific date (Caretaker only)
router.get('/date/:date', auth, checkRole(['caretaker']), async (req, res) => {
  try {
    const { date } = req.params;
    const result = await db.query(
      `SELECT a.*, u.username 
       FROM attendance a 
       JOIN users u ON a.student_id = u.id 
       WHERE a.date = $1 
       ORDER BY u.username`,
      [date]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update attendance record (Caretaker only)
router.put('/:id', auth, checkRole(['caretaker']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await db.query(
      'UPDATE attendance SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Attendance record not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 