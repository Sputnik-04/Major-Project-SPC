import React from 'react';

export const StatusFooter: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-surface border-t-2 border-accent px-6 py-1.5 flex items-center gap-6 text-[10px] text-dim font-mono uppercase tracking-wider z-50">
      <div className="flex items-center gap-2">
        <span className="text-text font-bold">System:</span>
        <span>BMS-CORE-V2</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-text font-bold">Refresh:</span>
        <span>3000ms</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-text font-bold">Source:</span>
        <span>Internal_Stream</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-text font-bold">Status:</span>
        <span className="text-accent">Operational</span>
      </div>
    </footer>
  );
};
