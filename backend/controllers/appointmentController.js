// appointmentController.js
const db = require('../db');
// Get all appointments
exports.getAllAppointments = (req, res) => {
    db.query('SELECT * FROM appointment', (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json(results);
    });
  };
  
  // Get appointment by ID
  exports.getAppointmentById = (req, res) => {
    const appointmentId = req.params.id;
    db.query('SELECT * FROM appointment WHERE id = ?', [appointmentId], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0) return res.status(404).json({ message: 'Appointment not found' });
      res.status(200).json(results[0]);
    });
  };
  
  // Create new appointment
  exports.createAppointment = (req, res) => {
    const { patient_id, doctor_id, date, time, status, user_id } = req.body;
    db.query(
      'INSERT INTO appointment (patient_id, doctor_id, date, time, status, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [patient_id, doctor_id, date, time, status, user_id],
      (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: 'Appointment created successfully', appointmentId: results.insertId });
      }
    );
  };
  
  // Update appointment by ID
  exports.updateAppointment = (req, res) => {
    const appointmentId = req.params.id;
    const { patient_id, doctor_id, date, time, status, user_id } = req.body;
    db.query(
      'UPDATE appointment SET patient_id = ?, doctor_id = ?, date = ?, time = ?, status = ?, user_id = ? WHERE id = ?',
      [patient_id, doctor_id, date, time, status, user_id, appointmentId],
      (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: 'Appointment updated successfully' });
      }
    );
  };
  
  // Delete appointment by ID
  exports.deleteAppointment = (req, res) => {
    const appointmentId = req.params.id;
    db.query('DELETE FROM appointment WHERE id = ?', [appointmentId], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({ message: 'Appointment deleted successfully' });
    });
  };
  