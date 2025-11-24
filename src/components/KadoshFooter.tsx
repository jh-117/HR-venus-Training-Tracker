import React from 'react';
import kadoshLogo from '../assets/kadosh AI.png';

export const KadoshFooter = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm text-slate-400">
        <span>Powered by</span>
        <div className="flex items-center gap-2">
          <img src={kadoshLogo} alt="Kadosh AI" className="h-6 object-contain" />
          <span className="font-semibold text-slate-200">Kadosh <span className="text-cyan-400">AI</span></span>
        </div>
      </div>
    </footer>
  );
};