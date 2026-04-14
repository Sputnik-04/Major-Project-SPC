import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { SensorReading } from '../types';

interface SnapshotChartProps {
  latest: SensorReading;
}

export const SnapshotChart: React.FC<SnapshotChartProps> = ({ latest }) => {
  // Normalize values for visual representation (0-100 scale)
  const data = [
    { name: 'CO₂ %', value: Math.min((latest.co2 / 2000) * 100, 100), color: '#3DCD58' },
    { name: 'Temp %', value: Math.min((latest.temperature / 50) * 100, 100), color: '#c94e24' },
    { name: 'Humidity %', value: latest.humidity, color: '#1a7fc1' },
  ];

  return (
    <div className="glass-panel p-5 h-[350px] flex flex-col">
      <h3 className="text-[10px] tracking-[0.18em] uppercase text-dim font-semibold mb-6">
        Latest Snapshot
      </h3>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationDuration={500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid #d4e6d4',
                borderRadius: '6px',
                fontSize: '11px'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              align="center"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
