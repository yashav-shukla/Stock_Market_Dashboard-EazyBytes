import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface VolumeData {
  timestamp: string;
  volume: number;
  price: number;
}

interface VolumeAnalysisProps {
  data: VolumeData[];
}

export const VolumeAnalysis: React.FC<VolumeAnalysisProps> = ({ data }) => {
  const averageVolume = data.reduce((acc, curr) => acc + curr.volume, 0) / data.length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Volume Analysis</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis 
              dataKey="timestamp"
              tickFormatter={(value) => format(new Date(value), 'HH:mm')}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(value) => format(new Date(value), 'MMM dd, yyyy HH:mm')}
              formatter={(value: number) => [value.toLocaleString(), 'Volume']}
            />
            <Bar
              dataKey="volume"
              fill="#93c5fd"
              opacity={0.8}
              name="Volume"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Average Volume: {averageVolume.toLocaleString()}
      </div>
    </div>
  );
};