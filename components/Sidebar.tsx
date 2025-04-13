'use client';

import { useState, useEffect } from 'react';
import { X, Calendar, MessageSquare, ChevronRight, ChevronLeft, Send } from 'lucide-react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  userRole: string;
}

export default function Sidebar({ isOpen, toggleSidebar, userRole }: SidebarProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'calendar'>('chat');
  const [nextMessageId, setNextMessageId] = useState(4)
  
  // Sample calendar events
  const [events, setEvents] = useState([
    { id: 1, title: 'Mathestunde', date: '2025-04-15', time: '14:00' },
    { id: 2, title: 'Biologie Nachhilfe', date: '2025-04-16', time: '16:30' },
    { id: 3, title: 'Deutschprüfung', date: '2025-04-20', time: '09:00' },
    { id: 4, title: 'Physik Projektabgabe', date: '2025-04-22', time: '12:00' },
  ]);

  // State for chat functionality
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hallo! Wie kann ich dir heute bei deinem Lernen helfen?' },
    { id: 2, sender: 'user', text: 'Ich brauche Hilfe bei Mathematik, Funktionen.' },
    { id: 3, sender: 'ai', text: 'Gerne! Welchen Aspekt von Funktionen möchtest du verstehen?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // State for event modal
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: ''
  });

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

  // Function to add new calendar event
  const addCalendarEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
      const eventToAdd = {
        id: newId,
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time
      };
      
      setEvents([...events, eventToAdd]);
      
      // Reset form and close modal
      setNewEvent({ title: '', date: '', time: '' });
      setShowModal(false);
    }
  };

// Function to send a new chat message
const sendMessage = () => {
  if (newMessage.trim()) {
    // Aktuelle ID verwenden und dann inkrementieren
    const currentId = nextMessageId;
    setNextMessageId(nextMessageId + 1);
    
    const messageToAdd = {
      id: currentId,
      sender: 'user',
      text: newMessage.trim()
    };
    
    setChatMessages([...chatMessages, messageToAdd]);
    
    // Reset input
    setNewMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      // Inkrementierte ID für die Antwort verwenden
      const aiResponse = {
        id: nextMessageId + 1, // Verwende die nächste ID
        sender: 'ai',
        text: 'Ich habe deine Nachricht erhalten. Wie kann ich dir weiterhelfen?'
      };
      
      setChatMessages(prevMessages => [...prevMessages, aiResponse]);
      // ID für die nächste Nachricht aktualisieren
      setNextMessageId(nextMessageId + 2);
    }, 1000);
  }
};

  // Handle key press for chat input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Schreibe deine Frage..." 
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-400"
                  />
                  <button 
                    className="ml-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    onClick={sendMessage}
                  >
                    <Send className="h-5 w-5" />
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
                <button 
                  className="text-sm text-indigo-600 hover:text-indigo-800" 
                  onClick={() => setShowModal(true)}
                >
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
            </div>
          )}
        </div>
      </div>

      {/* Custom Modal for Adding Events - without Flowbite */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 "
              onClick={() => setShowModal(false)}
            ></div>

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                      Neuen Termin hinzufügen
                    </h3>
                    <div className="mt-2 space-y-4">
                      <div>
                        <label htmlFor="event-title" className="block text-sm font-medium text-gray-700">Titel</label>
                        <input
                          type="text"
                          id="event-title"
                          value={newEvent.title}
                          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-gray-400"
                          placeholder="Terminbezeichnung eingeben"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="event-date" className="block text-sm font-medium text-gray-700">Datum</label>
                        <input
                          type="date"
                          id="event-date"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-gray-300"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="event-time" className="block text-sm font-medium text-gray-700">Uhrzeit</label>
                        <input
                          type="time"
                          id="event-time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border text-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={addCalendarEvent}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Speichern
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}