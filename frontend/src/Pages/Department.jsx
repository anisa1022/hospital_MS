import { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../services/departmentService'; // Import the services

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [editingId, setEditingId] = useState(null); // Track if we are editing a department
  const [error, setError] = useState('');

  // Fetch all departments from the backend
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getAllDepartments();
        setDepartments(data);
      } catch (err) {
        setError('Failed to load departments');
      }
    };

    fetchDepartments();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDepartment = { name, description, date };

    try {
      if (editingId) {
        // Update existing department
        await updateDepartment(editingId, newDepartment);
        setDepartments((prevDepartments) =>
          prevDepartments.map((dept) =>
            dept.id === editingId ? { id: editingId, ...newDepartment } : dept
          )
        );
        setEditingId(null); // Reset editing state
      } else {
        // Create a new department
        const response = await createDepartment(newDepartment);
        setDepartments([...departments, { id: response.departmentId, ...newDepartment }]);
      }
      resetForm();
    } catch (err) {
      setError('Failed to save department');
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setName('');
    setDescription('');
    setDate('');
    setEditingId(null);
  };

  // Handle edit action
  const handleEdit = (id) => {
    const departmentToEdit = departments.find((dept) => dept.id === id);
    if (departmentToEdit) {
      setName(departmentToEdit.name);
      setDescription(departmentToEdit.description);
      setDate(departmentToEdit.date.split('T')[0]); // Extract the date part
      setEditingId(id);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      setDepartments(departments.filter((dept) => dept.id !== id));
    } catch (err) {
      setError('Failed to delete department');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Department Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Update Department' : 'Add Department'}
          </button>
        </div>
      </form>

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
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {dept.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {dept.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {dept.description || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {dept.date ? new Date(dept.date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button
                    onClick={() => handleEdit(dept.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
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
