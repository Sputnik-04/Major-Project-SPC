import React from 'react';
import { SensorReading } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface HistoryTableProps {
  history: SensorReading[];
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  const getCO2Status = (v: number) => {
    if (v < 600) return { label: 'GOOD', color: 'text-accent border-accent bg-accent/10' };
    if (v < 1000) return { label: 'MODERATE', color: 'text-warn border-warn bg-warn/10' };
    return { label: 'HIGH', color: 'text-danger border-danger bg-danger/10' };
  };

  return (
    <div className="glass-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-accent-dark text-white uppercase text-[10px] tracking-widest font-bold">
              <th className="px-6 py-3">Timestamp</th>
              <th className="px-6 py-3">Room</th>
              <th className="px-6 py-3">CO₂ (ppm)</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Temp (°C)</th>
              <th className="px-6 py-3">Humidity (%)</th>
            </tr>
          </thead>
          <tbody className="font-mono text-[11px]">
            <AnimatePresence initial={false}>
              {history.map((reading, idx) => {
                const status = getCO2Status(reading.co2);
                return (
                  <motion.tr
                    key={`${reading.timestamp}-${idx}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-border hover:bg-accent/5 transition-colors group"
                  >
                    <td className="px-6 py-3 text-dim">{reading.timestamp}</td>
                    <td className="px-6 py-3 font-sans font-medium">{reading.room}</td>
                    <td className="px-6 py-3 font-bold" style={{ color: status.label === 'HIGH' ? 'var(--color-danger)' : status.label === 'MODERATE' ? 'var(--color-warn)' : 'var(--color-accent)' }}>
                      {reading.co2}
                    </td>
                    <td className="px-6 py-3">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full border text-[9px] font-bold",
                        status.color
                      )}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-3">{reading.temperature}</td>
                    <td className="px-6 py-3">{reading.humidity}</td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
            {history.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-dim font-sans italic">
                  Waiting for incoming sensor data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
