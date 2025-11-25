import { X } from 'lucide-react';
import { useState } from 'react';

export function PDPAModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        maxWidth: '42rem',
        width: '100%',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0
        }}>
          <h2 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#111827'
          }}>
            Personal Data Protection Act (PDPA) Policy
          </h2>
          <button
            onClick={onClose}
            style={{
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            aria-label="Close modal"
          >
            <X style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div style={{
          overflowY: 'auto',
          flex: 1,
          padding: '1.5rem',
          color: '#374151'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Introduction */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                Introduction
              </h3>
              <p style={{ lineHeight: '1.625' }}>
                This platform is committed to complying with Malaysia's Personal Data Protection Act 2010 (Act 709).
                We respect your privacy and are dedicated to protecting your personal data. This policy explains
                how we collect, use, and safeguard your information in accordance with PDPA requirements.
              </p>
            </section>

            {/* Section 1 */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                1. Data Collection
              </h3>
              <p style={{ lineHeight: '1.625', marginBottom: '0.5rem' }}>
                We collect the following personal information from you:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>Full name and email address (for account creation and authentication)</li>
                <li>Current role and department (for professional context)</li>
                <li>Your responses to strength discovery assessments and questionnaires</li>
                <li>Personality trait analysis results based on the Five Big Personality model</li>
                <li>Career preferences, skills, and interests you provide</li>
                <li>Application history and role interactions on the platform</li>
                <li>Usage data and interaction logs (for improving user experience)</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                2. Purpose of Collection
              </h3>
              <p style={{ lineHeight: '1.625', marginBottom: '0.5rem' }}>
                Your personal data is collected and used for the following purposes:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>To create and manage your user account</li>
                <li>To conduct personality analysis using the Five Big Personality Traits framework</li>
                <li>To provide AI-powered career recommendations tailored to your unique profile</li>
                <li>To match you with suitable job roles based on your strengths and preferences</li>
                <li>To generate personalized career reports and insights</li>
                <li>To improve our AI algorithms and recommendation accuracy</li>
                <li>To communicate important updates and notifications</li>
                <li>To ensure platform security and prevent unauthorized access</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                3. Your Rights Under PDPA
              </h3>
              <p style={{ lineHeight: '1.625', marginBottom: '0.5rem' }}>
                As a data subject under Malaysia's PDPA, you have the following rights:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li><strong>Right to Access:</strong> Request access to your personal data we hold</li>
                <li><strong>Right to Correction:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
                <li><strong>Right to Data Portability:</strong> Request your data in a transferable format</li>
                <li><strong>Right to Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                4. Data Security and Retention
              </h3>
              <p style={{ lineHeight: '1.625' }}>
                We implement appropriate technical and organizational security measures to protect your personal
                data from unauthorized access, disclosure, alteration, or destruction. Your data is stored securely
                using industry-standard encryption and access controls. We retain your data only for as long as
                necessary to fulfill the purposes outlined in this policy or as required by law.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                5. Personality Analysis and AI Processing
              </h3>
              <p style={{ lineHeight: '1.625', marginBottom: '0.75rem' }}>
                Our platform uses the Five Big Personality Traits model (Openness, Conscientiousness,
                Extraversion, Agreeableness, and Neuroticism) to analyze your strengths and provide
                career recommendations. Here's what you should know:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>
                  <strong>Automated Analysis:</strong> Your responses are processed by AI algorithms
                  to determine your personality profile and match you with suitable career paths.
                </li>
                <li>
                  <strong>Data Privacy:</strong> Your personality analysis results are stored securely
                  and are only accessible to you and authorized system administrators.
                </li>
                <li>
                  <strong>No Third-Party Sharing:</strong> Your personality data and analysis results
                  are never shared with employers, recruiters, or third parties without your explicit consent.
                </li>
                <li>
                  <strong>Anonymized Research:</strong> Aggregated, anonymized data may be used to
                  improve our AI models and platform performance, but cannot be traced back to you.
                </li>
                <li>
                  <strong>Voluntary Participation:</strong> While personality analysis is required for
                  core features, you can delete your data at any time by contacting support.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                6. Data Sharing and Disclosure
              </h3>
              <p style={{ lineHeight: '1.625' }}>
                We do not sell, rent, or share your personal data with third parties for marketing
                purposes without your explicit consent. Data may only be shared when required by law or with
                your explicit permission. When applying to roles through our platform, only the information
                you explicitly choose to share in your application will be visible to potential employers.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                7. Contact Information
              </h3>
              <p style={{ lineHeight: '1.625' }}>
                For any questions, concerns, or to exercise your rights under PDPA, please contact us through
                the platform's support system or reach out to our Data Protection Officer.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                8. Updates to This Policy
              </h3>
              <p style={{ lineHeight: '1.625' }}>
                We may update this PDPA policy from time to time to reflect changes in our practices or legal
                requirements. Users will be notified of significant changes through the platform.
              </p>
            </section>

            {/* Data Protection Rights Box */}
            <section style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '0.5rem',
              padding: '1rem'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#166534',
                marginBottom: '0.5rem'
              }}>
                Your Data Protection Rights
              </h3>
              <p style={{ lineHeight: '1.625', color: '#166534', marginBottom: '0.5rem' }}>
                We are committed to transparency and giving you control over your data:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem', color: '#166534' }}>
                <li>View or download your complete personality analysis at any time</li>
                <li>Request correction of any inaccurate information in your profile</li>
                <li>Delete your account and all associated data permanently</li>
                <li>Opt out of AI-based recommendations (with limited platform functionality)</li>
                <li>Export your data in a portable format</li>
              </ul>
            </section>

            {/* PDPA Resources Box */}
            <section style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '0.5rem',
              padding: '1rem'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1e40af',
                marginBottom: '0.5rem'
              }}>
                Official PDPA Resources
              </h3>
              <p style={{ lineHeight: '1.625', color: '#1e40af', marginBottom: '0.75rem' }}>
                For more information about Malaysia's Personal Data Protection Act 2010, please visit:
              </p>
              <a
                href="http://www.pdp.gov.my"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#2563eb',
                  textDecoration: 'underline',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#1d4ed8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#2563eb'}
              >
                Official PDPA Website: www.pdp.gov.my
              </a>
            </section>

            {/* Footer */}
            <section style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: '#4b5563', fontStyle: 'italic' }}>
                By checking the consent box and creating an account, you acknowledge that you have read,
                understood, and agree to this PDPA policy. You consent to the collection, use, and
                processing of your personal data, including personality analysis using the Five Big Personality
                Traits framework, as described above.
              </p>
            </section>
          </div>
        </div>

        {/* Footer Button */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderTop: '1px solid #e5e7eb',
          padding: '1rem 1.5rem',
          flexShrink: 0
        }}>
          <button
            onClick={onClose}
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
              color: '#000000',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontWeight: '500',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}