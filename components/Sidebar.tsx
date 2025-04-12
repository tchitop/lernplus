'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  userRole: string;
}

export default function Sidebar({ isOpen, toggleSidebar, userRole }: SidebarProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'calendar'>('chat');
  
  // Sample calendar events
  const [events, setEvents] = useState([
    { id: 1, title: 'Mathestunde', date: '2025-04-15', time: '14:00' },
    { id: 2, title: 'Biologie Nachhilfe', date: '2025-04-16', time: '16:30' },
    { id: 3, title: 'Deutschprüfung', date: '2025-04-20', time: '09:00' },
    { id: 4, title: 'Physik Projektabgabe', date: '2025-04-22', time: '12:00' },
  ]);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Group events by date
  const eventsByDate = events.reduce((groups, event) => {
    if (!groups[event.date]) {
      groups[event.date] = [];
    }
    groups[event.date].push(event);
    return groups;
  }, {} as Record<string, typeof events>);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    });
  };

  // Sample chat messages
  const chatMessages = [
    { id: 1, sender: 'ai', text: 'Hallo! Wie kann ich dir heute bei deinem Lernen helfen?' },
    { id: 2, sender: 'user', text: 'Ich brauche Hilfe bei Mathematik, Funktionen.' },
    { id: 3, sender: 'ai', text: 'Gerne! Welchen Aspekt von Funktionen möchtest du verstehen?' }
  ];

  return (
    <>
      {/* Mobile Toggle Button - only visible on mobile when sidebar is closed */}
      {isMobile && !isOpen && (
        <button 
          onClick={toggleSidebar}
          className="fixed bottom-4 left-4 z-40 bg-indigo-600 text-white p-3 rounded-full shadow-lg"
          aria-label="Open Sidebar"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar Container */}
      <div 
        className={`fixed z-30 top-16 bottom-0 transition-all duration-300 ${
          isMobile 
            ? isOpen 
              ? 'inset-0 top-16 bg-white' // Mobile open: full screen below navbar
              : '-left-full' // Mobile closed: off-screen
            : isOpen 
              ? 'left-0 w-64' // Desktop open: partial width
              : 'left-0 w-16' // Desktop closed: icon only
        } bg-white shadow-lg flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {(!isMobile || isOpen) && (
            <>
              <h2 className="font-bold text-lg text-indigo-600">
                {isOpen ? (activeTab === 'chat' ? 'KI-Lernassistent' : 'Terminkalender') : ''}
              </h2>
              <button 
                onClick={toggleSidebar} 
                className="p-1 rounded-lg hover:bg-gray-100"
                aria-label={isOpen ? "Minimize Sidebar" : "Expand Sidebar"}
              >
                {isMobile ? 
                  <X className="h-6 w-6 text-gray-700" /> : 
                  isOpen ? 
                    <ChevronLeft className="h-6 w-6 text-gray-700" /> : 
                    <ChevronRight className="h-6 w-6 text-gray-700" />
                }
              </button>
            </>
          )}
        </div>

        {/* Tab Navigation - only visible when expanded */}
        {isOpen && (
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center justify-center flex-1 py-3 ${
                activeTab === 'chat' 
                  ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              <span>KI-Chat</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`flex items-center justify-center flex-1 py-3 ${
                activeTab === 'calendar' 
                  ? 'border-b-2 border-indigo-600 text-indigo-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Calendar className="h-5 w-5 mr-2" />
              <span>Termine</span>
            </button>
          </div>
        )}

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Icon Only View (Desktop Collapsed) */}
          {!isOpen && !isMobile && (
            <div className="flex flex-col items-center py-4 space-y-6">
              <button 
                onClick={() => {
                  setActiveTab('chat');
                  toggleSidebar();
                }}
                className="p-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                aria-label="Open Chat"
              >
                <MessageSquare className="h-6 w-6" />
              </button>
              <button 
                onClick={() => {
                  setActiveTab('calendar');
                  toggleSidebar();
                }}
                className="p-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                aria-label="Open Calendar"
              >
                <Calendar className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Chat View */}
          {isOpen && activeTab === 'chat' && (
            <div className="flex flex-col h-full">
              <div className="flex-1 p-4 overflow-y-auto">
                {chatMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`mb-4 max-w-xs ${
                      message.sender === 'user' 
                        ? 'ml-auto bg-indigo-600 text-white' 
                        : 'mr-auto bg-gray-100 text-gray-800'
                    } rounded-lg p-3`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="Schreibe deine Frage..." 
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-400"
                  />
                  <button className="ml-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Calendar View */}
          {isOpen && activeTab === 'calendar' && (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-500">Kommende Termine</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  + Termin hinzufügen
                </button>
              </div>
              
              <div className="space-y-6">
                {Object.keys(eventsByDate).sort().map(date => (
                  <div key={date} className="space-y-2">
                    <h4 className="font-medium text-gray-500">{formatDate(date)}</h4>
                    {eventsByDate[date].map(event => (
                      <div 
                        key={event.id} 
                        className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-indigo-200 cursor-pointer"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium text-gray-500">{event.title}</h5>
                            <p className="text-sm text-gray-400">{event.time} Uhr</p>
                          </div>
                          <div className="text-sm text-indigo-600">Details</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Link
                  href="/calendar"
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <span>Vollständigen Kalender öffnen</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}