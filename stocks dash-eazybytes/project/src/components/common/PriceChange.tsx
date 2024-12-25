import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceChangeProps {
  value: number;
  percentage?: boolean;
}

export const PriceChange: React.FC<PriceChangeProps> = ({ value, percentage = false }) => {
  const isPositive = value >= 0;
  const Icon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <span className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
      <Icon className="w-4 h-4 mr-1" />
      {value.toFixed(2)}{percentage && '%'}
    </span>
  );
};