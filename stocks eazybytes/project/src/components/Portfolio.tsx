import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { Portfolio as PortfolioType } from '../types/stock';

interface PortfolioProps {
  portfolio: PortfolioType;
}

export const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const calculateTotalGainLoss = () => {
    return portfolio.stocks.reduce((acc, stock) => {
      const totalValue = stock.shares * stock.currentPrice;
      const totalCost = stock.shares * stock.averagePrice;
      return acc + (totalValue - totalCost);
    }, 0);
  };

  const totalGainLoss = calculateTotalGainLoss();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Portfolio</h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-2xl font-bold">${portfolio.totalValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            {portfolio.dailyChange >= 0 ? (
              <TrendingUp className="text-green-500 mr-1" size={20} />
            ) : (
              <TrendingDown className="text-red-500 mr-1" size={20} />
            )}
            <div>
              <p className="text-sm text-gray-600">Daily Change</p>
              <p className={`text-lg font-bold ${
                portfolio.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {portfolio.dailyChange.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center">
            {totalGainLoss >= 0 ? (
              <TrendingUp className="text-green-500 mr-1" size={20} />
            ) : (
              <TrendingDown className="text-red-500 mr-1" size={20} />
            )}
            <div>
              <p className="text-sm text-gray-600">Total Gain/Loss</p>
              <p className={`text-lg font-bold ${
                totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                ${Math.abs(totalGainLoss).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Symbol</th>
              <th className="text-right py-2">Shares</th>
              <th className="text-right py-2">Avg Price</th>
              <th className="text-right py-2">Current</th>
              <th className="text-right py-2">Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.stocks.map((stock) => {
              const totalValue = stock.shares * stock.currentPrice;
              const totalCost = stock.shares * stock.averagePrice;
              const gainLoss = totalValue - totalCost;
              const gainLossPercent = (gainLoss / totalCost) * 100;

              return (
                <tr key={stock.symbol} className="border-b">
                  <td className="py-2">{stock.symbol}</td>
                  <td className="text-right">{stock.shares}</td>
                  <td className="text-right">${stock.averagePrice.toFixed(2)}</td>
                  <td className="text-right">${stock.currentPrice.toFixed(2)}</td>
                  <td className={`text-right ${gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {gainLoss >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};