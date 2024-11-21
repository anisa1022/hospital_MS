import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import react-select
import { Pencil, Trash2 } from 'lucide-react';
import {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../services/doctorService';
import { getAllDepartments } from '../services/departmentService'; // Import department service

export default function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [tell, setTell] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [ticketFee, setTicketFee] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
  ];

  // Fetch doctors and departments from the backend
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctors();
        setDoctors(data);
      } catch (err) {
        setError('Failed to fetch doctors');
      }
    };

    const fetchDepartments = async () => {
      try {
        const departments = await getAllDepartments();
        setDepartmentOptions(
          departments.map((dept) => ({
            value: dept.id,
            label: dept.name,
          }))
        );
      } catch (err) {
        setError('Failed to fetch departments');
      }
    };

    fetchDoctors();
    fetchDepartments();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const doctorData = {
      name,
      tell,
      gender,
      email,
      department_id: selectedDepartment?.value,
      ticket_fee: ticketFee,
      user_id: userId,
      date,
    };

    try {
      if (editingId) {
        // Update an existing doctor
        await updateDoctor(editingId, doctorData);
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor.id === editingId ? { id: editingId, ...doctorData } : doctor
          )
        );
        setEditingId(null);
      } else {
        // Add a new doctor
        const response = await createDoctor(doctorData);
        setDoctors([...doctors, { id: response.doctorId, ...doctorData }]);
      }
      resetForm();
    } catch (err) {
      setError('Failed to save doctor');
    }
  };

  const resetForm = () => {
    setName('');
    setTell('');
    setGender('');
    setEmail('');
    setSelectedDepartment(null);
    setTicketFee('');
    setUserId('');
    setDate('');
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const doctorToEdit = doctors.find((doctor) => doctor.id === id);
    if (doctorToEdit) {
      setName(doctorToEdit.name);
      setTell(doctorToEdit.tell);
      setGender(doctorToEdit.gender);
      setEmail(doctorToEdit.email);
      setSelectedDepartment(
        departmentOptions.find((option) => option.value === doctorToEdit.department_id)
      );
      setTicketFee(doctorToEdit.ticket_fee);
      setUserId(doctorToEdit.user_id);
      setDate(doctorToEdit.date.split('T')[0]); // Extract date only
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoctor(id);
      setDoctors(doctors.filter((doctor) => doctor.id !== id));
    } catch (err) {
      setError('Failed to delete doctor');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add Doctor'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Doctor Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="departmentName">
                Department
              </label>
              <Select
                id="departmentName"
                options={departmentOptions}
                value={selectedDepartment}
                onChange={(option) => setSelectedDepartment(option)}
                placeholder="Select Department"
                isClearable
                isSearchable
                className="shadow appearance-none border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tell">
                Tell
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tell"
                type="text"
                placeholder="Tell"
                value={tell}
                onChange={(e) => setTell(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                Gender
              </label>
              <Select
                id="gender"
                options={genderOptions}
                value={genderOptions.find((option) => option.value === gender)}
                onChange={(option) => setGender(option.value)}
                placeholder="Select Gender"
                isClearable
                isSearchable={false}
                className="shadow appearance-none border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ticketFee">
                Ticket Fee
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ticketFee"
                type="number"
                step="0.01"
                placeholder="Ticket Fee"
                value={ticketFee}
                onChange={(e) => setTicketFee(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                User ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="userId"
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-end mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {editingId ? 'Update Doctor' : 'Add Doctor'}
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Tell
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ticket Fee
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{doctor.id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{doctor.name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {doctor.department_name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{doctor.tell}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{doctor.gender}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{doctor.email}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{doctor.ticket_fee}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">{doctor.user_name}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {doctor.date ? new Date(doctor.date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button
                    onClick={() => handleEdit(doctor.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
