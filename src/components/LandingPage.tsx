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
      style={{
        backgroundColor: '#020617',
        color: '#f1f5f9',
        minHeight: '100vh'
      }}
    >
       <BackgroundMusic src={themeMusic} />
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '3rem 2rem'
        }}
      >

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
              HR<span style={{ color: '#94a3b8' }}>Venus</span>
            </span>
          </div>

          <Button
            variant="outline"
            onClick={onGetStarted}
            style={{
              borderColor: '#334155',
              color: '#cbd5e1',
              borderRadius: '0.75rem',
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem'
            }}
          >
            Sign In
          </Button>
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

        {/* CTA */}
        <section
          style={{
            borderRadius: '1.5rem',
            padding: '3rem 2rem',
            textAlign: 'center',
            marginBottom: '7rem',
            background: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}
        >
          <h2
            style={{
              color: '#f1f5f9',
              fontSize: 'clamp(1.875rem, 4vw, 2.25rem)',
              lineHeight: '1.2',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }}
          >
            Ready to optimize your training workflow?
          </h2>
          <p
            style={{
              maxWidth: '42rem',
              margin: '0 auto 2.5rem',
              color: '#94a3b8',
              fontSize: '1.125rem',
              lineHeight: '1.75'
            }}
          >
            Teams trust HRVenus to run structured, accountable training preparation.
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            style={{
              background: 'linear-gradient(to right, #3b82f6, #6366f1)',
              color: '#ffffff',
              boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
              fontSize: '1.125rem',
              fontWeight: '600',
              paddingLeft: '3rem',
              paddingRight: '3rem',
              paddingTop: '1.75rem',
              paddingBottom: '1.75rem',
              borderRadius: '0.75rem'
            }}
          >
            Create Your Account
          </Button>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            paddingTop: '2.5rem',
            textAlign: 'center',
            borderTop: '1px solid rgba(30, 41, 59, 0.8)'
          }}
        >
          <p
            style={{
              marginBottom: '1rem',
              color: '#64748b',
              fontSize: '0.875rem'
            }}
          >
            Powered by
          </p>
          <img
            src={kadoshLogo}
            alt="Kadosh AI"
            style={{
              margin: '0 auto',
              height: '2.5rem',
              opacity: '0.8',
              transition: 'opacity 0.15s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          />
        </footer>
      </div>
    </div>
  );
}
