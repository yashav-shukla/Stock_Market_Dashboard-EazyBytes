import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend, Brush 
} from 'recharts';
import { format } from 'date-fns';

interface ChartData {
  timestamp: string;
  price: number;
  volume: number;
}

interface InteractiveChartProps {
  data: ChartData[];
  symbol: string;
}

export const InteractiveChart: React.FC<InteractiveChartProps> = ({ data, symbol }) => {
  const [timeRange, setTimeRange] = useState('1D');

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">{symbol} Price Chart</h3>
        <div className="space-x-2">
          {['1D', '1W', '1M', '3M', '1Y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded ${
                timeRange === range 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(value) => format(new Date(value), 'HH:mm')}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip
              labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy HH:mm')}
              formatter={(value: number, name: string) => [
                name === 'price' ? `$${value.toFixed(2)}` : value.toLocaleString(),
                name === 'price' ? 'Price' : 'Volume'
              ]}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              strokeWidth={2}
              dot={false}
              name="Price"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="volume"
              stroke="#9333ea"
              strokeWidth={2}
              dot={false}
              name="Volume"
            />
            <Brush dataKey="timestamp" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};