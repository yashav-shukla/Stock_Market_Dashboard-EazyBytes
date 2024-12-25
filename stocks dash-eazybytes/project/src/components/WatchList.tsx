import React from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import type { Stock } from '../types/stock';

interface WatchListProps {
  stocks: Stock[];
  onAddToPortfolio: (symbol: string) => void;
}

export const WatchList: React.FC<WatchListProps> = ({ stocks, onAddToPortfolio }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Watchlist</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Symbol</th>
              <th className="text-left py-3">Name</th>
              <th className="text-right py-3">Price</th>
              <th className="text-right py-3">Change</th>
              <th className="text-right py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol} className="border-b hover:bg-gray-50">
                <td className="py-3 font-medium">{stock.symbol}</td>
                <td>{stock.name}</td>
                <td className="text-right">${stock.price.toFixed(2)}</td>
                <td className={`text-right ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="flex items-center justify-end">
                    {stock.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                    {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </span>
                </td>
                <td className="text-right">
                  <button
                    onClick={() => onAddToPortfolio(stock.symbol)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Star className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};