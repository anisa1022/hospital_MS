// departmentController.js
const db = require('../db');
// Get all departments
exports.getAllDepartments = (req, res) => {
    db.query('SELECT * FROM department', (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json(results);
    });
  };
  
  // Get department by ID
  exports.getDepartmentById = (req, res) => {
    const departmentId = req.params.id;
    db.query('SELECT * FROM department WHERE id = ?', [departmentId], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Department not found' });
      res.status(200).json(results[0]);
    });
  };
  
  // Create new department
  exports.createDepartment = (req, res) => {
    const { name, location, head, contact_info } = req.body;
    db.query(
      'INSERT INTO department (name, location, head, contact_info) VALUES (?, ?, ?, ?)',
      [name, location, head, contact_info],
      (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Department added successfully', departmentId: results.insertId });
      }
    );
  };
  
  // Update department by ID
  exports.updateDepartment = (req, res) => {
    const departmentId = req.params.id;
    const { name, location, head, contact_info } = req.body;
    db.query(
      'UPDATE department SET name = ?, location = ?, head = ?, contact_info = ? WHERE id = ?',
      [name, location, head, contact_info, departmentId],
      (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: 'Department updated successfully' });
      }
    );
  };
  
  // Delete department by ID
  exports.deleteDepartment = (req, res) => {
    const departmentId = req.params.id;
    db.query('DELETE FROM department WHERE id = ?', [departmentId], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({ message: 'Department deleted successfully' });
    });
  };
  