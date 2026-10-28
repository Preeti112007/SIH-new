'use client';

import React, { useRef } from 'react';
import { useApp } from '@/context/AppContext';
import jsPDF from 'jspdf';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupData?: any;
}

export default function DossierModal({ isOpen, onClose, groupData }: DossierModalProps) {
  const { currentUser } = useApp();
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const downloadPdf = () => {
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      // Simple, clean, formal government dossier PDF layout
      doc.setFont('times', 'bold');
      doc.setFontSize(16);
      doc.setTextColor(0, 33, 71); // Navy blue
      doc.text('ALL INDIA COUNCIL FOR TECHNICAL EDUCATION', 40, 45);

      doc.setFontSize(11);
      doc.setFont('times', 'normal');
      doc.setTextColor(50, 50, 50);
      doc.text('Ministry of Education, Government of India', 40, 60);
      doc.text('Unified Case Coordination Radar — Inter-Bureau Investigation Dossier', 40, 75);

      doc.setDrawColor(230, 115, 0); // Saffron line
      doc.setLineWidth(2);
      doc.line(40, 85, 555, 85);

      doc.setFont('times', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('JOINT COORDINATION DOSSIER: REF # CC-2026-BLR-089', 40, 110);

      doc.setFont('times', 'normal');
      doc.setFontSize(10);
      doc.text(`Generated On: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`, 40, 125);
      doc.text(`Lead Officer: ${currentUser.fullName} (${currentUser.designation})`, 40, 138);
      doc.text('Participating Bureaus: Public Grievance Redressal Cell (PGRC) & Regulation Bureau (RB)', 40, 151);

      // Section 1: Executive Summary
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.text('1. EXECUTIVE SUMMARY & REASON FOR COORDINATION', 40, 175);
      doc.setFont('times', 'normal');
      doc.setFontSize(9.5);
      const summaryText =
        'This coordination dossier consolidates grievance PG-104 (filed with PGRC) and grievance RB-208 (filed with Regulation Bureau). The Automated Radar detected an 87% entity identity match between ABC Engineering College and ABC Institute of Technology, both operating under the common registered parent trust "ABC Educational Trust" (TR-56001) in Koramangala, Bengaluru - 560034. Both complaints allege identical unauthorized surcharge collections of Rs. 40,000 above the state-approved fee ceiling of Rs. 80,000.';
      const splitSummary = doc.splitTextToSize(summaryText, 515);
      doc.text(splitSummary, 40, 190);

      // Section 2: Associated Records Table
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.text('2. CROSS-BUREAU COMPLAINT & INSTITUTION MATRIX', 40, 260);

      doc.setFontSize(9);
      doc.setFont('times', 'bold');
      doc.rect(40, 270, 515, 18, 'F');
      doc.setTextColor(255, 255, 255);
      doc.text('Complaint Ref', 45, 282);
      doc.text('Bureau', 120, 282);
      doc.text('Institution Name', 200, 282);
      doc.text('PIN Code', 360, 282);
      doc.text('Fee Diff', 430, 282);
      doc.text('Status', 495, 282);

      doc.setTextColor(0, 0, 0);
      doc.setFont('times', 'normal');
      // Row 1
      doc.text('PG-104', 45, 302);
      doc.text('PGRC', 120, 302);
      doc.text('ABC Engineering College', 200, 302);
      doc.text('560034', 360, 302);
      doc.text('+Rs. 40,000', 430, 302);
      doc.text('Under Review', 495, 302);
      doc.line(40, 308, 555, 308);

      // Row 2
      doc.text('RB-208', 45, 322);
      doc.text('Regulation', 120, 322);
      doc.text('ABC Institute of Tech.', 200, 322);
      doc.text('560034', 360, 322);
      doc.text('+Rs. 40,000', 430, 322);
      doc.text('Awaiting Rev.', 495, 322);
      doc.line(40, 328, 555, 328);

      // Section 3: Identity & Trust Corroboration
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.text('3. ENTITY IDENTITY & TRUST AFFILIATION EVIDENCE', 40, 355);
      doc.setFont('times', 'normal');
      doc.setFontSize(9.5);
      doc.text('• Common Registered Trust: ABC Educational Trust (Reg # BLR/TR/2004/4512).', 45, 370);
      doc.text('• Registered Address Proximity: Koramangala 4th & 5th Block, Bengaluru, PIN: 560034.', 45, 384);
      doc.text('• Match Algorithm Score: 87% (Explainable breakdown: Name 82%, Trust 100%, PIN 100%, Address 75%).', 45, 398);
      doc.text('• Administrative Finding: Multiple academic units operating under common board requiring joint hearing.', 45, 412);

      // Section 4: Fee Anomaly Audit
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.text('4. FEE REGULATORY BENCHMARK & OCR AUDIT', 40, 440);
      doc.setFont('times', 'normal');
      doc.setFontSize(9.5);
      doc.text('• State Regulatory Fee Ceiling: Rs. 80,000 per annum (Karnataka Fee Regulatory Order 2025/26).', 45, 455);
      doc.text('• Extracted Remittance Amount: Rs. 1,20,000 (OCR verified on Receipt # REC-2026-ABC-0941).', 45, 469);
      doc.text('• Variance: +Rs. 40,000 (+50.0% unapproved surcharge).', 45, 483);
      doc.text('• Prima Facie Status: Confirmed fee anomaly requiring formal institutional clarification.', 45, 497);

      // Section 5: Directives & Actions
      doc.setFont('times', 'bold');
      doc.setFontSize(11);
      doc.text('5. INTER-BUREAU DIRECTIVES & OUTSTANDING ACTIONS', 40, 525);
      doc.setFont('times', 'normal');
      doc.setFontSize(9.5);
      doc.text('1. Joint show-cause notice to be served to Managing Trustee, ABC Educational Trust.', 45, 540);
      doc.text('2. Mandate audited accounts and fee receipt ledgers for AY 2024-25 and 2025-26 within 7 working days.', 45, 554);
      doc.text('3. Convene joint standing committee hearing involving PGRC and Regulation Bureau representatives.', 45, 568);

      // Signatory block
      doc.setFont('times', 'bold');
      doc.setFontSize(10);
      doc.text('AUTHENTICATED BY:', 40, 640);
      doc.text(`${currentUser.fullName}`, 40, 665);
      doc.setFont('times', 'normal');
      doc.text(`${currentUser.designation}`, 40, 678);
      doc.text('All India Council for Technical Education, New Delhi', 40, 691);

      // Footer notice
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('Demonstration Prototype | All records and institutions shown are synthetic.', 40, 780);

      doc.save('AICTE_Coordination_Dossier_CC-2026-BLR-089.pdf');
    } catch (e) {
      console.error('PDF export error:', e);
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-[#002147] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl">
        {/* Modal Toolbar */}
        <div className="bg-[#002147] text-white px-5 py-3 flex justify-between items-center border-b border-[#001733] no-print">
          <div className="flex items-center space-x-2">
            <span className="text-xl">📄</span>
            <h3 className="text-[16px] font-bold">
              Inter-Bureau Case Coordination Dossier (Ref: CC-2026-BLR-089)
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadPdf}
              className="gov-btn-saffron text-xs px-3 py-1 font-bold"
            >
              ⬇ Download PDF
            </button>
            <button
              onClick={() => window.print()}
              className="gov-btn-secondary text-xs px-3 py-1 font-bold bg-white text-[#002147]"
            >
              🖨 Print Dossier
            </button>
            <button
              onClick={onClose}
              className="text-white hover:text-[#ffdd99] text-xl font-bold px-2 ml-2"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Printable Formal Document Content */}
        <div ref={printRef} className="p-8 overflow-y-auto space-y-6 text-[#111827] bg-white">
          {/* Header */}
          <div className="border-b-2 border-[#002147] pb-4 flex justify-between items-start">
            <div>
              <div className="text-[11px] font-bold text-gray-500 uppercase">
                Ministry of Education, Government of India
              </div>
              <h2 className="text-[20px] font-bold text-[#002147] leading-tight">
                ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
              </h2>
              <div className="text-[13px] font-semibold text-[#e67300]">
                Unified Case Coordination Radar — Inter-Bureau Case Dossier
              </div>
            </div>
            <div className="text-right text-[12px]">
              <div className="font-bold text-[#002147]">Dossier Ref: CC-2026-BLR-089</div>
              <div>Date: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
              <div className="text-[#991b1b] font-bold text-[11px] border border-[#991b1b] px-1 inline-block mt-1">
                CONFIDENTIAL / ADMINISTRATIVE
              </div>
            </div>
          </div>

          {/* Section 1: Case Summary */}
          <section>
            <h3 className="text-[14px] font-bold text-[#002147] uppercase border-b border-gray-300 pb-1 mb-2">
              1. Case Summary & Joint Reference
            </h3>
            <p className="text-[13px] leading-relaxed text-gray-800">
              This inter-bureau dossier links complaint <strong>PG-104</strong> (Public Grievance Redressal Cell) with newly filed complaint <strong>RB-208</strong> (Regulation Bureau). Automated explainable matching identified an <strong>87% entity association</strong> between <em>ABC Engineering College</em> and <em>ABC Institute of Technology</em>, both operated by <strong>ABC Educational Trust</strong> in Koramangala, Bengaluru (PIN 560034). Both complaints report an identical unauthorized auxiliary fee surcharge of <strong>₹40,000</strong> (+50%) above the notified annual ceiling of ₹80,000.
            </p>
          </section>

          {/* Section 2: Cross-Bureau Matrix */}
          <section>
            <h3 className="text-[14px] font-bold text-[#002147] uppercase border-b border-gray-300 pb-1 mb-2">
              2. Cross-Bureau Complaint Comparison Matrix
            </h3>
            <table className="gov-table text-[12.5px]">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Grievance Record 1 (PGRC)</th>
                  <th>Grievance Record 2 (Regulation Bureau)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-bold bg-gray-50">Reference ID</td>
                  <td className="font-bold text-[#002147]">PG-104</td>
                  <td className="font-bold text-[#002147]">RB-208</td>
                </tr>
                <tr>
                  <td className="font-bold bg-gray-50">Institution Name</td>
                  <td>ABC Engineering College</td>
                  <td>ABC Institute of Technology</td>
                </tr>
                <tr>
                  <td className="font-bold bg-gray-50">AICTE Permanent ID</td>
                  <td>1-932145561</td>
                  <td>1-932145992</td>
                </tr>
                <tr>
                  <td className="font-bold bg-gray-50">Parent Trust</td>
                  <td className="font-bold">ABC Educational Trust (TR-56001)</td>
                  <td className="font-bold">ABC Educational Trust (TR-56001)</td>
                </tr>
                <tr>
                  <td className="font-bold bg-gray-50">Postal PIN Code</td>
                  <td>560034 (Koramangala, Bengaluru)</td>
                  <td>560034 (Koramangala, Bengaluru)</td>
                </tr>
                <tr>
                  <td className="font-bold bg-gray-50">Issue Category</td>
                  <td>Fee Anomaly (Exam Hall Ticket Coercion)</td>
                  <td>Fee Anomaly (Unapproved Lab Infrastructure Cess)</td>
                </tr>
                <tr>
                  <td className="font-bold bg-gray-50">Reference Fee</td>
                  <td>₹80,000 (State Approved)</td>
                  <td>₹80,000 (State Approved)</td>
                </tr>
                <tr>
                  <td className="font-bold bg-gray-50">Reported / Receipt Fee</td>
                  <td className="font-bold text-[#991b1b]">₹1,20,000 (+₹40,000)</td>
                  <td className="font-bold text-[#991b1b]">₹1,20,000 (+₹40,000)</td>
                </tr>
                <tr>
                  <td className="font-bold bg-gray-50">SLA Status</td>
                  <td>15 Days Elapsed (Within SLA)</td>
                  <td>0 Days Elapsed (New Filing)</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Section 3: Supporting Evidence & Matching Analysis */}
          <section>
            <h3 className="text-[14px] font-bold text-[#002147] uppercase border-b border-gray-300 pb-1 mb-2">
              3. Explainable Identity Matching & Evidence
            </h3>
            <div className="bg-[#f8fafc] border border-gray-300 p-3 text-[12.5px] space-y-1.5">
              <div>• <strong>Overall Identity Score: 87%</strong> (High Probability Entity Association).</div>
              <div>• <strong>Trust Match (100%):</strong> Both units registered under <em>ABC Educational Trust</em> (Registration No: BLR/TR/2004/4512).</div>
              <div>• <strong>PIN Code Match (100%):</strong> Identical postal area 560034.</div>
              <div>• <strong>Name Similarity (82%):</strong> Common prefix "ABC" with sister engineering naming convention.</div>
              <div>• <strong>Address Proximity (75%):</strong> Co-located within Koramangala 4th/5th Blocks, Bengaluru.</div>
            </div>
          </section>

          {/* Section 4: Consolidated Chronological Timeline */}
          <section>
            <h3 className="text-[14px] font-bold text-[#002147] uppercase border-b border-gray-300 pb-1 mb-2">
              4. Consolidated Chronological Timeline
            </h3>
            <ul className="space-y-2 text-[12px] border-l-2 border-[#002147] pl-3 ml-2">
              <li>
                <span className="font-bold text-[#002147]">15 Days Ago (PGRC):</span> Student Rahul M. Verma submitted complaint PG-104 with fee payment receipt REC-2026-ABC-0941.
              </li>
              <li>
                <span className="font-bold text-[#002147]">11 Days Ago (PGRC):</span> Preliminary scrutiny conducted by Dr. R. K. Sharma. Fee discrepancy of ₹40,000 flagged for internal audit.
              </li>
              <li>
                <span className="font-bold text-[#002147]">Today (Regulation Bureau):</span> Parent Advisory Group filed grievance RB-208 alleging sister institution demanding identical ₹40,000 laboratory cess.
              </li>
              <li>
                <span className="font-bold text-[#002147]">Today (System Radar):</span> Unified Radar detected cross-bureau correlation; Joint Coordination Group CC-2026-BLR-089 activated.
              </li>
            </ul>
          </section>

          {/* Section 5: Directives & Next Steps */}
          <section>
            <h3 className="text-[14px] font-bold text-[#002147] uppercase border-b border-gray-300 pb-1 mb-2">
              5. Joint Directives & Action Plan
            </h3>
            <div className="text-[12.5px] space-y-1 text-gray-800">
              <p>1. Issue consolidated Show Cause Notice to Managing Trustee Dr. K. M. Murthy, ABC Educational Trust.</p>
              <p>2. Direct Regional Office Bengaluru to impound and audit fee ledgers of both institutions.</p>
              <p>3. Restrain management from withholding examination hall tickets or academic credentials during inquiry.</p>
              <p>4. Joint Hearing scheduled before the Standing Complaints Committee on 10-Nov-2026.</p>
            </div>
          </section>

          {/* Signatures */}
          <div className="pt-6 border-t border-gray-300 flex justify-between items-end text-[12px]">
            <div>
              <div className="font-bold">{currentUser.fullName}</div>
              <div>{currentUser.designation}</div>
              <div>Lead Officer, Case Coordination Radar</div>
            </div>
            <div className="text-right">
              <div className="font-bold">Smt. Anjali Deshmukh</div>
              <div>Deputy Director, Regulation Bureau</div>
              <div>Joint Inquiry Member</div>
            </div>
          </div>

          <div className="text-[11px] text-gray-500 text-center pt-2">
            Demonstration Prototype | All records and institutions shown are synthetic.
          </div>
        </div>
      </div>
    </div>
  );
}
