'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useApp();

  const navItems = [
    { label: t.navDashboard, href: '/' },
    { label: t.navComplaints, href: '/complaints' },
    { label: t.navInstitutionSearch, href: '/institution-search' },
    { label: t.navCrossBureau, href: '/cross-bureau' },
    { label: t.navTrustNetwork, href: '/trust-network' },
    { label: t.navFeeAnomaly, href: '/fee-anomaly' },
    { label: t.navCoordination, href: '/coordination' },
    { label: t.navSlaMonitoring, href: '/sla-monitoring' },
    { label: t.navAuditLog, href: '/audit-log' },
    { label: t.navAdministration, href: '/administration' },
  ];

  return (
    <nav className="bg-[#002147] text-white border-b border-[#001733] no-print">
      <div className="max-w-[1400px] mx-auto px-4">
        <ul className="flex flex-wrap items-center text-[13px] font-bold tracking-wide list-none m-0 p-0">
          {navItems.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <li key={item.href} className="m-0 p-0">
                <Link
                  href={item.href}
                  className={`inline-block py-2 px-3 border-r border-[#0a3871] transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-[#0a3871] text-[#ffdd99] border-b-2 border-b-[#e67300]'
                      : 'hover:bg-[#0a3871] text-gray-100 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
