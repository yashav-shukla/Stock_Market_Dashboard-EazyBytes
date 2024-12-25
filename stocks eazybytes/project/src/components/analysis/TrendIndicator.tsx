import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { MarketTrend } from '../../types/market';

interface TrendIndicatorProps {
  trend: MarketTrend;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ trend }) => {
  const getStrengthColor = (strength: number) => {
    if (strength >= 70) return 'text-green-500';
    if (strength <= 30) return 'text-red-500';
    return 'text-yellow-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Market Trend</h3>
        {trend.direction === 'up' && <TrendingUp className="text-green-500" />}
        {trend.direction === 'down' && <TrendingDown className="text-red-500" />}
        {trend.direction === 'neutral' && <Minus className="text-yellow-500" />}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Strength</span>
          <span className={getStrengthColor(trend.strength)}>
            {trend.strength.toFixed(1)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Change</span>
          <span className={trend.priceChange >= 0 ? 'text-green-500' : 'text-red-500'}>
            {trend.priceChange.toFixed(2)}%
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Volume</span>
          <span className="text-gray-900">
            {trend.volume.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};