'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function TrustNetworkPage() {
  const [trusts, setTrusts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrustId, setSelectedTrustId] = useState<string>('TR-56001');

  useEffect(() => {
    fetchTrusts();
  }, []);

  const fetchTrusts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/trusts');
      const data = await res.json();
      if (data.success) {
        setTrusts(data.data);
      }
    } catch (err) {
      console.error('Error fetching trust network:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeTrust = trusts.find((t) => t.trustId === selectedTrustId) || trusts[0];

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: 'Trust Knowledge Graph & Entity Network' }]} />

      <div className="gov-panel p-3 bg-white border border-gray-300">
        <h2 className="text-[17px] font-bold text-[#002147]">
          Educational Trust & Society Entity Relationship Graph
        </h2>
        <p className="text-[12px] text-gray-600">
          Visualizes umbrella educational trusts and societies operating multiple technical institutions. Exposes cross-institution complaint clusters, fee anomaly patterns, and shared governing boards.
        </p>
      </div>

      {/* Trust Selection Tabs */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Select Educational Trust / Sponsoring Society</span>
          <span className="text-xs text-gray-500 font-normal">Demonstration Registered Entities</span>
        </div>
        <div className="p-3 bg-white flex flex-wrap gap-2">
          {trusts.map((t) => {
            const isSelected = t.trustId === activeTrust?.trustId;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTrustId(t.trustId)}
                className={`text-xs px-3 py-1.5 font-bold border transition-colors ${
                  isSelected
                    ? 'bg-[#002147] text-white border-[#001733]'
                    : 'bg-[#f8fafc] text-gray-800 border-gray-300 hover:bg-gray-200'
                }`}
              >
                {t.name} ({t.institutionCount} Units)
              </button>
            );
          })}
        </div>
      </div>

      {activeTrust && (
        <div className="space-y-4">
          {/* Active Trust Summary Card */}
          <div className="gov-panel p-4 bg-white border border-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-gray-500 block uppercase font-bold text-[11px]">Trust Entity Name</span>
                <span className="text-[15px] font-bold text-[#002147]">{activeTrust.name}</span>
                <div className="text-gray-600">Reg No: <code>{activeTrust.registrationNo}</code></div>
              </div>
              <div>
                <span className="text-gray-500 block uppercase font-bold text-[11px]">Jurisdiction & Location</span>
                <span className="font-semibold text-gray-900">{activeTrust.registeredCity}, {activeTrust.registeredState}</span>
                <div className="text-gray-500">Verification Status: <strong className="text-green-800">Verified Society</strong></div>
              </div>
              <div>
                <span className="text-gray-500 block uppercase font-bold text-[11px]">Institutional Footprint</span>
                <span className="text-base font-bold text-[#002147]">{activeTrust.institutionCount} Technical Institutions</span>
                <div className="text-gray-600">{activeTrust.totalComplaints} Registered Complaints ({activeTrust.openComplaintsCount} Open)</div>
              </div>
              <div>
                <span className="text-gray-500 block uppercase font-bold text-[11px]">Governing Trustees / Office Bearers</span>
                <span className="text-gray-800 text-[11.5px] leading-tight block">{activeTrust.trusteeNames}</span>
              </div>
            </div>
          </div>

          {/* Dual View: 1. Interactive Diagram and 2. Tabular Representation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* View 1: Interactive SVG Relationship Diagram (6 cols) */}
            <div className="lg:col-span-6 gov-panel flex flex-col">
              <div className="gov-panel-header">
                <span>View 1: Interactive Entity Knowledge Graph</span>
                <span className="text-[11px] text-gray-500">SVG Node-Link Architecture</span>
              </div>

              <div className="p-3 bg-[#fdfdfd] flex-1 flex flex-col items-center justify-center min-h-[360px] border-b border-gray-200">
                <svg viewBox="0 0 540 340" className="w-full h-auto max-h-[330px]">
                  {/* Central Hub: The Trust */}
                  <rect
                    x="190"
                    y="130"
                    width="160"
                    height="65"
                    fill="#002147"
                    stroke="#001630"
                    strokeWidth="2"
                    rx="2"
                  />
                  <text x="270" y="155" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    {activeTrust.name.length > 20 ? activeTrust.name.slice(0, 18) + '...' : activeTrust.name}
                  </text>
                  <text x="270" y="172" fill="#ffdd99" fontSize="10" textAnchor="middle">
                    Reg: {activeTrust.registrationNo}
                  </text>
                  <text x="270" y="185" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                    {activeTrust.registeredCity} (Parent Entity)
                  </text>

                  {/* Radiating lines & Child Nodes */}
                  {activeTrust.institutions.map((inst: any, idx: number) => {
                    const total = activeTrust.institutions.length;
                    const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
                    const radius = 125;
                    const cx = 270 + radius * Math.cos(angle);
                    const cy = 160 + radius * Math.sin(angle);

                    const hasAnomalies = inst.feeRecords?.length > 0 || inst.complaints?.length > 0;

                    return (
                      <g key={inst.id}>
                        {/* Connecting Line */}
                        <line
                          x1="270"
                          y1="162"
                          x2={cx}
                          y2={cy}
                          stroke={hasAnomalies ? '#e67300' : '#94a3b8'}
                          strokeWidth={hasAnomalies ? '2' : '1.5'}
                          strokeDasharray={hasAnomalies ? '4,2' : 'none'}
                        />

                        {/* Child Node Box */}
                        <rect
                          x={cx - 75}
                          y={cy - 25}
                          width="150"
                          height="50"
                          fill={hasAnomalies ? '#fffdfa' : '#ffffff'}
                          stroke={hasAnomalies ? '#e67300' : '#64748b'}
                          strokeWidth={hasAnomalies ? '2' : '1'}
                          rx="2"
                        />
                        <text
                          x={cx}
                          y={cy - 8}
                          fill="#002147"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {inst.name.length > 22 ? inst.name.slice(0, 20) + '...' : inst.name}
                        </text>
                        <text
                          x={cx}
                          y={cy + 6}
                          fill="#475569"
                          fontSize="9"
                          textAnchor="middle"
                        >
                          PIN: {inst.pinCode} | {inst.category.split(' ')[0]}
                        </text>
                        <text
                          x={cx}
                          y={cy + 18}
                          fill={hasAnomalies ? '#991b1b' : '#15803d'}
                          fontSize="9"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {inst.complaints?.length || 0} Grievance(s) on Record
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className="text-[11px] text-gray-500 mt-2 text-center">
                  Legend: <span className="text-[#002147] font-bold">■ Parent Trust</span> |{' '}
                  <span className="text-[#e67300] font-bold">-- Surcharge / Grievance Flagged</span> |{' '}
                  <span className="text-gray-700 font-bold">── Verified Unit</span>
                </div>
              </div>
            </div>

            {/* View 2: Tabular Representation of the Same Relationships (6 cols) */}
            <div className="lg:col-span-6 gov-panel flex flex-col">
              <div className="gov-panel-header">
                <span>View 2: Tabular Representation & Corroborating Evidence</span>
                <span className="text-[11px] text-gray-500">Relational Matrix</span>
              </div>

              <div className="overflow-x-auto flex-1 max-h-[420px] overflow-y-auto">
                <table className="gov-table text-[12px]">
                  <thead>
                    <tr>
                      <th>Institution Name</th>
                      <th>AICTE ID</th>
                      <th>PIN Code</th>
                      <th>Grievances</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTrust.institutions.map((inst: any) => {
                      const compCount = inst.complaints?.length || 0;
                      const hasFeeDiff = inst.feeRecords?.some((f: any) => f.differenceAmount > 0);

                      return (
                        <tr key={inst.id} className={hasFeeDiff ? 'bg-[#fffdfa]' : ''}>
                          <td>
                            <div className="font-bold text-[#002147]">{inst.name}</div>
                            <div className="text-[11px] text-gray-500">{inst.category}</div>
                          </td>
                          <td>
                            <code>{inst.aicteId}</code>
                          </td>
                          <td>
                            <strong>{inst.pinCode}</strong>
                          </td>
                          <td>
                            {compCount > 0 ? (
                              <div>
                                <span className="font-bold text-[#991b1b]">{compCount} Active</span>
                                <div className="text-[10.5px] text-gray-600">
                                  {inst.complaints.map((c: any) => c.refNo).join(', ')}
                                </div>
                              </div>
                            ) : (
                              <span className="text-green-800 font-semibold">0 Complaints</span>
                            )}
                          </td>
                          <td>
                            <Link
                              href={`/complaints?search=${inst.name}`}
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
          </div>

          {/* Trust Grievance Correlation Insight */}
          <div className="gov-panel p-3 bg-[#f8fafc] text-xs space-y-1.5 text-gray-800">
            <div className="font-bold text-[#002147] uppercase text-[12.5px]">
              Administrative Graph Insight for {activeTrust.name}:
            </div>
            <p>
              When a trust operates multiple educational institutions within the same postal code ({activeTrust.institutions[0]?.pinCode}), financial and administrative policies are frequently determined by a common board of management. Under AICTE coordination guidelines, complaint investigations regarding one unit may subpoena governing trust records relevant to sister units.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
