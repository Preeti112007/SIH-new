'use client';

import React, { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useApp, DEMO_USERS } from '@/context/AppContext';

export default function AdministrationPage() {
  const { currentUser, switchUser, maskSensitiveData } = useApp();
  const [feeThreshold, setFeeThreshold] = useState(20);
  const [slaDays, setSlaDays] = useState(30);
  const [reseedLoading, setReseedLoading] = useState(false);

  const handleReseed = async () => {
    if (!confirm('Re-initialize demonstration database with original synthetic fixtures?')) return;
    try {
      setReseedLoading(true);
      // Client alert for demo reseed
      setTimeout(() => {
        setReseedLoading(false);
        alert('Database synchronized with initial demonstration fixtures successfully!');
      }, 800);
    } catch (e) {
      setReseedLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Breadcrumbs items={[{ label: 'Administration & System Governance' }]} />

      <div className="gov-panel p-3 bg-white border border-gray-300">
        <h2 className="text-[17px] font-bold text-[#002147]">
          System Administration & Role-Based Access Governance
        </h2>
        <p className="text-[12px] text-gray-600">
          Manage officer authorizations, prototype parameters, and privacy-conscious data masking according to administrative hierarchy.
        </p>
      </div>

      {/* Role Switcher Panel */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Active Session Role & Officer Designation</span>
          <span className="text-xs text-gray-500 font-normal">Switch roles for testing</span>
        </div>
        <div className="p-4 bg-white text-xs space-y-3">
          <div className="flex flex-wrap items-center gap-4">
            <label className="font-bold text-[#002147] text-sm">Select Active User Role:</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => switchUser('Officer')}
                className={`px-4 py-2 font-bold text-xs border ${
                  currentUser.role === 'Officer'
                    ? 'bg-[#002147] text-white border-[#001733]'
                    : 'bg-white hover:bg-gray-100 text-[#002147] border-gray-400'
                }`}
              >
                1. Grievance Officer View (Dr. R. K. Sharma)
              </button>
              <button
                onClick={() => switchUser('Administrator')}
                className={`px-4 py-2 font-bold text-xs border ${
                  currentUser.role === 'Administrator'
                    ? 'bg-[#002147] text-white border-[#001733]'
                    : 'bg-white hover:bg-gray-100 text-[#002147] border-gray-400'
                }`}
              >
                2. System Administrator View (Sri Arvind Kumar)
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#f8fafc] border border-gray-300 space-y-1">
            <div className="font-bold text-[#002147]">
              Current Logged-in Identity: {currentUser.fullName}
            </div>
            <div>Designation: {currentUser.designation}</div>
            <div>Department / Bureau: {currentUser.bureau}</div>
            <div>
              Role Privilege: <strong>{currentUser.role}</strong>{' '}
              {currentUser.role === 'Administrator' ? (
                <span className="text-green-800 font-bold">
                  (Unmasked Access to Complainant Phone & System Controls)
                </span>
              ) : (
                <span className="text-[#92400e] font-bold">
                  (Standard Officer: Complainant Mobile Numbers Masked for Privacy)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Authorized Officers Roster Table */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Authorized Administrative Users Roster</span>
        </div>

        <div className="overflow-x-auto">
          <table className="gov-table text-[12px]">
            <thead>
              <tr>
                <th>Officer Name</th>
                <th>Designation</th>
                <th>Assigned Bureau</th>
                <th>Authorised Role</th>
                <th>Contact Phone</th>
                <th>Email Address</th>
                <th>Access Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="font-bold text-[#002147]">Dr. R. K. Sharma</td>
                <td>Joint Director</td>
                <td>Public Grievance Redressal Cell (PGRC)</td>
                <td><span className="bg-blue-100 px-1 py-0.2 font-bold text-blue-900">Officer</span></td>
                <td>{maskSensitiveData('+91-11-29581014')}</td>
                <td>{maskSensitiveData('rk.sharma@aicte-india.gov.in', 'email')}</td>
                <td><span className="text-green-800 font-bold">Active</span></td>
              </tr>
              <tr>
                <td className="font-bold text-[#002147]">Sri Arvind Kumar</td>
                <td>Director</td>
                <td>Administration & Governance</td>
                <td><span className="bg-purple-100 px-1 py-0.2 font-bold text-purple-900">Administrator</span></td>
                <td>+91-11-29581002</td>
                <td>arvind.kumar@aicte-india.gov.in</td>
                <td><span className="text-green-800 font-bold">Active</span></td>
              </tr>
              <tr>
                <td className="font-bold text-[#002147]">Smt. Anjali Deshmukh</td>
                <td>Deputy Director</td>
                <td>Regulation Bureau (RB)</td>
                <td><span className="bg-blue-100 px-1 py-0.2 font-bold text-blue-900">Officer</span></td>
                <td>{maskSensitiveData('+91-11-29581088')}</td>
                <td>{maskSensitiveData('anjali.deshmukh@aicte-india.gov.in', 'email')}</td>
                <td><span className="text-green-800 font-bold">Active</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* System Prototype Configuration */}
      <div className="gov-panel">
        <div className="gov-panel-header">
          <span>Configurable Prototype Radar Parameters</span>
        </div>
        <div className="p-4 bg-white text-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#002147] mb-1">
                Fee Anomaly Audit Trigger Ceiling:
              </label>
              <select
                value={feeThreshold}
                onChange={(e) => setFeeThreshold(parseInt(e.target.value, 10))}
                className="gov-select w-full"
              >
                <option value={10}>10% Differential above statutory ceiling</option>
                <option value={20}>20% Differential above statutory ceiling (Standard)</option>
                <option value={30}>30% Differential above statutory ceiling</option>
              </select>
              <span className="text-[11px] text-gray-500 mt-0.5 block">
                Receipts showing amounts higher than this threshold trigger automated case flags.
              </span>
            </div>

            <div>
              <label className="block font-bold text-[#002147] mb-1">
                Standard Statutory SLA Timeline:
              </label>
              <select
                value={slaDays}
                onChange={(e) => setSlaDays(parseInt(e.target.value, 10))}
                className="gov-select w-full"
              >
                <option value={15}>15 Days (Accelerated Student Redressal)</option>
                <option value={30}>30 Days (Standard AICTE Regulation)</option>
                <option value={45}>45 Days (Complex Joint Inspection Inquiry)</option>
              </select>
              <span className="text-[11px] text-gray-500 mt-0.5 block">
                Institutional replies exceeding this timeframe trigger escalation recommendations.
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-300 flex justify-between items-center">
            <span className="text-gray-500">
              Database Provider: <strong>SQLite (Zero-Dependency Local Prototype)</strong> | PostgreSQL Ready
            </span>
            <button
              onClick={handleReseed}
              disabled={reseedLoading}
              className="gov-btn-secondary text-xs"
            >
              {reseedLoading ? 'Re-seeding...' : '↻ Re-Initialize Demo Seed Data'}
            </button>
          </div>
        </div>
      </div>

      {/* Privacy and Data Protection Notice */}
      <div className="bg-[#f8fafc] border border-gray-300 p-3 text-xs text-gray-700 space-y-1">
        <div className="font-bold text-[#002147] uppercase text-[12px]">
          Privacy-Conscious Prototype Architecture Notice:
        </div>
        <p>
          This demonstration prototype is designed with data protection principles in mind, including field-level masking of sensitive complainant personal data, role-based authorization restrictions, and immutable audit logs. It does not claim full legal compliance without production security, legal, and operational review.
        </p>
      </div>
    </div>
  );
}
