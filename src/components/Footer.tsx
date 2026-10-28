'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="bg-[#002147] text-white border-t-2 border-[#e67300] mt-10 text-[12.5px] no-print">
      <div className="max-w-[1400px] mx-auto px-5 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-[#0a3871]">
          <div>
            <h4 className="text-[14px] font-bold text-[#ffdd99] uppercase mb-2">
              {t.footerPortalInfo}
            </h4>
            <p className="text-gray-300 leading-relaxed text-[12px]">
              {t.footerPortalDesc}
            </p>
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#ffdd99] uppercase mb-2">
              {t.footerBureaus}
            </h4>
            <ul className="space-y-1 text-gray-300 text-[12px] list-disc list-inside">
              <li>Public Grievance Redressal Cell (PGRC)</li>
              <li>Regulation Bureau (RB)</li>
              <li>Approval Bureau (AB)</li>
              <li>Vigilance Bureau (VB)</li>
              <li>Technical Bureau (TB)</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#ffdd99] uppercase mb-2">
              {t.footerStatutory}
            </h4>
            <ul className="space-y-1 text-gray-300 text-[12px] list-disc list-inside">
              <li>AICTE Approval Process Handbook (APH)</li>
              <li>State Fee Regulatory Committee Ceilings</li>
              <li>National Grievance Portal Interoperability</li>
              <li>Digital Personal Data Protection (DPDP) Principles</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-[#ffdd99] uppercase mb-2">
              {t.footerSecurityNotice}
            </h4>
            <p className="text-gray-300 text-[12px] leading-relaxed">
              {t.footerSecurityDesc}
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap justify-between items-center text-gray-400 text-[11.5px]">
          <div>{t.footerManagedBy}</div>
          <div className="text-right">{t.footerSyntheticOnly}</div>
        </div>
      </div>
    </footer>
  );
}
