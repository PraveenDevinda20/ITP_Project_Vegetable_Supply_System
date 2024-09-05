// AdminLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Admin Portal</h2>
          <ul className="space-y-4">
            <li>
              <Link to="/admin-dashboard" className="block py-2 px-4 hover:bg-blue-600 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/all-farmers" className="block py-2 px-4 hover:bg-blue-600 rounded">
                All Farmers
              </Link>
            </li>
            <li>
              <Link to="/manage-profiles" className="block py-2 px-4 hover:bg-blue-600 rounded">
                Manage Profiles
              </Link>
            </li>
            <li>
              <Link to="/reports" className="block py-2 px-4 hover:bg-blue-600 rounded">
                Reports
              </Link>
            </li>
            <li>
              <Link to="/admin-settings" className="block py-2 px-4 hover:bg-blue-600 rounded">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow ml-64 p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
