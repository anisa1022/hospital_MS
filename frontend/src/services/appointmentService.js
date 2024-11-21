import axios from 'axios';

const API_URL = 'http://localhost:5000/api/appointments'; // Update the base URL as needed

// Get all appointments
export const getAllAppointments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Get appointment by ID
export const getAppointmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(API_URL, appointmentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Update an appointment by ID
export const updateAppointment = async (id, appointmentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, appointmentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Delete an appointment by ID
export const deleteAppointment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};
