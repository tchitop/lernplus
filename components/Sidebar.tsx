'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  BarChart, 
  BookOpen, 
  Calendar, 
  Menu, 
  X,
  FileText, 
  Home, 
  MessageSquare,
  Settings, 
  Star, 
  Clock,
  Lightbulb,
  Users,
  Activity,
  Send,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  userRole?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

type ChatType = 'homework' | 'explain' | 'general';

export default function Sidebar({ isOpen, toggleSidebar, userRole = 'student' }: SidebarProps) {
  const [activeChat, setActiveChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hallo! Wie kann ich dir heute helfen?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [chatType, setChatType] = useState<ChatType>('general');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Close dropdown and sidebar when clicking outside on mobile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close dropdown if clicked outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }

      // Close sidebar on mobile when clicking outside
      if (
        window.innerWidth < 768 && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) && 
        isOpen
      ) {
        toggleSidebar();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setChatMessages([...chatMessages, { role: 'user', content: inputMessage }]);
    
    setTimeout(() => {
      let response = '';
      
      switch (chatType) {
        case 'homework':
          response = 'Ich helfe dir gerne mit deinen Hausaufgaben. Kannst du mir mehr Details dazu geben?';
          break;
        case 'explain':
          response = 'Ich erkläre dir gerne dieses Konzept. Was möchtest du genau verstehen?';
          break;
        default:
          response = 'Danke für deine Nachricht! Wie kann ich dir weiterhelfen?';
      }
      
      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
    
    setInputMessage('');
  };

  const handleChatTypeChange = (type: ChatType) => {
    setChatType(type);
    setChatMessages([
      { 
        role: 'assistant', 
        content: type === 'homework' 
          ? 'Wie kann ich dir bei deinen Hausaufgaben helfen?' 
          : type === 'explain'
          ? 'Welches Konzept soll ich dir erklären?'
          : 'Hallo! Wie kann ich dir heute helfen?'
      }
    ]);
    setDropdownOpen(false);
  };

  const getChatTypeLabel = (type: ChatType): { label: string, icon: JSX.Element } => {
    switch (type) {
      case 'homework':
        return { 
          label: 'Hausaufgabenhilfe', 
          icon: <Clock className="h-4 w-4 mr-2 text-indigo-500" /> 
        };
      case 'explain':
        return { 
          label: 'Konzepte erklären', 
          icon: <Lightbulb className="h-4 w-4 mr-2 text-indigo-500" /> 
        };
      default:
        return { 
          label: 'Allgemeiner Chat', 
          icon: <MessageSquare className="h-4 w-4 mr-2 text-indigo-500" /> 
        };
    }
  };

  const currentChatType = getChatTypeLabel(chatType);

  return (
    <>
      {/* Mobile Navbar Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={toggleSidebar}
          className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-700 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden" 
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transition-transform duration-300
          md:static md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isOpen ? 'pt-16' : ''}
        `}
      >
        <div className="h-full flex flex-col justify-between overflow-y-auto">
          {/* Close button for mobile */}
          <button 
            onClick={toggleSidebar}
            className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <X size={24} />
          </button>

          {/* Navigation links */}
          <div className="p-4 space-y-2">
            <Link 
              href="/dashboard" 
              className="flex items-center text-gray-700 hover:bg-indigo-50 rounded-lg p-3 transition-colors"
            >
              <Home className="h-5 w-5 text-indigo-600" />
              <span className="ml-3">Dashboard</span>
            </Link>

            <Link 
              href="/subjects" 
              className="flex items-center text-gray-700 hover:bg-indigo-50 rounded-lg p-3 transition-colors"
            >
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <span className="ml-3">Fächer</span>
            </Link>

            <Link 
              href="/assignments" 
              className="flex items-center text-gray-700 hover:bg-indigo-50 rounded-lg p-3 transition-colors"
            >
              <FileText className="h-5 w-5 text-indigo-600" />
              <span className="ml-3">Aufgaben</span>
            </Link>

            {userRole === 'student' && (
              <>
                <Link 
                  href="/progress" 
                  className="flex items-center text-gray-700 hover:bg-indigo-50 rounded-lg p-3 transition-colors"
                >
                  <BarChart className="h-5 w-5 text-indigo-600" />
                  <span className="ml-3">Fortschritt</span>
                </Link>

                <Link 
                  href="/achievements" 
                  className="flex items-center text-gray-700 hover:bg-indigo-50 rounded-lg p-3 transition-colors"
                >
                  <Star className="h-5 w-5 text-indigo-600" />
                  <span className="ml-3">Erfolge</span>
                </Link>
              </>
            )}

            {userRole === 'teacher' && (
              <>
                <Link 
                  href="/students" 
                  className="flex items-center text-gray-700 hover:bg-indigo-50 rounded-lg p-3 transition-colors"
                >
                  <Users className="h-5 w-5 text-indigo-600" />
                  <span className="ml-3">Schüler</span>
                </Link>

                <Link 
                  href="/analytics" 
                  className="flex items-center text-gray-700 hover:bg-indigo-50 rounded-lg p-3 transition-colors"
                >
                  <Activity className="h-5 w-5 text-indigo-600" />
                  <span className="ml-3">Statistiken</span>
                </Link>
              </>
            )}

            <Link 
              href="/calendar" 
              className="flex items-center text-gray-700 hover:bg-indigo-50 rounded-lg p-3 transition-colors"
            >
              <Calendar className="h-5 w-5 text-indigo-600" />
              <span className="ml-3">Kalender</span>
            </Link>
            
            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={() => setActiveChat(!activeChat)}
                className="flex items-center w-full text-left text-gray-700 hover:bg-indigo-50 rounded-lg p-3 transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-indigo-600" />
                <span className="ml-3">KI-Lernassistent</span>
                {activeChat ? 
                  <ChevronDown className="h-4 w-4 ml-auto rotate-180" /> : 
                  <ChevronDown className="h-4 w-4 ml-auto" />
                }
              </button>
              
              {activeChat && (
                <div className="mt-2">
                  {/* Chat type dropdown */}
                  <div className="px-2 mb-2 relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full flex items-center justify-between text-sm p-2 border rounded-lg bg-white hover:bg-gray-50 transition-colors text-gray-600"
                    >
                      <div className="flex items-center">
                        {currentChatType.icon}
                        <span>{currentChatType.label}</span>
                      </div>
                      <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'transform rotate-180' : ''}`} />
                    </button>
                    
                    {dropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg text-gray-500" >
                        <button 
                          onClick={() => handleChatTypeChange('homework')}
                          className="w-full flex items-center p-2 text-sm hover:bg-indigo-50 transition-colors"
                        >
                          <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                          <span>Hausaufgabenhilfe</span>
                        </button>
                        <button 
                          onClick={() => handleChatTypeChange('explain')}
                          className="w-full flex items-center p-2 text-sm hover:bg-indigo-50 transition-colors"
                        >
                          <Lightbulb className="h-4 w-4 mr-2 text-indigo-500" />
                          <span>Konzepte erklären</span>
                        </button>
                        <button 
                          onClick={() => handleChatTypeChange('general')}
                          className="w-full flex items-center p-2 text-sm hover:bg-indigo-50 transition-colors"
                        >
                          <MessageSquare className="h-4 w-4 mr-2 text-indigo-500" />
                          <span>Allgemeiner Chat</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Chat messages container */}
                  <div className="bg-gray-50 rounded-lg mx-2 p-2 h-48 overflow-y-auto mb-2">
                    {chatMessages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`mb-2 p-2 rounded-lg max-w-56 ${
                          msg.role === 'user' 
                            ? 'bg-indigo-100 text-gray-800 ml-auto' 
                            : 'bg-white border border-gray-200 text-gray-700'
                        }`}
                      >
                        <p className="text-xs">{msg.content}</p>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Chat input */}
                  <div className="px-2 flex">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Nachricht schreiben..."
                      className="flex-1 text-xs p-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-gray-500"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="bg-indigo-600 text-white p-2 rounded-r-lg disabled:bg-indigo-300"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                  
                  {/* Expand button */}
                  <div className="mt-2 text-center">
                    <Link 
                      href={`/chat/${chatType}`}
                      className="text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      Chat in vollem Fenster öffnen
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Settings at the bottom */}
          <div className="p-4 border-t border-gray-100">
            <Link 
              href="/settings" 
              className="flex items-center text-gray-700 hover:bg-indigo-50 rounded-lg p-3 transition-colors"
            >
              <Settings className="h-5 w-5 text-indigo-600" />
              <span className="ml-3">Einstellungen</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}