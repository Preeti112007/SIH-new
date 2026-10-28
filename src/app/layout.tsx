import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import VoiceAssistantModal from '@/components/VoiceAssistantModal';
import ComplaintChatbot from '@/components/ComplaintChatbot';

export const metadata: Metadata = {
  title: 'AICTE Unified Case Coordination Radar',
  description:
    'Explainable Institution Identity Matching, Cross-Bureau Case Intelligence, and Multilingual Grievance Support — All India Council for Technical Education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#f4f6f8] text-[#111827]">
        <AppProvider>
          <Header />
          <Navigation />
          <main id="main-content" className="flex-1 max-w-[1400px] w-full mx-auto px-4 py-4">
            {children}
          </main>
          <Footer />
          <VoiceAssistantModal />
          <ComplaintChatbot />
        </AppProvider>
      </body>
    </html>
  );
}
