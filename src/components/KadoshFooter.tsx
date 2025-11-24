import React from 'react';

export const KadoshFooter = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm text-slate-400">
        <span>Powered by</span>
        <div className="flex items-center gap-2">
          {/* Kadosh AI Logo - Replace with your actual logo path */}
          <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
            K
          </div>
          <span className="font-semibold">
            <span className="text-slate-200">Kadosh</span>
            <span className="text-cyan-400 ml-1">AI</span>
          </span>
        </div>
      </div>
    </footer>
  );
};