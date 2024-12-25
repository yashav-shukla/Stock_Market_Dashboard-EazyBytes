import React from 'react';
import { Star } from 'lucide-react';
import type { Stock } from '../../types/stock';
import { PriceChange } from '../common/PriceChange';
import { formatCurrency } from '../../utils/formatters';

interface WatchListTableProps {
  stocks: Stock[];
  onAddToPortfolio: (symbol: string) => void;
}

export const WatchListTable: React.FC<WatchListTableProps> = ({ stocks, onAddToPortfolio }) => {
  return (
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
              <td className="text-right">{formatCurrency(stock.price)}</td>
              <td className="text-right">
                <div className="flex justify-end">
                  <PriceChange value={stock.change} />
                  <span className="ml-2">({stock.changePercent.toFixed(2)}%)</span>
                </div>
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
  );
};