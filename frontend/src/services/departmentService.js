import axios from 'axios';

const API_URL = 'http://localhost:5000/api/departments'; // Update the URL if necessary

// Get all departments
export const getAllDepartments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Get department by ID
export const getDepartmentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Create new department
export const createDepartment = async (departmentData) => {
  try {
    const response = await axios.post(API_URL, departmentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Update department
export const updateDepartment = async (id, departmentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, departmentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};

// Delete department
export const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Server error';
  }
};
