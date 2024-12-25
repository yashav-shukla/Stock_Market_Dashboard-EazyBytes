import React, { useState } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { StockChart } from './components/StockChart';
import { Portfolio } from './components/portfolio/Portfolio';
import { WatchList } from './components/watchlist/WatchList';

// Mock data - Replace with real API data
const mockChartData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2024, 1, i + 1).toISOString(),
  price: 150 + Math.random() * 50,
}));

const mockPortfolio = {
  stocks: [
    {
      symbol: 'AAPL',
      shares: 10,
      averagePrice: 170.50,
      currentPrice: 175.25,
      totalValue: 1752.50,
      gain: 47.50,
      gainPercent: 2.78,
    },
    {
      symbol: 'MSFT',
      shares: 5,
      averagePrice: 350.75,
      currentPrice: 365.20,
      totalValue: 1826.00,
      gain: 72.25,
      gainPercent: 4.12,
    },
  ],
  totalValue: 3578.50,
  dailyChange: 3.45,
};

const mockWatchlist = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.25,
    change: 2.75,
    changePercent: 1.59,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 365.20,
    change: 5.30,
    changePercent: 1.47,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.75,
    change: -1.25,
    changePercent: -0.87,
  },
];

function App() {
  const [selectedStock] = useState('AAPL');

  const handleAddToPortfolio = (symbol: string) => {
    // Implement portfolio addition logic
    console.log(`Adding ${symbol} to portfolio`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <StockChart data={mockChartData} symbol={selectedStock} />
          <Portfolio portfolio={mockPortfolio} />
        </div>
        <div className="mt-8">
          <WatchList 
            stocks={mockWatchlist}
            onAddToPortfolio={handleAddToPortfolio}
          />
        </div>
      </main>
    </div>
  );
}

export default App;