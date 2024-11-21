import axios from 'axios';

const API_URL = 'http://localhost:5000/api/doctors'; // Update the base URL as necessary

// Fetch all doctors
export const getAllDoctors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Fetch a doctor by ID
export const getDoctorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Add a new doctor
export const createDoctor = async (doctorData) => {
  try {
    const response = await axios.post(API_URL, doctorData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Update a doctor
export const updateDoctor = async (id, doctorData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, doctorData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Delete a doctor
export const deleteDoctor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};
