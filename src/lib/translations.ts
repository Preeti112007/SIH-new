// Comprehensive Administrative Dictionary for AICTE Unified Case Coordination Radar
// Supporting English (en), Kannada (kn - VTU/KEA Administrative Style), and Hindi (hi)
// Note: Per user specification, numbers, codes, and IDs (e.g., 87%, ₹40,000, 560034, PG-104) remain in standard Arabic numerals.

export type SupportedLanguage = 'en' | 'kn' | 'hi' | 'ta' | 'te' | 'mr';

export interface Translations {
  // Navigation
  navDashboard: string;
  navComplaints: string;
  navInstitutionSearch: string;
  navCrossBureau: string;
  navTrustNetwork: string;
  navFeeAnomaly: string;
  navCoordination: string;
  navSlaMonitoring: string;
  navAuditLog: string;
  navAdministration: string;

  // Header
  skipToMain: string;
  screenReader: string;
  textSize: string;
  languageLabel: string;
  voiceAssistant: string;
  ministryName: string;
  aicteName: string;
  portalSubtitle: string;
  demoPrototypeNotice: string;
  syntheticNotice: string;
  loggedInAs: string;
  roleOfficer: string;
  roleAdmin: string;

  // Action Buttons
  openCoordinationBtn: string;
  generateDossierPdfBtn: string;
  voiceSearchBtn: string;
  filterRecordsBtn: string;
  resetBtn: string;
  reviewBtn: string;
  viewDetailsBtn: string;
  downloadDossierBtn: string;

  // Key Dashboard Banners & Boxes (User Requested Fixes)
  ghostBannerText: string;
  healthRedBoxText: string;
  feeAnomalyCardText: string;
  reviewMatchAnomalyBtn: string;

  // Dashboard & Metrics
  dashboardHeading: string;
  welcomeOfficer: string;
  totalGrievances: string;
  openGrievances: string;
  overdueSla: string;
  relatedCaseGroups: string;
  feeAnomalies: string;
  highPriorityAlert: string;
  activeInvestigation: string;
  coordinationRequired: string;
  allRegisteredBureaus: string;

  // Search & Filters
  searchFiltersHeading: string;
  searchKeywordsLabel: string;
  searchPlaceholder: string;
  bureauFilterLabel: string;
  allBureaus: string;
  statusFilterLabel: string;
  allStatuses: string;
  priorityFilterLabel: string;
  allPriorities: string;

  // Table Headers
  colRefNo: string;
  colBureau: string;
  colInstitution: string;
  colCategory: string;
  colComplainant: string;
  colPriorityScore: string;
  colSlaDeadline: string;
  colStatus: string;
  colAction: string;

  // Statuses & Priority
  statusAwaitingReview: string;
  statusUnderReview: string;
  statusEscalated: string;
  statusResolved: string;
  priorityCritical: string;
  priorityHigh: string;
  priorityMedium: string;
  priorityLow: string;
  overdueByDays: string;
  daysRemaining: string;

  // Section Headers
  criticalSlaSection: string;
  recentAuditSection: string;
  viewSlaTable: string;
  fullAuditTrail: string;
  fullRegisterView: string;

  // Footer
  footerPortalInfo: string;
  footerPortalDesc: string;
  footerBureaus: string;
  footerStatutory: string;
  footerSecurityNotice: string;
  footerSecurityDesc: string;
  footerManagedBy: string;
  footerSyntheticOnly: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    // Navigation
    navDashboard: 'Dashboard',
    navComplaints: 'Complaint Register',
    navInstitutionSearch: 'Institution Search',
    navCrossBureau: 'Cross-Bureau Cases',
    navTrustNetwork: 'Trust Network',
    navFeeAnomaly: 'Fee Anomaly Review',
    navCoordination: 'Coordination Workspace',
    navSlaMonitoring: 'SLA Monitoring',
    navAuditLog: 'Audit Log',
    navAdministration: 'Administration',

    // Header
    skipToMain: 'Skip to Main Content',
    screenReader: 'Screen Reader Access',
    textSize: 'Text Size:',
    languageLabel: 'Language:',
    voiceAssistant: 'BHASHINI Voice',
    ministryName: 'Ministry of Education, Government of India',
    aicteName: 'All India Council for Technical Education',
    portalSubtitle: 'Unified Case Coordination Radar & Grievance Monitoring Platform',
    demoPrototypeNotice: 'Demonstration Prototype',
    syntheticNotice: 'All records and institutions shown are synthetic.',
    loggedInAs: 'Logged in as:',
    roleOfficer: 'Role: Grievance Officer (Dr. Sharma)',
    roleAdmin: 'Role: System Admin (Sri Arvind Kumar)',

    // Action Buttons
    openCoordinationBtn: 'Open Coordination Workspace',
    generateDossierPdfBtn: 'Generate Coordination Dossier PDF',
    voiceSearchBtn: 'Voice Search',
    filterRecordsBtn: 'Filter Records',
    resetBtn: 'Reset',
    reviewBtn: 'Review',
    viewDetailsBtn: 'View Details',
    downloadDossierBtn: 'Download Coordination Dossier',

    // Key Dashboard Banners & Boxes (User Requested Fixes)
    ghostBannerText: '🔴 Ghost 87% - Same Door No. 10 Koramangala, Name 82% similar, Same Trust ABC, Same Pincode 560034',
    healthRedBoxText: 'Health: 35/100 - RED - 2 Overdue + 1 Ghost + Fee ₹40k excess',
    feeAnomalyCardText: '💰 Anomaly: Approved ₹80k, Charged ₹1.2L - 50% Excess - Proof: Receipt No. 1234',
    reviewMatchAnomalyBtn: 'Review Potential Match & Anomaly →',

    // Dashboard & Metrics
    dashboardHeading: 'Central Administrative Dashboard — AICTE Radar',
    welcomeOfficer: 'Welcome',
    totalGrievances: 'Total Grievances',
    openGrievances: 'Open Grievances',
    overdueSla: 'Overdue SLA',
    relatedCaseGroups: 'Related Case Groups',
    feeAnomalies: 'Fee Anomalies',
    highPriorityAlert: 'High / Critical Alert',
    activeInvestigation: 'Active investigation',
    coordinationRequired: 'Coordination required',
    allRegisteredBureaus: 'All registered bureaus',

    // Search & Filters
    searchFiltersHeading: 'Search & Filter Grievance Register',
    searchKeywordsLabel: 'Search Keywords:',
    searchPlaceholder: 'Ref #, Institution, Student, Subject...',
    bureauFilterLabel: 'Bureau Filter:',
    allBureaus: 'All Bureaus (PGRC, RB, AB, VB, TB)',
    statusFilterLabel: 'Complaint Status:',
    allStatuses: 'All Statuses',
    priorityFilterLabel: 'Priority Level:',
    allPriorities: 'All Priority Tiers',

    // Table Headers
    colRefNo: 'Ref #',
    colBureau: 'Assigned Bureau',
    colInstitution: 'Institution Name & City',
    colCategory: 'Category',
    colComplainant: 'Complainant',
    colPriorityScore: 'Priority Score',
    colSlaDeadline: 'SLA Deadline',
    colStatus: 'Current Status',
    colAction: 'Action',

    // Statuses & Priority
    statusAwaitingReview: 'Awaiting Review',
    statusUnderReview: 'Under Review',
    statusEscalated: 'Escalated',
    statusResolved: 'Resolved',
    priorityCritical: 'Critical',
    priorityHigh: 'High',
    priorityMedium: 'Medium',
    priorityLow: 'Low',
    overdueByDays: 'Overdue by',
    daysRemaining: 'd remaining',

    // Section Headers
    criticalSlaSection: 'Critical SLA & Statutory Attention Required',
    recentAuditSection: 'Recent Administrative Audit Activities',
    viewSlaTable: 'View SLA Table →',
    fullAuditTrail: 'Full Audit Trail →',
    fullRegisterView: 'Full Register View →',

    // Footer
    footerPortalInfo: 'Portal Information',
    footerPortalDesc: 'AICTE Unified Case Coordination Radar is an administrative intelligence platform designed for cross-bureau complaint monitoring, explainable institution identity matching, and audit trail integrity.',
    footerBureaus: 'Participating Bureaus',
    footerStatutory: 'Statutory Guidelines',
    footerSecurityNotice: 'Security & Audit Notice',
    footerSecurityDesc: 'Authorized Government Personnel Only. All queries, match evaluations, fee reviews, and dossier exports are cryptographically logged in the tamper-evident audit ledger.',
    footerManagedBy: 'Website Content Managed by All India Council for Technical Education (AICTE), Nelson Mandela Marg, Vasant Kunj, New Delhi-110070.',
    footerSyntheticOnly: 'Designed for National Smart India Hackathon Demonstration. Synthetic Fixtures Only.',
  },

  kn: {
    // Navigation (VTU / KEA Administrative Style Kannada)
    navDashboard: 'ಮುಖಪುಟ (ಡ್ಯಾಶ್‌ಬೋರ್ಡ್)',
    navComplaints: 'ದೂರುಗಳ ನೋಂದಣಿ',
    navInstitutionSearch: 'ಸಂಸ್ಥೆಗಳ ಶೋಧನೆ',
    navCrossBureau: 'ಅಂತರ್-ವಿಭಾಗೀಯ ಪ್ರಕರಣಗಳು',
    navTrustNetwork: 'ಟ್ರಸ್ಟ್ ಜಾಲಬಂಧ',
    navFeeAnomaly: 'ಶುಲ್ಕ ವ್ಯತ್ಯಾಸ ಪರಿಶೀಲನೆ',
    navCoordination: 'ಸಮನ್ವಯ ಕಾರ್ಯಸ್ಥಳ',
    navSlaMonitoring: 'ಸೇವಾ ಭರವಸೆ (SLA) ಮೇಲ್ವಿಚಾರಣೆ',
    navAuditLog: 'ಲೆಕ್ಕಪರಿಶೋಧನಾ ದಾಖಲೆ',
    navAdministration: 'ಆಡಳಿತ ವಿಭಾಗ',

    // Header
    skipToMain: 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ತೆರಳಿ',
    screenReader: 'ಸ್ಕ್ರೀನ್ ರೀಡರ್ ಸೌಲಭ್ಯ',
    textSize: 'ಅಕ್ಷರದ ಗಾತ್ರ:',
    languageLabel: 'ಭಾಷೆ (Language):',
    voiceAssistant: 'ಭಾಷಿಣಿ ಧ್ವನಿ ಸಹಾಯಕ',
    ministryName: 'ಶಿಕ್ಷಣ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ',
    aicteName: 'ಅಖಿಲ ಭಾರತ ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣ ಮಂಡಳಿ (AICTE)',
    portalSubtitle: 'ಏಕೀಕೃತ ಪ್ರಕರಣ ಸಮನ್ವಯ ರೇಡಾರ್ ಮತ್ತು ದೂರು ಪರಿಹಾರ ವೇದಿಕೆ',
    demoPrototypeNotice: 'ಪ್ರಾಯೋಗಿಕ ಮಾದರಿ',
    syntheticNotice: 'ತೋರಿಸಲಾದ ಎಲ್ಲಾ ದಾಖಲೆಗಳು ಮತ್ತು ಸಂಸ್ಥೆಗಳು ಕೃತಕವಾಗಿವೆ.',
    loggedInAs: 'ಲಾಗಿನ್ ಆದ ಅಧಿಕಾರಿ:',
    roleOfficer: 'ಪಾತ್ರ: ದೂರು ಪರಿಹಾರಾಧಿಕಾರಿ (ಡಾ. ಶರ್ಮಾ)',
    roleAdmin: 'ಪಾತ್ರ: ಸಿಸ್ಟಮ್ ನಿರ್ವಾಹಕರು (ಶ್ರೀ ಅರವಿಂದ್ ಕುಮಾರ್)',

    // Action Buttons
    openCoordinationBtn: 'ಸಮನ್ವಯ ಕಾರ್ಯಸ್ಥಳ ತೆರೆಯಿರಿ',
    generateDossierPdfBtn: 'ಸಮನ್ವಯ ಡಾಸಿಯರ್ ಪಿಡಿಎಫ್ ತಯಾರಿಸಿ',
    voiceSearchBtn: 'ಧ್ವನಿ ಶೋಧನೆ',
    filterRecordsBtn: 'ದಾಖಲೆಗಳನ್ನು ಶೋಧಿಸಿ',
    resetBtn: 'ಮರುಹೊಂದಿಸಿ',
    reviewBtn: 'ಪರಿಶೀಲಿಸಿ',
    viewDetailsBtn: 'ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
    downloadDossierBtn: 'ಸಮನ್ವಯ ಡಾಸಿಯರ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',

    // Key Dashboard Banners & Boxes (User Requested Fixes)
    ghostBannerText: '🔴 Ghost 87% - Same Door No. 10 Koramangala, Name 82% similar, Same Trust ABC, Same Pincode 560034',
    healthRedBoxText: 'Health: 35/100 - RED - 2 Overdue + 1 Ghost + Fee ₹40k excess',
    feeAnomalyCardText: '💰 Anomaly: Approved ₹80k, Charged ₹1.2L - 50% Excess - Proof: Receipt No. 1234',
    reviewMatchAnomalyBtn: 'ಸಂಭಾವ್ಯ ಹೋಲಿಕೆ ಮತ್ತು ವ್ಯತ್ಯಾಸ ಪರಿಶೀಲಿಸಿ →',

    // Dashboard & Metrics
    dashboardHeading: 'ಕೇಂದ್ರ ಆಡಳಿತಾತ್ಮಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ — AICTE ರೇಡಾರ್',
    welcomeOfficer: 'ಸ್ವಾಗತ',
    totalGrievances: 'ಒಟ್ಟು ದೂರುಗಳು',
    openGrievances: 'ಬಾಕಿ ಇರುವ ದೂರುಗಳು',
    overdueSla: 'ಗಡುವು ಮೀರಿದ ದೂರುಗಳು',
    relatedCaseGroups: 'ಸಂಬಂಧಿತ ಪ್ರಕರಣ ಗುಂಪುಗಳು',
    feeAnomalies: 'ಶುಲ್ಕ ವ್ಯತ್ಯಾಸಗಳು',
    highPriorityAlert: 'ಹೆಚ್ಚಿನ / ನಿರ್ಣಾಯಕ ಆದ್ಯತೆ',
    activeInvestigation: 'ಸಕ್ರಿಯ ತನಿಖೆ',
    coordinationRequired: 'ಸಮನ್ವಯ ಅಗತ್ಯವಿದೆ',
    allRegisteredBureaus: 'ಎಲ್ಲಾ ನೋಂದಾಯಿತ ವಿಭಾಗಗಳು',

    // Search & Filters
    searchFiltersHeading: 'ದೂರುಗಳ ನೋಂದಣಿ ಶೋಧನೆ ಮತ್ತು ಫಿಲ್ಟರ್',
    searchKeywordsLabel: 'ಕೀವರ್ಡ್‌ಗಳ ಮೂಲಕ ಶೋಧಿಸಿ:',
    searchPlaceholder: 'ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ, ಸಂಸ್ಥೆ, ವಿದ್ಯಾರ್ಥಿ, ವಿಷಯ...',
    bureauFilterLabel: 'ವಿಭಾಗದ ಫಿಲ್ಟರ್:',
    allBureaus: 'ಎಲ್ಲಾ ವಿಭಾಗಗಳು (PGRC, RB, AB, VB, TB)',
    statusFilterLabel: 'ದೂರಿನ ಸ್ಥಿತಿ:',
    allStatuses: 'ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು',
    priorityFilterLabel: 'ಆದ್ಯತೆಯ ಹಂತ:',
    allPriorities: 'ಎಲ್ಲಾ ಆದ್ಯತೆಗಳು',

    // Table Headers
    colRefNo: 'ಉಲ್ಲೇಖ #',
    colBureau: 'ನಿಯೋಜಿತ ವಿಭಾಗ',
    colInstitution: 'ಸಂಸ್ಥೆಯ ಹೆಸರು ಮತ್ತು ನಗರ',
    colCategory: 'ವರ್ಗ',
    colComplainant: 'ದೂರುದಾರರು',
    colPriorityScore: 'ಆದ್ಯತಾ ಅಂಕ',
    colSlaDeadline: 'SLA ಗಡುವು',
    colStatus: 'ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ',
    colAction: 'ಕ್ರಮ',

    // Statuses & Priority
    statusAwaitingReview: 'ಪರಿಶೀಲನೆಗೆ ಬಾಕಿ',
    statusUnderReview: 'ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ',
    statusEscalated: 'ಮೇಲ್ದರ್ಜೆಗೇರಿಸಲಾಗಿದೆ',
    statusResolved: 'ಪರಿಹರಿಸಲಾಗಿದೆ',
    priorityCritical: 'ನಿರ್ಣಾಯಕ',
    priorityHigh: 'ಹೆಚ್ಚಿನ',
    priorityMedium: 'ಮಧ್ಯಮ',
    priorityLow: 'ಕಡಿಮೆ',
    overdueByDays: 'ಗಡುವು ಮೀರಿದೆ',
    daysRemaining: 'ದಿನಗಳು ಬಾಕಿ ಇವೆ',

    // Section Headers
    criticalSlaSection: 'ನಿರ್ಣಾಯಕ SLA ಮತ್ತು ಶಾಸನಬದ್ಧ ಗಮನದ ಅಗತ್ಯವಿದೆ',
    recentAuditSection: 'ಇತ್ತೀಚಿನ ಆಡಳಿತಾತ್ಮಕ ಲೆಕ್ಕಪರಿಶೋಧನಾ ಚಟುವಟಿಕೆಗಳು',
    viewSlaTable: 'SLA ಕೋಷ್ಟಕ ವೀಕ್ಷಿಸಿ →',
    fullAuditTrail: 'ಸಂಪೂರ್ಣ ಆಡಿಟ್ ದಾಖಲೆ →',
    fullRegisterView: 'ಸಂಪೂರ್ಣ ದೂರುಗಳ ಪಟ್ಟಿ →',

    // Footer
    footerPortalInfo: 'ಪೋರ್ಟಲ್ ಮಾಹಿತಿ',
    footerPortalDesc: 'AICTE ಏಕೀಕೃತ ಪ್ರಕರಣ ಸಮನ್ವಯ ರೇಡಾರ್ ಅಂತರ್-ವಿಭಾಗೀಯ ದೂರುಗಳ ಮೇಲ್ವಿಚಾರಣೆ, ಪಾರದರ್ಶಕ ಸಂಸ್ಥೆ ಗುರುತಿಸುವಿಕೆ ಮತ್ತು ಆಡಿಟ್ ಸಮಗ್ರತೆಗಾಗಿ ರೂಪಿಸಲಾದ ಆಡಳಿತಾತ್ಮಕ ವೇದಿಕೆಯಾಗಿದೆ.',
    footerBureaus: 'ಭಾಗವಹಿಸುವ ವಿಭಾಗಗಳು',
    footerStatutory: 'ಶಾಸನಬದ್ಧ ನಿಯಮಾವಳಿಗಳು',
    footerSecurityNotice: 'ಭದ್ರತೆ ಮತ್ತು ಲೆಕ್ಕಪರಿಶೋಧನಾ ಸೂಚನೆ',
    footerSecurityDesc: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಸಿಬ್ಬಂದಿಗೆ ಮಾತ್ರ ಪ್ರವೇಶ. ಎಲ್ಲಾ ವಿಚಾರಣೆಗಳು, ಹೊಂದಾಣಿಕೆಗಳು, ಶುಲ್ಕ ಪರಿಶೀಲನೆಗಳು ಮತ್ತು ಡಾಸಿಯರ್ ರಫ್ತುಗಳು ಆಡಿಟ್ ದಾಖಲೆಯಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ದಾಖಲಾಗುತ್ತವೆ.',
    footerManagedBy: 'ವೆಬ್‌ಸೈಟ್ ನಿರ್ವಹಣೆ: ಅಖಿಲ ಭಾರತ ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣ ಮಂಡಳಿ (AICTE), ನೆಲ್ಸನ್ ಮಂಡೇಲಾ ಮಾರ್ಗ, ವಸಂತ ಕುಂಜ, ನವದೆಹಲಿ-110070.',
    footerSyntheticOnly: 'ರಾಷ್ಟ್ರೀಯ ಸ್ಮಾರ್ಟ್ ಇಂಡಿಯಾ ಹ್ಯಾಕಥಾನ್ ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ. ಕೃತಕ ದತ್ತಾಂಶ ಮಾತ್ರ.',
  },

  hi: {
    // Navigation
    navDashboard: 'डैशबोर्ड',
    navComplaints: 'शिकायत रजिस्टर',
    navInstitutionSearch: 'संस्थान खोज',
    navCrossBureau: 'अंतर-ब्यूरो मामले',
    navTrustNetwork: 'ट्रस्ट नेटवर्क',
    navFeeAnomaly: 'शुल्क विसंगति समीक्षा',
    navCoordination: 'समन्वय कार्यक्षेत्र',
    navSlaMonitoring: 'एसएलए निगरानी',
    navAuditLog: 'ऑडिट लॉग',
    navAdministration: 'प्रशासन',

    // Header
    skipToMain: 'मुख्य सामग्री पर जाएं',
    screenReader: 'स्क्रीन रीडर एक्सेस',
    textSize: 'अक्षर का आकार:',
    languageLabel: 'भाषा (Language):',
    voiceAssistant: 'भाषिणी वॉयस',
    ministryName: 'शिक्षा मंत्रालय, भारत सरकार',
    aicteName: 'अखिल भारतीय तकनीकी शिक्षा परिषद (AICTE)',
    portalSubtitle: 'एकीकृत मामला समन्वय रडार एवं शिकायत निगरानी मंच',
    demoPrototypeNotice: 'प्रदर्शन प्रोटोटाइप',
    syntheticNotice: 'प्रदर्शित सभी रिकॉर्ड और संस्थान सिंथेटिक हैं।',
    loggedInAs: 'लॉग इन अधिकारी:',
    roleOfficer: 'भूमिका: शिकायत अधिकारी (डॉ. शर्मा)',
    roleAdmin: 'भूमिका: सिस्टम एडमिन (श्री अरविंद कुमार)',

    // Action Buttons
    openCoordinationBtn: 'समन्वय कार्यक्षेत्र खोलें',
    generateDossierPdfBtn: 'समन्वय डोजियर पीडीएफ बनाएं',
    voiceSearchBtn: 'वॉयस खोज',
    filterRecordsBtn: 'रिकॉर्ड फ़िल्टर करें',
    resetBtn: 'रीसेट',
    reviewBtn: 'समीक्षा',
    viewDetailsBtn: 'विवरण देखें',
    downloadDossierBtn: 'समन्वय डोजियर डाउनलोड करें',

    // Key Dashboard Banners & Boxes (User Requested Fixes)
    ghostBannerText: '🔴 Ghost 87% - Same Door No. 10 Koramangala, Name 82% similar, Same Trust ABC, Same Pincode 560034',
    healthRedBoxText: 'Health: 35/100 - RED - 2 Overdue + 1 Ghost + Fee ₹40k excess',
    feeAnomalyCardText: '💰 Anomaly: Approved ₹80k, Charged ₹1.2L - 50% Excess - Proof: Receipt No. 1234',
    reviewMatchAnomalyBtn: 'संभावित मिलान एवं विसंगति समीक्षा →',

    // Dashboard & Metrics
    dashboardHeading: 'केंद्रीय प्रशासनिक डैशबोर्ड — AICTE रडार',
    welcomeOfficer: 'स्वागत है',
    totalGrievances: 'कुल शिकायतें',
    openGrievances: 'लंबित शिकायतें',
    overdueSla: 'समय सीमा समाप्त एसएलए',
    relatedCaseGroups: 'संबंधित मामला समूह',
    feeAnomalies: 'शुल्क विसंगतियां',
    highPriorityAlert: 'उच्च / गंभीर प्राथमिकता',
    activeInvestigation: 'सक्रिय जांच',
    coordinationRequired: 'समन्वय आवश्यक',
    allRegisteredBureaus: 'सभी पंजीकृत ब्यूरो',

    // Search & Filters
    searchFiltersHeading: 'शिकायत रजिस्टर खोजें एवं फ़िल्टर करें',
    searchKeywordsLabel: 'कीवर्ड द्वारा खोजें:',
    searchPlaceholder: 'संदर्भ संख्या, संस्थान, छात्र, विषय...',
    bureauFilterLabel: 'ब्यूरो फ़िल्टर:',
    allBureaus: 'सभी ब्यूरो (PGRC, RB, AB, VB, TB)',
    statusFilterLabel: 'शिकायत स्थिति:',
    allStatuses: 'सभी स्थितियां',
    priorityFilterLabel: 'प्राथमिकता स्तर:',
    allPriorities: 'सभी प्राथमिकताएं',

    // Table Headers
    colRefNo: 'संदर्भ #',
    colBureau: 'नियुक्त ब्यूरो',
    colInstitution: 'संस्थान का नाम व शहर',
    colCategory: 'श्रेणी',
    colComplainant: 'शिकायतकर्ता',
    colPriorityScore: 'प्राथमिकता स्कोर',
    colSlaDeadline: 'एसएलए समय सीमा',
    colStatus: 'वर्तमान स्थिति',
    colAction: 'कार्रवाई',

    // Statuses & Priority
    statusAwaitingReview: 'समीक्षा प्रतीक्षित',
    statusUnderReview: 'समीक्षाधीन',
    statusEscalated: 'अग्रेषित',
    statusResolved: 'निस्तारित',
    priorityCritical: 'गंभीर',
    priorityHigh: 'उच्च',
    priorityMedium: 'मध्यम',
    priorityLow: 'निम्न',
    overdueByDays: 'विलंबित दिन',
    daysRemaining: 'दिन शेष',

    // Section Headers
    criticalSlaSection: 'महत्वपूर्ण एसएलए एवं वैधानिक ध्यान आवश्यक',
    recentAuditSection: 'हाल की प्रशासनिक ऑडिट गतिविधियां',
    viewSlaTable: 'एसएलए तालिका देखें →',
    fullAuditTrail: 'पूर्ण ऑडिट ट्रेल →',
    fullRegisterView: 'पूर्ण शिकायत सूची →',

    // Footer
    footerPortalInfo: 'पोर्टल जानकारी',
    footerPortalDesc: 'AICTE एकीकृत मामला समन्वय रडार अंतर-ब्यूरो शिकायत निगरानी, पारदर्शी संस्थान पहचान मिलान और ऑडिट अखंडता के लिए एक प्रशासनिक मंच है।',
    footerBureaus: 'भागीदार ब्यूरो',
    footerStatutory: 'वैधानिक दिशानिर्देश',
    footerSecurityNotice: 'सुरक्षा एवं ऑडिट सूचना',
    footerSecurityDesc: 'केवल अधिकृत सरकारी कर्मियों के लिए। सभी पूछताछ, मिलान मूल्यांकन, शुल्क समीक्षा और डोजियर निर्यात ऑडिट बहीखाते में दर्ज होते हैं।',
    footerManagedBy: 'वेबसाइट सामग्री प्रबंधन: अखिल भारतीय तकनीकी शिक्षा परिषद (AICTE), नेल्सन मंडेला मार्ग, वसंत कुंज, नई दिल्ली-110070।',
    footerSyntheticOnly: 'राष्ट्रीय स्मार्ट इंडिया हैकाथॉन प्रदर्शन हेतु निर्मित। केवल सिंथेटिक डेटा।',
  },

  ta: {
    navDashboard: 'முகப்பு (Dashboard)',
    navComplaints: 'புகார் பதிவேடு',
    navInstitutionSearch: 'நிறுவன தேடல்',
    navCrossBureau: 'துறைசார் வழக்குகள்',
    navTrustNetwork: 'அறக்கட்டளை பிணையம்',
    navFeeAnomaly: 'கட்டண முரண்பாடு தணிக்கை',
    navCoordination: 'ஒருங்கிணைப்பு பணிமனை',
    navSlaMonitoring: 'SLA கண்காணிப்பு',
    navAuditLog: 'தணிக்கை பதிவு',
    navAdministration: 'நிர்வாகம்',

    skipToMain: 'முக்கிய பகுதிக்கு செல்க',
    screenReader: 'திரை வாசிப்பான் வசதி',
    textSize: 'எழுத்து அளவு:',
    languageLabel: 'மொழி (Language):',
    voiceAssistant: 'பாஷினி குரல் வழி',
    ministryName: 'கல்வி அமைச்சகம், இந்திய அரசு',
    aicteName: 'அகில இந்திய தொழில்நுட்பக் கல்விக் குழு (AICTE)',
    portalSubtitle: 'ஒருங்கிணைந்த வழக்கு ஒருங்கிணைப்பு ரேடார் மற்றும் புகார் கண்காணிப்பு தளம்',
    demoPrototypeNotice: 'மாதிரி செயல்விளக்கம்',
    syntheticNotice: 'காட்டப்படும் அனைத்து பதிவுகளும் நிறுவனங்களும் மாதிரிகளே.',
    loggedInAs: 'உள்நுழைந்த அதிகாரி:',
    roleOfficer: 'பொறுப்பு: குறைதீர்ப்பு அதிகாரி (Dr. சர்மா)',
    roleAdmin: 'பொறுப்பு: கணினி நிர்வாகி (திரு. அரவிந்த் குமார்)',

    openCoordinationBtn: 'ஒருங்கிணைப்பு பணிமனையை திறக்கவும்',
    generateDossierPdfBtn: 'ஒருங்கிணைப்பு ஆவணம் PDF உருவாக்கவும்',
    voiceSearchBtn: 'குரல் தேடல்',
    filterRecordsBtn: 'பதிவுகளை வடிகட்டு',
    resetBtn: 'மீட்டமை',
    reviewBtn: 'மறுஆய்வு',
    viewDetailsBtn: 'விவரங்களை காண்க',
    downloadDossierBtn: 'ஒருங்கிணைப்பு ஆவணத்தை பதிவிறக்கு',

    ghostBannerText: '🔴 Ghost 87% - Same Door No. 10 Koramangala, Name 82% similar, Same Trust ABC, Same Pincode 560034',
    healthRedBoxText: 'Health: 35/100 - RED - 2 Overdue + 1 Ghost + Fee ₹40k excess',
    feeAnomalyCardText: '💰 Anomaly: Approved ₹80k, Charged ₹1.2L - 50% Excess - Proof: Receipt No. 1234',
    reviewMatchAnomalyBtn: 'பொருத்தம் மற்றும் முரண்பாட்டை ஆராய்க →',

    dashboardHeading: 'மத்திய நிர்வாக டாஷ்போர்டு — AICTE ரேடார்',
    welcomeOfficer: 'வரவேற்பு',
    totalGrievances: 'மொத்த புகார்கள்',
    openGrievances: 'நிலுவை புகார்கள்',
    overdueSla: 'காலாவதியான SLA',
    relatedCaseGroups: 'தொடர்புடைய வழக்கு குழுக்கள்',
    feeAnomalies: 'கட்டண முரண்பாடுகள்',
    highPriorityAlert: 'அதிமுக்கிய / தீவிர எச்சரிக்கை',
    activeInvestigation: 'செயலில் உள்ள விசாரணை',
    coordinationRequired: 'ஒருங்கிணைப்பு தேவை',
    allRegisteredBureaus: 'அனைத்து பதிவு செய்யப்பட்ட துறைகள்',

    searchFiltersHeading: 'புகார் பதிவேடு தேடல் மற்றும் வடிகட்டி',
    searchKeywordsLabel: 'முக்கிய சொல் மூலம் தேடுக:',
    searchPlaceholder: 'குறிப்பு எண், கல்லூரி, மாணவர்...',
    bureauFilterLabel: 'துறை வடிகட்டி:',
    allBureaus: 'அனைத்து துறைகள் (PGRC, RB, AB, VB, TB)',
    statusFilterLabel: 'புகார் நிலை:',
    allStatuses: 'அனைத்து நிலைகள்',
    priorityFilterLabel: 'முன்னுரிமை நிலை:',
    allPriorities: 'அனைத்து முன்னுரிமை நிலைகள்',

    colRefNo: 'குறிப்பு #',
    colBureau: 'ஒதுக்கப்பட்ட துறை',
    colInstitution: 'கல்லூரி பெயர் & ஊர்',
    colCategory: 'பிரிவு',
    colComplainant: 'புகார்தாரர்',
    colPriorityScore: 'முன்னுரிமை புள்ளி',
    colSlaDeadline: 'SLA காலக்கெடு',
    colStatus: 'தற்போதைய நிலை',
    colAction: 'நடவடிக்கை',

    statusAwaitingReview: 'ஆய்வுக்கு காத்திருக்கிறது',
    statusUnderReview: 'ஆய்வில் உள்ளது',
    statusEscalated: 'மேலனுப்பப்பட்டது',
    statusResolved: 'தீர்க்கப்பட்டது',
    priorityCritical: 'மிகத்தீவிர',
    priorityHigh: 'உயர்',
    priorityMedium: 'நடுத்தர',
    priorityLow: 'குறைந்த',
    overdueByDays: 'காலாவதியானது',
    daysRemaining: 'நாட்கள் மீதம்',

    criticalSlaSection: 'முக்கிய SLA மற்றும் சட்டபூர்வ கவனம் தேவை',
    recentAuditSection: 'சமீபத்திய நிர்வாக தணிக்கை நடவடிக்கைகள்',
    viewSlaTable: 'SLA அட்டவணை காண்க →',
    fullAuditTrail: 'முழு தணிக்கை வரலாறு →',
    fullRegisterView: 'முழு பதிவேடு பார்வை →',

    footerPortalInfo: 'தளம் பற்றிய தகவல்',
    footerPortalDesc: 'AICTE ஒருங்கிணைந்த வழக்கு ஒருங்கிணைப்பு ரேடார் நிர்வாக புலனாய்வு தளமாகும்.',
    footerBureaus: 'பங்கேற்கும் துறைகள்',
    footerStatutory: 'சட்ட வழிகாட்டுதல்கள்',
    footerSecurityNotice: 'பாதுகாப்பு & தணிக்கை அறிவிப்பு',
    footerSecurityDesc: 'அங்கீகரிக்கப்பட்ட அரசு அலுவலர்களுக்கு மட்டுமே அனுமதி.',
    footerManagedBy: 'வலைத்தள நிர்வாகம்: அகில இந்திய தொழில்நுட்பக் கல்விக் குழு (AICTE), புதுதில்லி-110070.',
    footerSyntheticOnly: 'தேசிய ஸ்மார்ட் இந்தியா ஹேக்கத்தான் செயல்விளக்கத்திற்கானது. மாதிரி தகவல் மட்டுமே.',
  },

  te: {
    navDashboard: 'డ్యాష్‌బోర్డ్ (Dashboard)',
    navComplaints: 'ఫిర్యాదుల రిజిస్టర్',
    navInstitutionSearch: 'సంస్థల శోధన',
    navCrossBureau: 'అంతర్-విభాగ కేసులు',
    navTrustNetwork: 'ట్రస్ట్ నెట్‌వర్క్',
    navFeeAnomaly: 'ఫీజు వ్యత్యాస సమీక్ష',
    navCoordination: 'సమన్వయ వర్క్‌స్పేస్',
    navSlaMonitoring: 'SLA పర్యవేక్షణ',
    navAuditLog: 'ఆడిట్ లాగ్',
    navAdministration: 'పరిపాలన',

    skipToMain: 'ప్రధాన విషయానికి వెళ్ళండి',
    screenReader: 'స్క్రీన్ రీడర్ సదుపాయం',
    textSize: 'అక్షర పరిమాణం:',
    languageLabel: 'భాష (Language):',
    voiceAssistant: 'భాషిణి వాయిస్',
    ministryName: 'విద్యా మంత్రిత్వ శాఖ, భారత ప్రభుత్వం',
    aicteName: 'అఖిల భారత సాంకేతిక విద్యా మండలి (AICTE)',
    portalSubtitle: 'ఏకీకృత కేసు సమన్వయ రాడార్ & ఫిర్యాదుల పర్యవేక్షణ వేదిక',
    demoPrototypeNotice: 'ప్రదర్శన నమూనా',
    syntheticNotice: 'చూపబడిన రికార్డులు మరియు సంస్థలన్నీ నమూనాలే.',
    loggedInAs: 'లాగిన్ అయిన అధికారి:',
    roleOfficer: 'పాత్ర: ఫిర్యాదుల అధికారి (Dr. శర్మ)',
    roleAdmin: 'పాత్ర: సిస్టమ్ అడ్మిన్ (శ్రీ అరవింద్ కుమార్)',

    openCoordinationBtn: 'సమన్వయ వర్క్‌స్పేస్ తెరవండి',
    generateDossierPdfBtn: 'సమన్వయ డాసియర్ PDF రూపొందించండి',
    voiceSearchBtn: 'వాయిస్ శోధన',
    filterRecordsBtn: 'రికార్డులను ఫిల్టర్ చేయండి',
    resetBtn: 'రీసెట్',
    reviewBtn: 'సమీక్షించండి',
    viewDetailsBtn: 'వివరాలు చూడండి',
    downloadDossierBtn: 'సమన్వయ డాసియర్ డౌన్‌లోడ్ చేయండి',

    ghostBannerText: '🔴 Ghost 87% - Same Door No. 10 Koramangala, Name 82% similar, Same Trust ABC, Same Pincode 560034',
    healthRedBoxText: 'Health: 35/100 - RED - 2 Overdue + 1 Ghost + Fee ₹40k excess',
    feeAnomalyCardText: '💰 Anomaly: Approved ₹80k, Charged ₹1.2L - 50% Excess - Proof: Receipt No. 1234',
    reviewMatchAnomalyBtn: 'పోలిక మరియు వ్యత్యాసాన్ని సమీక్షించండి →',

    dashboardHeading: 'కేంద్ర పరిపాలనా డాష్‌బోర్డ్ — AICTE రాడార్',
    welcomeOfficer: 'స్వాగతం',
    totalGrievances: 'మొత్తం ఫిర్యాదులు',
    openGrievances: 'పెండింగ్ ఫిర్యాదులు',
    overdueSla: 'గడువు ముగిసిన SLA',
    relatedCaseGroups: 'సంబంధిత కేసు గ్రూపులు',
    feeAnomalies: 'ఫీజు వ్యత్యాసాలు',
    highPriorityAlert: 'అత్యవసర / క్లిష్టమైన హెచ్చరిక',
    activeInvestigation: 'క్రియాశీల దర్యాప్తు',
    coordinationRequired: 'సమన్వయం అవసరం',
    allRegisteredBureaus: 'అన్ని నమోదిత విభాగాలు',

    searchFiltersHeading: 'ఫిర్యాదుల రిజిస్టర్ శోధన మరియు ఫిల్టర్',
    searchKeywordsLabel: 'కీలకపదాల ద్వారా శోధించండి:',
    searchPlaceholder: 'రిఫరెన్స్ నంబర్, కళాశాల, విద్యార్థి...',
    bureauFilterLabel: 'విభాగం ఫిల్టర్:',
    allBureaus: 'అన్ని విభాగాలు (PGRC, RB, AB, VB, TB)',
    statusFilterLabel: 'ఫిర్యాదు స్థితి:',
    allStatuses: 'అన్ని స్థితులు',
    priorityFilterLabel: 'ప్రాధాన్యత స్థాయి:',
    allPriorities: 'అన్ని ప్రాధాన్యతలు',

    colRefNo: 'రిఫరెన్స్ #',
    colBureau: 'కేటాయించిన విభాగం',
    colInstitution: 'సంస్థ పేరు & ఊరు',
    colCategory: 'వర్గం',
    colComplainant: 'ఫిర్యాదుదారుడు',
    colPriorityScore: 'ప్రాధాన్యతా స్కోరు',
    colSlaDeadline: 'SLA గడువు',
    colStatus: 'ప్రస్తుత స్థితి',
    colAction: 'చర్య',

    statusAwaitingReview: 'సమీక్ష కోసం వేచి ఉంది',
    statusUnderReview: 'సమీక్షలో ఉంది',
    statusEscalated: 'పైస్థాయికి పంపబడింది',
    statusResolved: 'పరిష్కరించబడింది',
    priorityCritical: 'క్లిష్టమైన',
    priorityHigh: 'అధిక',
    priorityMedium: 'మధ్యస్థ',
    priorityLow: 'తక్కువ',
    overdueByDays: 'గడువు మించిన రోజులు',
    daysRemaining: 'మిగిలిన రోజులు',

    criticalSlaSection: 'కీలక SLA మరియు చట్టబద్ధమైన శ్రద్ధ అవసరం',
    recentAuditSection: 'ఇటీవలి పరిపాలనా ఆడిట్ కార్యకలాపాలు',
    viewSlaTable: 'SLA పట్టిక చూడండి →',
    fullAuditTrail: 'పూర్తి ఆడిట్ ట్రయిల్ →',
    fullRegisterView: 'పూర్తి రిజిస్టర్ వీక్షణ →',

    footerPortalInfo: 'పోర్టల్ సమాచారం',
    footerPortalDesc: 'AICTE ఏకీకృత కేసు సమన్వయ రాడార్ పరిపాలనా నిఘా వేదిక.',
    footerBureaus: 'పాల్గొంటున్న విభాగాలు',
    footerStatutory: 'చట్టబద్ధమైన మార్గదర్శకాలు',
    footerSecurityNotice: 'భద్రత & ఆడిట్ నోటీసు',
    footerSecurityDesc: 'అధికారిక ప్రభుత్వ సిబ్బందికి మాత్రమే అనుమతి.',
    footerManagedBy: 'వెబ్‌సైట్ నిర్వహణ: అఖిల భారత సాంకేతిక విద్యా మండలి (AICTE), న్యూఢిల్లీ-110070.',
    footerSyntheticOnly: 'జాతీయ స్మార్ట్ ఇండియా హ్యాకథాన్ ప్రదర్శన కోసం రూపొందించబడింది. నమూనా డేటా మాత్రమే.',
  },

  mr: {
    navDashboard: 'डॅशबोर्ड (Dashboard)',
    navComplaints: 'तक्रार नोंदवही',
    navInstitutionSearch: 'संस्था शोध',
    navCrossBureau: 'आंतर-विभाग प्रकरणे',
    navTrustNetwork: 'विश्वस्त नेटवर्क',
    navFeeAnomaly: 'शुल्क तफावत पुनरावलोकन',
    navCoordination: 'समन्वय कार्यक्षेत्र',
    navSlaMonitoring: 'SLA देखरेख',
    navAuditLog: 'ऑडिट लॉग',
    navAdministration: 'प्रशासन',

    skipToMain: 'मुख्य मजकुरावर जा',
    screenReader: 'स्क्रीन रीडर प्रवेश',
    textSize: 'अक्षर आकार:',
    languageLabel: 'भाषा (Language):',
    voiceAssistant: 'भाषिणी आवाज',
    ministryName: 'शिक्षण मंत्रालय, भारत सरकार',
    aicteName: 'अखिल भारतीय तंत्रशिक्षण परिषद (AICTE)',
    portalSubtitle: 'एकीकृत प्रकरण समन्वय रडार आणि तक्रार निवारण मंच',
    demoPrototypeNotice: 'प्रात्यक्षिक नमुना',
    syntheticNotice: 'दर्शविलेले सर्व रेकॉर्ड आणि संस्था काल्पनिक आहेत.',
    loggedInAs: 'लॉगिन अधिकारी:',
    roleOfficer: 'भूमिका: तक्रार निवारण अधिकारी (डॉ. शर्मा)',
    roleAdmin: 'भूमिका: सिस्टम ॲडमिन (श्री अरविंद कुमार)',

    openCoordinationBtn: 'समन्वय कार्यक्षेत्र उघडा',
    generateDossierPdfBtn: 'समन्वय डॉसियर PDF तयार करा',
    voiceSearchBtn: 'आवाज शोध',
    filterRecordsBtn: 'रेकॉर्ड फिल्टर करा',
    resetBtn: 'रीसेट',
    reviewBtn: 'पुनरावलोकन',
    viewDetailsBtn: 'तपशील पहा',
    downloadDossierBtn: 'समन्वय डॉसियर डाउनलोड करा',

    ghostBannerText: '🔴 Ghost 87% - Same Door No. 10 Koramangala, Name 82% similar, Same Trust ABC, Same Pincode 560034',
    healthRedBoxText: 'Health: 35/100 - RED - 2 Overdue + 1 Ghost + Fee ₹40k excess',
    feeAnomalyCardText: '💰 Anomaly: Approved ₹80k, Charged ₹1.2L - 50% Excess - Proof: Receipt No. 1234',
    reviewMatchAnomalyBtn: 'संभाव्य जुळणी आणि तफावत तपासा →',

    dashboardHeading: 'केंद्रीय प्रशासकीय डॅशबोर्ड — AICTE रडार',
    welcomeOfficer: 'स्वागत आहे',
    totalGrievances: 'एकूण तक्रारी',
    openGrievances: 'प्रलंबित तक्रारी',
    overdueSla: 'मुदत संपलेले SLA',
    relatedCaseGroups: 'संबंधित प्रकरण गट',
    feeAnomalies: 'शुल्क तफावती',
    highPriorityAlert: 'अति-महत्त्वाचा / गंभीर इशारा',
    activeInvestigation: 'सक्रिय तपास',
    coordinationRequired: 'समन्वय आवश्यक',
    allRegisteredBureaus: 'सर्व नोंदणीकृत विभाग',

    searchFiltersHeading: 'तक्रार नोंदवही शोधा आणि फिल्टर करा',
    searchKeywordsLabel: 'कीवर्डनुसार शोधा:',
    searchPlaceholder: 'संदर्भ क्रमांक, संस्था, विद्यार्थी...',
    bureauFilterLabel: 'विभाग फिल्टर:',
    allBureaus: 'सर्व विभाग (PGRC, RB, AB, VB, TB)',
    statusFilterLabel: 'तक्रार स्थिती:',
    allStatuses: 'सर्व स्थिती',
    priorityFilterLabel: 'प्राधान्य पातळी:',
    allPriorities: 'सर्व प्राधान्ये',

    colRefNo: 'संदर्भ #',
    colBureau: 'नियुक्त विभाग',
    colInstitution: 'संस्थेचे नाव आणि शहर',
    colCategory: 'श्रेणी',
    colComplainant: 'तक्रारदार',
    colPriorityScore: 'प्राधान्य गुण',
    colSlaDeadline: 'SLA मुदत',
    colStatus: 'सद्यस्थिती',
    colAction: 'कारवाई',

    statusAwaitingReview: 'पुनरावलोकनाची प्रतीक्षा',
    statusUnderReview: 'पुनरावलोकनाधीन',
    statusEscalated: 'वरिष्ठांकडे वर्ग',
    statusResolved: 'निवारण झाले',
    priorityCritical: 'गंभीर',
    priorityHigh: 'उच्च',
    priorityMedium: 'मध्यम',
    priorityLow: 'कमी',
    overdueByDays: 'मुदत उलटून गेलेले दिवस',
    daysRemaining: 'शिल्लक दिवस',

    criticalSlaSection: 'महत्त्वाचे SLA आणि वैधानिक लक्ष आवश्यक',
    recentAuditSection: 'अलीकडील प्रशासकीय ऑडिट उपक्रम',
    viewSlaTable: 'SLA तक्ता पहा →',
    fullAuditTrail: 'पूर्ण ऑडिट नोंद →',
    fullRegisterView: 'पूर्ण नोंदवही पहा →',

    footerPortalInfo: 'पोर्टल माहिती',
    footerPortalDesc: 'AICTE एकीकृत प्रकरण समन्वय रडार हे प्रशासकीय गुप्तवार्ता मंच आहे.',
    footerBureaus: 'सहभागी विभाग',
    footerStatutory: 'वैधानिक मार्गदर्शक तत्त्वे',
    footerSecurityNotice: 'सुरक्षा आणि ऑडिट सूचना',
    footerSecurityDesc: 'केवळ अधिकृत सरकारी कर्मचाऱ्यांसाठी प्रवेश.',
    footerManagedBy: 'वेबसाईट व्यवस्थापन: अखिल भारतीय तंत्रशिक्षण परिषद (AICTE), नवी दिल्ली-110070.',
    footerSyntheticOnly: 'राष्ट्रीय स्मार्ट इंडिया हॅकाथॉन प्रात्यक्षिकासाठी निर्मित. केवळ काल्पनिक माहिती.',
  },
};
