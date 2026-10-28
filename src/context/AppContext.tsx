'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  username: string;
  fullName: string;
  designation: string;
  bureau: string;
  role: 'Officer' | 'Administrator';
  email: string;
  phone: string;
}

export const DEMO_USERS: Record<string, UserProfile> = {
  officer: {
    username: 'dr.sharma',
    fullName: 'Dr. R. K. Sharma',
    designation: 'Joint Director (PGRC & Case Coordination)',
    bureau: 'PGRC',
    role: 'Officer',
    email: 'rk.sharma@aicte-india.gov.in',
    phone: '+91-11-29581014',
  },
  admin: {
    username: 'arvind.admin',
    fullName: 'Sri Arvind Kumar',
    designation: 'Director (Administration & Governance)',
    bureau: 'Administration',
    role: 'Administrator',
    email: 'arvind.kumar@aicte-india.gov.in',
    phone: '+91-11-29581002',
  },
};

interface AppContextType {
  currentUser: UserProfile;
  switchUser: (role: 'Officer' | 'Administrator') => void;
  fontSize: number; // in percentage, e.g. 100, 110, 90
  setFontSize: (size: number) => void;
  language: 'en' | 'hi' | 'kn';
  setLanguage: (lang: 'en' | 'hi' | 'kn') => void;
  voiceModalOpen: boolean;
  setVoiceModalOpen: (open: boolean) => void;
  dossierModalOpen: boolean;
  setDossierModalOpen: (open: boolean) => void;
  maskSensitiveData: (value: string, type?: 'phone' | 'email') => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS.officer);
  const [fontSize, setFontSizeState] = useState<number>(100);
  const [language, setLanguage] = useState<'en' | 'hi' | 'kn'>('en');
  const [voiceModalOpen, setVoiceModalOpen] = useState<boolean>(false);
  const [dossierModalOpen, setDossierModalOpen] = useState<boolean>(false);

  const switchUser = (role: 'Officer' | 'Administrator') => {
    if (role === 'Administrator') {
      setCurrentUser(DEMO_USERS.admin);
    } else {
      setCurrentUser(DEMO_USERS.officer);
    }
  };

  const setFontSize = (size: number) => {
    setFontSizeState(size);
    if (typeof document !== 'undefined') {
      document.documentElement.style.fontSize = `${(size / 100) * 16}px`;
    }
  };

  const maskSensitiveData = (value: string, type: 'phone' | 'email' = 'phone'): string => {
    if (!value) return '';
    // Administrators can see unmasked data
    if (currentUser.role === 'Administrator') {
      return value;
    }

    if (type === 'phone') {
      // Mask middle digits: +91-98*****399
      const cleaned = value.replace(/\s+/g, '');
      if (cleaned.length > 7) {
        const start = cleaned.slice(0, 7);
        const end = cleaned.slice(-3);
        return `${start}*****${end}`;
      }
      return '*********';
    }

    if (type === 'email') {
      const parts = value.split('@');
      if (parts.length === 2) {
        const name = parts[0];
        const maskedName = name.length > 2 ? `${name.slice(0, 2)}***` : '***';
        return `${maskedName}@${parts[1]}`;
      }
      return '***@***';
    }

    return value;
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        switchUser,
        fontSize,
        setFontSize,
        language,
        setLanguage,
        voiceModalOpen,
        setVoiceModalOpen,
        dossierModalOpen,
        setDossierModalOpen,
        maskSensitiveData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
