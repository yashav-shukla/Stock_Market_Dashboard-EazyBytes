import React from 'react';
import type { Stock } from '../../types/stock';
import { WatchListTable } from './WatchListTable';

interface WatchListProps {
  stocks: Stock[];
  onAddToPortfolio: (symbol: string) => void;
}

export const WatchList: React.FC<WatchListProps> = ({ stocks, onAddToPortfolio }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Watchlist</h2>
      <WatchListTable 
        stocks={stocks} 
        onAddToPortfolio={onAddToPortfolio} 
      />
    </div>
  );
};