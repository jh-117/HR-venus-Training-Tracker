import React from 'react';
import { Button } from './ui/button';
import { Folder, CheckCircle2, BarChart3, Users, ArrowRight } from 'lucide-react';
import kadoshLogo from '../assets/kadoshAI.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 max-w-7xl">
        <nav className="flex items-center justify-between mb-24 lg:mb-32">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25">
              <Folder className="h-7 w-7" />
            </div>
            <span className="text-3xl font-bold">
              HR<span className="text-slate-400">Venus</span>
            </span>
          </div>
          <Button
            onClick={onGetStarted}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 px-6 py-5 rounded-xl transition-all"
          >
            Sign In
          </Button>
        </nav>

        <div className="text-center mb-32 lg:mb-40">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-8 bg-gradient-to-r from-blue-400 via-blue-300 to-slate-300 bg-clip-text text-transparent leading-tight">
            Pre Training Action Tracker
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-400 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
            Streamline your training preparation with intelligent task tracking and real-time progress monitoring
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg px-12 py-7 h-auto rounded-xl shadow-xl shadow-blue-600/25 hover:shadow-2xl hover:shadow-blue-600/30 transition-all group"
          >
            Get Started
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-32 lg:mb-40">
          <div className="flex-1 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur border border-slate-800/80 rounded-3xl p-10 lg:p-14 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-bold mb-5 text-slate-100">Task Management</h3>
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              Organize and track all pre-training activities through customizable phases and steps
            </p>
          </div>

          <div className="flex-1 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur border border-slate-800/80 rounded-3xl p-10 lg:p-14 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <BarChart3 className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-bold mb-5 text-slate-100">Progress Tracking</h3>
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              Monitor completion rates and identify bottlenecks with real-time analytics
            </p>
          </div>

          <div className="flex-1 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur border border-slate-800/80 rounded-3xl p-10 lg:p-14 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 text-blue-400 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Users className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-bold mb-5 text-slate-100">Team Collaboration</h3>
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              Coordinate training preparations efficiently with your entire team
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-slate-800/10 border border-blue-500/20 rounded-3xl p-16 lg:p-20 text-center mb-24">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-100">Ready to optimize your training workflow?</h2>
          <p className="text-slate-400 text-xl mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Join teams that are already using HRVenus to manage their training activities more effectively
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-lg px-12 py-7 h-auto rounded-xl shadow-xl shadow-blue-600/25 transition-all"
          >
            Create Your Account
          </Button>
        </div>

        <footer className="py-10 border-t border-slate-800/50 text-center">
          <p className="text-sm text-slate-500 mb-4 font-light">Powered by</p>
          <img
            src={kadoshLogo}
            alt="Kadosh AI"
            className="mx-auto h-10 opacity-80 hover:opacity-100 transition-opacity"
          />
        </footer>
      </div>
    </div>
  );
}
