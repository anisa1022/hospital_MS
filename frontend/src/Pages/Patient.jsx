import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, ChevronDown } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import {
  getAllPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from '../services/patientService';

export default function Patient() {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [tell, setTell] = useState('');
  const [gender, setGender] = useState('');
  const [mother, setMother] = useState('');
  const [contactTell, setContactTell] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [editingId, setEditingId] = useState(null);

  const genderOptions = ['Male', 'Female', 'Other'];

  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getAllPatients();
        setPatients(data);
      } catch (err) {
        toast.error('Failed to load patients'); // Show error toast
      }
    };
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = {
      name,
      tell,
      gender,
      mother,
      contact_tell: contactTell,
      dob: dateOfBirth,
      email,
      user_id: userId,
      date,
    };

    try {
      if (editingId) {
        // Update existing patient
        await updatePatient(editingId, patientData);
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.id === editingId ? { id: editingId, ...patientData } : patient
          )
        );
        toast.success('Patient updated successfully'); // Show success toast
        setEditingId(null);
      } else {
        // Create new patient
        const response = await createPatient(patientData);
        setPatients([...patients, { id: response.patientId, ...patientData }]);
        toast.success('Patient added successfully'); // Show success toast
      }
      resetForm();
    } catch (err) {
      toast.error('Failed to save patient'); // Show error toast
    }
  };

  const resetForm = () => {
    setName('');
    setTell('');
    setGender('');
    setMother('');
    setContactTell('');
    setDateOfBirth('');
    setEmail('');
    setUserId('');
    setDate('');
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const patientToEdit = patients.find((patient) => patient.id === id);
    if (patientToEdit) {
      setName(patientToEdit.name);
      setTell(patientToEdit.tell);
      setGender(patientToEdit.gender);
      setMother(patientToEdit.mother);
      setContactTell(patientToEdit.contact_tell);
      setDateOfBirth(patientToEdit.dob.split('T')[0]);
      setEmail(patientToEdit.email);
      setUserId(patientToEdit.user_id);
      setDate(patientToEdit.date.split('T')[0]);
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePatient(id);
      setPatients(patients.filter((patient) => patient.id !== id));
      toast.success('Patient deleted successfully'); // Show success toast
    } catch (err) {
      toast.error('Failed to delete patient'); // Show error toast
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer /> {/* Add ToastContainer */}
      <h1 className="text-3xl font-bold mb-6">Patients</h1>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add Patient'}
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
                placeholder="Patient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mother">
                Mother's Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mother"
                type="text"
                placeholder="Mother's Name"
                value={mother}
                onChange={(e) => setMother(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactTell">
                Contact Tell
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="contactTell"
                type="text"
                placeholder="Contact Tell"
                value={contactTell}
                onChange={(e) => setContactTell(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
                Date of Birth
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
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
              {editingId ? 'Update Patient' : 'Add Patient'}
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
                Tell
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Mother's Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact Tell
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
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
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {patient.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {patient.name}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {patient.tell}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {patient.gender}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {patient.mother}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {patient.contact_tell}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {patient.dob ? new Date(patient.dob).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {patient.email}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {patient.user_id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {patient.date ? new Date(patient.date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button
                    onClick={() => handleEdit(patient.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
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
