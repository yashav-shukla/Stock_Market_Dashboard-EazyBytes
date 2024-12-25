import React from 'react';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';
import type { Stock } from '../types/stock';

interface WatchListProps {
  stocks: Stock[];
}

export const WatchList: React.FC<WatchListProps> = ({ stocks }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Watchlist</h2>
        <Star className="text-yellow-500" size={24} />
      </div>
      <div className="space-y-4">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold">{stock.symbol}</p>
              <p className="text-sm text-gray-600">{stock.name}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold">${stock.price.toFixed(2)}</p>
              <div className="flex items-center">
                {stock.change >= 0 ? (
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                ) : (
                  <TrendingDown className="text-red-500 mr-1" size={16} />
                )}
                <span className={stock.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};