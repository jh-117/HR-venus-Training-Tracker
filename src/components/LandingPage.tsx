import React from 'react';
import { Button } from './ui/button';
import { Folder, CheckCircle2, BarChart3, Users, ArrowRight } from 'lucide-react';
import kadoshLogo from '../assets/kadoshAI.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(to bottom, #020617, #020617, #0f172a)',
        color: '#f1f5f9',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-12 max-w-7xl" style={{ color: '#f1f5f9' }}>
        <nav className="flex items-center justify-between mb-24 lg:mb-32">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#ffffff',
                boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.25)',
              }}
            >
              <Folder className="h-7 w-7" />
            </div>
            <span className="text-3xl font-bold" style={{ color: '#f1f5f9' }}>
              HR<span style={{ color: '#94a3b8' }}>Venus</span>
            </span>
          </div>
          <Button
            onClick={onGetStarted}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 px-6 py-5 rounded-xl transition-all"
            style={{
              borderColor: '#334155',
              color: '#cbd5e1',
            }}
          >
            Sign In
          </Button>
        </nav>

        <div className="text-center mb-32 lg:mb-40">
          <h1
            className="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tight mb-8 leading-tight"
            style={{
              background: 'linear-gradient(to right, #60a5fa, #93c5fd, #cbd5e1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Pre Training Action Tracker
          </h1>
          <p
            className="text-xl sm:text-2xl lg:text-3xl max-w-4xl mx-auto mb-12 leading-relaxed font-light"
            style={{ color: '#94a3b8' }}
          >
            Streamline your training preparation with intelligent task tracking and real-time progress monitoring
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="text-lg px-12 py-7 h-auto rounded-xl transition-all group"
            style={{
              background: 'linear-gradient(to right, #2563eb, #3b82f6)',
              color: '#ffffff',
              boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.25)',
            }}
          >
            Get Started
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-32 lg:mb-40">
          <div
            className="flex-1 rounded-3xl p-10 lg:p-14 hover:-translate-y-1 transition-all duration-300 group"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))',
              border: '1px solid rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))',
                color: '#60a5fa',
              }}
            >
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-bold mb-5" style={{ color: '#f1f5f9' }}>
              Task Management
            </h3>
            <p className="text-lg leading-relaxed font-light" style={{ color: '#94a3b8' }}>
              Organize and track all pre-training activities through customizable phases and steps
            </p>
          </div>

          <div
            className="flex-1 rounded-3xl p-10 lg:p-14 hover:-translate-y-1 transition-all duration-300 group"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))',
              border: '1px solid rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))',
                color: '#60a5fa',
              }}
            >
              <BarChart3 className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-bold mb-5" style={{ color: '#f1f5f9' }}>
              Progress Tracking
            </h3>
            <p className="text-lg leading-relaxed font-light" style={{ color: '#94a3b8' }}>
              Monitor completion rates and identify bottlenecks with real-time analytics
            </p>
          </div>

          <div
            className="flex-1 rounded-3xl p-10 lg:p-14 hover:-translate-y-1 transition-all duration-300 group"
            style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))',
              border: '1px solid rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              className="flex h-20 w-20 items-center justify-center rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.2))',
                color: '#60a5fa',
              }}
            >
              <Users className="h-10 w-10" />
            </div>
            <h3 className="text-3xl font-bold mb-5" style={{ color: '#f1f5f9' }}>
              Team Collaboration
            </h3>
            <p className="text-lg leading-relaxed font-light" style={{ color: '#94a3b8' }}>
              Coordinate training preparations efficiently with your entire team
            </p>
          </div>
        </div>

        <div
          className="rounded-3xl p-16 lg:p-20 text-center mb-24"
          style={{
            background: 'linear-gradient(to right, rgba(37, 99, 235, 0.1), rgba(59, 130, 246, 0.1), rgba(30, 41, 59, 0.1))',
            border: '1px solid rgba(59, 130, 246, 0.2)',
          }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#f1f5f9' }}>
            Ready to optimize your training workflow?
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed font-light" style={{ color: '#94a3b8' }}>
            Join teams that are already using HRVenus to manage their training activities more effectively
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="text-lg px-12 py-7 h-auto rounded-xl transition-all"
            style={{
              background: 'linear-gradient(to right, #2563eb, #3b82f6)',
              color: '#ffffff',
              boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.25)',
            }}
          >
            Create Your Account
          </Button>
        </div>

        <footer className="py-10 text-center" style={{ borderTop: '1px solid rgba(30, 41, 59, 0.5)' }}>
          <p className="text-sm mb-4 font-light" style={{ color: '#64748b' }}>
            Powered by
          </p>
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
