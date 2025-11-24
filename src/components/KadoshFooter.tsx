import React from 'react';
import kadoshLogo from '../assets/kadosh AI.png';

export const KadoshFooter = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <span className="text-sm text-slate-500 font-medium">Powered by</span>
        <div className="flex items-center gap-3 bg-slate-900/50 rounded-lg px-4 py-2">
          <img src={kadoshLogo} alt="Kadosh AI" className="h-7 object-contain" />
          <span className="font-semibold text-slate-200 text-sm">
            Kadosh <span className="text-cyan-400">AI</span>
          </span>
        </div>
      </div>
    </footer>
  );
};