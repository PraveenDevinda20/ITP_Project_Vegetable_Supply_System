// FarmerLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const FarmerLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Farmer Portal</h2>
          <ul className="space-y-4">
            <li>
              <Link to="/farmer-dashboard" className="block py-2 px-4 hover:bg-green-600 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/my-profile" className="block py-2 px-4 hover:bg-green-600 rounded">
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/my-land" className="block py-2 px-4 hover:bg-green-600 rounded">
                My Land Details
              </Link>
            </li>
            <li>
              <Link to="/crop-readiness" className="block py-2 px-4 hover:bg-green-600 rounded">
                Notify Crop Readiness
              </Link>
            </li>
            <li>
              <Link to="/request-pickup" className="block py-2 px-4 hover:bg-green-600 rounded">
                Request Pickup
              </Link>
            </li>
            <li>
              <Link to="/notifications" className="block py-2 px-4 hover:bg-green-600 rounded">
                Notifications
              </Link>
            </li>
            <li>
              <Link to="/help-support" className="block py-2 px-4 hover:bg-green-600 rounded">
                Help & Support
              </Link>
            </li>
            <li>
              <Link to="/settings" className="block py-2 px-4 hover:bg-green-600 rounded">
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

export default FarmerLayout;
