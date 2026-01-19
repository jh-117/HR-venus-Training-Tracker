import React from "react";
import { Button } from "./ui/button";
import { Folder, CheckCircle2, BarChart3, Users, ArrowRight } from "lucide-react";
import kadoshLogo from "../assets/kadoshAI.png";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12">

        {/* NAV */}
        <nav className="flex items-center justify-between mb-28">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
              <Folder className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">
              HR<span className="text-slate-400">Venus</span>
            </span>
          </div>

          <Button
            variant="outline"
            onClick={onGetStarted}
            className="border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl px-6"
          >
            Sign In
          </Button>
        </nav>

        {/* HERO */}
        <section className="text-center mb-36">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-slate-200 bg-clip-text text-transparent">
              Pre-Training Action Tracker
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-slate-400 mb-12">
            Streamline training preparation with structured tasks, visibility, and real-time progress.
          </p>

          <Button
            size="lg"
            onClick={onGetStarted}
            className="px-12 py-7 rounded-xl text-lg bg-gradient-to-r from-blue-500 to-indigo-500 shadow-xl hover:opacity-90 transition"
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
              className="rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur p-10 hover:-translate-y-1 transition"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                {React.cloneElement(item.icon, { className: "h-8 w-8" })}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-16 text-center mb-28">
          <h2 className="text-4xl font-bold mb-6">
            Ready to optimize your training workflow?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 mb-10">
            Teams trust HRVenus to run structured, accountable training preparation.
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="px-12 py-7 rounded-xl text-lg bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg"
          >
            Create Your Account
          </Button>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800 pt-10 text-center">
          <p className="text-sm text-slate-500 mb-4">Powered by</p>
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
