import React from "react";
import { Button } from "./ui/button";
import { Folder, CheckCircle2, BarChart3, Users, ArrowRight } from "lucide-react";
import kadoshLogo from "../assets/kadoshAI.png";
import { PDPAModal } from './PDPAModel';
import BackgroundMusic from './BackgroundMusic';
import themeMusic from '../assets/training-theme.mp3';

interface LandingPageProps {
  onGetStarted: () => void;
  onPrivacyPolicyClick: () => void;
}



export function LandingPage({ onGetStarted, onPrivacyPolicyClick }: LandingPageProps) {
  return (
    <div
      style={{
        backgroundColor: '#020617',
        color: '#f1f5f9',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '3rem 2rem',
          flex: '1'
        }}
      >
        <BackgroundMusic src={themeMusic} />
        {/* NAV */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '7rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div
              style={{
                display: 'flex',
                height: '3rem',
                width: '3rem',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '0.75rem',
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
              }}
            >
              <Folder style={{ height: '1.5rem', width: '1.5rem', color: '#ffffff' }} />
            </div>
            <span
              style={{
                color: '#f1f5f9',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}
            >
              Tick<span style={{ color: '#94a3b8' }}>Ready</span>
            </span>
          </div>

        </nav>

        {/* HERO */}
        <section
          style={{
            textAlign: 'center',
            marginBottom: '9rem'
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(3rem, 8vw, 4.5rem)',
              lineHeight: '1.1',
              fontWeight: '800',
              letterSpacing: '-0.025em',
              marginBottom: '2rem'
            }}
          >
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
            style={{
              maxWidth: '48rem',
              margin: '0 auto 3rem',
              color: '#94a3b8',
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: '1.6'
            }}
          >
            Streamline training preparation with structured tasks, visibility, and real-time progress.
          </p>

          <Button
            size="lg"
            onClick={onGetStarted}
            style={{
              background: 'linear-gradient(to right, #3b82f6, #6366f1)',
              color: '#ffffff',
              boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.3)',
              fontSize: '1.125rem',
              fontWeight: '600',
              paddingLeft: '3rem',
              paddingRight: '3rem',
              paddingTop: '1.75rem',
              paddingBottom: '1.75rem',
              borderRadius: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'all 0.15s'
            }}
          >
            Get Started
            <ArrowRight style={{ marginLeft: '0.75rem', height: '1.25rem', width: '1.25rem' }} />
          </Button>
        </section>

        {/* FEATURES */}
        <section
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            marginBottom: '10rem'
          }}
        >
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
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                padding: '2rem',
                transition: 'transform 0.15s',
                cursor: 'default'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-0.25rem)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div
                style={{
                  marginBottom: '1.5rem',
                  display: 'flex',
                  height: '4rem',
                  width: '4rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '1rem',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  color: '#60a5fa'
                }}
              >
                {React.cloneElement(item.icon, {
                  style: { height: '2rem', width: '2rem' }
                })}
              </div>
              <h3
                style={{
                  color: '#f1f5f9',
                  fontSize: '1.5rem',
                  lineHeight: '1.3',
                  fontWeight: '600',
                  marginBottom: '0.75rem'
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  color: '#94a3b8',
                  fontSize: '1rem',
                  lineHeight: '1.625'
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        
      </div>

      {/* FOOTER - Updated to match correct example structure */}
      <footer
        style={{
          backgroundColor: '#0f172a',
          borderTop: '1px solid #334155',
          padding: '2rem 0'
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 2rem'
          }}
        >
          {/* Privacy Policy Link Section */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem'
            }}
          >
            <button
              onClick={onPrivacyPolicyClick}
              style={{
                color: '#94a3b8',
                fontSize: '1rem',
                fontWeight: '500',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#60a5fa'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
            >
              Privacy Policy
            </button>
          </div>

          {/* Copyright Footer Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              fontSize: '0.875rem',
              gap: '0.75rem'
            }}
          >
            <span>Copyright © {new Date().getFullYear()}</span>
            <img
              src={kadoshLogo}
              alt="Kadosh AI"
              style={{
                height: '1.25rem',
                width: 'auto'
              }}
            />
            <span>All rights reserved</span>
          </div>
        </div>
      </footer>
    </div>
  );
}