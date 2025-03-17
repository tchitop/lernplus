'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // Placeholder für Authentifizierungsstatus (später durch echte Auth ersetzen)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // Placeholder für Nutzerrolle (später durch echte Auth ersetzen)
  const [userRole, setUserRole] = useState<string>('student'); // 'student', 'teacher', 'volunteer', 'moderator'

  return (
    <nav className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo und Titel */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">LernPlus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-indigo-200">Startseite</Link>
            <div className="relative group">
              <button className="flex items-center hover:text-indigo-200">
                Fächer <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute z-10 hidden group-hover:block bg-white text-gray-800 shadow-lg rounded-md p-2 w-48">
                <Link href="/subjects/mathematik" className="block px-4 py-2 hover:bg-indigo-100 rounded">Mathematik</Link>
                <Link href="/subjects/deutsch" className="block px-4 py-2 hover:bg-indigo-100 rounded">Deutsch</Link>
                <Link href="/subjects/englisch" className="block px-4 py-2 hover:bg-indigo-100 rounded">Englisch</Link>
                <Link href="/subjects/naturwissenschaften" className="block px-4 py-2 hover:bg-indigo-100 rounded">Naturwissenschaften</Link>
              </div>
            </div>
            
            {isLoggedIn ? (
              <>
                <Link 
                  href={userRole === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'} 
                  className="hover:text-indigo-200"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-md"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hover:text-indigo-200">Anmelden</Link>
                <Link href="/auth/register" className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 rounded-md">
                  Registrieren
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
          <div className="md:hidden py-4">
            <Link href="/" className="block py-2 hover:text-indigo-200">Startseite</Link>
            <div className="py-2">
              <button 
                onClick={() => {}} 
                className="flex items-center hover:text-indigo-200"
              >
                Fächer <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="pl-4 mt-2 space-y-2">
                <Link href="/subjects/mathematik" className="block hover:text-indigo-200">Mathematik</Link>
                <Link href="/subjects/deutsch" className="block hover:text-indigo-200">Deutsch</Link>
                <Link href="/subjects/englisch" className="block hover:text-indigo-200">Englisch</Link>
                <Link href="/subjects/naturwissenschaften" className="block hover:text-indigo-200">Naturwissenschaften</Link>
              </div>
            </div>
            
            {isLoggedIn ? (
              <>
                <Link 
                  href={userRole === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'} 
                  className="block py-2 hover:text-indigo-200"
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => setIsLoggedIn(false)} 
                  className="block w-full text-left py-2 hover:text-indigo-200"
                >
                  Abmelden
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block py-2 hover:text-indigo-200">Anmelden</Link>
                <Link href="/auth/register" className="block py-2 hover:text-indigo-200">Registrieren</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}