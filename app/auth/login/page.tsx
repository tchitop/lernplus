'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Parameter aus URL lesen
  const emailParam = searchParams.get('email');
  const passwordParam = searchParams.get('password');

  // Setze Werte wenn Parameter existieren
  useEffect(() => {
    if (emailParam) setEmail(emailParam);
    if (passwordParam) {
      setPassword(passwordParam);
      // Entferne Passwort aus URL nach dem Laden
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('password');
      router.replace(`${pathname}?${newParams.toString()}`);
    }
  }, [emailParam, passwordParam, pathname, router, searchParams]);

  // Update URL bei Email-Änderungen
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    email ? newParams.set('email', email) : newParams.delete('email');
    router.replace(`${pathname}?${newParams.toString()}`);
  }, [email, pathname, router, searchParams]);

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      const userRole = localStorage.getItem('userRole') || 'student';
      router.push(`/dashboard/${userRole}`);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const demoUsers = [
        { email: 'demo@lernplus.de', password: 'password', role: 'student' },
        { email: 'lehrer@lernplus.de', password: 'password', role: 'teacher' },
        { email: 'admin@lernplus.de', password: 'password', role: 'admin' }
      ];
      
      const user = demoUsers.find(user => user.email === email && user.password === password);
      
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userEmail', user.email);
        
        if (rememberMe) {
          localStorage.setItem('rememberLogin', 'true');
        }
        
        // Weiterleitung mit Email-Parameter
        const newParams = new URLSearchParams();
        newParams.set('email', email);
        router.push(`/dashboard/${user.role}?${newParams.toString()}`);
      } else {
        setErrorMessage('Ungültige E-Mail oder Passwort.');
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage('Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="p-8 md:p-12 w-full md:w-1/2">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Willkommen zurück</h1>
            <p className="text-gray-600">Melde dich an, um mit dem Lernen fortzufahren</p>
          </div>

          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-700">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
                  placeholder="deine@email.de"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Passwort
                </label>
                <Link href="/auth/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  Passwort vergessen?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-600"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Angemeldet bleiben
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" /> 
                  Anmelden...
                </>
              ) : (
                <>
                  Anmelden
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Noch kein Konto?{' '}
              <Link href="/auth/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Kostenlos registrieren
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-700 font-medium mb-2">Demo-Zugangsdaten:</p>
            <ul className="text-xs text-indigo-600 space-y-1">
              <li>Schüler: demo@lernplus.de / password</li>
              <li>Lehrer: lehrer@lernplus.de / password</li>
              <li>Admin: admin@lernplus.de / password</li>
            </ul>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="hidden md:block w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 p-12 text-white">
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6">Mit LernPlus mehr erreichen</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base">Personalisierte Lernempfehlungen</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>


                  <p className="ml-3 text-base">Sofortiges KI-gestütztes Feedback</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base">Detaillierte Fortschrittsanalyse</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                    <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base">Zugang zu tausenden Übungsaufgaben</p>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 rounded-xl bg-white/10 p-6 backdrop-blur-sm">
              <p className="italic text-indigo-100 mb-4">
                "LernPlus hat mir geholfen, meine Noten deutlich zu verbessern. Die KI-Unterstützung ist, als hätte man einen persönlichen Tutor."
              </p>
              <p className="font-medium">Julia S., Schülerin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}