'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useApp } from '@/context/AppContext';
import NicSmsGatewayPanel from '@/components/NicSmsGatewayPanel';

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser, maskSensitiveData, setVoiceModalOpen, t, language } = useApp();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBureau, setFilterBureau] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [ghostBouncing, setGhostBouncing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setGhostBouncing(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [filterBureau, filterStatus, filterPriority]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterBureau !== 'ALL') params.append('bureau', filterBureau);
      if (filterStatus !== 'ALL') params.append('status', filterStatus);
      if (filterPriority !== 'ALL') params.append('priority', filterPriority);
      if (searchQuery) params.append('search', searchQuery);

      const res = await fetch(`/api/complaints?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setComplaints(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchComplaints();
  };

  // Metrics calculation
  const totalComplaints = complaints.length;
  const openComplaints = complaints.filter((c) => c.status !== 'Resolved').length;
  const overdueComplaints = complaints.filter(
    (c) => new Date(c.slaDeadline).getTime() < new Date().getTime() && c.status !== 'Resolved'
  ).length;
  const highPriorityCases = complaints.filter(
    (c) => c.priorityLevel === 'High' || c.priorityLevel === 'Critical'
  ).length;
  const feeAnomaliesCount = complaints.filter((c) => c.category === 'Fee Anomaly').length;

  return (
    <div className="print-dossier space-y-3.5">
      {/* Welcome & Officer Control Bar with 2 Mandatory Action Buttons (PROMPT 4 & 5) */}
      <div className="gov-panel p-3 bg-white flex flex-wrap justify-between items-center border border-gray-300">
        <div>
          <h2 className="text-[17px] font-bold text-[#002147] tracking-tight">
            {t.dashboardHeading}
          </h2>
          <p className="text-[12px] text-gray-600">
            {t.welcomeOfficer}, <strong>{currentUser.fullName}</strong> ({currentUser.designation}). Session ID:{' '}
            <code>LAN-DEL-29581</code> | Authority: {currentUser.bureau}
          </p>
        </div>

        {/* Action Buttons as requested in PROMPTS 4 & 5 */}
        <div className="flex flex-wrap items-center gap-1 mt-2 sm:mt-0 no-print">
          {/* PROMPT 4 - Button 1 - Open Coordination Workspace */}
          <button
            onClick={() => router.push('/coordination')}
            className="bg-[#0f172a] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black shadow"
          >
            Open Coordination Workspace
          </button>

          {/* PROMPT 5 - Button 2 - Generate Dossier PDF */}
          <button
            onClick={() => {
              // Save SMS logs first
              localStorage.setItem(
                'dossier_data',
                JSON.stringify({ ref: 'PG-104+RB-208', ghost: '87%', health: '35/100', fee: '40k excess' })
              );
              window.print();
            }}
            className="bg-white text-[#0f172a] border border-[#0f172a] px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 shadow ml-2"
          >
            Generate Coordination Dossier PDF
          </button>

          {/* Voice Search */}
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="gov-btn-saffron text-xs ml-2"
            title="BHASHINI Voice Engine"
          >
            🎙️ {t.voiceSearchBtn}
          </button>
        </div>
      </div>

      {/* PROMPT 4 - Sticky Ghost 87% Banner with LIVE pulse */}
      <div
        className={`sticky top-0 z-40 bg-red-50 border-2 border-red-500 text-red-900 p-3 rounded-xl shadow-md transition-all ${
          ghostBouncing ? 'animate-bounce' : ''
        }`}
      >
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex-1">
            <div className="flex items-center flex-wrap gap-1.5 text-[14px] font-bold">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider mr-1 shadow-sm">
                <span className="inline-block w-2 h-2 bg-white rounded-full animate-ping"></span>
                LIVE
              </span>
              <span>Ghost 87% - Same Door No.10 Koramangala, Name 82% similar, Same Trust ABC, Same Pincode 560034 - Match PG-104 vs RB-208</span>
            </div>
            <div className="text-xs text-red-700 mt-0.5 font-medium ml-0 sm:ml-1">
              Cross-Bureau Deduplication | 100% Address Match (Door #10) | 100% Trust Match (TR-56001) | Potential Regulatory Arbitrage Flagged
            </div>
          </div>
          <Link
            href="/institution-search?q=ABC+Institute+of+Technology"
            className="no-print text-xs bg-red-700 hover:bg-red-800 text-white font-bold px-3.5 py-1.5 rounded-lg whitespace-nowrap shadow-sm transition-colors"
          >
            Review Match →
          </Link>
        </div>
      </div>

      {/* PROMPT 2 - Health Red Box */}
      <div className="bg-red-600 text-white p-4 rounded-xl mt-3 shadow-lg">
        <div className="font-bold text-lg">Health: 35/100 - RED - 2 Overdue + 1 Ghost + Fee ₹40k excess</div>
        <div className="text-xs mt-1 opacity-90">Priority: 75/100 | SLA Overdue: 12 days | Risk: Critical | Action: Immediate</div>
        {/* Progress bar below: width 35% red, background gray-200, height 2 */}
        <div className="w-full bg-gray-200 h-2 rounded mt-2.5 overflow-hidden">
          <div className="bg-red-600 h-2 w-[35%]"></div>
        </div>
      </div>

      {/* PROMPT 3 - Fee Anomaly Card Fix */}
      <div className="bg-yellow-50 border-yellow-300 border p-3 rounded-xl space-y-2">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="font-bold text-yellow-900 text-[14px]">
            💰 Anomaly: Approved ₹80k, Charged ₹1.2L - 50% Excess - Proof: Receipt No. 1234
          </div>
          <Link
            href="/fee-anomaly"
            className="no-print bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg"
          >
            View Receipt OCR
          </Link>
        </div>

        {/* Middle: Progress bar: Approved 80k vs Charged 1.2L visual bar */}
        <div>
          <div className="flex justify-between text-[11.5px] font-semibold text-gray-700 mb-1">
            <span className="text-green-800 font-bold">Approved Ceiling: ₹80,000 (66.7%)</span>
            <span className="text-red-700 font-bold">Unapproved Surcharge: +₹40,000 (33.3%)</span>
          </div>
          <div className="w-full flex h-5 rounded-full overflow-hidden shadow-sm bg-gray-200 border border-gray-300">
            <div
              className="bg-green-600 h-full w-[66.7%] flex items-center justify-center text-white text-xs font-bold transition-all duration-500 shadow-inner px-2"
              title="Approved Ceiling: ₹80,000 (66.7%)"
            >
              ₹80,000 (66.7%)
            </div>
            <div
              className="bg-red-600 h-full w-[33.3%] flex items-center justify-center text-white text-xs font-bold transition-all duration-500 shadow-inner px-2"
              title="Unapproved Surcharge: +₹40,000 (33.3%)"
            >
              +₹40,000 (33.3%)
            </div>
          </div>
        </div>

        {/* Bottom small: Proof: Receipt No. 1234 | OCR Confidence 94% | Student: Rajesh Kumar | ABC College */}
        <div className="text-xs text-gray-600 pt-1 border-t border-yellow-200 flex flex-wrap justify-between">
          <span>Proof: Receipt No. 1234 | OCR Confidence 94% | Student: Rajesh Kumar | ABC College</span>
          <span className="font-bold text-yellow-900">Flagged: 50% Regulatory Variance</span>
        </div>
      </div>

      {/* Compact Administrative Metric Indicator Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        <div className="gov-panel p-2.5 border-t-2 border-t-[#002147] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">{t.totalGrievances}</div>
          <div className="text-[22px] font-bold text-[#002147]">{totalComplaints}</div>
          <div className="text-[10.5px] text-gray-500">{t.allRegisteredBureaus}</div>
        </div>

        <div className="gov-panel p-2.5 border-t-2 border-t-[#0284c7] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">{t.openGrievances}</div>
          <div className="text-[22px] font-bold text-[#0284c7]">{openComplaints}</div>
          <div className="text-[10.5px] text-gray-500">{t.activeInvestigation}</div>
        </div>

        <div className="gov-panel p-2.5 border-t-2 border-t-[#991b1b] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">{t.overdueSla}</div>
          <div className="text-[22px] font-bold text-[#991b1b]">{overdueComplaints}</div>
          <div className="text-[10.5px] text-red-700 font-semibold">VB-112 (Escalation Req.)</div>
        </div>

        <div className="gov-panel p-2.5 border-t-2 border-t-[#e67300] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">{t.relatedCaseGroups}</div>
          <div className="text-[22px] font-bold text-[#e67300]">1</div>
          <div className="text-[10.5px] text-gray-500">CC-2026-BLR-089 (Active)</div>
        </div>

        <div className="gov-panel p-2.5 border-t-2 border-t-[#854d0e] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">{t.feeAnomalies}</div>
          <div className="text-[22px] font-bold text-[#854d0e]">{feeAnomaliesCount}</div>
          <div className="text-[10.5px] text-amber-800 font-semibold">2 Awaiting Audit</div>
        </div>

        <div className="gov-panel p-2.5 border-t-2 border-t-[#138808] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">{t.highPriorityAlert}</div>
          <div className="text-[22px] font-bold text-[#138808]">{highPriorityCases}</div>
          <div className="text-[10.5px] text-gray-500">{t.coordinationRequired}</div>
        </div>
      </div>

      {/* Search and Filter Panel */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>{t.searchFiltersHeading}</span>
          <span className="text-xs font-normal text-gray-500">
            {language === 'kn' ? 'ನೈಜ-ಸಮಯದ ಡೇಟಾಬೇಸ್ ಫಿಲ್ಟರ್‌ಗಳು' : 'Real-time database filters'}
          </span>
        </div>
        <div className="p-3 bg-white">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#002147] mb-1">
                {t.searchKeywordsLabel}
              </label>
              <input
                id="main-search-input"
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="gov-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#002147] mb-1">
                {t.bureauFilterLabel}
              </label>
              <select
                value={filterBureau}
                onChange={(e) => setFilterBureau(e.target.value)}
                className="gov-select w-full text-xs"
              >
                <option value="ALL">{t.allBureaus}</option>
                <option value="PGRC">Public Grievance Redressal Cell (PGRC)</option>
                <option value="Regulation Bureau">Regulation Bureau</option>
                <option value="Approval Bureau">Approval Bureau</option>
                <option value="Vigilance Bureau">Vigilance Bureau</option>
                <option value="Student Grievance Redressal Committee">SGRC</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#002147] mb-1">
                {t.statusFilterLabel}
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="gov-select w-full text-xs"
              >
                <option value="ALL">{t.allStatuses}</option>
                <option value="Awaiting Review">{t.statusAwaitingReview}</option>
                <option value="Under Review">{t.statusUnderReview}</option>
                <option value="Escalated">{t.statusEscalated}</option>
                <option value="Resolved">{t.statusResolved}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#002147] mb-1">
                {t.priorityFilterLabel}
              </label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="gov-select w-full text-xs"
              >
                <option value="ALL">{t.allPriorities}</option>
                <option value="Critical">{t.priorityCritical}</option>
                <option value="High">{t.priorityHigh}</option>
                <option value="Medium">{t.priorityMedium}</option>
                <option value="Low">{t.priorityLow}</option>
              </select>
            </div>

            <div className="flex items-end space-x-2">
              <button type="submit" className="gov-btn-primary text-xs w-full justify-center">
                {t.filterRecordsBtn}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFilterBureau('ALL');
                  setFilterStatus('ALL');
                  setFilterPriority('ALL');
                  setSearchQuery('');
                }}
                className="gov-btn-secondary text-xs px-2.5"
                title={t.resetBtn}
              >
                {t.resetBtn}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Complaint Register Table */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>
            {language === 'kn' ? 'ಸಕ್ರಿಯ ದೂರುಗಳ ನೋಂದಣಿ' : 'Active Grievances Register'} ({complaints.length}{' '}
            {language === 'kn' ? 'ದಾಖಲೆಗಳು' : 'Records'})
          </span>
          <div className="text-xs font-normal flex items-center space-x-2">
            <span className="text-gray-600">{t.syntheticNotice}</span>
            <Link href="/complaints" className="text-[#002147] hover:underline font-bold">
              {t.fullRegisterView}
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th className="w-20">{t.colRefNo}</th>
                <th>{t.colBureau}</th>
                <th>{t.colInstitution}</th>
                <th>{t.colCategory}</th>
                <th>{t.colComplainant}</th>
                <th>{t.colPriorityScore}</th>
                <th>{t.colSlaDeadline}</th>
                <th>{t.colStatus}</th>
                <th className="text-center w-28">{t.colAction}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-gray-500 italic">
                    Loading grievance database...
                  </td>
                </tr>
              ) : complaints.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-6 text-gray-500 italic">
                    No grievance records matched the specified filter criteria.
                  </td>
                </tr>
              ) : (
                complaints.map((c) => {
                  const deadlineDate = new Date(c.slaDeadline);
                  const isOverdue =
                    deadlineDate.getTime() < new Date().getTime() && c.status !== 'Resolved';
                  const daysRemaining = Math.ceil(
                    (deadlineDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                  );

                  return (
                    <tr
                      key={c.id}
                      className={c.refNo === 'PG-104' || c.refNo === 'RB-208' ? 'bg-[#fdfaf5]' : ''}
                    >
                      <td className="font-bold text-[#002147]">{c.refNo}</td>
                      <td>
                        <span className="bg-[#e2e8f0] px-1.5 py-0.5 text-xs font-semibold text-gray-800">
                          {c.bureau}
                        </span>
                      </td>
                      <td>
                        <div className="font-semibold text-gray-900">{c.institution.name}</div>
                        <div className="text-[11.5px] text-gray-500">
                          {c.institution.city}, {c.institution.state} (PIN: {c.institution.pinCode})
                        </div>
                      </td>
                      <td>
                        <span className="font-semibold text-gray-800">{c.category}</span>
                        {c.feeRecords?.length > 0 && (
                          <span className="ml-1 text-[11px] text-[#991b1b] font-bold">
                            [Fee: +₹{c.feeRecords[0].differenceAmount?.toLocaleString()}]
                          </span>
                        )}
                      </td>
                      <td>
                        <div>{c.complainantName}</div>
                        <div className="text-[11px] text-gray-500">
                          {maskSensitiveData(c.complainantContact)}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center space-x-1.5">
                          <span
                            className={`px-1.5 py-0.5 text-xs font-bold ${
                              c.priorityScore >= 85
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : c.priorityScore >= 70
                                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                : 'bg-green-100 text-green-800 border border-green-300'
                            }`}
                          >
                            {c.priorityScore}/100
                          </span>
                          <span className="text-[11px] text-gray-600 font-semibold">
                            {c.priorityLevel}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className={isOverdue ? 'text-red-700 font-bold' : 'text-gray-800'} suppressHydrationWarning>
                          {deadlineDate.toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-[11px]" suppressHydrationWarning>
                          {isOverdue ? (
                            <span className="text-[#991b1b] font-bold">
                              {t.overdueByDays} {Math.abs(daysRemaining)} d
                            </span>
                          ) : (
                            <span className="text-gray-500">
                              {daysRemaining} {t.daysRemaining}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span
                          className={`px-2 py-0.5 text-xs font-bold inline-block ${
                            c.status === 'Resolved'
                              ? 'bg-green-100 text-green-900 border border-green-300'
                              : c.status === 'Escalated'
                              ? 'bg-red-100 text-red-900 border border-red-300'
                              : c.status === 'Under Review'
                              ? 'bg-blue-100 text-blue-900 border border-blue-300'
                              : 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <Link
                          href={
                            c.refNo === 'PG-104' || c.refNo === 'RB-208'
                              ? '/coordination'
                              : `/complaints?refNo=${c.refNo}`
                          }
                          className="gov-btn-primary text-xs py-1 px-2"
                        >
                          {c.refNo === 'PG-104' || c.refNo === 'RB-208'
                            ? language === 'kn' ? 'ಸಮನ್ವಯ' : 'Coordination'
                            : t.reviewBtn}
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Column Administrative Section: High Priority SLA & Recent Audit Logs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left: SLA Escalations */}
        <div className="gov-panel">
          <div className="gov-panel-header">
            <span>{t.criticalSlaSection}</span>
            <Link href="/sla-monitoring" className="text-xs font-bold text-[#002147] hover:underline">
              {t.viewSlaTable}
            </Link>
          </div>
          <div className="p-3 text-[12.5px] space-y-2.5">
            <div className="p-2.5 bg-red-50 border border-red-200">
              <div className="flex justify-between items-start">
                <span className="font-bold text-red-800">VB-112: Dharmapuri Polytechnic College</span>
                <span className="bg-red-700 text-white text-[10px] px-1.5 py-0.2 font-bold">
                  {language === 'kn' ? 'ಗಡುವು ಮೀರಿದೆ' : 'OVERDUE'}
                </span>
              </div>
              <p className="text-gray-700 mt-1">
                {language === 'kn'
                  ? 'ಯಾಂತ್ರಿಕ ಪ್ರಯೋಗಾಲಯ ಉಪಕರಣಗಳ ಅನುಪಸ್ಥಿತಿಯ ಬಗ್ಗೆ ಜಾಗರೂಕತಾ ವಿಚಾರಣೆ. 30 ದಿನಗಳ ಶಾಸನಬದ್ಧ ಗಡುವು 4 ದಿನಗಳ ಹಿಂದೆ ಮುಕ್ತಾಯವಾಗಿದೆ.'
                  : 'Vigilance inquiry regarding phantom mechanical laboratory equipment. Statutory 30-day response window expired 4 days ago with zero institutional reply.'}
              </p>
              <div className="mt-2 text-xs font-bold text-red-900">
                {language === 'kn'
                  ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮ: ಸ್ಥಾಯಿ ಮೇಲ್ಮನವಿ ಸಮಿತಿಗೆ ಕಳುಹಿಸುವುದು.'
                  : 'Recommended Action: Escalation to Standing Appellate Committee recommended.'}
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 border border-amber-200">
              <div className="flex justify-between items-start">
                <span className="font-bold text-amber-900">SGRC-607: Deccan College of Architecture</span>
                <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 font-bold">
                  {language === 'kn' ? 'ಗಡುವು ಸಮೀಪಿಸುತ್ತಿದೆ' : 'APPROACHING'}
                </span>
              </div>
              <p className="text-gray-700 mt-1">
                {language === 'kn'
                  ? 'ನೇಮಕಗೊಂಡ ಒಂಬುಡ್ಸ್‌ಪರ್ಸನ್ ಅನುಪಸ್ಥಿತಿಯ ಬಗ್ಗೆ ವಿದ್ಯಾರ್ಥಿ ದೂರು. ಶಾಸನಬದ್ಧ ಅನುಸರಣಾ ಗಡುವಿಗೆ 2 ದಿನಗಳು ಬಾಕಿ ಇವೆ.'
                  : 'Student grievance regarding absence of designated Ombudsperson. 2 days remaining until statutory compliance deadline.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Audit Activities */}
        <div className="gov-panel">
          <div className="gov-panel-header">
            <span>{t.recentAuditSection}</span>
            <Link href="/audit-log" className="text-xs font-bold text-[#002147] hover:underline">
              {t.fullAuditTrail}
            </Link>
          </div>
          <div className="p-3 text-[12px] space-y-2">
            <div className="border-b border-gray-200 pb-2">
              <div className="flex justify-between text-gray-500">
                <span className="font-bold text-[#002147]">Dr. R. K. Sharma (Officer)</span>
                <span>{language === 'kn' ? 'ಈಗಷ್ಟೇ' : 'Just Now'}</span>
              </div>
              <p className="text-gray-800">
                {language === 'kn'
                  ? 'ಸಮನ್ವಯ ಗುಂಪು CC-2026-BLR-089 ನಲ್ಲಿ PG-104 ಮತ್ತು RB-208 ಅನ್ನು ಕ್ರಾಸ್-ರೆಫರೆನ್ಸ್ ಮಾಡಲಾಗಿದೆ.'
                  : 'Cross-referenced PG-104 with RB-208 in Joint Coordination Group CC-2026-BLR-089.'}
              </p>
            </div>
            <div className="border-b border-gray-200 pb-2">
              <div className="flex justify-between text-gray-500">
                <span className="font-bold text-[#002147]">System Radar Matcher</span>
                <span>15 {language === 'kn' ? 'ನಿಮಿಷಗಳ ಹಿಂದೆ' : 'mins ago'}</span>
              </div>
              <p className="text-gray-800">
                {language === 'kn'
                  ? 'ABC ಎಜುಕೇಶನಲ್ ಟ್ರಸ್ಟ್ ಅಡಿಯಲ್ಲಿ ABC ಇನ್‌ಸ್ಟಿಟ್ಯೂಟ್ ಆಫ್ ಟೆಕ್ನಾಲಜಿಗೆ 87% ಹೋಲಿಕೆ ಗುರುತಿಸಲಾಗಿದೆ.'
                  : 'Identified 87% entity identity match for ABC Institute of Technology under ABC Educational Trust.'}
              </p>
            </div>
            <div>
              <div className="flex justify-between text-gray-500">
                <span className="font-bold text-[#002147]">Sri Arvind Kumar (Administrator)</span>
                <span>1 {language === 'kn' ? 'ಗಂಟೆಯ ಹಿಂದೆ' : 'hour ago'}</span>
              </div>
              <p className="text-gray-800">
                {language === 'kn'
                  ? 'ಧರ್ಮಪುರಿ ಪಾಲಿಟೆಕ್ನಿಕ್ ಕಾಲೇಜಿನ ಅವಧಿ ಮೀರಿದ SLA ಎಚ್ಚರಿಕೆಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ.'
                  : 'Acknowledged overdue SLA escalation alert for Dharmapuri Polytechnic College.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* NIC SMS Gateway & DLT Compliance Engine for SIH26265 Evaluation */}
      <div className="no-print">
        <NicSmsGatewayPanel />
      </div>
    </div>
  );
}
