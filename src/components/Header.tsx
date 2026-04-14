import React from 'react';
import { Activity, Clock, Database } from 'lucide-react';

interface HeaderProps {
  timestamp: string;
  totalRecords: number;
}

export const Header: React.FC<HeaderProps> = ({ timestamp, totalRecords }) => {
  return (
    <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border px-8 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="bg-accent p-1.5 rounded-md">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <h1 className="font-display font-extrabold text-lg tracking-widest uppercase">
          BMS <span className="text-dim font-normal">/ Sensor Dashboard</span>
        </h1>
      </div>

      <div className="flex items-center gap-8 text-[10px] font-mono uppercase tracking-wider text-dim">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow shadow-[0_0_8px_var(--color-accent)]" />
          <span className="text-text font-bold">Live</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3" />
          <span>{timestamp || '--:--:--'}</span>
        </div>

        <div className="flex items-center gap-2">
          <Database className="w-3 h-3" />
          <span>{totalRecords} Records</span>
        </div>
      </div>
    </header>
  );
};
