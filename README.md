# AICTE Unified Case Coordination Radar

**Explainable Institution Identity Matching, Cross-Bureau Case Intelligence, and Multilingual Grievance Support**  
*A Prototype Decision-Support Platform for the All India Council for Technical Education (AICTE), Ministry of Education, Government of India.*

> **Demonstration Notice:** This application is a hackathon prototype designed for evaluation. All institution records, student names, fee receipts, and complaint narratives are synthetic fixtures. This system does not claim live integration with production AICTE databases or official government deployment.

---

## 1. Project Overview & Administrative Purpose

The **AICTE Unified Case Coordination Radar** addresses multi-bureau grievance fragmentation in technical education regulation. Grievances submitted independently to the **Public Grievance Redressal Cell (PGRC)**, the **Regulation Bureau (RB)**, the **Approval Bureau (AB)**, or the **Vigilance Bureau (VB)** frequently relate to common underlying entities (e.g., sister institutions managed by the same sponsoring Trust or Society) or repeat infractions (e.g., unauthorized fee surcharges, document retention, infrastructure deficiencies).

### Key Administrative Objectives:
1. **Explainable Institution Identity Matching:** Transparent, mathematical scoring (0–100%) correlating sister campuses without black-box machine learning.
2. **Cross-Bureau Case Intelligence:** Early detection of duplicate, escalated, or corroborating grievances filed across different bureau references.
3. **Trust & Society Knowledge Graph:** Dual visualization (interactive node-link diagram + relational matrix) uncovering umbrella trusts operating multiple colleges within common postal areas.
4. **Fee Anomaly Review & Receipt OCR:** Automated comparison of fee receipts against State Fee Regulatory Committee (FRC) and AICTE ceilings.
5. **Transparent Case Coordination Priority Score:** Transparent 0–100 triage scoring for resource allocation, not a permanent credit or fraud score.
6. **Cross-Bureau Coordination Workspace & Dossier Generation:** Consolidated timeline, inter-bureau directives ledger, and one-click downloadable PDF/Print dossier (`CC-2026-BLR-089`).
7. **BHASHINI-Compatible Multilingual Voice Assistance:** Voice input pipeline with English, Hindi, and Kannada speech recognition and sandbox integration readiness.
8. **Statutory SLA Monitoring & Append-Only Audit Ledger:** SLA compliance tracking with overdue escalation alerts, role-based access control, and privacy-conscious data masking.

---

## 2. Design System & Government Portal Authenticity

- **Typography:** Strictly enforced **Times New Roman** across the entire portal (`font-family: 'Times New Roman', Times, serif !important;`).
- **Color Palette:**
  - **Navy Blue (`#002147`)** for primary navigation, headings, and table headers.
  - **Saffron (`#e67300`)** and **Green (`#138808`)** decorative tricolor ribbon and subtle accent indicators.
  - **White & Light Ash (`#f4f6f8`)** background panels.
  - **Muted Amber & Red** for risk and SLA escalation alerts.
- **Traditional UI Restraint:** Square corners, thin borders, dense tables, zero emojis in icons, and conventional public-sector layout.

---

## 3. Primary Demonstration Scenario

The prototype is pre-seeded with the primary hackathon scenario:

1. **Complaint PG-104 (PGRC):**
   - **Institution:** ABC Engineering College (Plot 14, 5th Block, Koramangala, Bengaluru - 560034)
   - **Parent Trust:** ABC Educational Trust (TR-56001)
   - **Grievance:** ₹40,000 unapproved development fee charged over the ₹80,000 statutory ceiling under threat of withholding exam hall tickets.
   - **Filed:** 15 days ago | Status: Under Review.
2. **Complaint RB-208 (Regulation Bureau):**
   - **Institution:** ABC Institute of Technology (Survey No. 42/1, Koramangala, Bengaluru - 560034)
   - **Parent Trust:** ABC Educational Trust (TR-56001)
   - **Grievance:** Mandatory ₹40,000 artificial intelligence lab cess charged beyond the approved fee slab.
   - **Filed:** Today | Status: Awaiting Review.
3. **Algorithmic Identity Corroboration:**
   - Navigating to **Institution Search** and querying `ABC Institute of Technology` or `RB-208` surfaces `ABC Engineering College` with a **transparent match score of 87%**.
   - Breakdown: Name Similarity (82%), Registered Parent Trust (100%), Postal PIN Code (100%), Address Proximity (75%).
4. **Fee Anomaly Scrutiny:**
   - Navigating to **Fee Anomaly Review** displays receipt OCR for `REC-2026-ABC-0941` comparing the ₹80,000 approved reference fee against the ₹1,20,000 remittance, confirming a **+50.0% excess surcharge**.
5. **Inter-Bureau Coordination & Dossier:**
   - Navigating to **Coordination Workspace** brings up Joint Coordination Group `CC-2026-BLR-089`, combining both cases into a unified timeline with a **Case Coordination Priority Score of 88/100 (High Priority)**.
   - Clicking **"Download Coordination Dossier"** generates an authenticated PDF report for the Standing Complaints Committee.

---

## 4. Technology Stack

- **Framework:** Next.js 15 (App Router) with React 19.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS with custom government palette tokens and global CSS enforcing Times New Roman.
- **Database & ORM:** Prisma ORM. Configured out-of-the-box with **SQLite (`dev.db`)** for zero-dependency local demonstration, fully compatible with enterprise **PostgreSQL**.
- **OCR Engine:** Tesseract.js (in-browser client-side OCR worker) + manual correction matrix.
- **PDF Generation:** jsPDF client-side generation + print-friendly CSS.
- **Voice Engine:** Web Speech API adapter configured for BHASHINI pipeline integration (English, Hindi, Kannada).

---

## 5. Getting Started & Installation

### Prerequisites:
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation:
```bash
# Clone or navigate to the repository directory
cd /path/to/aicte-case-radar

# Install dependencies (already completed if cloned locally)
npm install

# Initialize local database and seed demonstration fixtures
npx prisma db push
npx tsx prisma/seed.ts

# Start the local development server
npm run dev
```

The application will be live at:
**[http://localhost:3000](http://localhost:3000)**

---

## 6. Demonstration Credentials & Role Switching

The portal provides an instant role switcher in the top-right header and the **Administration** page:

| User | Designation | Authorised Role | Permissions |
|---|---|---|---|
| **Dr. R. K. Sharma** | Joint Director (PGRC) | `Officer` | Case review, timeline notes, OCR verification, priority management. Complainant phone numbers are masked for privacy (`+91-98*****399`). |
| **Sri Arvind Kumar** | Director (Administration) | `Administrator` | Full access, unmasked complainant data, system threshold configuration, database re-seeding, and SLA escalations. |

---

## 7. Project File Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema (Trust, Institution, Complaint, FeeRecord, AuditLog, etc.)
│   └── seed.ts                # Realistic synthetic demo seed script
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with Government Header, Navigation, and Footer
│   │   ├── globals.css        # Global CSS enforcing Times New Roman, tricolor ribbon, and gov tables
│   │   ├── page.tsx           # Dashboard with metrics, cross-bureau alerts, and complaints register
│   │   ├── complaints/        # Grievance Register with advanced filters and inspector
│   │   ├── institution-search/# Explainable Identity Matching Engine
│   │   ├── cross-bureau/      # Cross-bureau repeat-issue comparative matrix (PG-104 vs RB-208)
│   │   ├── trust-network/     # Trust Knowledge Graph (SVG diagram + relational table)
│   │   ├── fee-anomaly/       # Fee Anomaly Review with Tesseract.js OCR
│   │   ├── coordination/      # Joint Coordination Workspace & unified timeline
│   │   ├── sla-monitoring/    # Statutory SLA monitoring and escalation triage
│   │   ├── audit-log/         # Immutable append-only audit trail with CSV export
│   │   ├── administration/    # Role switcher and prototype configuration
│   │   └── api/               # Next.js API route handlers
│   ├── components/
│   │   ├── Header.tsx         # Ashoka emblem, accessibility toolbar (A-, A, A+), language selector
│   │   ├── Navigation.tsx     # Navy horizontal navigation with all 10 core sections
│   │   ├── Breadcrumbs.tsx    # Government breadcrumbs navigation
│   │   ├── Footer.tsx         # Official AICTE and Ministry footer
│   │   ├── VoiceAssistantModal.tsx # BHASHINI-compatible voice modal
│   │   └── DossierModal.tsx   # Coordination dossier PDF generator & print preview
│   ├── context/
│   │   └── AppContext.tsx     # Role management, font resizing, and data masking
│   └── lib/
│       ├── db.ts              # Prisma client instance
│       ├── matching.ts        # Explainable Fuzzy Matching Engine
│       ├── priorityScore.ts   # Case Coordination Priority Score (0-100) calculator
│       └── audit.ts           # Append-only audit logger
├── .env.example               # Environment variables template
└── package.json
```

---

## 8. Statutory Disclaimers & Ethics Note

1. **Decision Support Only:** Potential institution matches, fee anomalies, and Case Coordination Priority Scores provide transparent decision support to authorised officers. They do not automatically merge, reject, or close complaints, nor do they impose adverse administrative sanctions without due process and statutory inquiry.
2. **Data Privacy (DPDP Principles):** The system implements field-level masking of sensitive complainant personal data in list views to safeguard student and parent privacy.
