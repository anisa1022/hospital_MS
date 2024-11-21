const db = require('../db');

// Get all appointments with doctor and patient names
exports.getAllAppointments = (req, res) => {
  const query = `
    SELECT 
      appointment.id,
      appointment.patient_id,
      patient.name AS patient_name,
      appointment.doctor_id,
      doctor.name AS doctor_name,
      appointment.ticket_fee,
      appointment.status,
      appointment.description,
      appointment.user_id,
      appointment.date,
      appointment.action_date,
      appointment.modified_date
    FROM appointment
    LEFT JOIN patient ON appointment.patient_id = patient.id
    LEFT JOIN doctor ON appointment.doctor_id = doctor.id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json(results);
  });
};

// Get appointment by ID with doctor and patient names
exports.getAppointmentById = (req, res) => {
  const appointmentId = req.params.id;

  const query = `
    SELECT 
      appointment.id,
      appointment.patient_id,
      patient.name AS patient_name,
      appointment.doctor_id,
      doctor.name AS doctor_name,
      appointment.ticket_fee,
      appointment.status,
      appointment.description,
      appointment.user_id,
      appointment.date,
      appointment.action_date,
      appointment.modified_date
    FROM appointment
    LEFT JOIN patient ON appointment.patient_id = patient.id
    LEFT JOIN doctor ON appointment.doctor_id = doctor.id
    WHERE appointment.id = ?
  `;

  db.query(query, [appointmentId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(results[0]);
  });
};

// Create new appointment
exports.createAppointment = (req, res) => {
  const { patient_id, doctor_id, date, time, status, ticket_fee, description, user_id } = req.body;

  const query = `
    INSERT INTO appointment (patient_id, doctor_id, date, status, ticket_fee, description, user_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [patient_id, doctor_id, date, status, ticket_fee, description, user_id],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(201).json({ message: 'Appointment created successfully', appointmentId: results.insertId });
    }
  );
};

// Update appointment by ID
exports.updateAppointment = (req, res) => {
  const appointmentId = req.params.id;
  const { patient_id, doctor_id, date, status, ticket_fee, description, user_id } = req.body;

  const query = `
    UPDATE appointment 
    SET patient_id = ?, doctor_id = ?, date = ?, status = ?, ticket_fee = ?, description = ?, user_id = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [patient_id, doctor_id, date, status, ticket_fee, description, user_id, appointmentId],
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.status(200).json({ message: 'Appointment updated successfully' });
    }
  );
};

// Delete appointment by ID
exports.deleteAppointment = (req, res) => {
  const appointmentId = req.params.id;

  const query = 'DELETE FROM appointment WHERE id = ?';

  db.query(query, [appointmentId], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(200).json({ message: 'Appointment deleted successfully' });
  });
};
