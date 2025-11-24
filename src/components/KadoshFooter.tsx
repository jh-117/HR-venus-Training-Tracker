import React from 'react';
import kadoshLogo from '../assets/kadosh AI.png';


export function KadoshFooter() {
  return (
    <footer className="w-full border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-slate-500">Powered by</span>
          <a
            href="https://kadosh.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-200 hover:scale-105"
          >
            <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">K</span>
            </div>
            <span className="font-semibold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Kadosh AI
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}