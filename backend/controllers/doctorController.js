const db = require('../db');

// Get all doctors with department name and user name
exports.getAllDoctors = (req, res) => {
  const query = `
  SELECT 
    doctor.id, 
    doctor.name, 
    doctor.tell, 
    doctor.gender, 
    doctor.email, 
    department.name AS department_name, 
    doctor.ticket_fee, 
    users.name AS user_name, 
    doctor.date, 
    doctor.action_date, 
    doctor.modified_date
  FROM doctor
  LEFT JOIN department ON doctor.department_id = department.id
  LEFT JOIN users ON doctor.user_id = users.id
`;


  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json(results);
  });
};

// Get doctor by ID with department name and user name
exports.getDoctorById = (req, res) => {
  const doctorId = req.params.id;

  const query = `
    SELECT 
      doctor.id, 
      doctor.name, 
      doctor.tell, 
      doctor.gender, 
      doctor.email, 
      department.name AS department_name, 
      doctor.ticket_fee, 
      users.name AS user_name, 
      doctor.date, 
      doctor.action_date, 
      doctor.modified_date
    FROM doctor
    LEFT JOIN department ON doctor.department_id = department.id
    LEFT JOIN users ON doctor.user_id = users.id
    WHERE doctor.id = ?
  `;

  db.query(query, [doctorId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(results[0]);
  });
};

// Create new doctor
exports.createDoctor = (req, res) => {
  const { name, tell, gender, email, department_id, ticket_fee, user_id, date } = req.body;

  const query = `
    INSERT INTO doctor (name, tell, gender, email, department_id, ticket_fee, user_id, date) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [name, tell, gender, email, department_id, ticket_fee, user_id, date], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ message: 'Doctor added successfully', doctorId: results.insertId });
  });
};

// Update doctor by ID
exports.updateDoctor = (req, res) => {
  const doctorId = req.params.id;
  const { name, tell, gender, email, department_id, ticket_fee, user_id, date } = req.body;

  const query = `
    UPDATE doctor 
    SET name = ?, tell = ?, gender = ?, email = ?, department_id = ?, ticket_fee = ?, user_id = ?, date = ?
    WHERE id = ?
  `;

  db.query(query, [name, tell, gender, email, department_id, ticket_fee, user_id, date, doctorId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Doctor updated successfully' });
  });
};

// Delete doctor by ID
exports.deleteDoctor = (req, res) => {
  const doctorId = req.params.id;

  const query = 'DELETE FROM doctor WHERE id = ?';

  db.query(query, [doctorId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  });
};
