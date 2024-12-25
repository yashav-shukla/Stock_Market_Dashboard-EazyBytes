import React from 'react';
import { TrendingUp, TrendingDown, Activity, Target } from 'lucide-react';

interface MetricsProps {
  totalReturn: number;
  annualizedReturn: number;
  sharpeRatio: number;
  beta: number;
}

export const PerformanceMetrics: React.FC<MetricsProps> = ({
  totalReturn,
  annualizedReturn,
  sharpeRatio,
  beta
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Total Return</span>
          <TrendingUp className={`${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`} size={20} />
        </div>
        <p className={`text-2xl font-bold ${totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {totalReturn.toFixed(2)}%
        </p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Annual Return</span>
          <Activity className="text-blue-500" size={20} />
        </div>
        <p className="text-2xl font-bold text-blue-600">
          {annualizedReturn.toFixed(2)}%
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Sharpe Ratio</span>
          <Target className="text-purple-500" size={20} />
        </div>
        <p className="text-2xl font-bold text-purple-600">
          {sharpeRatio.toFixed(2)}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Beta</span>
          <Activity className="text-orange-500" size={20} />
        </div>
        <p className="text-2xl font-bold text-orange-600">
          {beta.toFixed(2)}
        </p>
      </div>
    </div>
  );
};