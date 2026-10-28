'use client';

import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AuditLogPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [actionFilter]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (actionFilter !== 'ALL') params.append('action', actionFilter);
      if (search) params.append('search', search);

      const res = await fetch(`/api/audit?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.data);
      }
    } catch (e) {
      console.error('Failed to fetch audit logs:', e);
    } finally {
      setLoading(false);
    }
  };

  const exportCsv = () => {
    const headers = ['Timestamp', 'Actor Name', 'Actor Role', 'Action', 'Case Ref', 'Details', 'IP Address'];
    const rows = logs.map((l) => [
      new Date(l.timestamp).toISOString(),
      `"${l.actorName}"`,
      l.actorRole,
      l.action,
      l.caseRef || 'N/A',
      `"${l.details.replace(/"/g, '""')}"`,
      l.ipAddress || 'LAN',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AICTE_Audit_Log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: 'Audit Trail & Administrative Accountability' }]} />

      <div className="gov-panel p-3 bg-white border border-gray-300">
        <h2 className="text-[17px] font-bold text-[#002147]">
          Statutory Append-Only Administrative Audit Ledger
        </h2>
        <p className="text-[12px] text-gray-600">
          Immutable audit record tracking case scrutiny, identity matching queries, OCR fee reviews, officer directives, and dossier exports for parliamentary and vigilance accountability.
        </p>
      </div>

      {/* Filter and Export Toolbar */}
      <div className="gov-panel p-3 bg-white border border-gray-300">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div>
              <label className="block font-bold text-[#002147] mb-1">Search Details / Actor:</label>
              <input
                type="text"
                placeholder="Search log entries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchLogs()}
                className="gov-input text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#002147] mb-1">Action Category:</label>
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="gov-select text-xs"
              >
                <option value="ALL">All Administrative Actions</option>
                <option value="CASE_REVIEW_INITIATED">Case Review Initiated</option>
                <option value="IDENTITY_MATCH_REVIEWED">Identity Match Reviewed</option>
                <option value="COORDINATION_GROUP_CREATED">Coordination Group Created</option>
                <option value="FEE_ANOMALY_REVIEWED">Fee Anomaly Reviewed</option>
                <option value="OFFICER_NOTE_ADDED">Officer Note Added</option>
                <option value="DOSSIER_GENERATED">Dossier Generated</option>
                <option value="SLA_ALERT_ACKNOWLEDGED">SLA Alert Acknowledged</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={exportCsv}
              className="gov-btn-secondary text-xs"
            >
              📥 Export CSV
            </button>
            <button
              onClick={() => window.print()}
              className="gov-btn-primary text-xs"
            >
              🖨 Print Official Audit Copy
            </button>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Immutable Audit Ledger Entries ({logs.length} Total Records)</span>
          <span className="text-xs text-gray-500 font-normal">
            Append-Only Database Storage (SHA-256 Signatures Active)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="gov-table text-[12px]">
            <thead>
              <tr>
                <th className="w-36">Timestamp (IST)</th>
                <th>Authorised Actor</th>
                <th>Role</th>
                <th>Action Type</th>
                <th>Case Ref</th>
                <th>Evidentiary Details & Remarks</th>
                <th>Network IP</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-gray-500 italic">
                    Loading audit trail...
                  </td>
                </tr>
              ) : logs.map((log) => {
                const dateStr = new Date(log.timestamp).toLocaleString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                });

                return (
                  <tr key={log.id}>
                    <td className="font-mono text-gray-700 whitespace-nowrap">{dateStr}</td>
                    <td className="font-bold text-[#002147]">{log.actorName}</td>
                    <td>
                      <span className="bg-gray-100 px-1 py-0.2 font-semibold text-gray-800 border border-gray-300">
                        {log.actorRole}
                      </span>
                    </td>
                    <td>
                      <code className="text-xs font-bold text-[#0a3871]">{log.action}</code>
                    </td>
                    <td>
                      {log.caseRef ? (
                        <span className="font-bold text-[#800000]">{log.caseRef}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="text-gray-800 leading-snug">{log.details}</td>
                    <td className="font-mono text-[10.5px] text-gray-500 whitespace-nowrap">
                      {log.ipAddress}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
