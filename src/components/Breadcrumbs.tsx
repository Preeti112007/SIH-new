'use client';

import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="bg-[#f8fafc] border-b border-gray-200 px-4 py-1.5 text-[12.5px] text-gray-600 no-print">
      <div className="max-w-[1400px] mx-auto flex items-center space-x-1.5">
        <Link href="/" className="text-[#002147] hover:underline font-semibold">
          Home
        </Link>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="text-gray-400">/</span>
            {item.href ? (
              <Link href={item.href} className="text-[#002147] hover:underline font-semibold">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-800 font-bold">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
