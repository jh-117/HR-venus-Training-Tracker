import React from 'react';
import { Button } from './ui/button';
import { Folder, CheckCircle2, BarChart3, Users, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      <div className="relative container mx-auto px-4 py-6 max-w-7xl">
        <nav className="flex items-center justify-between mb-24">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/30 bg-blue-500/10">
              <Folder className="h-5 w-5 text-blue-400" />
            </div>
            <span className="text-xl font-bold">
              HRVenus
            </span>
          </div>
          <Button
            onClick={onGetStarted}
            variant="outline"
            className="border-blue-500/30 text-white hover:bg-blue-500/10 bg-transparent"
          >
            Sign In
          </Button>
        </nav>

        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white">
            Pre Training Action Tracker
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto">
            Streamline your training preparation with intelligent task tracking and real-time progress monitoring
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-6xl mx-auto">
          <div className="bg-[#0d1f3a]/80 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 mb-4">
              <CheckCircle2 className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Task Management</h3>
            <p className="text-slate-300 leading-relaxed">
              Organize and track all pre-training activities through customizable phases and steps
            </p>
          </div>

          <div className="bg-[#0d1f3a]/80 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 mb-4">
              <BarChart3 className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Progress Tracking</h3>
            <p className="text-slate-300 leading-relaxed">
              Monitor completion rates and identify bottlenecks with real-time analytics
            </p>
          </div>

          <div className="bg-[#0d1f3a]/80 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 mb-4">
              <Users className="h-7 w-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">Team Collaboration</h3>
            <p className="text-slate-300 leading-relaxed">
              Coordinate training preparations efficiently with your entire team
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white text-base px-8 py-3 h-auto group shadow-lg shadow-blue-500/20"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
