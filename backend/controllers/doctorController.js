// doctorController.js
const db = require('../db');

exports.getAllDoctors = (req, res) => {
    db.query('SELECT * FROM doctor', (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json(results);
    });
  };
  
  exports.getDoctorById = (req, res) => {
    const doctorId = req.params.id;
    db.query('SELECT * FROM doctor WHERE id = ?', [doctorId], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Doctor not found' });
      res.status(200).json(results[0]);
    });
  };
  
  exports.createDoctor = (req, res) => {
    const { name, specialization, contact, hospital_id, email } = req.body;
    db.query(
      'INSERT INTO doctor (name, specialization, contact, hospital_id, email) VALUES (?, ?, ?, ?, ?)',
      [name, specialization, contact, hospital_id, email],
      (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Doctor added successfully', doctorId: results.insertId });
      }
    );
  };
  
  exports.updateDoctor = (req, res) => {
    const doctorId = req.params.id;
    const { name, specialization, contact, hospital_id, email } = req.body;
    db.query(
      'UPDATE doctor SET name = ?, specialization = ?, contact = ?, hospital_id = ?, email = ? WHERE id = ?',
      [name, specialization, contact, hospital_id, email, doctorId],
      (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: 'Doctor updated successfully' });
      }
    );
  };
  
  exports.deleteDoctor = (req, res) => {
    const doctorId = req.params.id;
    db.query('DELETE FROM doctor WHERE id = ?', [doctorId], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({ message: 'Doctor deleted successfully' });
    });
  };
  