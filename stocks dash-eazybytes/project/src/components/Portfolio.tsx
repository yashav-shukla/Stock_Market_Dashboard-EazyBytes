import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Portfolio as PortfolioType } from '../types/stock';

interface PortfolioProps {
  portfolio: PortfolioType;
}

export const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Portfolio</h2>
        <div className="text-right">
          <p className="text-xl font-bold">${portfolio.totalValue.toLocaleString()}</p>
          <p className={`flex items-center ${portfolio.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {portfolio.dailyChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {portfolio.dailyChange.toFixed(2)}%
          </p>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Symbol</th>
              <th className="text-right py-3">Shares</th>
              <th className="text-right py-3">Avg Price</th>
              <th className="text-right py-3">Current</th>
              <th className="text-right py-3">Total Value</th>
              <th className="text-right py-3">Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.stocks.map((stock) => (
              <tr key={stock.symbol} className="border-b hover:bg-gray-50">
                <td className="py-3">{stock.symbol}</td>
                <td className="text-right">{stock.shares}</td>
                <td className="text-right">${stock.averagePrice.toFixed(2)}</td>
                <td className="text-right">${stock.currentPrice.toFixed(2)}</td>
                <td className="text-right">${stock.totalValue.toLocaleString()}</td>
                <td className={`text-right ${stock.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${stock.gain.toFixed(2)} ({stock.gainPercent.toFixed(2)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};