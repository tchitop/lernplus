import Link from 'next/link';
import { Mail, Phone, MapPin, ChevronRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white rounded-lg p-1 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold">LernPlus</span>
            </div>
            <p className="text-indigo-200">
              Unsere interaktive Lernplattform verbindet Schüler und Lehrer durch modernste KI-Technologie für personalisierte Lernwege und sofortiges Feedback.
            </p>
            
            {/* Social media */}
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" aria-label="Facebook" className="bg-indigo-800/40 hover:bg-indigo-700 p-2 rounded-full transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="bg-indigo-800/40 hover:bg-indigo-700 p-2 rounded-full transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="bg-indigo-800/40 hover:bg-indigo-700 p-2 rounded-full transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" aria-label="YouTube" className="bg-indigo-800/40 hover:bg-indigo-700 p-2 rounded-full transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-indigo-700 pb-2">Schnellzugriff</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/subjects" className="flex items-center hover:text-indigo-300 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Fächer entdecken</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center hover:text-indigo-300 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Über uns</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="flex items-center hover:text-indigo-300 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Preise & Pakete</span>
                </Link>
              </li>
              <li>
                <Link href="/blog" className="flex items-center hover:text-indigo-300 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Lern-Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/help" className="flex items-center hover:text-indigo-300 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Hilfe & Support</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Subjects */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-indigo-700 pb-2">Fächer</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/subjects/mathematik" className="flex items-center hover:text-indigo-300 transition-colors">
                  <span className="text-lg mr-2">📊</span>
                  <span>Mathematik</span>
                </Link>
              </li>
              <li>
                <Link href="/subjects/deutsch" className="flex items-center hover:text-indigo-300 transition-colors">
                  <span className="text-lg mr-2">📝</span>
                  <span>Deutsch</span>
                </Link>
              </li>
              <li>
                <Link href="/subjects/englisch" className="flex items-center hover:text-indigo-300 transition-colors">
                  <span className="text-lg mr-2">🌍</span>
                  <span>Englisch</span>
                </Link>
              </li>
              <li>
                <Link href="/subjects/informatik" className="flex items-center hover:text-indigo-300 transition-colors">
                  <span className="text-lg mr-2">💻</span>
                  <span>Informatik</span>
                </Link>
              </li>
              <li>
                <Link href="/subjects" className="text-indigo-300 hover:text-indigo-200 transition-colors mt-2 inline-block">
                  Alle Fächer anzeigen →
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-indigo-700 pb-2">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-indigo-300" />
                <div>
                  <p className="text-indigo-300">E-Mail:</p>
                  <a href="mailto:info@lernplus.de" className="hover:text-indigo-300 transition-colors">info@lernplus.de</a>
                </div>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 text-indigo-300" />
                <div>
                  <p className="text-indigo-300">Telefon:</p>
                  <a href="tel:+49123456789" className="hover:text-indigo-300 transition-colors">+49 123 456789</a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-indigo-300" />
                <div>
                  <p className="text-indigo-300">Adresse:</p>
                  <address className="not-italic">
                    Lernstraße 42<br />
                    10115 Berlin
                  </address>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-indigo-800 pt-8 pb-6">
          <div className="max-w-lg mx-auto">
            <h4 className="text-center text-lg font-semibold mb-4">Abonniere unseren Newsletter</h4>
            <p className="text-center text-indigo-200 mb-4">Erhalte Lerntipps, neue Funktionen und exklusive Angebote direkt in dein Postfach.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Deine E-Mail-Adresse" 
                className="flex-grow px-4 py-3 rounded-lg bg-indigo-800/50 border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-lg font-medium"
              >
                Abonnieren
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom links and copyright */}
        <div className="border-t border-indigo-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-indigo-300 text-sm">
          <div className="text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LernPlus. Alle Rechte vorbehalten.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link href="/terms" className="hover:text-white transition-colors">AGB</Link>
            <Link href="/imprint" className="hover:text-white transition-colors">Impressum</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Barrierefreiheit</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}