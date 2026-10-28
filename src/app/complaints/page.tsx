'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useApp } from '@/context/AppContext';

export default function ComplaintRegisterPage() {
  const { currentUser, maskSensitiveData } = useApp();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [bureauFilter, setBureauFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<any | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, [bureauFilter, statusFilter, categoryFilter]);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (bureauFilter !== 'ALL') params.append('bureau', bureauFilter);
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/complaints?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        let list = data.data;
        if (categoryFilter !== 'ALL') {
          list = list.filter((c: any) => c.category === categoryFilter);
        }
        setComplaints(list);
        if (list.length > 0 && !selectedComplaint) {
          setSelectedComplaint(list[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching complaint register:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedComplaint) return;
    try {
      setUpdatingStatus(true);
      const res = await fetch('/api/complaints', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedComplaint.id,
          status: newStatus,
          actorName: currentUser.fullName,
          actorRole: currentUser.role,
          actionNote: `Status adjusted during complaint register review.`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSelectedComplaint({ ...selectedComplaint, status: newStatus });
        fetchComplaints();
        alert(`Status updated to "${newStatus}" and recorded in official audit ledger.`);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: 'Complaint Register' }]} />

      <div className="gov-panel p-3 bg-white border border-gray-300">
        <h2 className="text-[17px] font-bold text-[#002147]">
          National Technical Education Grievance Register
        </h2>
        <p className="text-[12px] text-gray-600">
          Comprehensive multi-bureau grievance register. All records seeded with realistic synthetic parameters for prototype demonstration.
        </p>
      </div>

      {/* Filter Row */}
      <div className="gov-panel p-3 bg-white border border-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-bold text-[#002147] mb-1">Search Keyword:</label>
            <input
              type="text"
              placeholder="Filter by ref, subject, complainant..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchComplaints()}
              className="gov-input w-full"
            />
          </div>

          <div>
            <label className="block font-bold text-[#002147] mb-1">Bureau Origin:</label>
            <select
              value={bureauFilter}
              onChange={(e) => setBureauFilter(e.target.value)}
              className="gov-select w-full"
            >
              <option value="ALL">All AICTE Bureaus</option>
              <option value="PGRC">Public Grievance Redressal Cell (PGRC)</option>
              <option value="Regulation Bureau">Regulation Bureau</option>
              <option value="Approval Bureau">Approval Bureau</option>
              <option value="Vigilance Bureau">Vigilance Bureau</option>
              <option value="Student Grievance Redressal Committee">SGRC</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#002147] mb-1">Category:</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="gov-select w-full"
            >
              <option value="ALL">All Grievance Categories</option>
              <option value="Fee Anomaly">Fee Anomaly / Capitation</option>
              <option value="Regulatory Non-Compliance">Regulatory Non-Compliance</option>
              <option value="Misrepresentation / Vigilance">Misrepresentation / Vigilance</option>
              <option value="Document Retention">Illegal Certificate Retention</option>
              <option value="Student Welfare">Student Welfare / Harassment</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#002147] mb-1">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="gov-select w-full"
            >
              <option value="ALL">All Statuses</option>
              <option value="Awaiting Review">Awaiting Review</option>
              <option value="Under Review">Under Review</option>
              <option value="Escalated">Escalated</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Register & Detail Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Register Table (7 cols) */}
        <div className="lg:col-span-7 gov-panel">
          <div className="gov-panel-header">
            <span>Register Entries ({complaints.length})</span>
            <span className="text-xs text-gray-500 font-normal">Click record to inspect details</span>
          </div>

          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="gov-table text-[12.5px]">
              <thead>
                <tr>
                  <th className="w-16">Ref #</th>
                  <th>Bureau</th>
                  <th>Institution</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500 italic">
                      Loading register...
                    </td>
                  </tr>
                ) : complaints.map((c) => {
                  const isSelected = selectedComplaint?.id === c.id;
                  return (
                    <tr
                      key={c.id}
                      onClick={() => setSelectedComplaint(c)}
                      className={`cursor-pointer ${
                        isSelected ? 'bg-[#e8eff5] font-semibold border-l-4 border-l-[#002147]' : ''
                      }`}
                    >
                      <td className="font-bold text-[#002147]">{c.refNo}</td>
                      <td>{c.bureau}</td>
                      <td>
                        <div className="truncate max-w-[200px]" title={c.institution.name}>
                          {c.institution.name}
                        </div>
                        <div className="text-[11px] text-gray-500">{c.institution.city}</div>
                      </td>
                      <td>
                        <span
                          className={`px-1 py-0.2 text-[11px] font-bold ${
                            c.priorityScore >= 85
                              ? 'bg-red-100 text-red-900 border border-red-300'
                              : c.priorityScore >= 70
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-green-100 text-green-900 border border-green-300'
                          }`}
                        >
                          {c.priorityScore}/100
                        </span>
                      </td>
                      <td>
                        <span className="text-[11px] font-semibold">{c.status}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Case Detail Inspector (5 cols) */}
        <div className="lg:col-span-5 gov-panel">
          <div className="gov-panel-header">
            <span>Grievance Case Inspector: {selectedComplaint?.refNo || 'None'}</span>
            {selectedComplaint?.coordinationGroup && (
              <span className="bg-[#e67300] text-white text-[10px] px-1.5 py-0.5 font-bold uppercase">
                Cross-Bureau Active
              </span>
            )}
          </div>

          {selectedComplaint ? (
            <div className="p-4 space-y-3.5 text-[12.5px] max-h-[600px] overflow-y-auto">
              <div className="bg-gray-50 p-2.5 border border-gray-300 space-y-1">
                <div className="text-[14px] font-bold text-[#002147]">
                  {selectedComplaint.subject}
                </div>
                <div className="text-gray-600 text-xs" suppressHydrationWarning>
                  Category: <strong>{selectedComplaint.category}</strong> | Submitted:{' '}
                  {new Date(selectedComplaint.submissionDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#002147] border-b border-gray-200 pb-0.5 mb-1 text-xs uppercase">
                  Institution Record Details
                </h4>
                <div className="space-y-1 text-gray-800">
                  <div>
                    Name: <strong>{selectedComplaint.institution.name}</strong>
                  </div>
                  <div>AICTE Permanent ID: <code>{selectedComplaint.institution.aicteId}</code></div>
                  <div>Address: {selectedComplaint.institution.address}, {selectedComplaint.institution.city} - {selectedComplaint.institution.pinCode}</div>
                  <div>Parent Trust: <strong>{selectedComplaint.institution.trust?.name}</strong></div>
                  <div>Approved Annual Tuition Fee: ₹{selectedComplaint.institution.annualTuitionFee?.toLocaleString()}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#002147] border-b border-gray-200 pb-0.5 mb-1 text-xs uppercase">
                  Complainant Particulars
                </h4>
                <div className="space-y-0.5 text-gray-800">
                  <div>Type: {selectedComplaint.complainantType}</div>
                  <div>Name: {selectedComplaint.complainantName}</div>
                  <div>Contact: {maskSensitiveData(selectedComplaint.complainantContact)}</div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#002147] border-b border-gray-200 pb-0.5 mb-1 text-xs uppercase">
                  Grievance Narrative
                </h4>
                <p className="text-gray-800 bg-[#fffdfa] p-2.5 border border-[#e5d5be] leading-relaxed">
                  {selectedComplaint.details}
                </p>
              </div>

              {/* Administrative Actions */}
              <div className="pt-2 border-t border-gray-300 space-y-2">
                <label className="block font-bold text-[#002147] text-xs">Update Administrative Status:</label>
                <div className="flex flex-wrap gap-1.5">
                  {['Under Review', 'Escalated', 'Resolved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      disabled={updatingStatus || selectedComplaint.status === st}
                      className={`text-xs px-2.5 py-1 font-bold border ${
                        selectedComplaint.status === st
                          ? 'bg-[#002147] text-white border-[#001630]'
                          : 'bg-white hover:bg-gray-100 text-gray-800 border-gray-400'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <Link
                    href={
                      selectedComplaint.refNo === 'PG-104' || selectedComplaint.refNo === 'RB-208'
                        ? '/coordination'
                        : `/cross-bureau`
                    }
                    className="gov-btn-primary w-full justify-center text-xs"
                  >
                    ⚡ Open Cross-Bureau Radar for this Case
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 italic">
              Select any complaint from the table to inspect details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
