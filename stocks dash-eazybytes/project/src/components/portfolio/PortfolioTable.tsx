import React from 'react';
import { PortfolioItem } from '../../types/stock';
import { formatCurrency } from '../../utils/formatters';
import { PriceChange } from '../common/PriceChange';

interface PortfolioTableProps {
  stocks: PortfolioItem[];
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({ stocks }) => {
  return (
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
          {stocks.map((stock) => (
            <tr key={stock.symbol} className="border-b hover:bg-gray-50">
              <td className="py-3">{stock.symbol}</td>
              <td className="text-right">{stock.shares}</td>
              <td className="text-right">{formatCurrency(stock.averagePrice)}</td>
              <td className="text-right">{formatCurrency(stock.currentPrice)}</td>
              <td className="text-right">{formatCurrency(stock.totalValue)}</td>
              <td className="text-right">
                <div className="flex justify-end">
                  <PriceChange value={stock.gain} />
                  <span className="ml-2">({stock.gainPercent.toFixed(2)}%)</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};