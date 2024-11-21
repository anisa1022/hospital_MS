import { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/userService.js'; // Import the services

export default function User() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState('');
  const [editingId, setEditingId] = useState(null); // Track if we are editing a user
  const [error, setError] = useState('');

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        console.log(data); // Debugging the fetched data
        setUsers(data);
      } catch (err) {
        setError('Failed to load users');
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      user_name: userName,
      password,
      gender,
      email,
      date,
      user_id: userId,
    };

    try {
      if (editingId) {
        // Update user
        await updateUser(editingId, newUser);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editingId ? { id: editingId, ...newUser } : user
          )
        );
        setEditingId(null); // Reset editing state
      } else {
        // Create new user
        const response = await createUser(newUser);
        setUsers([...users, { id: response.userId, ...newUser }]);
      }
      resetForm();
    } catch (err) {
      setError('Failed to save user');
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setName('');
    setUserName('');
    setPassword('');
    setGender('');
    setEmail('');
    setDate('');
    setUserId('');
    setEditingId(null);
  };

  // Handle edit action
  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setName(userToEdit.name);
      setUserName(userToEdit.user_name);
      setPassword(userToEdit.password);
      setGender(userToEdit.gender);
      setEmail(userToEdit.email);
      setDate(userToEdit.date.split('T')[0]); // Extract the date part
      setUserId(userToEdit.user_id);
      setEditingId(id);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      {error && <div className="mb-4 text-red-500">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white shadow-md rounded px-8 pt-6 pb-8"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* (Other input fields remain unchanged) */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {editingId ? 'Update User' : 'Add User'}
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
                Full Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
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
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {user.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {user.user_name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {user.gender || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {user.email || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  {/* Format the date */}
                  {user.date ? new Date(user.date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
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
