'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useApp } from '@/context/AppContext';

export default function InstitutionSearchPage() {
  const { currentUser } = useApp();
  const [form, setForm] = useState({
    institutionName: '',
    aicteId: '',
    address: '',
    pinCode: '',
    trustName: '',
    complaintRef: '',
  });

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any | null>(null);

  const loadDemoScenario = (scenario: 'RB-208' | 'PG-104') => {
    if (scenario === 'RB-208') {
      setForm({
        institutionName: 'ABC Institute of Technology',
        aicteId: '1-932145992',
        address: 'Survey No. 42/1, Koramangala',
        pinCode: '560034',
        trustName: 'ABC Educational Trust',
        complaintRef: 'RB-208',
      });
    } else {
      setForm({
        institutionName: 'ABC Engineering College',
        aicteId: '1-932145561',
        address: 'Plot 14, 5th Block, Koramangala',
        pinCode: '560034',
        trustName: 'ABC Educational Trust',
        complaintRef: 'PG-104',
      });
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setHasSearched(true);
      const res = await fetch('/api/matching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          actorName: currentUser.fullName,
          actorRole: currentUser.role,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      }
    } catch (err) {
      console.error('Error during identity matching:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: 'Institution Search & Identity Matching' }]} />

      <div className="gov-panel p-3 bg-white border border-gray-300">
        <h2 className="text-[17px] font-bold text-[#002147]">
          Explainable Institution Identity Matching Engine
        </h2>
        <p className="text-[12px] text-gray-600">
          Identifies potentially duplicate, co-located, or sister institution records across disparate bureau submissions using transparent mathematical similarity weighting.
        </p>
      </div>

      {/* Preset Buttons for Demo */}
      <div className="bg-[#f0f9ff] border border-[#0284c7] p-2.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="font-bold text-[#0369a1]">
          Quick Scenario Presets (Synthetic Demonstration Fixtures):
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => loadDemoScenario('RB-208')}
            className="gov-btn-secondary text-xs bg-white"
          >
            Load Case: ABC Institute of Tech (RB-208)
          </button>
          <button
            type="button"
            onClick={() => loadDemoScenario('PG-104')}
            className="gov-btn-secondary text-xs bg-white"
          >
            Load Case: ABC Engineering College (PG-104)
          </button>
        </div>
      </div>

      {/* Search Form */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Search & Identity Matching Parameters</span>
          <span className="text-xs text-gray-500 font-normal">All fields are optional</span>
        </div>
        <div className="p-4 bg-white">
          <form onSubmit={handleSearch} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#002147] mb-1">
                  Institution Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. ABC Institute of Technology"
                  value={form.institutionName}
                  onChange={(e) => setForm({ ...form, institutionName: e.target.value })}
                  className="gov-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#002147] mb-1">
                  AICTE Permanent Institution ID:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1-932145992"
                  value={form.aicteId}
                  onChange={(e) => setForm({ ...form, aicteId: e.target.value })}
                  className="gov-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#002147] mb-1">
                  Trust / Sponsoring Society Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. ABC Educational Trust"
                  value={form.trustName}
                  onChange={(e) => setForm({ ...form, trustName: e.target.value })}
                  className="gov-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#002147] mb-1">
                  Campus Address / Locality:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Koramangala, Bengaluru"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="gov-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#002147] mb-1">
                  Postal PIN Code:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 560034"
                  maxLength={6}
                  value={form.pinCode}
                  onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
                  className="gov-input w-full text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#002147] mb-1">
                  Associated Complaint Reference:
                </label>
                <input
                  type="text"
                  placeholder="e.g. RB-208 or PG-104"
                  value={form.complaintRef}
                  onChange={(e) => setForm({ ...form, complaintRef: e.target.value })}
                  className="gov-input w-full text-xs"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setForm({
                    institutionName: '',
                    aicteId: '',
                    address: '',
                    pinCode: '',
                    trustName: '',
                    complaintRef: '',
                  });
                  setResults([]);
                  setHasSearched(false);
                }}
                className="gov-btn-secondary text-xs"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={loading}
                className="gov-btn-primary text-xs px-5"
              >
                {loading ? 'Evaluating Matching Signals...' : 'Run Identity Match Algorithm'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Transparent Matching Criteria Summary Box */}
      <div className="bg-[#f8fafc] border border-gray-300 p-3 text-[12px] space-y-1 text-gray-700">
        <div className="font-bold text-[#002147] uppercase">
          Explainable Scoring Policy & Signal Weights:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-1">
          <div>• <strong>AICTE Permanent ID:</strong> Exact match = 100% (Definitive Record Match)</div>
          <div>• <strong>Name Similarity:</strong> 35% weight (Token Jaccard & Levenshtein)</div>
          <div>• <strong>Registered Trust:</strong> 30% weight (Common Parent Entity)</div>
          <div>• <strong>Address & Locality:</strong> 20% weight | <strong>PIN Code:</strong> 15% weight</div>
        </div>
        <div className="italic text-gray-500 pt-1">
          Disclaimer: Results represent potential identity associations requiring manual officer verification. The system never automatically declares an institution fraudulent or invalid.
        </div>
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="gov-panel">
          <div className="gov-panel-header">
            <span>Potential Match Results ({results.length} Candidate Records Evaluated)</span>
            <span className="text-xs text-gray-500 font-normal">
              Sorted by Overall Similarity Score
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="gov-table text-[12.5px]">
              <thead>
                <tr>
                  <th>Candidate Institution</th>
                  <th>AICTE Permanent ID</th>
                  <th>Parent Trust</th>
                  <th>PIN Match</th>
                  <th>Name Sim.</th>
                  <th>Address Sim.</th>
                  <th>Overall Match Score</th>
                  <th>Administrative Assessment</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {results.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-6 text-gray-500 italic">
                      No institution records met the minimum correlation threshold.
                    </td>
                  </tr>
                ) : (
                  results.map((r, idx) => {
                    const b = r.breakdown;
                    const isHigh = b.overallScore >= 75;

                    return (
                      <tr
                        key={r.targetRecord.id}
                        className={isHigh ? 'bg-[#fdfaf5] font-semibold' : ''}
                      >
                        <td>
                          <div className="font-bold text-[#002147]">{r.targetRecord.name}</div>
                          <div className="text-[11px] text-gray-500">
                            {r.targetRecord.address}, {r.targetRecord.city}
                          </div>
                        </td>
                        <td>
                          <code>{r.targetRecord.aicteId}</code>
                        </td>
                        <td>{r.targetRecord.trustName}</td>
                        <td>
                          {b.pinCodeMatch ? (
                            <span className="text-green-800 font-bold bg-green-50 px-1 border border-green-300">
                              ✓ {r.targetRecord.pinCode}
                            </span>
                          ) : (
                            <span className="text-gray-500">{r.targetRecord.pinCode}</span>
                          )}
                        </td>
                        <td>{b.nameSimilarity}%</td>
                        <td>{b.addressMatch}%</td>
                        <td>
                          <div className="flex items-center space-x-1">
                            <span
                              className={`px-2 py-0.5 text-xs font-bold ${
                                b.overallScore >= 80
                                  ? 'bg-red-100 text-red-900 border border-red-300'
                                  : b.overallScore >= 50
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-gray-100 text-gray-800 border border-gray-300'
                              }`}
                            >
                              {b.overallScore}%
                            </span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`text-[11.5px] px-1.5 py-0.2 font-semibold ${
                              b.recommendation === 'High Probability Association'
                                ? 'text-[#92400e]'
                                : 'text-gray-600'
                            }`}
                          >
                            {b.recommendation}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => setSelectedMatch(r)}
                            className="gov-btn-primary text-xs py-1 px-2.5"
                          >
                            Review Match
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Review Match Detailed Comparison Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#002147] w-full max-w-3xl shadow-xl">
            <div className="bg-[#002147] text-white px-4 py-2.5 flex justify-between items-center">
              <h3 className="text-[15px] font-bold">
                Detailed Match Scrutiny: {selectedMatch.targetRecord.name}
              </h3>
              <button
                onClick={() => setSelectedMatch(null)}
                className="text-white hover:text-[#ffdd99] text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-4 text-[12.5px]">
              <div className="bg-[#fffbeb] border border-[#f59e0b] p-3 text-gray-800">
                <div className="font-bold text-[#92400e] text-[13px] mb-1">
                  Overall Match Score: {selectedMatch.breakdown.overallScore}% — {selectedMatch.breakdown.recommendation}
                </div>
                <div className="text-xs">
                  Evaluation: <strong>Potentially related institution record</strong> | Manual verification required.
                </div>
              </div>

              {/* Side by Side Comparison */}
              <table className="gov-table text-xs">
                <thead>
                  <tr>
                    <th>Parameter</th>
                    <th>Search Query Input</th>
                    <th>Candidate Record in Database</th>
                    <th>Signal Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold bg-gray-50">Institution Name</td>
                    <td>{form.institutionName || 'Not specified'}</td>
                    <td className="font-bold text-[#002147]">{selectedMatch.targetRecord.name}</td>
                    <td>{selectedMatch.breakdown.nameSimilarity}% Similarity</td>
                  </tr>
                  <tr>
                    <td className="font-bold bg-gray-50">AICTE ID</td>
                    <td>{form.aicteId || 'Not specified'}</td>
                    <td><code>{selectedMatch.targetRecord.aicteId}</code></td>
                    <td>{selectedMatch.breakdown.exactIdMatch ? 'Exact Match (100%)' : 'Different AICTE ID'}</td>
                  </tr>
                  <tr>
                    <td className="font-bold bg-gray-50">Parent Trust</td>
                    <td>{form.trustName || 'Not specified'}</td>
                    <td className="font-bold">{selectedMatch.targetRecord.trustName}</td>
                    <td>{selectedMatch.breakdown.trustMatch}% Correlation</td>
                  </tr>
                  <tr>
                    <td className="font-bold bg-gray-50">PIN Code</td>
                    <td>{form.pinCode || 'Not specified'}</td>
                    <td>{selectedMatch.targetRecord.pinCode}</td>
                    <td>{selectedMatch.breakdown.pinCodeMatch ? 'Exact Match (100%)' : 'Mismatch'}</td>
                  </tr>
                  <tr>
                    <td className="font-bold bg-gray-50">Address</td>
                    <td>{form.address || 'Not specified'}</td>
                    <td>{selectedMatch.targetRecord.address}</td>
                    <td>{selectedMatch.breakdown.addressMatch}% Locality Overlap</td>
                  </tr>
                </tbody>
              </table>

              {/* Supporting Reasons */}
              <div>
                <h4 className="font-bold text-[#002147] border-b border-gray-300 pb-1 mb-1.5 text-xs uppercase">
                  Explainable Reasons Supporting Association
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-800 bg-[#f8fafc] p-2.5 border border-gray-200">
                  {selectedMatch.breakdown.reasons.map((reason: string, i: number) => (
                    <li key={i}>{reason}</li>
                  ))}
                </ul>
              </div>

              {/* Decision Support Actions */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                <span className="text-gray-500 text-xs">
                  Logged under officer session {currentUser.fullName}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      alert(`Confirmed association between ${form.institutionName || 'Query'} and ${selectedMatch.targetRecord.name}. Saved to inter-bureau coordination candidate queue.`);
                      setSelectedMatch(null);
                    }}
                    className="gov-btn-primary text-xs"
                  >
                    Confirm Association & Link Case
                  </button>
                  <button
                    onClick={() => setSelectedMatch(null)}
                    className="gov-btn-secondary text-xs"
                  >
                    Close Scrutiny
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
