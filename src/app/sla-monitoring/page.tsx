'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function SlaMonitoringPage() {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [slaFilter, setSlaFilter] = useState<'ALL' | 'OVERDUE' | 'APPROACHING' | 'WITHIN'>('ALL');
  const [slaDaysConfig, setSlaDaysConfig] = useState<number>(30);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/complaints');
      const data = await res.json();
      if (data.success) {
        setComplaints(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch SLA data:', e);
    } finally {
      setLoading(false);
    }
  };

  const nowTime = new Date().getTime();

  const formattedRows = complaints.map((c) => {
    const subDate = new Date(c.submissionDate);
    const deadlineDate = new Date(subDate.getTime() + slaDaysConfig * 24 * 60 * 60 * 1000);
    const isResolved = c.status === 'Resolved';
    const isOverdue = !isResolved && deadlineDate.getTime() < nowTime;
    const diffDays = Math.ceil((deadlineDate.getTime() - nowTime) / (1000 * 60 * 60 * 24));
    const isApproaching = !isResolved && !isOverdue && diffDays <= 3;

    let tier: 'OVERDUE' | 'APPROACHING' | 'WITHIN' = 'WITHIN';
    if (isOverdue) tier = 'OVERDUE';
    else if (isApproaching) tier = 'APPROACHING';

    let recommendedAction = 'Standard bureau queue review within normal statutory SLA.';
    if (isOverdue) {
      recommendedAction = 'Escalation recommended: Statutory institutional reply elapsed. Issue formal reminder or proceed with ex-parte hearing.';
    } else if (isApproaching) {
      recommendedAction = 'Expedite officer verification: Approaching statutory compliance deadline.';
    } else if (isResolved) {
      recommendedAction = 'Case resolved and archived. Compliance verified.';
    }

    return {
      ...c,
      computedDeadline: deadlineDate,
      diffDays,
      tier,
      isOverdue,
      isApproaching,
      recommendedAction,
    };
  });

  const filteredRows = formattedRows.filter((r) => {
    if (slaFilter === 'ALL') return true;
    return r.tier === slaFilter;
  });

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: 'SLA Monitoring & Compliance Triage' }]} />

      <div className="gov-panel p-3 bg-white border border-gray-300">
        <h2 className="text-[17px] font-bold text-[#002147]">
          Statutory Service Level Agreement (SLA) Monitoring & Escalation Portal
        </h2>
        <p className="text-[12px] text-gray-600">
          Monitors institutional response deadlines pursuant to AICTE Approval Process Handbook (APH) norms. Overdue institutional responses trigger transparent escalation recommendations.
        </p>
      </div>

      {/* SLA Threshold Configurator & Status Filter Bar */}
      <div className="bg-[#f8fafc] border border-gray-300 p-3 text-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#002147]">Statutory SLA Standard Period:</span>
          <select
            value={slaDaysConfig}
            onChange={(e) => setSlaDaysConfig(parseInt(e.target.value, 10))}
            className="gov-select font-bold text-xs"
          >
            <option value={15}>15 Days (Urgent / Student Welfare Grievance)</option>
            <option value={30}>30 Days (Standard Statutory AICTE Window)</option>
            <option value={45}>45 Days (Extended Regulatory / EOA Inquiry)</option>
          </select>
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="font-bold text-gray-600 mr-1">Filter by Status:</span>
          <button
            onClick={() => setSlaFilter('ALL')}
            className={`px-2.5 py-1 font-bold border text-xs ${
              slaFilter === 'ALL'
                ? 'bg-[#002147] text-white border-[#001733]'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            All ({formattedRows.length})
          </button>
          <button
            onClick={() => setSlaFilter('OVERDUE')}
            className={`px-2.5 py-1 font-bold border text-xs ${
              slaFilter === 'OVERDUE'
                ? 'bg-red-700 text-white border-red-900'
                : 'bg-white text-red-700 border-red-300'
            }`}
          >
            Overdue ({formattedRows.filter((r) => r.tier === 'OVERDUE').length})
          </button>
          <button
            onClick={() => setSlaFilter('APPROACHING')}
            className={`px-2.5 py-1 font-bold border text-xs ${
              slaFilter === 'APPROACHING'
                ? 'bg-amber-600 text-white border-amber-800'
                : 'bg-white text-amber-700 border-amber-300'
            }`}
          >
            Approaching ({formattedRows.filter((r) => r.tier === 'APPROACHING').length})
          </button>
          <button
            onClick={() => setSlaFilter('WITHIN')}
            className={`px-2.5 py-1 font-bold border text-xs ${
              slaFilter === 'WITHIN'
                ? 'bg-green-700 text-white border-green-900'
                : 'bg-white text-green-700 border-green-300'
            }`}
          >
            Within SLA ({formattedRows.filter((r) => r.tier === 'WITHIN').length})
          </button>
        </div>
      </div>

      {/* Main SLA Monitoring Table */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Grievance SLA Compliance Matrix ({filteredRows.length} Entries)</span>
          <div className="flex items-center space-x-2 text-[11.5px] font-normal">
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-green-600 inline-block" /> Within Deadline
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-amber-500 inline-block" /> Approaching (&lt;3d)
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-red-600 inline-block" /> Overdue
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="gov-table text-[12.5px]">
            <thead>
              <tr>
                <th className="w-16">Ref #</th>
                <th>Assigned Bureau</th>
                <th>Institution Name</th>
                <th>Date Received</th>
                <th>Statutory Deadline</th>
                <th>Compliance Status</th>
                <th>Recommended Administrative Action</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-500 italic">
                    Loading SLA records...
                  </td>
                </tr>
              ) : filteredRows.map((row) => {
                const subDateStr = new Date(row.submissionDate).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });
                const deadlineStr = row.computedDeadline.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });

                return (
                  <tr
                    key={row.id}
                    className={
                      row.tier === 'OVERDUE'
                        ? 'bg-red-50'
                        : row.tier === 'APPROACHING'
                        ? 'bg-amber-50'
                        : ''
                    }
                  >
                    <td className="font-bold text-[#002147]">{row.refNo}</td>
                    <td>{row.bureau}</td>
                    <td>
                      <div className="font-semibold text-gray-900">{row.institution.name}</div>
                      <div className="text-[11px] text-gray-500">{row.institution.city}</div>
                    </td>
                    <td>{subDateStr}</td>
                    <td>{deadlineStr}</td>
                    <td>
                      {row.tier === 'OVERDUE' ? (
                        <span className="bg-red-700 text-white font-bold text-[11px] px-1.5 py-0.5">
                          OVERDUE by {Math.abs(row.diffDays)} Days
                        </span>
                      ) : row.tier === 'APPROACHING' ? (
                        <span className="bg-amber-600 text-white font-bold text-[11px] px-1.5 py-0.5">
                          {row.diffDays} Days Remaining
                        </span>
                      ) : (
                        <span className="bg-green-700 text-white font-bold text-[11px] px-1.5 py-0.5">
                          Within Deadline ({row.diffDays}d)
                        </span>
                      )}
                    </td>
                    <td>
                      <span className="text-[11.5px] leading-tight block text-gray-800">
                        {row.recommendedAction}
                      </span>
                    </td>
                    <td className="text-center">
                      <Link
                        href={`/complaints?refNo=${row.refNo}`}
                        className="gov-btn-primary text-xs py-0.5 px-2"
                      >
                        Inspect
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statutory Guidance */}
      <div className="gov-panel p-3 bg-white text-xs text-gray-700 space-y-1">
        <div className="font-bold text-[#002147] uppercase text-[12px]">
          Statutory SLA Administrative Rules:
        </div>
        <p>
          • When an institutional response is overdue, the system prompts <strong>"Escalation recommended"</strong> rather than automatically marking the complaint rejected or closed.
        </p>
        <p>
          • Any official deemed-no-reply status or adverse inspection sanction requires approval by an authorized Officer or the Standing Complaints Committee.
        </p>
      </div>
    </div>
  );
}
