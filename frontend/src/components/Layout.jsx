import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, UserPlus, Calendar, Building2, Stethoscope, LogOut } from 'lucide-react';

export default function Layout({ children }) {
  const location = useLocation();

  const menuItems = [
    { icon: Building2, label: 'Departments', href: '/departments' },
    { icon: Stethoscope, label: 'Doctors', href: '/doctors' },
    { icon: Users, label: 'Patients', href: '/patients' },
    { icon: Calendar, label: 'Appointments', href: '/appointments' },
    { icon: UserPlus, label: 'Users', href: '/users' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-semibold text-gray-800">Hospital Dashboard</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-800 ${
                location.pathname === item.href ? 'bg-gray-100 text-gray-800' : ''
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-6">
          <button 
            className="flex items-center w-full px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
            onClick={() => {/* Add logout logic */}}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}