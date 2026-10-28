'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { SupportedLanguage } from '@/lib/translations';

export default function VoiceAssistantModal() {
  const { voiceModalOpen, setVoiceModalOpen, language, setLanguage } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(language);
  const [statusMessage, setStatusMessage] = useState('Microphone ready. Click "Start Recording" to speak.');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  useEffect(() => {
    if (!voiceModalOpen) {
      if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    }
  }, [voiceModalOpen, isListening]);

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatusMessage('Web Speech API is not supported in this browser. Please type directly into the input area below.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = true;
      recognition.interimResults = true;

      // Map language code for all supported Indian languages
      const langMap: Record<SupportedLanguage, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        kn: 'kn-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        mr: 'mr-IN',
      };
      recognition.lang = langMap[selectedLanguage] || 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setStatusMessage(`Listening in ${selectedLanguage.toUpperCase()}... Speak clearly.`);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentTranscript.trim());
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setStatusMessage(`Microphone notice: ${event.error}. You can also type or edit text manually.`);
      };

      recognition.onend = () => {
        setIsListening(false);
        setStatusMessage('Recording ended. You may review and edit the transcribed text.');
      };

      recognition.start();
    } catch (err: any) {
      console.error('Recognition error:', err);
      setIsListening(false);
      setStatusMessage('Unable to access microphone. Please verify device permissions.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const insertSampleVoiceQuery = (text: string) => {
    setTranscript(text);
    setStatusMessage('Sample speech transcript loaded. Ready for field insertion.');
  };

  if (!voiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white border-2 border-[#002147] w-full max-w-2xl shadow-xl">
        {/* Header */}
        <div className="bg-[#002147] text-white px-4 py-3 flex justify-between items-center border-b border-[#001733]">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎙️</span>
            <div>
              <h3 className="text-[16px] font-bold tracking-tight">
                BHASHINI-Compatible Multilingual Voice Assistant
              </h3>
              <p className="text-[11px] text-gray-300">
                Voice Input & Redressal Speech Pipeline for Grievance Officers
              </p>
            </div>
          </div>
          <button
            onClick={() => setVoiceModalOpen(false)}
            className="text-white hover:text-[#ffdd99] text-xl font-bold px-2"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Service Status Indicator */}
          <div className="bg-[#f0f9ff] border border-[#0284c7] p-2.5 text-[12px] flex items-center justify-between">
            <div>
              <span className="font-bold text-[#0369a1]">Speech Engine:</span>{' '}
              <span className="text-gray-800">
                Web Speech API (BHASHINI Gateway Adapter Fallback - Sandbox Ready)
              </span>
            </div>
            <span className="bg-[#0284c7] text-white text-[10px] px-2 py-0.5 font-bold uppercase">
              Online
            </span>
          </div>

          {/* Controls: Language Selector & Mic Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f8fafc] p-3 border border-gray-300">
            <div className="flex items-center space-x-2">
              <label className="text-[13px] font-bold text-[#002147]">Language:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value as any);
                  setLanguage(e.target.value as any);
                }}
                disabled={isListening}
                className="gov-select text-sm font-semibold"
              >
                <option value="en">English (Indian Accent - en-IN)</option>
                <option value="hi">हिन्दी (Hindi - hi-IN)</option>
                <option value="kn">ಕನ್ನಡ (Kannada - kn-IN)</option>
                <option value="ta">தமிழ் (Tamil - ta-IN)</option>
                <option value="te">తెలుగు (Telugu - te-IN)</option>
                <option value="mr">मराठी (Marathi - mr-IN)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              {!isListening ? (
                <button
                  onClick={startListening}
                  className="gov-btn-saffron px-4 py-1.5 font-bold text-sm"
                >
                  <span>⏺</span> Start Recording
                </button>
              ) : (
                <button
                  onClick={stopListening}
                  className="gov-btn-danger px-4 py-1.5 font-bold text-sm animate-pulse"
                >
                  <span>⏹</span> Stop Recording
                </button>
              )}
            </div>
          </div>

          {/* Status Message */}
          <div className="text-[12px] italic text-gray-600 bg-gray-50 px-2 py-1 border border-gray-200">
            {statusMessage}
          </div>

          {/* Transcription Textarea */}
          <div>
            <label className="block text-[13px] font-bold text-[#002147] mb-1">
              Transcribed Text (Editable):
            </label>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={4}
              placeholder="Spoken words will appear here in real-time. You can also edit or paste text directly..."
              className="w-full border border-gray-400 p-2.5 text-[13.5px] bg-white focus:outline-none focus:ring-1 focus:ring-[#002147]"
            />
          </div>

          {/* Sample Prompts for Quick Demo Testing */}
          <div className="bg-[#fdfaf5] border border-[#e5d5be] p-2.5 text-[12px]">
            <span className="font-bold text-[#8c5208] block mb-1">
              Quick Synthetic Voice Demonstration Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() =>
                  insertSampleVoiceQuery(
                    'Search for ABC Institute of Technology Koramangala Bengaluru related complaints'
                  )
                }
                className="bg-white border border-gray-300 hover:bg-gray-100 px-2 py-0.5 text-xs text-gray-700 font-semibold"
              >
                EN: Search ABC Institute
              </button>
              <button
                onClick={() =>
                  insertSampleVoiceQuery(
                    'एबीसी इंजीनियरिंग कॉलेज कोरमंगला की फीस विसंगति की जांच रिपोर्ट प्रस्तुत करें'
                  )
                }
                className="bg-white border border-gray-300 hover:bg-gray-100 px-2 py-0.5 text-xs text-gray-700 font-semibold"
              >
                HI: फीस विसंगति जांच (ABC College)
              </button>
              <button
                onClick={() =>
                  insertSampleVoiceQuery(
                    'ಬೆಂಗಳೂರು ಕೋರಮಂಗಲ ಎಬಿಸಿ ಇನ್‌ಸ್ಟಿಟ್ಯೂಟ್ ಶುಲ್ಕ ದೂರುಗಳ ವಿವರಣೆ ನೀಡಿ'
                  )
                }
                className="bg-white border border-gray-300 hover:bg-gray-100 px-2 py-0.5 text-xs text-gray-700 font-semibold"
              >
                KN: ಶುಲ್ಕ ದೂರು ವಿವರಣೆ (Kannada)
              </button>
            </div>
          </div>

          {/* Action Buttons: Field Mapping */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-gray-300">
            <span className="text-[12px] text-gray-500">
              Characters: {transcript.length} | Words: {transcript ? transcript.trim().split(/\s+/).length : 0}
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(transcript);
                  alert('Transcript copied to clipboard!');
                }}
                disabled={!transcript}
                className="gov-btn-secondary text-xs"
              >
                Copy Text
              </button>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    const searchInput = document.getElementById('main-search-input') as HTMLInputElement;
                    if (searchInput) {
                      searchInput.value = transcript;
                      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                  }
                  setVoiceModalOpen(false);
                  alert(`Mapped transcribed speech to active search input: "${transcript}"`);
                }}
                disabled={!transcript}
                className="gov-btn-primary text-xs"
              >
                Apply to Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
