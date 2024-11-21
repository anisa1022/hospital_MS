import axios from 'axios';

const API_URL = 'http://localhost:5000/api/patients'; // Update this base URL if necessary

// Get all patients
export const getAllPatients = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Get patient by ID
export const getPatientById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Create a new patient
export const createPatient = async (patientData) => {
  try {
    const response = await axios.post(API_URL, patientData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Update a patient by ID
export const updatePatient = async (id, patientData) => {
  try {
  const response = await axios.put(`${API_URL}/${id}`, patientData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Delete a patient by ID
export const deletePatient = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};
