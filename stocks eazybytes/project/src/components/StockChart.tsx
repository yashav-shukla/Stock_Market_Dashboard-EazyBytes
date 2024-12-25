import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { StockChartData } from '../types/stock';

interface StockChartProps {
  data: StockChartData[];
  symbol: string;
}

export const StockChart: React.FC<StockChartProps> = ({ data, symbol }) => {
  return (
    <div className="h-[400px] w-full bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">{symbol} Price Chart</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={(value) => format(new Date(value), 'HH:mm')}
          />
          <YAxis />
          <Tooltip 
            labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy HH:mm')}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};