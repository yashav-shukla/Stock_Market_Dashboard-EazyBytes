import React from 'react';
import { LayoutDashboard, LineChart, Wallet } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <LayoutDashboard className="w-6 h-6 text-blue-600" />
            <span className="ml-2 text-xl font-bold">Stock Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              <LineChart className="w-4 h-4 mr-2" />
              Markets
            </button>
            <button className="flex items-center px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">
              <Wallet className="w-4 h-4 mr-2" />
              Portfolio
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};