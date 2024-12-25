import React, { useState } from 'react';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { formatCurrency } from '../../utils/formatters';

interface TradeFormProps {
  symbol: string;
  currentPrice: number;
}

export const TradeForm: React.FC<TradeFormProps> = ({ symbol, currentPrice }) => {
  const [shares, setShares] = useState('');
  const addStock = usePortfolioStore((state) => state.addStock);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addStock(symbol, Number(shares), currentPrice);
      setShares('');
    } catch (error) {
      console.error('Trade failed:', error);
    }
  };

  const totalValue = Number(shares) * currentPrice;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="shares" className="block text-sm font-medium text-gray-700">
          Number of Shares
        </label>
        <input
          type="number"
          id="shares"
          min="1"
          step="1"
          value={shares}
          onChange={(e) => setShares(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div className="text-sm text-gray-600">
        <p>Current Price: {formatCurrency(currentPrice)}</p>
        <p>Total Value: {formatCurrency(totalValue)}</p>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
      >
        Buy Shares
      </button>
    </form>
  );
};