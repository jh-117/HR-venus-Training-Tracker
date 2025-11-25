import React from "react";

const HRVenusPDPA = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>HRVenus PDPA Compliance</h2>

      <section>
        <h3>Introduction</h3>
        <p>
          HRVenus is committed to fulfilling its responsibilities under
          Malaysia's Personal Data Protection Act 2010 (Act 709). We respect the
          privacy of all HR users and employees whose information is processed
          through the HRVenus platform. This policy outlines how personal data
          is collected, used, stored, and protected as part of HR task
          management, employee administration, and workflow operations.
        </p>
      </section>

      <section>
        <h3>1. Data Collection</h3>
        <p>We collect and process the following types of personal data:</p>
        <ul>
          <li>HR admin and user information (name, email, role)</li>
          <li>Employee personal details (name, position, department)</li>
          <li>
            Task-related information (assignments, deadlines, progress logs)
          </li>
          <li>
            Employee performance notes or records (if entered by HR personnel)
          </li>
          <li>
            Attendance, leave, and internal documentation (if features are
            enabled)
          </li>
          <li>System usage logs and device information for security</li>
          <li>Uploaded files or documents for HR processing</li>
        </ul>
      </section>

      <section>
        <h3>2. Purpose of Collection</h3>
        <p>Your personal data is collected for the following purposes:</p>
        <ul>
          <li>To manage HR tasks and workflows efficiently</li>
          <li>To assign and track employee-related responsibilities</li>
          <li>To maintain accurate employee records and administrative data</li>
          <li>To facilitate internal communication and HR decision-making</li>
          <li>To generate HR reports and performance insights</li>
          <li>To ensure system integrity, authentication, and access control</li>
          <li>
            To improve the functionality, security, and performance of the
            platform
          </li>
        </ul>
      </section>

      <section>
        <h3>3. Your Rights Under PDPA</h3>
        <p>
          Under Malaysia’s PDPA, users and employees whose data is managed
          through HRVenus have the right to:
        </p>
        <ul>
          <li>Request access to personal data stored in the system</li>
          <li>Request correction of inaccurate or incomplete information</li>
          <li>Withdraw consent for data processing (subject to HR policies)</li>
          <li>Request deletion of unnecessary or outdated data</li>
          <li>Request a copy of personal data held (data portability)</li>
        </ul>
        <p>
          Certain rights may be limited in compliance with the
          organization’s legal or HR retention requirements.
        </p>
      </section>

      <section>
        <h3>4. Data Security and Retention</h3>
        <p>
          HRVenus implements strict security measures to protect personal data,
          including encrypted storage, role-based access control, and secure
          authentication. Data retention is based on HR operational
          requirements, employment regulations, and legal obligations.
        </p>
        <p>
          Once data is no longer required, it will be securely deleted according
          to internal data retention policies.
        </p>
      </section>

      <section>
        <h3>5. Employee Data Processing</h3>
        <p>
          HRVenus acts as a system that enables organizations to manage HR
          operations. The company using HRVenus remains the primary data
          controller. HRVenus ensures:
        </p>
        <ul>
          <li>No employee data is sold or disclosed to third parties</li>
          <li>
            Uploaded documents and records are only accessible to authorized HR
            personnel
          </li>
          <li>
            Sensitive data (e.g., performance notes, internal memos) is stored
            securely
          </li>
          <li>
            Only anonymized usage data may be used to improve the platform
          </li>
        </ul>
      </section>

      <section>
        <h3>6. Data Sharing and Disclosure</h3>
        <p>
          HRVenus does not sell or share personal data for advertising or
          external marketing. Data may only be disclosed to:
        </p>
        <ul>
          <li>Authorized HR personnel within your organization</li>
          <li>
            Technical service providers (e.g., cloud hosting) strictly for
            platform operation
          </li>
          <li>
            Legal or regulatory authorities when required by law
          </li>
        </ul>
        <p>
          All third-party partners are required to follow strict data protection
          standards.
        </p>
      </section>

      <section>
        <h3>7. Contact Information</h3>
        <p>
          For inquiries regarding PDPA compliance, data access, or corrections,
          you may contact your organization’s Data Protection Officer (DPO) or
          reach us through the HRVenus support channel.
        </p>
      </section>

      <section>
        <h3>8. Updates to This Policy</h3>
        <p>
          HRVenus reserves the right to update this Privacy Policy from time to
          time to reflect new features, legal requirements, or improvements in
          data management practices. Users will be notified of significant
          changes within the platform.
        </p>
      </section>

      <section style={{ marginTop: "30px" }}>
        <h3>Your Data Protection Rights Summary</h3>
        <ul>
          <li>Access your HR and account data</li>
          <li>Request corrections</li>
          <li>View assigned tasks and performance-related entries</li>
          <li>Request deletion where applicable</li>
          <li>Control how your employee data is used</li>
        </ul>
      </section>
    </div>
  );
};

export default HRVenusPDPA;
