import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SensorReading } from '../types';

interface TrendChartProps {
  data: SensorReading[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  // Reverse history for chart (oldest to newest)
  const chartData = [...data].reverse();

  return (
    <div className="glass-panel p-5 h-[350px] flex flex-col">
      <h3 className="text-[10px] tracking-[0.18em] uppercase text-dim font-semibold mb-6">
        CO₂ / Temp / Humidity — History
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#d4e6d4" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              stroke="#6b8c6b" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis 
              yAxisId="left"
              stroke="#3DCD58" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              domain={[0, 'auto']}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              stroke="#1a7fc1" 
              fontSize={10} 
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #d4e6d4',
                borderRadius: '6px',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <Legend 
              verticalAlign="top" 
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '20px' }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="co2"
              name="CO₂ (ppm)"
              stroke="#3DCD58"
              strokeWidth={2}
              dot={{ r: 2, fill: '#3DCD58' }}
              activeDot={{ r: 4 }}
              animationDuration={500}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="temperature"
              name="Temp (°C)"
              stroke="#c94e24"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={{ r: 2, fill: '#c94e24' }}
              animationDuration={500}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              name="Humidity (%)"
              stroke="#1a7fc1"
              strokeWidth={1.5}
              strokeDasharray="2 2"
              dot={{ r: 2, fill: '#1a7fc1' }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
