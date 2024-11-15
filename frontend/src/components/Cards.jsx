import React from 'react';

export default function Card({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <Icon className="h-6 w-6 text-gray-400" />
      </div>
      <p className="mt-2 text-3xl font-semibold text-gray-700">{value}</p>
    </div>
  );
}