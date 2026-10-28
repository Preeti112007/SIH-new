'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const {
    currentUser,
    switchUser,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    language,
    setLanguage,
    setVoiceModalOpen,
    t,
  } = useApp();

  return (
    <header className="bg-white border-b border-gray-300 no-print">
      {/* Top Accessibility & Language Bar */}
      <div className="bg-[#f4f6f8] border-b border-gray-300 text-[12px] text-gray-700 px-4 py-1 flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-3">
          <a
            href="#main-content"
            className="text-[#002147] hover:underline font-bold focus:outline-none focus:ring-1 focus:ring-[#002147]"
          >
            {t.skipToMain}
          </a>
          <span className="text-gray-400">|</span>
          <button
            onClick={() => alert('Screen Reader Access Enabled. Layout conforms to GIGW accessibility standards.')}
            className="hover:underline text-gray-700"
          >
            {t.screenReader}
          </button>
        </div>

        <div className="flex items-center space-x-3">
          {/* Continuous Text Size Adjustments: A-, A (Reset), A+ */}
          <span className="font-semibold text-gray-600">{t.textSize}</span>
          <div className="inline-flex border border-gray-400 bg-white">
            <button
              onClick={decreaseFontSize}
              className="px-2 py-0.5 border-r border-gray-300 text-xs font-bold hover:bg-[#002147] hover:text-white transition-colors"
              title="Decrease Font Size (Click repeatedly to reduce)"
            >
              A−
            </button>
            <button
              onClick={resetFontSize}
              className={`px-2 py-0.5 border-r border-gray-300 text-xs font-bold ${fontSize === 100 ? 'bg-[#002147] text-white' : 'hover:bg-gray-100'}`}
              title="Reset to Normal Font Size (100%)"
            >
              A
            </button>
            <button
              onClick={increaseFontSize}
              className="px-2 py-0.5 text-xs font-bold hover:bg-[#002147] hover:text-white transition-colors"
              title="Increase Font Size (Click continuously to enlarge)"
            >
              A+
            </button>
          </div>
          {fontSize !== 100 && (
            <span className="text-[11px] text-gray-500 font-bold">({fontSize}%)</span>
          )}

          <span className="text-gray-400">|</span>

          {/* BHASHINI Voice Assistant Trigger */}
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="px-2 py-0.5 bg-[#e67300] hover:bg-[#cc6600] text-white font-bold text-xs inline-flex items-center gap-1 border border-[#b45309]"
            title="BHASHINI Multilingual Voice Assistant"
          >
            <span>🎙️</span>
            <span>{t.voiceAssistant}</span>
          </button>

          <span className="text-gray-400">|</span>

          {/* Language Selector: Explicitly labelled "Language:" not "Lang" */}
          <div className="inline-flex items-center space-x-1">
            <label htmlFor="lang-select" className="font-semibold text-gray-600">
              {t.languageLabel}
            </label>
            <select
              id="lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="border border-gray-400 bg-white px-1.5 py-0.5 text-xs font-bold text-[#002147]"
            >
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="hi">हिन्दी (Hindi)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Government Portal Header Area */}
      <div className="px-5 py-3 flex flex-wrap justify-between items-center bg-white border-b border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Emblem of India / Ashoka Stambh Seal */}
          <div className="w-14 h-14 flex flex-col items-center justify-center border border-gray-400 bg-[#fafafa] p-1 text-center shrink-0">
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
              {t.ministryName}
            </div>
            <h1 className="text-[20px] font-bold text-[#002147] tracking-tight leading-tight m-0 p-0">
              {t.aicteName}
            </h1>
            <div className="text-[13px] font-semibold text-[#800000]">
              {t.portalSubtitle}
            </div>
          </div>
        </div>

        {/* Prototype Notice & Role Switcher */}
        <div className="flex flex-col items-end space-y-1.5 mt-2 sm:mt-0">
          <div className="bg-[#fffbeb] border border-[#f59e0b] px-2.5 py-1 text-[11.5px] text-[#92400e] font-semibold">
            <span className="font-bold text-[#b45309]">{t.demoPrototypeNotice}</span> | {t.syntheticNotice}
          </div>

          <div className="flex items-center space-x-3 text-[12.5px]">
            <span className="text-gray-600">{t.loggedInAs}</span>
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
              <option value="Officer">{t.roleOfficer}</option>
              <option value="Administrator">{t.roleAdmin}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Saffron-White-Green Tricolor Strip */}
      <div className="tricolor-ribbon"></div>
    </header>
  );
}
