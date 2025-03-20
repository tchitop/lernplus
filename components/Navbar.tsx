'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, User, LogIn, BookOpen, Award, Settings } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isSubjectsOpen, setIsSubjectsOpen] = useState<boolean>(false);
  
  // Placeholder for auth state (replace with your auth system)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('student');

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle for mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  // Toggle for profile dropdown
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  // Toggle for subjects dropdown in mobile
  const toggleSubjects = () => {
    setIsSubjectsOpen(!isSubjectsOpen);
  };

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isProfileOpen && !target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  return (
    <nav 
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-md text-gray-800' : 'bg-transparent text-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className={`rounded-lg p-1 ${isScrolled ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}>
              <BookOpen className="h-6 w-6" />
            </div>
            <span className={`text-2xl font-bold ${isScrolled ? 'text-indigo-600' : 'text-white'}`}>
              LernPlus
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg ${
                isScrolled 
                  ? 'hover:bg-gray-100 text-gray-700' 
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              Startseite
            </Link>
            
            {/* Subjects dropdown */}
            <div className="relative group">
              <button 
                className={`flex items-center px-4 py-2 rounded-lg ${
                  isScrolled 
                    ? 'hover:bg-gray-100 text-gray-700 group-hover:bg-gray-100' 
                    : 'hover:bg-white/10 text-white group-hover:bg-white/10'
                }`}
              >
                Klassenstufen <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 z-10 hidden group-hover:block bg-white rounded-lg shadow-lg p-2 w-64 text-gray-800 border border-gray-100">
                <div className="grid grid-cols-2 gap-1">
                  <Link href="/classes/5-6" className="flex items-center p-3 rounded-lg hover:bg-indigo-50">
                    <span className="text-lg mr-2">📊</span>
                    <span>Klasse 5-6</span>
                  </Link>
                  <Link href="/classes/7-8" className="flex items-center p-3 rounded-lg hover:bg-indigo-50">
                    <span className="text-lg mr-2">📝</span>
                    <span>Klasse 7-8</span>
                  </Link>
                  <Link href="/classes/9-10" className="flex items-center p-3 rounded-lg hover:bg-indigo-50">
                    <span className="text-lg mr-2">🌍</span>
                    <span>Klasse 9-10</span>
                  </Link>
                  <Link href="/classes/oberstufe" className="flex items-center p-3 rounded-lg hover:bg-indigo-50">
                    <span className="text-lg mr-2">💻</span>
                    <span>Oberstufe</span>
                  </Link>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <Link href="/subjects" className="block p-3 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg">
                    Alle Klassen
                  </Link>
                </div>
              </div>
            </div>
            
            <Link 
              href="/about" 
              className={`px-4 py-2 rounded-lg ${
                isScrolled 
                  ? 'hover:bg-gray-100 text-gray-700' 
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              Über uns
            </Link>
            
            <Link 
              href="/pricing" 
              className={`px-4 py-2 rounded-lg ${
                isScrolled 
                  ? 'hover:bg-gray-100 text-gray-700' 
                  : 'hover:bg-white/10 text-white'
              }`}
            >
              Preise
            </Link>
          </div>

          {/* Auth buttons or profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative profile-dropdown">
                <button 
                  onClick={toggleProfile}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'hover:bg-gray-100 text-gray-700' 
                      : 'hover:bg-white/10 text-white'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    isScrolled ? 'bg-indigo-100 text-indigo-600' : 'bg-white/20 text-white'
                  }`}>
                    <User className="h-5 w-5" />
                  </div>
                  <span>Mein Konto</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Profile dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-2 text-gray-800 border border-gray-100">
                    <div className="p-4 border-b border-gray-100">
                      <p className="font-medium">Max Mustermann</p>
                      <p className="text-sm text-gray-500">max@example.com</p>
                    </div>
                    <Link 
                      href={userRole === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'} 
                      className="flex items-center p-3 rounded-lg hover:bg-indigo-50"
                    >
                      <Award className="mr-3 h-5 w-5 text-indigo-600" />
                      <span>Dashboard</span>
                    </Link>
                    <Link href="/profile" className="flex items-center p-3 rounded-lg hover:bg-indigo-50">
                      <User className="mr-3 h-5 w-5 text-indigo-600" />
                      <span>Profil bearbeiten</span>
                    </Link>
                    <Link href="/settings" className="flex items-center p-3 rounded-lg hover:bg-indigo-50">
                      <Settings className="mr-3 h-5 w-5 text-indigo-600" />
                      <span>Einstellungen</span>
                    </Link>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full mt-2 p-3 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Abmelden
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/auth/login" 
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'text-indigo-600 hover:bg-indigo-50' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  <span>Anmelden</span>
                </Link>
                <Link 
                  href="/auth/register" 
                  className={`px-4 py-2 rounded-lg ${
                    isScrolled 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-white text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  Registrieren
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className={`p-2 rounded-lg ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-white rounded-lg shadow-lg mt-2 border border-gray-100 text-gray-800 animate-fadeIn">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Startseite
              </Link>
              
              {/* Subjects expandable section */}
              <div className="relative">
                <button 
                  onClick={toggleSubjects}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-indigo-50"
                >
                  <span>Fächer</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isSubjectsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isSubjectsOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    <Link
                      href="/subjects/mathematik"
                      className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg mr-2">📊</span>
                      <span>Mathematik</span>
                    </Link>
                    <Link
                      href="/subjects/deutsch"
                      className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg mr-2">📝</span>
                      <span>Deutsch</span>
                    </Link>
                    <Link
                      href="/subjects/englisch"
                      className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg mr-2">🌍</span>
                      <span>Englisch</span>
                    </Link>
                    <Link
                      href="/subjects/informatik"
                      className="flex items-center px-4 py-2 rounded-lg hover:bg-indigo-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg mr-2">💻</span>
                      <span>Informatik</span>
                    </Link>
                    <Link
                      href="/subjects"
                      className="px-4 py-2 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Alle Fächer anzeigen
                    </Link>
                  </div>
                )}
              </div>
              
              <Link
                href="/about"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Über uns
              </Link>
              
              <Link
                href="/pricing"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Preise
              </Link>
              
              <div className="border-t border-gray-100 my-2 pt-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      href={userRole === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'}
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Award className="mr-3 h-5 w-5 text-indigo-600" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="mr-3 h-5 w-5 text-indigo-600" />
                      <span>Profil bearbeiten</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="mr-3 h-5 w-5 text-indigo-600" />
                      <span>Einstellungen</span>
                    </Link>
                    <button 
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsMenuOpen(false);
                      }}
                      className="w-full mt-2 p-3 text-center bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                    >
                      Abmelden
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="mr-3 h-5 w-5 text-indigo-600" />
                      <span>Anmelden</span>
                    </Link>
                    <Link
                      href="/auth/register"
                      className="flex items-center px-4 py-3 mt-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Registrieren</span>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </nav>
  );
}