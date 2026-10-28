'use client';

import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useApp } from '@/context/AppContext';
import DossierModal from '@/components/DossierModal';
import { calculatePriorityScore } from '@/lib/priorityScore';
import NicSmsGatewayPanel from '@/components/NicSmsGatewayPanel';

export default function CoordinationWorkspacePage() {
  const { currentUser, t, language } = useApp();
  const [coordinationData, setCoordinationData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [dossierOpen, setDossierOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [noteType, setNoteType] = useState('Inter-Bureau Directive');
  const [submittingNote, setSubmittingNote] = useState(false);

  useEffect(() => {
    fetchCoordinationData();
  }, []);

  const fetchCoordinationData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/coordination?groupRef=CC-2026-BLR-089');
      const data = await res.json();
      if (data.success) {
        setCoordinationData(data.data);
      }
    } catch (err) {
      console.error('Error fetching coordination data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim() || !coordinationData) return;

    try {
      setSubmittingNote(true);
      const res = await fetch('/api/coordination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId: coordinationData.group.id,
          officerName: currentUser.fullName,
          officerDesignation: currentUser.designation,
          bureau: currentUser.bureau,
          noteType,
          content: noteContent,
          actorName: currentUser.fullName,
          actorRole: currentUser.role,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setNoteContent('');
        fetchCoordinationData();
        alert('Officer note appended to inter-bureau coordination ledger.');
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setSubmittingNote(false);
    }
  };

  // Compute live Case Coordination Priority Score (0-100) using explainable engine
  const priorityCalculation = calculatePriorityScore({
    isOverdue: false, // 15 days elapsed, within 30 days
    hasUnresolvedHistory: true,
    relatedComplaintsCount: 2,
    bureauCount: 2, // PGRC & Regulation Bureau
    hasFeeDiscrepancy: true,
    feeDiscrepancyPercent: 50,
    hasIdentityAnomaly: true,
    categoryUrgency: 'High', // hall ticket threat
  });

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: t.navCoordination }]} />

      {/* Workspace Header Panel (PROMPT 4 Title) */}
      <div className="gov-panel p-4 bg-white border border-gray-300">
        <div className="flex flex-wrap justify-between items-start gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#002147] text-white text-xs px-2 py-0.5 font-bold uppercase">
                {language === 'kn' ? 'ಸಕ್ರಿಯ ಜಂಟಿ ಸಮನ್ವಯ ಗುಂಪು' : 'Active Joint Coordination Group'}
              </span>
              <span className="font-bold text-[#e67300] text-sm">
                REF: CC-2026-BLR-089
              </span>
            </div>
            <h2 className="text-[20px] font-bold text-[#002147] mt-1">
              Coordination Workspace - PG-104 + RB-208
            </h2>
            <div className="text-xs text-gray-700 mt-1 font-semibold">
              Parent Entity: <span className="text-[#002147] font-bold">Trust TR-56001 - ABC Educational Trust</span>
            </div>
            <div className="text-xs text-gray-600 mt-0.5">
              Lead Bureau: <strong>PGRC</strong> | Participating: <strong>Regulation Bureau, Approval Bureau</strong> | Lead Officer: <strong>{currentUser.fullName}</strong>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Button 2: Generate Coordination Dossier PDF -> onClick = window.print() */}
            <button
              onClick={() => {
                localStorage.setItem(
                  'dossier_data',
                  JSON.stringify({ ref: 'PG-104+RB-208', ghost: '87%', health: '35/100', fee: '40k excess' })
                );
                window.print();
              }}
              className="bg-white text-[#0f172a] border border-[#0f172a] px-4 py-2 rounded-full text-xs font-medium hover:bg-gray-50 shadow"
              title="Generate Coordination Dossier PDF via Print"
            >
              📄 {t.generateDossierPdfBtn}
            </button>
            <button
              onClick={() => setDossierOpen(true)}
              className="gov-btn-saffron text-xs px-4 py-2 font-bold"
            >
              📄 {t.downloadDossierBtn}
            </button>
          </div>
        </div>

        {/* PROMPT 4: Show 2 colleges list with map placeholder */}
        <div className="mt-3.5 pt-3 border-t border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-3 text-xs">
          {/* Left: 2 Colleges List (7 cols) */}
          <div className="md:col-span-7 space-y-2">
            <div className="font-bold text-[#002147] uppercase text-[11px] tracking-wide">
              Co-Located Associated Campuses under Trust TR-56001:
            </div>
            <div className="p-2.5 bg-[#f8fafc] border border-gray-300 flex justify-between items-start">
              <div>
                <div className="font-bold text-[#002147]">1. ABC Engineering College (AICTE ID: 1-932145561)</div>
                <div className="text-gray-600 text-[11.5px]">Plot 14, 5th Block, Koramangala, Bengaluru - 560034</div>
                <div className="text-red-700 font-semibold text-[11px] mt-0.5">
                  ● Complaint PG-104: ₹40,000 unapproved fee surcharge (Under Review)
                </div>
              </div>
              <span className="bg-red-100 text-red-800 text-[10px] font-bold px-1.5 py-0.5 border border-red-300">
                PGRC Ref
              </span>
            </div>

            <div className="p-2.5 bg-[#f8fafc] border border-gray-300 flex justify-between items-start">
              <div>
                <div className="font-bold text-[#002147]">2. ABC Institute of Technology (AICTE ID: 1-932145992)</div>
                <div className="text-gray-600 text-[11.5px]">Survey No. 42/1, Koramangala, Bengaluru - 560034</div>
                <div className="text-red-700 font-semibold text-[11px] mt-0.5">
                  ● Complaint RB-208: Mandatory ₹40,000 lab cess (Awaiting Review)
                </div>
              </div>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.5 border border-blue-300">
                Reg. Bureau Ref
              </span>
            </div>
          </div>

          {/* Right: Map Placeholder (5 cols) */}
          <div className="md:col-span-5 border border-gray-300 bg-[#edf2f7] p-2 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[11px] font-bold text-gray-700 pb-1 border-b border-gray-300">
              <span>GIS GIS Locality Map</span>
              <span className="text-green-700">● Proximity Overlap: 100m</span>
            </div>
            <div className="h-24 bg-[#e2e8f0] border border-dashed border-gray-400 my-1 flex flex-col items-center justify-center text-center p-2">
              <div className="text-base">📍 🗺️ 📍</div>
              <div className="font-bold text-[#002147] text-[11px] mt-1">
                Koramangala 5th Block Cluster (PIN: 560034)
              </div>
              <div className="text-[10px] text-gray-500">
                Lat: 12.9352° N, Long: 77.6245° E | Shared Land Survey Plot 42/14
              </div>
            </div>
            <div className="text-[10px] text-gray-600 italic text-center">
              Co-location confirmed by municipal ward coordinates & parent trust registration.
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Case Coordination Priority Score Card (Feature 5) */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Case Coordination Priority Score: {priorityCalculation.score}/100 ({priorityCalculation.priorityLevel} Priority)</span>
          <span className="text-xs text-gray-500 font-normal">
            Explainable Decision-Support Scoring Model
          </span>
        </div>
        <div className="p-4 bg-white space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 bg-[#fffdfa] border border-[#f59e0b] p-3">
            <div>
              <div className="text-sm font-bold text-[#92400e]">
                Administrative Triage Directive:
              </div>
              <p className="text-gray-800 mt-0.5">{priorityCalculation.recommendedAction}</p>
            </div>
            <div className="text-right">
              <span className="text-[26px] font-bold text-[#002147]">
                {priorityCalculation.score}
              </span>
              <span className="text-gray-500 text-xs">/100</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#002147] mb-1.5 uppercase text-[11.5px]">
              Transparent Factor Contribution Breakdown:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-800">
              {priorityCalculation.factors.map((f, i) => (
                <div
                  key={i}
                  className={`p-2 border ${
                    f.triggered ? 'bg-[#f8fafc] border-gray-300' : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold">
                    <span>{f.factor}</span>
                    <span className={f.triggered ? 'text-[#002147]' : 'text-gray-500'}>
                      +{f.points} / {f.maxPoints} pts
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-600 mt-0.5">{f.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-gray-500 italic pt-1 border-t border-gray-200">
            Note: The Case Coordination Priority Score serves as decision-support guidance for allocation of investigative resources. It does not constitute a permanent institutional rating or adverse penalty without statutory hearing.
          </div>
        </div>
      </div>

      {/* Main Split: Left Column (Chronological Timeline & Records) & Right Column (Notes & Actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Unified Chronological Timeline (7 cols) */}
        <div className="lg:col-span-7 gov-panel">
          <div className="gov-panel-header">
            <span>Unified Cross-Bureau Chronological Timeline</span>
            <span className="text-xs text-gray-500 font-normal">
              Chronological Audit Trail across PG-104 & RB-208
            </span>
          </div>

          <div className="p-4 space-y-4 max-h-[550px] overflow-y-auto bg-white text-xs">
            {loading ? (
              <div className="text-center py-6 text-gray-500 italic">
                Loading unified chronological timeline...
              </div>
            ) : coordinationData?.timeline.length === 0 ? (
              <div className="text-center py-6 text-gray-500 italic">
                No events recorded in timeline.
              </div>
            ) : (
              coordinationData?.timeline.map((event: any, i: number) => {
                const isPgrc = event.bureau === 'PGRC';
                const isFee = event.eventType === 'FEE_AUDIT';
                const isDirective = event.eventType === 'OFFICER_DIRECTIVE';

                return (
                  <div key={event.id || i} className="flex space-x-3 items-start">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3.5 h-3.5 rounded-full border-2 ${
                          isFee
                            ? 'bg-red-600 border-red-800'
                            : isDirective
                            ? 'bg-[#e67300] border-[#b45309]'
                            : isPgrc
                            ? 'bg-[#002147] border-[#001733]'
                            : 'bg-blue-600 border-blue-800'
                        }`}
                      />
                      {i < coordinationData.timeline.length - 1 && (
                        <div className="w-0.5 h-16 bg-gray-300 my-1" />
                      )}
                    </div>

                    <div className="flex-1 bg-[#f8fafc] border border-gray-300 p-2.5 space-y-1">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-[#002147] text-xs">
                          {event.title}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {new Date(event.date).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-gray-800 text-[11.5px] leading-relaxed">
                        {event.description}
                      </p>
                      <div className="text-[10.5px] text-gray-500 flex items-center space-x-2">
                        <span>Source: <strong>{event.source}</strong></span>
                        <span>•</span>
                        <span>Bureau: {event.bureau}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Inter-Bureau Notes & Directives (5 cols) */}
        <div className="lg:col-span-5 gov-panel">
          <div className="gov-panel-header">
            <span>Inter-Bureau Officer Directives & Notes</span>
            <span className="text-xs text-gray-500 font-normal">Official Ledger</span>
          </div>

          <div className="p-4 space-y-4 bg-white text-xs">
            {/* Note Composer Form */}
            <form onSubmit={handleAddNote} className="space-y-2 border-b border-gray-300 pb-3">
              <div className="flex justify-between items-center">
                <label className="font-bold text-[#002147]">Add New Coordination Entry:</label>
                <select
                  value={noteType}
                  onChange={(e) => setNoteType(e.target.value)}
                  className="gov-select text-xs py-0.5"
                >
                  <option value="Inter-Bureau Directive">Inter-Bureau Directive</option>
                  <option value="Field Audit Finding">Field Audit Finding</option>
                  <option value="Show Cause Order">Show Cause Order</option>
                  <option value="Internal Assessment">Internal Assessment</option>
                </select>
              </div>

              <textarea
                rows={3}
                required
                placeholder="Type directive, inquiry update, or inter-bureau notification..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="gov-input w-full text-xs"
              />

              <div className="flex justify-between items-center pt-1">
                <span className="text-[11px] text-gray-500">
                  Officer: <strong>{currentUser.fullName}</strong>
                </span>
                <button
                  type="submit"
                  disabled={submittingNote}
                  className="gov-btn-primary text-xs"
                >
                  {submittingNote ? 'Saving...' : 'Post Directive to Ledger'}
                </button>
              </div>
            </form>

            {/* Existing Notes Feed */}
            <div className="space-y-2.5 max-h-[340px] overflow-y-auto">
              {coordinationData?.group.notes.map((n: any) => (
                <div key={n.id} className="p-2.5 bg-[#fdfaf5] border border-[#e5d5be] space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-bold text-[#002147]">
                      {n.officerName} ({n.officerDesignation} - {n.bureau})
                    </span>
                    <span className="text-gray-500">
                      {new Date(n.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                      })}
                    </span>
                  </div>
                  <div className="inline-block bg-[#e2e8f0] text-gray-800 text-[10px] font-bold px-1 py-0.2 uppercase">
                    {n.noteType}
                  </div>
                  <p className="text-gray-800 text-[11.5px] leading-relaxed">{n.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NIC SMS Gateway & DLT Compliance Engine for SIH26265 Evaluation */}
      <div className="no-print">
        <NicSmsGatewayPanel />
      </div>

      {/* Dossier Modal */}
      <DossierModal
        isOpen={dossierOpen}
        onClose={() => setDossierOpen(false)}
        groupData={coordinationData}
      />
    </div>
  );
}
