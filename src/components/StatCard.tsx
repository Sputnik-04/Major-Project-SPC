import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit: string;
  color?: string;
  accentColor?: string;
  badge?: string;
  badgeClass?: string;
  progress?: number;
  subValue?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  color,
  accentColor,
  badge,
  badgeClass,
  progress,
  subValue,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-panel p-5 relative overflow-hidden group transition-all duration-300 hover:border-accent",
        className
      )}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-0.5 opacity-70"
        style={{ backgroundColor: accentColor || 'var(--color-accent)' }}
      />
      
      <div className="flex flex-col gap-1">
        <span className="text-[10px] tracking-[0.18em] uppercase text-dim font-medium">
          {label}
        </span>
        
        <div className="flex items-baseline gap-2">
          <span 
            className="font-display font-extrabold text-4xl leading-none"
            style={{ color: color || 'var(--color-accent)' }}
          >
            {value}
          </span>
          <span className="text-xs text-dim font-mono">{unit}</span>
        </div>

        {progress !== undefined && (
          <div className="mt-3 bg-dim/10 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full"
              style={{ backgroundColor: color || 'var(--color-accent)' }}
            />
          </div>
        )}

        {badge && (
          <div className={cn(
            "mt-3 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider border",
            badgeClass || "border-border text-dim"
          )}>
            {badge}
          </div>
        )}

        {subValue && (
          <div className="mt-2 text-[10px] text-dim font-mono uppercase tracking-wider">
            {subValue}
          </div>
        )}
      </div>
    </motion.div>
  );
};
