'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const { currentUser, switchUser, fontSize, setFontSize, language, setLanguage, setVoiceModalOpen } = useApp();

  return (
    <header className="bg-white border-b border-gray-300 no-print">
      {/* Top Accessibility & Language Bar */}
      <div className="bg-[#f4f6f8] border-b border-gray-300 text-[12px] text-gray-700 px-4 py-1 flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
          <a
            href="#main-content"
            className="text-[#002147] hover:underline font-bold focus:outline-none focus:ring-1 focus:ring-[#002147]"
          >
            Skip to Main Content
          </a>
          <span className="text-gray-400">|</span>
          <button
            onClick={() => alert('Screen Reader Access Enabled. Layout optimized for assistive readers.')}
            className="hover:underline text-gray-700"
          >
            Screen Reader Access
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {/* Text Size Adjustments */}
          <span className="font-semibold text-gray-600">Text Size:</span>
          <div className="inline-flex border border-gray-400 bg-white">
            <button
              onClick={() => setFontSize(90)}
              className={`px-2 py-0.5 border-r border-gray-300 text-xs font-bold ${fontSize === 90 ? 'bg-[#002147] text-white' : 'hover:bg-gray-100'}`}
              title="Decrease Font Size"
            >
              A−
            </button>
            <button
              onClick={() => setFontSize(100)}
              className={`px-2 py-0.5 border-r border-gray-300 text-xs font-bold ${fontSize === 100 ? 'bg-[#002147] text-white' : 'hover:bg-gray-100'}`}
              title="Default Font Size"
            >
              A
            </button>
            <button
              onClick={() => setFontSize(115)}
              className={`px-2 py-0.5 text-xs font-bold ${fontSize === 115 ? 'bg-[#002147] text-white' : 'hover:bg-gray-100'}`}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          <span className="text-gray-400">|</span>

          {/* BHASHINI Voice Assistant Trigger */}
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="px-2 py-0.5 bg-[#e67300] hover:bg-[#cc6600] text-white font-bold text-xs inline-flex items-center gap-1 border border-[#b45309]"
            title="BHASHINI Multilingual Voice Assistant"
          >
            <span>🎙️</span>
            <span>BHASHINI Voice</span>
          </button>

          <span className="text-gray-400">|</span>

          {/* Language Selector */}
          <div className="inline-flex items-center space-x-1">
            <label htmlFor="lang-select" className="font-semibold text-gray-600">Lang:</label>
            <select
              id="lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="border border-gray-400 bg-white px-1.5 py-0.5 text-xs font-bold text-[#002147]"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Government Portal Header Area */}
      <div className="px-5 py-3 flex flex-wrap justify-between items-center bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Emblem of India / Ashoka Stambh SVG Placeholder */}
          <div className="w-14 h-14 flex flex-col items-center justify-center border border-gray-300 bg-[#fbfbfb] p-1 text-center">
            <svg
              className="w-8 h-8 text-[#002147]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-4 4m4-4l4 4M5 10l7 3 7-3M5 15l7 3 7-3" />
            </svg>
            <span className="text-[8px] font-bold tracking-tight text-[#002147] uppercase leading-none mt-0.5">
              सत्यमेव जयते
            </span>
          </div>

          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-gray-600">
              {language === 'hi' ? 'शिक्षा मंत्रालय, भारत सरकार' : language === 'kn' ? 'ಶಿಕ್ಷಣ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ' : 'Ministry of Education, Government of India'}
            </div>
            <h1 className="text-[20px] font-bold text-[#002147] tracking-tight leading-tight m-0 p-0">
              {language === 'hi'
                ? 'अखिल भारतीय तकनीकी शिक्षा परिषद'
                : language === 'kn'
                ? 'ಅಖಿಲ ಭಾರತ ತಾಂತ್ರಿಕ ಶಿಕ್ಷಣ ಮಂಡಳಿ'
                : 'All India Council for Technical Education'}
            </h1>
            <div className="text-[13px] font-semibold text-[#800000]">
              Unified Case Coordination Radar & Grievance Monitoring Platform
            </div>
          </div>
        </div>

        {/* Prototype Notice & Role Switcher */}
        <div className="flex flex-col items-end space-y-1.5 mt-2 sm:mt-0">
          <div className="bg-[#fffbeb] border border-[#f59e0b] px-2.5 py-1 text-[11.5px] text-[#92400e] font-semibold">
            <span className="font-bold text-[#b45309]">Demonstration Prototype</span> | All records and institutions shown are synthetic.
          </div>

          <div className="flex items-center space-x-3 text-[12.5px]">
            <span className="text-gray-600">Logged in as:</span>
            <span className="font-bold text-[#002147] bg-[#f1f5f9] px-2 py-0.5 border border-gray-300">
              {currentUser.fullName} ({currentUser.role})
            </span>

            {/* Quick Demonstration Role Switcher */}
            <select
              value={currentUser.role}
              onChange={(e) => switchUser(e.target.value as any)}
              className="border border-[#002147] bg-white text-[#002147] font-bold text-xs px-2 py-0.5"
              title="Switch demo profile"
            >
              <option value="Officer">Role: Grievance Officer (Dr. Sharma)</option>
              <option value="Administrator">Role: System Admin (Sri Arvind Kumar)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Saffron-White-Green Tricolor Strip */}
      <div className="tricolor-ribbon"></div>
    </header>
  );
}
