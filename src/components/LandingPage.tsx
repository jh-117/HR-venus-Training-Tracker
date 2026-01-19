import React from 'react';
import { Button } from './ui/button';
import { Folder, CheckCircle2, BarChart3, Users, ArrowRight } from 'lucide-react';
import kadoshLogo from '../assets/kadoshAI.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20 text-blue-500">
              <Folder className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">
              HR<span className="text-slate-300">Venus</span>
            </span>
          </div>
          <Button
            onClick={onGetStarted}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Sign In
          </Button>
        </nav>

        <div className="text-center mb-20">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-blue-400 to-slate-300 bg-clip-text text-transparent">
            Pre Training Action Tracker
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-8">
            Streamline your training preparation with intelligent task tracking and real-time progress monitoring
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto group"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-20">
          <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-900/50 border-2 border-slate-800 rounded-3xl p-12 hover:border-blue-600/50 hover:shadow-2xl hover:shadow-blue-600/10 transition-all group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-500 mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Task Management</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Organize and track all pre-training activities through customizable phases and steps
            </p>
          </div>

          <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-900/50 border-2 border-slate-800 rounded-3xl p-12 hover:border-blue-600/50 hover:shadow-2xl hover:shadow-blue-600/10 transition-all group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-500 mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Progress Tracking</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Monitor completion rates and identify bottlenecks with real-time analytics
            </p>
          </div>

          <div className="flex-1 bg-gradient-to-br from-slate-900 to-slate-900/50 border-2 border-slate-800 rounded-3xl p-12 hover:border-blue-600/50 hover:shadow-2xl hover:shadow-blue-600/10 transition-all group">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-500 mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Team Collaboration</h3>
            <p className="text-slate-400 text-lg leading-relaxed">
              Coordinate training preparations efficiently with your entire team
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600/10 to-slate-800/10 border border-blue-600/20 rounded-2xl p-12 text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ready to optimize your training workflow?</h2>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            Join teams that are already using HRVenus to manage their training activities more effectively
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Create Your Account
          </Button>
        </div>

        <footer className="py-6 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-400 mb-3">Powered by</p>
          <img
            src={kadoshLogo}
            alt="Kadosh AI"
            className="mx-auto h-8"
          />
        </footer>
      </div>
    </div>
  );
}
