import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, ChevronDown } from 'lucide-react';
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../services/appointmentService';

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [ticketFee, setTicketFee] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const statusOptions = ['0', '1', '-1']; // Corresponding to Scheduled, Completed, Cancelled

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAllAppointments();
        setAppointments(data);
      } catch (err) {
        setError('Failed to load appointments');
      }
    };
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointmentData = {
      doctor_id: doctorId,
      patient_id: patientId,
      ticket_fee: ticketFee,
      status,
      description,
      user_id: userId,
      date,
    };

    try {
      if (editingId) {
        await updateAppointment(editingId, appointmentData);
        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment.id === editingId ? { id: editingId, ...appointmentData } : appointment
          )
        );
        setEditingId(null);
      } else {
        const response = await createAppointment(appointmentData);
        setAppointments([...appointments, { id: response.appointmentId, ...appointmentData }]);
      }
      resetForm();
    } catch (err) {
      setError('Failed to save appointment');
    }
  };

  const resetForm = () => {
    setDoctorId('');
    setPatientId('');
    setTicketFee('');
    setStatus('');
    setDescription('');
    setUserId('');
    setDate('');
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (id) => {
    const appointment = appointments.find((a) => a.id === id);
    if (appointment) {
      setDoctorId(appointment.doctor_id);
      setPatientId(appointment.patient_id);
      setTicketFee(appointment.ticket_fee);
      setStatus(appointment.status);
      setDescription(appointment.description);
      setUserId(appointment.user_id);
      setDate(appointment.date);
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter((a) => a.id !== id));
    } catch (err) {
      setError('Failed to delete appointment');
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case '0':
        return <span className="text-red-500 font-bold">Pending</span>;
      case '1':
        return <span className="text-green-500 font-bold">Approved</span>;
      case '-1':
        return <span className="text-red-700 font-bold">Rejected</span>;
      default:
        return <span className="text-gray-500 font-bold">Unknown</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Hide Form' : 'Add Appointment'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="doctorId">
                Doctor ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="doctorId"
                type="text"
                placeholder="Doctor ID"
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patientId">
                Patient ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="patientId"
                type="text"
                placeholder="Patient ID"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((option) => (
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
            <div className="mb-4 col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                required
              ></textarea>
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
              {editingId ? 'Update Appointment' : 'Add Appointment'}
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
                Doctor
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Ticket Fee
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Description
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
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {appointment.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {`${appointment.doctor_id} - ${appointment.doctor_name || 'N/A'}`}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {`${appointment.patient_id} - ${appointment.patient_name || 'N/A'}`}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {appointment.ticket_fee}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {getStatusLabel(appointment.status)}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {appointment.description}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {appointment.date ? new Date(appointment.date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button
                    onClick={() => handleEdit(appointment.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(appointment.id)}
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
