import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { StockSymbolList } from '../../components/admin/StockSymbolList';

export const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout currentSection="dashboard">
      <div className="space-y-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-700">Total Users</h3>
              <p className="text-3xl font-bold text-blue-900">1,234</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-green-700">Active Stocks</h3>
              <p className="text-3xl font-bold text-green-900">56</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-purple-700">Total Watchlists</h3>
              <p className="text-3xl font-bold text-purple-900">789</p>
            </div>
          </div>
        </div>

        <StockSymbolList />
      </div>
    </AdminLayout>
  );
};