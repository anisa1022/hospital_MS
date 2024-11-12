const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/doctors', doctorController.getAllDoctors);
router.get('/doctor/:id', doctorController.getDoctorById);
router.post('/doctor', doctorController.createDoctor);
router.put('/doctor/:id', doctorController.updateDoctor);
router.delete('/doctor/:id', doctorController.deleteDoctor);

module.exports = router;
