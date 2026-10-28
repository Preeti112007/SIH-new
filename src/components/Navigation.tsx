'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/' },
  { label: 'Complaint Register', href: '/complaints' },
  { label: 'Institution Search', href: '/institution-search' },
  { label: 'Cross-Bureau Cases', href: '/cross-bureau' },
  { label: 'Trust Network', href: '/trust-network' },
  { label: 'Fee Anomaly Review', href: '/fee-anomaly' },
  { label: 'Coordination Workspace', href: '/coordination' },
  { label: 'SLA Monitoring', href: '/sla-monitoring' },
  { label: 'Audit Log', href: '/audit-log' },
  { label: 'Administration', href: '/administration' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#002147] text-white border-b border-[#001733] no-print">
      <div className="max-w-[1400px] mx-auto px-4">
        <ul className="flex flex-wrap items-center text-[13.5px] font-bold tracking-wide list-none m-0 p-0">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

            return (
              <li key={item.href} className="m-0 p-0">
                <Link
                  href={item.href}
                  className={`inline-block py-2.5 px-3 border-r border-[#0a3871] transition-colors whitespace-nowrap ${
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
