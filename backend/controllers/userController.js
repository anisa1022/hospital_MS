// userController.js
const db = require('../db');
// Get all users
exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json(results);
    });
  };
  
  // Get user by ID
  exports.getUserById = (req, res) => {
    const userId = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(results[0]);
    });
  };
  
  // Create new user
  exports.createUser = (req, res) => {
    const { name, email, password, role, contact_info } = req.body;
    db.query(
      'INSERT INTO users (name, email, password, role, contact_info) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, role, contact_info],
      (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'User created successfully', userId: results.insertId });
      }
    );
  };
  
  // Update user by ID
  exports.updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, email, password, role, contact_info } = req.body;
    db.query(
      'UPDATE users SET name = ?, email = ?, password = ?, role = ?, contact_info = ? WHERE id = ?',
      [name, email, password, role, contact_info, userId],
      (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: 'User updated successfully' });
      }
    );
  };
  
  // Delete user by ID
  exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [userId], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({ message: 'User deleted successfully' });
    });
  };
  