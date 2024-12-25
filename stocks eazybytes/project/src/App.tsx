import React, { useState } from 'react';
import { Portfolio } from './components/Portfolio';
import { WatchList } from './components/WatchList';
import { InteractiveChart } from './components/charts/InteractiveChart';
import { PerformanceMetrics } from './components/analytics/PerformanceMetrics';
import { NotificationCenter } from './components/notifications/NotificationCenter';
import { BarChart4 } from 'lucide-react';

// Mock data remains the same as before
const mockPortfolio = {
  totalValue: 125750.32,
  dailyChange: 2.34,
  stocks: [
    { symbol: 'AAPL', shares: 50, averagePrice: 150.25, currentPrice: 175.50 },
    { symbol: 'GOOGL', shares: 20, averagePrice: 2750.00, currentPrice: 2850.75 },
    { symbol: 'MSFT', shares: 100, averagePrice: 285.50, currentPrice: 305.25 },
  ]
};

const mockWatchlist = [
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 875.25, change: 15.50, changePercent: 1.8 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 450.75, change: -5.25, changePercent: -1.15 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 125.50, change: 3.75, changePercent: 3.08 },
];

const mockChartData = Array.from({ length: 24 }, (_, i) => ({
  timestamp: new Date(Date.now() - (23 - i) * 3600000).toISOString(),
  price: 150 + Math.random() * 10,
  volume: Math.floor(Math.random() * 1000000)
}));

const mockNotifications = [
  {
    id: '1',
    type: 'alert' as const,
    message: 'AAPL reached your price target of $175',
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'price' as const,
    message: 'MSFT up 5% in the last hour',
    timestamp: new Date()
  }
];

function App() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleDismissNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BarChart4 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">StockDash</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <PerformanceMetrics
            totalReturn={15.7}
            annualizedReturn={12.3}
            sharpeRatio={1.8}
            beta={1.1}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <InteractiveChart data={mockChartData} symbol="AAPL" />
            </div>
            <div>
              <Portfolio portfolio={mockPortfolio} />
            </div>
          </div>
          <div className="space-y-8">
            <NotificationCenter 
              notifications={notifications}
              onDismiss={handleDismissNotification}
            />
            <WatchList stocks={mockWatchlist} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;