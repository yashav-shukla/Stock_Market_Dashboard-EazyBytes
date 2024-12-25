import React from 'react';
import { PriceChange } from '../common/PriceChange';
import { formatCurrency } from '../../utils/formatters';

interface PortfolioHeaderProps {
  totalValue: number;
  dailyChange: number;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({ totalValue, dailyChange }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">My Portfolio</h2>
      <div className="text-right">
        <p className="text-xl font-bold">{formatCurrency(totalValue)}</p>
        <PriceChange value={dailyChange} percentage />
      </div>
    </div>
  );
};