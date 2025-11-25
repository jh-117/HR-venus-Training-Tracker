import React from "react";

const HRVenusPDPA = () => {
  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "900px",
        margin: "0 auto",
        lineHeight: "1.7",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        HRVenus PDPA Compliance & Privacy Policy
      </h1>

      {/* INTRODUCTION */}
      <section>
        <h2>Introduction</h2>
        <p>
          HRVenus is committed to complying with Malaysia's Personal Data
          Protection Act 2010 (Act 709). We respect the privacy of all HR users
          and employees whose personal information is processed through the
          HRVenus platform. This Privacy Policy explains how data is collected,
          used, stored, and protected as part of HR task management, employee
          workflows, and administrative functions.
        </p>
      </section>

      {/* DATA COLLECTION */}
      <section>
        <h2>1. Personal Data Collection</h2>
        <p>The HRVenus system may collect and process the following data:</p>
        <ul>
          <li>HR admin and user details (name, email, role)</li>
          <li>Employee information (name, department, position)</li>
          <li>Task assignments, workflow logs, deadlines</li>
          <li>Performance-related notes (if entered by HR)</li>
          <li>
            Attendance, leave, and internal HR documentation (if enabled)
          </li>
          <li>System access logs, device information, and security metadata</li>
          <li>Uploaded HR documents (e.g., memos, forms, approvals)</li>
        </ul>
      </section>

      {/* PURPOSE */}
      <section>
        <h2>2. Purpose of Data Processing</h2>
        <p>Personal data is collected and processed for the following:</p>
        <ul>
          <li>HR task management and workflow operations</li>
          <li>Employee record management and HR administration</li>
          <li>Performance review tracking and HR decision support</li>
          <li>Internal communication and operational coordination</li>
          <li>Generating HR analytics and organizational insights</li>
          <li>Platform security, authentication, and role-based access</li>
          <li>To enhance system features and improve user experience</li>
        </ul>
      </section>

      {/* PDPA RIGHTS */}
      <section>
        <h2>3. Rights Under Malaysia PDPA</h2>
        <p>
          Individuals whose data is processed through HRVenus have the right to:
        </p>
        <ul>
          <li>Request access to their personal data</li>
          <li>Request corrections to inaccurate or incomplete data</li>
          <li>
            Withdraw consent for data processing (subject to HR policies)
          </li>
          <li>Request deletion of data no longer required</li>
          <li>Request a copy of their personal data (data portability)</li>
        </ul>
        <p>
          Some rights may be limited due to employment regulations or
          organizational data retention requirements.
        </p>
      </section>

      {/* SECURITY & RETENTION */}
      <section>
        <h2>4. Data Security & Retention</h2>
        <p>HRVenus applies strict security practices including:</p>
        <ul>
          <li>Encrypted data storage and secure transmission</li>
          <li>Role-based access control (RBAC)</li>
          <li>Secure authentication and system audit trails</li>
        </ul>
        <p>
          Data retention follows the organization’s HR policies, legal
          obligations, and operational needs. Once data is no longer required,
          it will be securely removed.
        </p>
      </section>

      {/* EMPLOYEE DATA PROCESSING */}
      <section>
        <h2>5. Employee Data Processing</h2>
        <p>
          HRVenus functions as a platform enabling organizations to manage HR
          operations. The organization using HRVenus remains the primary data
          controller. HRVenus ensures:
        </p>
        <ul>
          <li>No employee data is sold to third parties</li>
          <li>
            HR documents and records are only accessible to authorized personnel
          </li>
          <li>
            Sensitive data (e.g., internal notes) is stored safely and
            confidentially
          </li>
          <li>
            Only anonymized, non-identifiable usage data may be used for system
            improvement
          </li>
        </ul>
      </section>

      {/* DATA SHARING */}
      <section>
        <h2>6. Data Sharing & Disclosure</h2>
        <p>HRVenus does not share data for advertising or external marketing.</p>
        <p>Data may only be disclosed to:</p>
        <ul>
          <li>Authorized HR personnel within your organization</li>
          <li>
            Technical service providers (cloud hosting, infrastructure) strictly
            for platform operation
          </li>
          <li>Regulatory or legal authorities when required by law</li>
        </ul>
      </section>

      {/* CONTACT */}
      <section>
        <h2>7. Contact for PDPA Requests</h2>
        <p>
          For PDPA inquiries, data access, corrections, or privacy concerns,
          users may contact:
        </p>
        <ul>
          <li>Your organization’s Data Protection Officer (DPO)</li>
          <li>The HRVenus support team</li>
        </ul>
      </section>

      {/* UPDATES */}
      <section>
        <h2>8. Updates to This Policy</h2>
        <p>
          HRVenus may update this Privacy Policy periodically due to new
          features, legal requirements, or improvements in data practices.
          Significant changes will be communicated through the platform.
        </p>
      </section>

      {/* SUMMARY */}
      <section style={{ marginTop: "30px" }}>
        <h2>Summary of Your Data Rights</h2>
        <ul>
          <li>Access your account and HR records</li>
          <li>Request data corrections</li>
          <li>Request deletion when allowed</li>
          <li>Control how your employee data is used</li>
        </ul>
      </section>
    </div>
  );
};

export default HRVenusPDPA;
