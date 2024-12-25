import React from 'react';
import type { Portfolio as PortfolioType } from '../../types/stock';
import { PortfolioHeader } from './PortfolioHeader';
import { PortfolioTable } from './PortfolioTable';

interface PortfolioProps {
  portfolio: PortfolioType;
}

export const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <PortfolioHeader 
        totalValue={portfolio.totalValue} 
        dailyChange={portfolio.dailyChange} 
      />
      <PortfolioTable stocks={portfolio.stocks} />
    </div>
  );
};