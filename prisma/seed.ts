// Seed script for AICTE Unified Case Coordination Radar
// Populates SQLite / PostgreSQL with realistic synthetic demo data

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const initialTrusts = [
  {
    trustId: 'TR-56001',
    name: 'ABC Educational Trust',
    registrationNo: 'BLR/TR/2004/4512',
    registeredState: 'Karnataka',
    registeredCity: 'Bengaluru',
    trusteeNames: 'Dr. K. M. Murthy (Managing Trustee), Smt. R. Savithri (Secretary), Sri V. Prasad (Treasurer)',
  },
  {
    trustId: 'TR-56002',
    name: 'Sri Kaveri Vidya Samsthe',
    registrationNo: 'KA/BLR/1998/1029',
    registeredState: 'Karnataka',
    registeredCity: 'Bengaluru',
    trusteeNames: 'Sri N. Kaverappa (President), Prof. H. Siddegowda (General Secretary)',
  },
  {
    trustId: 'TR-63601',
    name: 'Dharmapuri Rural Educational Society',
    registrationNo: 'TN/DP/2008/887',
    registeredState: 'Tamil Nadu',
    registeredCity: 'Dharmapuri',
    trusteeNames: 'Thiru S. Rajendran, Thiru K. Venkatesan, Tmt. P. Malathi',
  },
  {
    trustId: 'TR-46201',
    name: 'Vindhya Shiksha Samiti',
    registrationNo: 'MP/BHP/2001/5521',
    registeredState: 'Madhya Pradesh',
    registeredCity: 'Bhopal',
    trusteeNames: 'Shri Anand Bihari Shukla (Chairman), Smt. Sunita Verma',
  },
  {
    trustId: 'TR-24801',
    name: 'Himalayan Educational Foundation',
    registrationNo: 'UK/DDN/2012/301',
    registeredState: 'Uttarakhand',
    registeredCity: 'Dehradun',
    trusteeNames: 'Col. (Retd.) B. S. Rawat, Dr. Meenakshi Joshi',
  },
  {
    trustId: 'TR-50001',
    name: 'Deccan Educational Academy',
    registrationNo: 'TS/HYD/1995/776',
    registeredState: 'Telangana',
    registeredCity: 'Hyderabad',
    trusteeNames: 'Mirza Aslam Baig, Sri C. Ramachandra Rao',
  },
];

export const initialInstitutions = [
  {
    aicteId: '1-932145561',
    name: 'ABC Engineering College',
    category: 'Engineering & Technology',
    address: 'Plot 14, 5th Block, Industrial Layout, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560034',
    contactPhone: '+91-80-25531001',
    contactEmail: 'principal@abcengg-blr.ac.in',
    trustId: 'TR-56001',
    status: 'Approved',
    approvedIntake: 420,
    annualTuitionFee: 80000.0,
  },
  {
    aicteId: '1-932145992',
    name: 'ABC Institute of Technology',
    category: 'Engineering & Technology',
    address: 'Survey No. 42/1, Behind Post Office, Koramangala',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560034',
    contactPhone: '+91-80-25531099',
    contactEmail: 'director@abcit-blr.edu.in',
    trustId: 'TR-56001',
    status: 'Under Review',
    approvedIntake: 300,
    annualTuitionFee: 80000.0,
  },
  {
    aicteId: '1-932147103',
    name: 'ABC Polytechnic & Skill Institute',
    category: 'Polytechnic / Diploma',
    address: '8th Cross, Koramangala 4th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560034',
    contactPhone: '+91-80-25531404',
    contactEmail: 'admissions@abcpoly-blr.edu.in',
    trustId: 'TR-56001',
    status: 'Approved',
    approvedIntake: 240,
    annualTuitionFee: 45000.0,
  },
  {
    aicteId: '1-841120011',
    name: 'Kaveri Institute of Management & Technology',
    category: 'Management (MBA / PGDM)',
    address: 'NH-44, Bellary Road, Yelahanka',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560064',
    contactPhone: '+91-80-28562210',
    contactEmail: 'info@kaverimgt.org',
    trustId: 'TR-56002',
    status: 'Approved',
    approvedIntake: 180,
    annualTuitionFee: 150000.0,
  },
  {
    aicteId: '1-620091410',
    name: 'Dharmapuri Polytechnic College',
    category: 'Polytechnic',
    address: 'Pennagaram Main Road, Collectorate Post',
    city: 'Dharmapuri',
    state: 'Tamil Nadu',
    pinCode: '636705',
    contactPhone: '+91-4342-260190',
    contactEmail: 'principal@dharmapuripoly.tn.edu',
    trustId: 'TR-63601',
    status: 'Deficient',
    approvedIntake: 300,
    annualTuitionFee: 35000.0,
  },
  {
    aicteId: '1-771920401',
    name: 'Vindhya Institute of Engineering and Science',
    category: 'Engineering & Technology',
    address: 'Bhadbhada Road, Suraj Nagar',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    pinCode: '462044',
    contactPhone: '+91-755-2771022',
    contactEmail: 'registrar@vindhyaengg.ac.in',
    trustId: 'TR-46201',
    status: 'Approved',
    approvedIntake: 360,
    annualTuitionFee: 72000.0,
  },
  {
    aicteId: '1-510098231',
    name: 'Himalayan Academy of Pharmaceutical Sciences',
    category: 'Pharmacy (B.Pharm / M.Pharm)',
    address: 'Rajpur Road, Near Sahastradhara Crossing',
    city: 'Dehradun',
    state: 'Uttarakhand',
    pinCode: '248009',
    contactPhone: '+91-135-2734190',
    contactEmail: 'director@himalayanpharm.edu.in',
    trustId: 'TR-24801',
    status: 'Approved',
    approvedIntake: 120,
    annualTuitionFee: 95000.0,
  },
  {
    aicteId: '1-482201991',
    name: 'Deccan College of Architecture & Design',
    category: 'Architecture',
    address: 'Masab Tank, AC Guards',
    city: 'Hyderabad',
    state: 'Telangana',
    pinCode: '500028',
    contactPhone: '+91-40-23348821',
    contactEmail: 'dean@deccanarch.edu.in',
    trustId: 'TR-50001',
    status: 'Under Review',
    approvedIntake: 80,
    annualTuitionFee: 110000.0,
  },
];

export const initialComplaints = [
  {
    refNo: 'PG-104',
    bureau: 'PGRC', // Public Grievance Redressal Cell
    daysAgo: 15,
    institutionAicteId: '1-932145561', // ABC Engineering College
    complainantType: 'Student',
    complainantName: 'Rahul M. Verma',
    complainantContact: '+91-9845012399',
    category: 'Fee Anomaly',
    subject: 'Unapproved development fee of ₹40,000 charged over notified fee schedule under coercion',
    details: 'The college administration mandated payment of ₹1,20,000 for the 3rd year B.Tech admission semester against the state regulatory fee slab of ₹80,000. Hall tickets for semester examinations were threatened to be withheld in case of non-payment. Receipt issued under miscellaneous laboratory charges.',
    status: 'Under Review',
    priorityScore: 88,
    priorityLevel: 'High',
    slaDaysTotal: 30,
    daysElapsed: 15,
  },
  {
    refNo: 'RB-208',
    bureau: 'Regulation Bureau',
    daysAgo: 0,
    institutionAicteId: '1-932145992', // ABC Institute of Technology
    complainantType: 'Parent',
    complainantName: 'G. S. Rao (Secretary, Parent Advisory Group)',
    complainantContact: '+91-9880194821',
    category: 'Fee Anomaly',
    subject: 'Mandatory additional laboratory and computer infrastructure cess charged beyond approved fee slab',
    details: 'Formal grievance filed regarding ABC Institute of Technology demanding ₹1,20,000 annually. The institution claims the ₹40,000 premium is for specialized artificial intelligence lab licenses, which violates AICTE fee approval norms prohibiting unapproved auxiliary capitation.',
    status: 'Awaiting Review',
    priorityScore: 92,
    priorityLevel: 'High',
    slaDaysTotal: 30,
    daysElapsed: 0,
  },
  {
    refNo: 'AP-301',
    bureau: 'Approval Bureau',
    daysAgo: 22,
    institutionAicteId: '1-841120011', // Kaveri Institute of Management & Technology
    complainantType: 'Faculty',
    complainantName: 'Dr. Suresh Patil (Ex-Associate Professor)',
    complainantContact: '+91-9448102391',
    category: 'Regulatory Non-Compliance',
    subject: 'Discrepancy in certified faculty roll and falsified cadre ratio submitted for Extension of Approval (EoA)',
    details: 'Faculty list furnished for 2025-26 approval includes names of professors who resigned in previous academic sessions. Several adjunct faculty members are listed as full-time regular professors to falsely satisfy 1:15 cadre ratio requirement.',
    status: 'Under Review',
    priorityScore: 68,
    priorityLevel: 'Medium',
    slaDaysTotal: 30,
    daysElapsed: 22,
  },
  {
    refNo: 'VB-112',
    bureau: 'Vigilance Bureau',
    daysAgo: 34,
    institutionAicteId: '1-620091410', // Dharmapuri Polytechnic College
    complainantType: 'Citizen',
    complainantName: 'M. Selvam (Social Vigilance Forum)',
    complainantContact: '+91-9790234190',
    category: 'Misrepresentation / Vigilance',
    subject: 'Allegation of phantom mechanical laboratory equipment and forged compliance affidavit',
    details: 'During previous regional inspection, high-end CNC and metallurgy equipment was temporarily leased from a nearby private workshop to secure approval compliance. Equipment was removed within 48 hours. Statutory reply deadline elapsed with zero institutional response.',
    status: 'Escalated',
    priorityScore: 95,
    priorityLevel: 'Critical',
    slaDaysTotal: 30,
    daysElapsed: 34, // OVERDUE by 4 days!
  },
  {
    refNo: 'PG-405',
    bureau: 'PGRC',
    daysAgo: 11,
    institutionAicteId: '1-771920401', // Vindhya Institute
    complainantType: 'Student',
    complainantName: 'Priya Sharma (Graduated B.Tech Student)',
    complainantContact: '+91-9179234882',
    category: 'Document Retention',
    subject: 'Illegal retention of original class 10/12 marks cards and transfer certificate upon course completion',
    details: 'Management refuses to release original qualifying certificates unless student signs indemnity bond waiving hostel security deposit refund. Gross violation of AICTE Approval Process Handbook Clause 1.4.',
    status: 'Awaiting Review',
    priorityScore: 58,
    priorityLevel: 'Medium',
    slaDaysTotal: 30,
    daysElapsed: 11,
  },
  {
    refNo: 'TB-506',
    bureau: 'Technical Bureau',
    daysAgo: 25,
    institutionAicteId: '1-510098231', // Himalayan Academy
    complainantType: 'Faculty',
    complainantName: 'Prof. Arvind Nautiyal',
    complainantContact: '+91-9897120441',
    category: 'Infrastructure Deficiency',
    subject: 'Inadequate pharmacological testing facilities and non-functional ventilation in laboratories',
    details: 'Animal house maintenance fails CPCSEA and AICTE standards. Inspection verified improvements made following show cause notice.',
    status: 'Resolved',
    priorityScore: 32,
    priorityLevel: 'Low',
    slaDaysTotal: 30,
    daysElapsed: 25,
  },
  {
    refNo: 'SGRC-607',
    bureau: 'Student Grievance Redressal Committee',
    daysAgo: 28,
    institutionAicteId: '1-482201991', // Deccan College
    complainantType: 'Student',
    complainantName: 'K. Tanmayee (4th Year B.Arch)',
    complainantContact: '+91-9490123880',
    category: 'Student Welfare',
    subject: 'Absence of designated Ombudsperson and non-convening of mandatory semester grievance meetings',
    details: 'Institution has failed to notify students of SGRC portal linkage or nominate an independent Ombudsperson. Grievance committee has not convened for two consecutive academic terms.',
    status: 'Under Review',
    priorityScore: 64,
    priorityLevel: 'Medium',
    slaDaysTotal: 30,
    daysElapsed: 28, // 2 days remaining (approaching deadline)
  },
];

export const initialFeeRecords = [
  {
    receiptNo: 'REC-2026-ABC-0941',
    complaintRef: 'PG-104',
    institutionAicteId: '1-932145561',
    referenceFee: 80000.0,
    reportedFee: 120000.0,
    differenceAmount: 40000.0,
    differencePercent: 50.0,
    ocrConfidence: 96.8,
    receiptText: 'ABC ENGINEERING COLLEGE\nKoramangala, Bengaluru - 560034\nDate: 12-Oct-2026\nReceipt No: REC-2026-ABC-0941\nStudent Name: Rahul M. Verma | USN: 1AB23CS089\nCourse: B.Tech (Computer Science & Engineering)\nFee Head 1: Tuition Fee - Rs. 80,000\nFee Head 2: Special Lab & Development Cess - Rs. 40,000\nTotal Amount Paid: Rs. 1,20,000 (One Lakh Twenty Thousand Only)\nPayment Mode: RTGS Ref # UTR4491028301\nCashier Stamp: ABC Educational Trust Office',
    reviewStatus: 'Flagged for Review',
    reviewedBy: 'Dr. R. K. Sharma (Joint Director)',
    reviewRemarks: 'Primary fee discrepancy flagged. Differential of Rs. 40,000 over approved ceiling (+50%). Evidence cross-referenced with Complaint PG-104.',
  },
  {
    receiptNo: 'REC-2026-ABCT-1102',
    complaintRef: 'RB-208',
    institutionAicteId: '1-932145992',
    referenceFee: 80000.0,
    reportedFee: 120000.0,
    differenceAmount: 40000.0,
    differencePercent: 50.0,
    ocrConfidence: 94.2,
    receiptText: 'ABC INSTITUTE OF TECHNOLOGY\nKoramangala 4th Block, Bengaluru - 560034\nDate: 26-Oct-2026\nReceipt No: REC-2026-ABCT-1102\nStudent: Ankit G. Rao | Roll: 23IT044\nTuition Fee (Approved): Rs. 80,000\nAdvanced Tech & Cloud Infra Lab Cess: Rs. 40,000\nTotal Remitted: Rs. 1,20,000\nAuthorized Signatory: Dean (Academic Accounts)',
    reviewStatus: 'Flagged for Review',
    reviewedBy: 'Pending Joint Review',
    reviewRemarks: 'Cross-bureau pattern detected. Identical Rs. 40,000 excess cess charged at sister institution under same ABC Educational Trust.',
  },
];

export const initialCoordinationGroups = [
  {
    groupRef: 'CC-2026-BLR-089',
    title: 'Cross-Bureau Joint Coordination: ABC Educational Trust Institutions (Bengaluru)',
    leadBureau: 'PGRC',
    participating: 'PGRC, Regulation Bureau',
    status: 'Under Joint Inquiry',
    priorityScore: 89,
    leadOfficer: 'Dr. R. K. Sharma (Joint Director, PGRC)',
    complaintRefs: ['PG-104', 'RB-208'],
    notes: [
      {
        officerName: 'Dr. R. K. Sharma',
        officerDesignation: 'Joint Director',
        bureau: 'PGRC',
        noteType: 'Inter-Bureau Directive',
        content: 'Cross-referenced PG-104 with newly submitted RB-208. Both institutions share the identical registered trust (ABC Educational Trust, PIN 560034) and levy an unapproved Rs. 40,000 surcharge. Initiating joint coordination dossier for Member Secretary review.',
      },
      {
        officerName: 'Smt. Anjali Deshmukh',
        officerDesignation: 'Regional Officer',
        bureau: 'Regulation Bureau',
        noteType: 'Field Audit',
        content: 'Preliminary inspection notice dispatched to ABC Institute of Technology. Management directed to produce approved fee breakdown and audited ledgers within 7 working days.',
      },
    ],
  },
];

export const initialAuditLogs = [
  {
    actorName: 'Dr. R. K. Sharma',
    actorRole: 'Officer',
    action: 'CASE_REVIEW_INITIATED',
    caseRef: 'PG-104',
    details: 'Opened complaint file PG-104; reviewed student affidavit and fee receipt REC-2026-ABC-0941.',
  },
  {
    actorName: 'System Identity Matcher',
    actorRole: 'System',
    action: 'IDENTITY_MATCH_DETECTED',
    caseRef: 'RB-208',
    details: 'Automated radar detected 87% similarity match between ABC Institute of Technology (RB-208) and ABC Engineering College (PG-104). Common Trust: ABC Educational Trust (TR-56001).',
  },
  {
    actorName: 'Dr. R. K. Sharma',
    actorRole: 'Officer',
    action: 'COORDINATION_GROUP_CREATED',
    caseRef: 'CC-2026-BLR-089',
    details: 'Consolidated cases PG-104 and RB-208 into Joint Coordination Group CC-2026-BLR-089.',
  },
  {
    actorName: 'Sri Arvind Kumar',
    actorRole: 'Administrator',
    action: 'SLA_ALERT_ACKNOWLEDGED',
    caseRef: 'VB-112',
    details: 'Acknowledged overdue SLA escalation alert for Dharmapuri Polytechnic College (34 days elapsed). Forwarded to Vigilance Chief.',
  },
  {
    actorName: 'Dr. R. K. Sharma',
    actorRole: 'Officer',
    action: 'FEE_ANOMALY_CONFIRMED',
    caseRef: 'PG-104',
    details: 'Verified OCR extracted fee Rs. 1,20,000 against state fee ceiling of Rs. 80,000. Anomaly ratio: +50.0%.',
  },
  {
    actorName: 'Dr. R. K. Sharma',
    actorRole: 'Officer',
    action: 'DOSSIER_GENERATED',
    caseRef: 'CC-2026-BLR-089',
    details: 'Generated formal inter-bureau coordination dossier PDF for Standing Committee review.',
  },
];

async function main() {
  console.log('Seeding synthetic demonstration data for AICTE Unified Case Coordination Radar...');

  // Clean existing tables in order
  await prisma.auditLog.deleteMany({});
  await prisma.officerNote.deleteMany({});
  await prisma.feeRecord.deleteMany({});
  await prisma.complaint.deleteMany({});
  await prisma.coordinationGroup.deleteMany({});
  await prisma.institution.deleteMany({});
  await prisma.trust.deleteMany({});
  await prisma.user.deleteMany({});

  // Seed Users
  await prisma.user.createMany({
    data: [
      {
        username: 'dr.sharma',
        fullName: 'Dr. R. K. Sharma',
        designation: 'Joint Director (PGRC & Case Coordination)',
        bureau: 'PGRC',
        role: 'Officer',
        phone: '+91-11-29581014',
        email: 'rk.sharma@aicte-india.gov.in',
        active: true,
      },
      {
        username: 'arvind.admin',
        fullName: 'Sri Arvind Kumar',
        designation: 'Director (Administration & Governance)',
        bureau: 'Administration',
        role: 'Administrator',
        phone: '+91-11-29581002',
        email: 'arvind.kumar@aicte-india.gov.in',
        active: true,
      },
      {
        username: 'anjali.reg',
        fullName: 'Smt. Anjali Deshmukh',
        designation: 'Deputy Director (Regulation Bureau)',
        bureau: 'Regulation Bureau',
        role: 'Officer',
        phone: '+91-11-29581088',
        email: 'anjali.deshmukh@aicte-india.gov.in',
        active: true,
      },
    ],
  });

  // Seed Trusts
  const trustMap = new Map<string, string>();
  for (const t of initialTrusts) {
    const created = await prisma.trust.create({
      data: t,
    });
    trustMap.set(t.trustId, created.id);
  }

  // Seed Institutions
  const instMap = new Map<string, string>();
  for (const inst of initialInstitutions) {
    const parentTrustId = trustMap.get(inst.trustId);
    if (!parentTrustId) continue;

    const created = await prisma.institution.create({
      data: {
        aicteId: inst.aicteId,
        name: inst.name,
        category: inst.category,
        address: inst.address,
        city: inst.city,
        state: inst.state,
        pinCode: inst.pinCode,
        contactPhone: inst.contactPhone,
        contactEmail: inst.contactEmail,
        status: inst.status,
        approvedIntake: inst.approvedIntake,
        annualTuitionFee: inst.annualTuitionFee,
        trustId: parentTrustId,
      },
    });
    instMap.set(inst.aicteId, created.id);
  }

  // Seed Coordination Group first
  const coord = await prisma.coordinationGroup.create({
    data: {
      groupRef: initialCoordinationGroups[0].groupRef,
      title: initialCoordinationGroups[0].title,
      leadBureau: initialCoordinationGroups[0].leadBureau,
      participating: initialCoordinationGroups[0].participating,
      status: initialCoordinationGroups[0].status,
      priorityScore: initialCoordinationGroups[0].priorityScore,
      leadOfficer: initialCoordinationGroups[0].leadOfficer,
    },
  });

  // Seed Complaints
  const now = new Date();
  const complaintMap = new Map<string, string>();

  for (const c of initialComplaints) {
    const instId = instMap.get(c.institutionAicteId);
    if (!instId) continue;

    const subDate = new Date(now.getTime() - c.daysAgo * 24 * 60 * 60 * 1000);
    const deadline = new Date(subDate.getTime() + c.slaDaysTotal * 24 * 60 * 60 * 1000);
    const isGrouped = initialCoordinationGroups[0].complaintRefs.includes(c.refNo);

    const created = await prisma.complaint.create({
      data: {
        refNo: c.refNo,
        bureau: c.bureau,
        submissionDate: subDate,
        institutionId: instId,
        complainantType: c.complainantType,
        complainantName: c.complainantName,
        complainantContact: c.complainantContact,
        category: c.category,
        subject: c.subject,
        details: c.details,
        status: c.status,
        priorityScore: c.priorityScore,
        priorityLevel: c.priorityLevel,
        slaDaysTotal: c.slaDaysTotal,
        slaDeadline: deadline,
        lastResponseDate: c.daysAgo > 10 ? new Date(subDate.getTime() + 4 * 24 * 60 * 60 * 1000) : null,
        coordinationGroupId: isGrouped ? coord.id : null,
      },
    });
    complaintMap.set(c.refNo, created.id);
  }

  // Seed Notes for Coordination Group & Complaints
  for (const n of initialCoordinationGroups[0].notes) {
    await prisma.officerNote.create({
      data: {
        coordinationGroupId: coord.id,
        officerName: n.officerName,
        officerDesignation: n.officerDesignation,
        bureau: n.bureau,
        noteType: n.noteType,
        content: n.content,
      },
    });
  }

  // Add individual complaint note
  const pg104Id = complaintMap.get('PG-104');
  if (pg104Id) {
    await prisma.officerNote.create({
      data: {
        complaintId: pg104Id,
        officerName: 'Dr. R. K. Sharma',
        officerDesignation: 'Joint Director',
        bureau: 'PGRC',
        noteType: 'Internal Review',
        content: 'Original fee payment receipt uploaded by student Rahul Verma inspected. Verified fee ledger against Approved Fee Regulatory Order Karnataka 2025/26. Surcharge of Rs. 40,000 confirmed unauthorized.',
      },
    });
  }

  // Seed Fee Records
  for (const f of initialFeeRecords) {
    const instId = instMap.get(f.institutionAicteId);
    const compId = complaintMap.get(f.complaintRef);
    if (!instId) continue;

    await prisma.feeRecord.create({
      data: {
        receiptNo: f.receiptNo,
        institutionId: instId,
        complaintId: compId || null,
        referenceFee: f.referenceFee,
        reportedFee: f.reportedFee,
        differenceAmount: f.differenceAmount,
        differencePercent: f.differencePercent,
        ocrConfidence: f.ocrConfidence,
        receiptText: f.receiptText,
        reviewStatus: f.reviewStatus,
        reviewedBy: f.reviewedBy,
        reviewRemarks: f.reviewRemarks,
      },
    });
  }

  // Seed Audit Logs
  for (const log of initialAuditLogs) {
    const compId = log.caseRef && complaintMap.has(log.caseRef) ? complaintMap.get(log.caseRef) : null;
    await prisma.auditLog.create({
      data: {
        actorName: log.actorName,
        actorRole: log.actorRole,
        action: log.action,
        caseRef: log.caseRef,
        details: log.details,
        complaintId: compId,
      },
    });
  }

  console.log('Database seeded successfully with all synthetic fixtures!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
