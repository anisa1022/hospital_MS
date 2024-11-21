import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Department from './Pages/Department.jsx';
import User from './Pages/Users';
import Doctor from './Pages/Doctors.jsx';
import Patient from './Pages/Patient.jsx';
import Appointment from './Pages/Appointment.jsx';
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/departments" element={<Department />} />
          <Route path="/users" element={<User />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/patients" element={<Patient />} />
          <Route path="/appointments" element={<Appointment />} />

          {/* Add other routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;