import { X } from 'lucide-react';

export function PDPAModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
            HRVenus PDPA Policy
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

        {/* Content */}
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
                HRVenus is committed to complying with Malaysia's Personal Data Protection Act 2010 (Act 709). We respect the privacy of all HR users and employees whose personal information is processed through the HRVenus platform. This Privacy Policy explains how data is collected, used, stored, and protected as part of HR task management, employee workflows, and administrative functions.
              </p>
            </section>

            {/* 1. Personal Data Collection */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                1. Personal Data Collection
              </h3>
              <p style={{ lineHeight: '1.625', marginBottom: '0.5rem' }}>
                The HRVenus system may collect and process the following data:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>HR admin and user details (name, email, role)</li>
                <li>Employee information (name, department, position)</li>
                <li>Task assignments, workflow logs, deadlines</li>
                <li>Performance-related notes (if entered by HR)</li>
                <li>Attendance, leave, and internal HR documentation (if enabled)</li>
                <li>System access logs, device information, and security metadata</li>
                <li>Uploaded HR documents (e.g., memos, forms, approvals)</li>
              </ul>
            </section>

            {/* 2. Purpose of Data Processing */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                2. Purpose of Data Processing
              </h3>
              <p style={{ lineHeight: '1.625', marginBottom: '0.5rem' }}>
                Personal data is collected and processed for the following:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>HR task management and workflow operations</li>
                <li>Employee record management and HR administration</li>
                <li>Performance review tracking and HR decision support</li>
                <li>Internal communication and operational coordination</li>
                <li>Generating HR analytics and organizational insights</li>
                <li>Platform security, authentication, and role-based access</li>
                <li>To enhance system features and improve user experience</li>
              </ul>
            </section>

            {/* 3. Rights Under Malaysia PDPA */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                3. Rights Under Malaysia PDPA
              </h3>
              <p style={{ lineHeight: '1.625', marginBottom: '0.5rem' }}>
                Individuals whose data is processed through HRVenus have the right to:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li><strong>Access</strong> — Request access to their personal data</li>
                <li><strong>Correction</strong> — Request corrections to inaccurate or incomplete data</li>
                <li><strong>Withdraw Consent</strong> — Withdraw consent for data processing (subject to HR policies)</li>
                <li><strong>Deletion</strong> — Request deletion of data no longer required</li>
                <li><strong>Portability</strong> — Request a copy of their personal data (data portability)</li>
              </ul>
              <p style={{ lineHeight: '1.625', marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                Some rights may be limited due to employment regulations or organizational data retention requirements.
              </p>
            </section>

            {/* 4. Data Security & Retention */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                4. Data Security & Retention
              </h3>
              <p style={{ lineHeight: '1.625', marginBottom: '0.5rem' }}>
                HRVenus applies strict security practices including:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginBottom: '0.75rem' }}>
                <li>Encrypted data storage and secure transmission</li>
                <li>Role-based access control (RBAC)</li>
                <li>Secure authentication and system audit trails</li>
              </ul>
              <p style={{ lineHeight: '1.625' }}>
                Data retention follows the organization's HR policies, legal obligations, and operational needs. Once data is no longer required, it will be securely removed.
              </p>
            </section>

            {/* 5. Employee Data Processing */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                5. Employee Data Processing
              </h3>
              <p style={{ lineHeight: '1.625', marginBottom: '0.5rem' }}>
                HRVenus functions as a platform enabling organizations to manage HR operations. The organization using HRVenus remains the primary data controller. HRVenus ensures:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>No employee data is sold to third parties</li>
                <li>HR documents and records are only accessible to authorized personnel</li>
                <li>Sensitive data (e.g., internal notes) is stored safely and confidentially</li>
                <li>Only anonymized, non-identifiable usage data may be used for system improvement</li>
              </ul>
            </section>

            {/* 6. Data Sharing & Disclosure */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                6. Data Sharing & Disclosure
              </h3>
              <p style={{ lineHeight: '1.625', marginBottom: '0.5rem' }}>
                HRVenus does not share data for advertising or external marketing. Data may only be disclosed to:
              </p>
              <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>Authorized HR personnel within your organization</li>
                <li>Technical service providers (cloud hosting, infrastructure) strictly for platform operation</li>
                <li>Regulatory or legal authorities when required by law</li>
              </ul>
            </section>

            {/* 7. Contact for PDPA Requests */}
            <section>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '0.75rem'
              }}>
                7. Contact for PDPA Requests
              </h3>
              <p style={{ lineHeight: '1.625' }}>
                For PDPA inquiries, data access, corrections, or privacy concerns, users may contact your organization's Data Protection Officer (DPO) or the HRVenus support team.
              </p>
            </section>

            {/* 8. Updates to This Policy */}
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
                HRVenus may update this Privacy Policy periodically due to new features, legal requirements, or improvements in data practices. Significant changes will be communicated through the platform.
              </p>
            </section>

            {/* Data Rights Box */}
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
                You have control over your HRVenus data:
              </p>
              <ul style={{
                paddingLeft: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                fontSize: '0.875rem',
                color: '#166534'
              }}>
                <li>Access your account and HR records</li>
                <li>Request data corrections</li>
                <li>Request deletion when allowed</li>
                <li>Control how your employee data is used</li>
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
                For more information about Malaysia's Personal Data Protection Act 2010:
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
                By creating an account, you acknowledge that you have read and agree to this PDPA policy and consent to the collection and processing of your personal data.
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
              color: 'white',
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