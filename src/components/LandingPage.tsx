import React from "react";
import { Button } from "./ui/button";
import { Folder, CheckCircle2, BarChart3, Users, ArrowRight } from "lucide-react";
import kadoshLogo from "../assets/kadoshAI.png";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: '#020617',
        color: '#f1f5f9',
        minHeight: '100vh'
      }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">

        {/* NAV */}
        <nav className="flex items-center justify-between mb-28">
          <div className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
              }}
            >
              <Folder className="h-6 w-6" style={{ color: '#ffffff' }} />
            </div>
            <span className="text-2xl font-bold" style={{ color: '#f1f5f9' }}>
              HR<span style={{ color: '#94a3b8' }}>Venus</span>
            </span>
          </div>

          <Button
            variant="outline"
            onClick={onGetStarted}
            className="rounded-xl px-6"
            style={{
              borderColor: '#334155',
              color: '#cbd5e1'
            }}
          >
            Sign In
          </Button>
        </nav>

        {/* HERO */}
        <section className="text-center mb-36">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            <span
              style={{
                background: 'linear-gradient(to right, #60a5fa, #818cf8, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Pre-Training Action Tracker
            </span>
          </h1>

          <p
            className="max-w-3xl mx-auto text-xl sm:text-2xl mb-12"
            style={{ color: '#94a3b8' }}
          >
            Streamline training preparation with structured tasks, visibility, and real-time progress.
          </p>

          <Button
            size="lg"
            onClick={onGetStarted}
            className="px-12 py-7 rounded-xl text-lg transition"
            style={{
              background: 'linear-gradient(to right, #3b82f6, #6366f1)',
              color: '#ffffff',
              boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.3)'
            }}
          >
            Get Started
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </section>

        {/* FEATURES */}
        <section className="grid gap-8 lg:grid-cols-3 mb-40">
          {[
            {
              icon: <CheckCircle2 />,
              title: "Task Management",
              desc: "Break pre-training into clear phases with accountable actions."
            },
            {
              icon: <BarChart3 />,
              title: "Progress Tracking",
              desc: "Instant visibility into completion rates and bottlenecks."
            },
            {
              icon: <Users />,
              title: "Team Collaboration",
              desc: "Align HR, trainers, and stakeholders in one workspace."
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-3xl p-10 hover:-translate-y-1 transition"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: '#60a5fa'
                }}
              >
                {React.cloneElement(item.icon, { className: "h-8 w-8" })}
              </div>
              <h3 className="text-2xl font-semibold mb-3" style={{ color: '#f1f5f9' }}>
                {item.title}
              </h3>
              <p className="leading-relaxed" style={{ color: '#94a3b8' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section
          className="rounded-3xl p-16 text-center mb-28"
          style={{
            background: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}
        >
          <h2 className="text-4xl font-bold mb-6" style={{ color: '#f1f5f9' }}>
            Ready to optimize your training workflow?
          </h2>
          <p className="max-w-2xl mx-auto text-lg mb-10" style={{ color: '#94a3b8' }}>
            Teams trust HRVenus to run structured, accountable training preparation.
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="px-12 py-7 rounded-xl text-lg"
            style={{
              background: 'linear-gradient(to right, #3b82f6, #6366f1)',
              color: '#ffffff',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
            }}
          >
            Create Your Account
          </Button>
        </section>

        {/* FOOTER */}
        <footer className="pt-10 text-center" style={{ borderTop: '1px solid rgba(30, 41, 59, 0.8)' }}>
          <p className="text-sm mb-4" style={{ color: '#64748b' }}>Powered by</p>
          <img
            src={kadoshLogo}
            alt="Kadosh AI"
            className="mx-auto h-10 opacity-80 hover:opacity-100 transition"
          />
        </footer>
      </div>
    </div>
  );
}
