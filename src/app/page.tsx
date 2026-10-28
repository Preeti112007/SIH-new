'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useApp } from '@/context/AppContext';

export default function DashboardPage() {
  const { currentUser, maskSensitiveData, setVoiceModalOpen } = useApp();
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBureau, setFilterBureau] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: 'Dashboard & Case Monitoring' }]} />

      {/* Welcome & Officer Notification Banner */}
      <div className="gov-panel p-3 bg-white flex flex-wrap justify-between items-center border border-gray-300">
        <div>
          <h2 className="text-[17px] font-bold text-[#002147] tracking-tight">
            Central Administrative Dashboard — AICTE Radar
          </h2>
          <p className="text-[12px] text-gray-600">
            Welcome, <strong>{currentUser.fullName}</strong> ({currentUser.designation}). Session ID: <code>LAN-DEL-29581</code> | Authority: {currentUser.bureau}
          </p>
        </div>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Link href="/coordination" className="gov-btn-primary text-xs">
            ⚡ Open Coordination Workspace
          </Link>
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="gov-btn-saffron text-xs"
          >
            🎙️ Voice Search
          </button>
        </div>
      </div>

      {/* Cross-Bureau Priority Alert Banner (PG-104 & RB-208) */}
      <div className="bg-[#fffbeb] border-l-4 border-[#e67300] p-3 text-[13px] border border-gray-300 flex flex-wrap justify-between items-center">
        <div className="flex items-start space-x-2.5">
          <span className="text-[#e67300] font-bold text-lg leading-none">⚠️</span>
          <div>
            <span className="font-bold text-[#92400e] uppercase">
              Cross-Bureau Pattern Detected (High Priority):
            </span>{' '}
            <span className="text-gray-900">
              Complaint <strong>RB-208</strong> (Regulation Bureau) filed today matches Complaint{' '}
              <strong>PG-104</strong> (PGRC, filed 15 days ago). Both report an unapproved ₹40,000 fee surcharge under{' '}
              <strong>ABC Educational Trust</strong> (PIN: 560034, Koramangala).
            </span>
          </div>
        </div>
        <div className="mt-2 sm:mt-0">
          <Link
            href="/cross-bureau"
            className="gov-btn-primary text-xs bg-[#e67300] hover:bg-[#cc6600] border-[#b45309]"
          >
            Review Potential Match & Anomaly →
          </Link>
        </div>
      </div>

      {/* Compact Administrative Metric Indicator Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
        <div className="gov-panel p-2.5 border-t-2 border-t-[#002147] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">Total Grievances</div>
          <div className="text-[22px] font-bold text-[#002147]">{totalComplaints}</div>
          <div className="text-[10.5px] text-gray-500">All registered bureaus</div>
        </div>

        <div className="gov-panel p-2.5 border-t-2 border-t-[#0284c7] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">Open Grievances</div>
          <div className="text-[22px] font-bold text-[#0284c7]">{openComplaints}</div>
          <div className="text-[10.5px] text-gray-500">Active investigation</div>
        </div>

        <div className="gov-panel p-2.5 border-t-2 border-t-[#991b1b] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">Overdue SLA</div>
          <div className="text-[22px] font-bold text-[#991b1b]">{overdueComplaints}</div>
          <div className="text-[10.5px] text-red-700 font-semibold">VB-112 (Escalation Req.)</div>
        </div>

        <div className="gov-panel p-2.5 border-t-2 border-t-[#e67300] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">Related Case Groups</div>
          <div className="text-[22px] font-bold text-[#e67300]">1</div>
          <div className="text-[10.5px] text-gray-500">CC-2026-BLR-089 (Active)</div>
        </div>

        <div className="gov-panel p-2.5 border-t-2 border-t-[#854d0e] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">Fee Anomalies</div>
          <div className="text-[22px] font-bold text-[#854d0e]">{feeAnomaliesCount}</div>
          <div className="text-[10.5px] text-amber-800 font-semibold">2 Awaiting Audit</div>
        </div>

        <div className="gov-panel p-2.5 border-t-2 border-t-[#138808] text-center">
          <div className="text-[11px] font-bold uppercase text-gray-600">High / Critical Alert</div>
          <div className="text-[22px] font-bold text-[#138808]">{highPriorityCases}</div>
          <div className="text-[10.5px] text-gray-500">Coordination required</div>
        </div>
      </div>

      {/* Search and Filter Panel */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Search & Filter Grievance Register</span>
          <span className="text-xs font-normal text-gray-500">Real-time database filters</span>
        </div>
        <div className="p-3 bg-white">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#002147] mb-1">Search Keywords:</label>
              <input
                id="main-search-input"
                type="text"
                placeholder="Ref #, Institution, Student, Subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="gov-input w-full text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#002147] mb-1">Bureau Filter:</label>
              <select
                value={filterBureau}
                onChange={(e) => setFilterBureau(e.target.value)}
                className="gov-select w-full text-xs"
              >
                <option value="ALL">All Bureaus (PGRC, RB, AB, VB, TB)</option>
                <option value="PGRC">Public Grievance Redressal Cell (PGRC)</option>
                <option value="Regulation Bureau">Regulation Bureau</option>
                <option value="Approval Bureau">Approval Bureau</option>
                <option value="Vigilance Bureau">Vigilance Bureau</option>
                <option value="Student Grievance Redressal Committee">SGRC</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#002147] mb-1">Complaint Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="gov-select w-full text-xs"
              >
                <option value="ALL">All Statuses</option>
                <option value="Awaiting Review">Awaiting Review</option>
                <option value="Under Review">Under Review</option>
                <option value="Escalated">Escalated</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#002147] mb-1">Priority Level:</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="gov-select w-full text-xs"
              >
                <option value="ALL">All Priority Tiers</option>
                <option value="Critical">Critical Priority</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div className="flex items-end space-x-2">
              <button type="submit" className="gov-btn-primary text-xs w-full justify-center">
                Filter Records
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
                title="Reset Filters"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Complaint Register Table */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Active Grievances Register ({complaints.length} Records)</span>
          <div className="text-xs font-normal flex items-center space-x-2">
            <span className="text-gray-600">Showing synthetic demonstration fixtures</span>
            <Link href="/complaints" className="text-[#002147] hover:underline font-bold">
              Full Register View →
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th className="w-20">Ref #</th>
                <th>Assigned Bureau</th>
                <th>Institution Name & City</th>
                <th>Category</th>
                <th>Complainant</th>
                <th>Priority Score</th>
                <th>SLA Deadline</th>
                <th>Current Status</th>
                <th className="text-center w-28">Action</th>
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
                  const isOverdue = deadlineDate.getTime() < new Date().getTime() && c.status !== 'Resolved';
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
                        <div className={isOverdue ? 'text-red-700 font-bold' : 'text-gray-800'}>
                          {deadlineDate.toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-[11px]">
                          {isOverdue ? (
                            <span className="text-[#991b1b] font-bold">Overdue by {Math.abs(daysRemaining)} d</span>
                          ) : (
                            <span className="text-gray-500">{daysRemaining} d remaining</span>
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
                          {c.refNo === 'PG-104' || c.refNo === 'RB-208' ? 'Coordination' : 'Review'}
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
            <span>Critical SLA & Statutory Attention Required</span>
            <Link href="/sla-monitoring" className="text-xs font-bold text-[#002147] hover:underline">
              View SLA Table →
            </Link>
          </div>
          <div className="p-3 text-[12.5px] space-y-2.5">
            <div className="p-2.5 bg-red-50 border border-red-200">
              <div className="flex justify-between items-start">
                <span className="font-bold text-red-800">VB-112: Dharmapuri Polytechnic College</span>
                <span className="bg-red-700 text-white text-[10px] px-1.5 py-0.2 font-bold">OVERDUE</span>
              </div>
              <p className="text-gray-700 mt-1">
                Vigilance inquiry regarding phantom mechanical laboratory equipment. Statutory 30-day response window expired 4 days ago with zero institutional reply.
              </p>
              <div className="mt-2 text-xs font-bold text-red-900">
                Recommended Action: Escalation to Standing Appellate Committee recommended.
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 border border-amber-200">
              <div className="flex justify-between items-start">
                <span className="font-bold text-amber-900">SGRC-607: Deccan College of Architecture</span>
                <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.2 font-bold">APPROACHING</span>
              </div>
              <p className="text-gray-700 mt-1">
                Student grievance regarding absence of designated Ombudsperson. 2 days remaining until statutory compliance deadline.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Quick Audit Activities */}
        <div className="gov-panel">
          <div className="gov-panel-header">
            <span>Recent Administrative Audit Activities</span>
            <Link href="/audit-log" className="text-xs font-bold text-[#002147] hover:underline">
              Full Audit Trail →
            </Link>
          </div>
          <div className="p-3 text-[12px] space-y-2">
            <div className="border-b border-gray-200 pb-2">
              <div className="flex justify-between text-gray-500">
                <span className="font-bold text-[#002147]">Dr. R. K. Sharma (Officer)</span>
                <span>Just Now</span>
              </div>
              <p className="text-gray-800">
                Cross-referenced PG-104 with RB-208 in Joint Coordination Group CC-2026-BLR-089.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-2">
              <div className="flex justify-between text-gray-500">
                <span className="font-bold text-[#002147]">System Radar Matcher</span>
                <span>15 mins ago</span>
              </div>
              <p className="text-gray-800">
                Identified 87% entity identity match for ABC Institute of Technology under ABC Educational Trust.
              </p>
            </div>
            <div>
              <div className="flex justify-between text-gray-500">
                <span className="font-bold text-[#002147]">Sri Arvind Kumar (Administrator)</span>
                <span>1 hour ago</span>
              </div>
              <p className="text-gray-800">
                Acknowledged overdue SLA escalation alert for Dharmapuri Polytechnic College.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
