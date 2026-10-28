'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useApp } from '@/context/AppContext';

export default function CrossBureauPage() {
  const { currentUser } = useApp();
  const [selectedCaseA, setSelectedCaseA] = useState('RB-208');
  const [noteText, setNoteText] = useState('');
  const [showNoteModal, setShowNoteModal] = useState(false);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    try {
      const res = await fetch('/api/coordination', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          groupId: 'CC-2026-BLR-089',
          officerName: currentUser.fullName,
          officerDesignation: currentUser.designation,
          bureau: currentUser.bureau,
          noteType: 'Cross-Bureau Note',
          content: noteText,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Cross-bureau coordination note registered successfully!');
        setNoteText('');
        setShowNoteModal(false);
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    }
  };

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: 'Cross-Bureau Cases & Repeat-Issue Detection' }]} />

      <div className="gov-panel p-3 bg-white border border-gray-300">
        <h2 className="text-[17px] font-bold text-[#002147]">
          Cross-Bureau Repeat-Issue & Entity Corroboration Radar
        </h2>
        <p className="text-[12px] text-gray-600">
          Correlates grievances registered under separate bureau references that involve common educational trusts, co-located campuses, identical fee discrepancies, or repeat compliance infractions.
        </p>
      </div>

      {/* Ghost Banner - User's exact text */}
      <div className="bg-[#fff5f5] border-l-4 border-[#dc2626] p-3 text-[13px] border border-gray-300 flex flex-wrap justify-between items-center">
        <div className="font-bold text-[#991b1b] text-[13.5px]">
          🔴 Ghost 87% - Same Door No. 10 Koramangala, Name 82% similar, Same Trust ABC, Same Pincode 560034
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Link href="/coordination" className="gov-btn-primary text-xs">
            Open Coordination Workspace
          </Link>
          <button
            onClick={() => window.print()}
            className="gov-btn-secondary text-xs"
          >
            📄 Generate Coordination Dossier PDF
          </button>
        </div>
      </div>

      {/* Primary Demonstration Alert: PG-104 vs RB-208 */}
      <div className="bg-[#fffdf5] border-2 border-[#e67300] p-4 text-[13px] space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <span className="bg-[#e67300] text-white text-xs px-2 py-0.5 font-bold uppercase">
              Potentially Related Complaints Flagged
            </span>
            <span className="font-bold text-[#002147] text-sm">
              Cross-Bureau Match Score: 87% (High Correlation)
            </span>
          </div>
          <span className="text-xs text-gray-500 font-semibold">
            Status: Manual Officer Verification Required
          </span>
        </div>

        <p className="text-gray-800 leading-relaxed text-[12.5px]">
          The intelligence engine detected that newly submitted grievance <strong>RB-208</strong> (Regulation Bureau, filed today) closely mirrors earlier grievance <strong>PG-104</strong> (Public Grievance Redressal Cell, filed 15 days ago). Both complaints report an identical ₹40,000 fee anomaly against sister institutions operating under <strong>ABC Educational Trust</strong> in Koramangala, Bengaluru (PIN: 560034).
        </p>

        {/* Action Toolbar */}
        <div className="pt-2 border-t border-[#f59e0b] flex flex-wrap items-center gap-2">
          <Link href="/coordination" className="gov-btn-primary text-xs">
            Open Joint Coordination Workspace (CC-2026-BLR-089) →
          </Link>
          <button
            onClick={() => window.print()}
            className="gov-btn-secondary text-xs"
          >
            📄 Generate Coordination Dossier PDF
          </button>
          <button
            onClick={() => setShowNoteModal(true)}
            className="gov-btn-secondary text-xs"
          >
            + Add Cross-Bureau Officer Note
          </button>
          <button
            onClick={() => alert('Recommended for escalation to Standing Complaints Committee. Status updated in audit trail.')}
            className="gov-btn-saffron text-xs"
          >
            Recommend Escalation
          </button>
          <button
            onClick={() => alert('Decision logged: The cases will be maintained under separate reference numbers while synchronizing investigation evidence.')}
            className="gov-btn-secondary text-xs"
          >
            Mark as Separate Cases with Shared Evidence
          </button>
        </div>
      </div>

      {/* Side-by-Side Direct Case Comparison */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Comparative Evidence Matrix: PG-104 vs RB-208</span>
          <span className="text-xs text-gray-500 font-normal">Side-by-side parameter scrutiny</span>
        </div>

        <div className="overflow-x-auto">
          <table className="gov-table text-[12.5px]">
            <thead>
              <tr>
                <th className="w-1/4">Evaluation Attribute</th>
                <th className="w-[37.5%]">Grievance Record 1: PG-104</th>
                <th className="w-[37.5%]">Grievance Record 2: RB-208</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold bg-gray-50">Originating Bureau</td>
                <td>
                  <span className="font-bold text-[#002147]">Public Grievance Redressal Cell (PGRC)</span>
                </td>
                <td>
                  <span className="font-bold text-[#002147]">Regulation Bureau (RB)</span>
                </td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50">Date of Registration</td>
                <td>15 Days Ago (13-Oct-2026)</td>
                <td>Today (28-Oct-2026)</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50">Institution Name</td>
                <td className="font-bold">ABC Engineering College</td>
                <td className="font-bold">ABC Institute of Technology</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50">AICTE Permanent ID</td>
                <td><code>1-932145561</code></td>
                <td><code>1-932145992</code></td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50">Parent Trust / Society</td>
                <td className="font-bold text-green-900 bg-green-50">
                  ABC Educational Trust (TR-56001) [Identical]
                </td>
                <td className="font-bold text-green-900 bg-green-50">
                  ABC Educational Trust (TR-56001) [Identical]
                </td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50">Campus Address & PIN</td>
                <td>Plot 14, 5th Block, Koramangala, Bengaluru - <strong>560034</strong></td>
                <td>Survey No. 42/1, Koramangala, Bengaluru - <strong>560034</strong></td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50">Grievance Category</td>
                <td>Fee Anomaly (Exam Hall Ticket Coercion)</td>
                <td>Fee Anomaly (Unapproved Lab Infrastructure Cess)</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50">Statutory Reference Fee</td>
                <td>₹80,000 / year (State Regulatory Ceiling)</td>
                <td>₹80,000 / year (State Regulatory Ceiling)</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50">Reported Remittance</td>
                <td className="text-red-700 font-bold">₹1,20,000 (+₹40,000, +50%)</td>
                <td className="text-red-700 font-bold">₹1,20,000 (+₹40,000, +50%)</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50">Supporting Evidence</td>
                <td>Fee Receipt REC-2026-ABC-0941 + Student Affidavit</td>
                <td>Fee Receipt REC-2026-ABCT-1102 + Parent Memorandum</td>
              </tr>
              <tr>
                <td className="font-bold bg-gray-50">Statutory SLA Window</td>
                <td>15 Days Elapsed (15 Days Remaining)</td>
                <td>0 Days Elapsed (30 Days Remaining)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Suggested Next Administrative Actions */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>AICTE Administrative Standard Operating Procedure (SOP) Guidance</span>
        </div>
        <div className="p-3 text-[12.5px] text-gray-800 space-y-2">
          <p>
            • <strong>Preserve Distinct Legal Entities:</strong> Pursuant to AICTE grievance regulations, multiple complaints regarding sister institutions must not be arbitrarily merged, closed, or rejected without statutory inquiry.
          </p>
          <p>
            • <strong>Joint Information Requests:</strong> Instead of conducting duplicate inspections, PGRC and Regulation Bureau should issue a consolidated Show-Cause Notice to the Managing Trustee.
          </p>
          <p>
            • <strong>Immediate Relief for Students:</strong> If complaints allege withholding of examination admit cards or semester marks cards, the Competent Authority may issue an interim directive staying any coercive institutional measures.
          </p>
        </div>
      </div>

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#002147] w-full max-w-lg shadow-xl">
            <div className="bg-[#002147] text-white px-4 py-2.5 flex justify-between items-center">
              <h3 className="text-sm font-bold">Record Inter-Bureau Coordination Note</h3>
              <button
                onClick={() => setShowNoteModal(false)}
                className="text-white hover:text-[#ffdd99] text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddNote} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#002147] mb-1">Author Officer:</label>
                <div className="p-1.5 bg-gray-100 border border-gray-300 font-semibold">
                  {currentUser.fullName} ({currentUser.designation} - {currentUser.bureau})
                </div>
              </div>
              <div>
                <label className="block font-bold text-[#002147] mb-1">Coordination Note Content:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter administrative directive, inspection finding, or inter-bureau communication..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="gov-input w-full"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-gray-300">
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  className="gov-btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="gov-btn-primary">
                  Submit Note to Ledger
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
