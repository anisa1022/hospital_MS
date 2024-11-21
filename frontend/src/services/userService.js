import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust this if your backend URL is different

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Get a user by ID
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Create a new user
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Update an existing user
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};
