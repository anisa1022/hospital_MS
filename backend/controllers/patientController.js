// patientController.js
const db = require('../db');

exports.getAllPatients = (req, res) => {
    db.query('SELECT * FROM patient', (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json(results);
    });
  };
  
  exports.getPatientById = (req, res) => {
    const patientId = req.params.id;
    db.query('SELECT * FROM patient WHERE id = ?', [patientId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      res.status(200).json(results[0]);
    });
  };
  
  exports.createPatient = (req, res) => {
    const { name, tell, gender, mother, contact_tell, dob, email, user_id, date } = req.body;
    db.query(
      'INSERT INTO patient (name, tell, gender, mother, contact_tell, dob, email, user_id, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [name, tell, gender, mother, contact_tell, dob, email, user_id, date],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ message: 'Patient created successfully', patientId: results.insertId });
      }
    );
  };
  
  exports.updatePatient = (req, res) => {
    const patientId = req.params.id;
    const { name, tell, gender, mother, contact_tell, dob, email, user_id, date } = req.body;
    db.query(
      'UPDATE patient SET name = ?, tell = ?, gender = ?, mother = ?, contact_tell = ?, dob = ?, email = ?, user_id = ?, date = ? WHERE id = ?',
      [name, tell, gender, mother, contact_tell, dob, email, user_id, date, patientId],
      (err, results) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: 'Patient updated successfully' });
      }
    );
  };
  
  exports.deletePatient = (req, res) => {
    const patientId = req.params.id;
    db.query('DELETE FROM patient WHERE id = ?', [patientId], (err, results) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json({ message: 'Patient deleted successfully' });
    });
  };
  