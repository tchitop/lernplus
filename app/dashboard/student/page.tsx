'use client';
import Link from 'next/link';
import { ChevronRight, Award, BadgeCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Student () {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [lastSubject, setLastSubject] = useState();

    // Check login status on component mount
    useEffect(() => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
    }, []);
  
    return (
        <div className="text-amber-100">
            {!isLoggedIn && (
                <div className='text-center justify-center flex flex-col'>
                    <div className='text-red-600'>Tut mir leid, du hast keinen Zugriff auf diese Seite.</div>
                </div>
            )}
            {isLoggedIn && (
                <section className="mb-12">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Vorschläge für dich</h1>
                    <p className="text-xl text-gray-600 mb-6">Setze dein Lernen fort oder starte etwas Neues.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <Link href="/classes/9-10/mathematik/geometrie" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg text-indigo-700 mb-2">Weiterlernen</h3>
                        <p className="text-gray-600 mb-4">Mache dort weiter, wo du aufgehört hast: Geometrie.</p>
                        <div className="flex justify-between items-center">
                        <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Mathematik</span>
                        <ChevronRight className="h-5 w-5 text-indigo-400" />
                        </div>
                    </Link>
                    <Link href="/classes/9-10/englisch" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg text-indigo-700 mb-2">Neues Wissen!</h3>
                        <p className="text-gray-600 mb-4">Erweitere deine Englischkenntnisse für die Klassen 9 und 10.</p>
                        <div className="flex justify-between items-center">
                        <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Englisch</span>
                        <ChevronRight className="h-5 w-5 text-indigo-400" />
                        </div>
                    </Link>
                    <Link href="/dashboard/mediaSearch?theme=faust" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg text-indigo-700 mb-2">Hol dir Lernmaterial</h3>
                        <p className="text-gray-600 mb-4">Suche dir Lernmaterial zu deinem aktuellen Deutsch-Thema "Faust".</p>
                        <div className="flex justify-between items-center">
                        <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Alle Lernmaterialien</span>
                        <ChevronRight className="h-5 w-5 text-indigo-400" />
                        </div>
                    </Link>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 my-10">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4 flex align-center"><Award className='mt-1.5'/>Statistiken</h1>
                    <p className="text-xl text-gray-600 mb-6">So hast du dich im letzten Monat geschlagen.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <Link href="/classes/9-10/mathematik/geometrie" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg text-indigo-700 mb-2 flex align-center"> Gelöste Aufgaben  <BadgeCheck className='mx-1 mt-1' /></h3>
                        <p className="text-gray-600 mb-4">Du hast diesen Monat bisher 49 Aufgaben in 7 verschiedenen Fächern gelöst.</p>
                        <div className="flex justify-between items-center">
                        <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Mathematik</span>
                        <ChevronRight className="h-5 w-5 text-indigo-400" />
                        </div>
                    </Link>
                    <Link href="/classes/9-10/englisch" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg text-indigo-700 mb-2 flex align-center">Neues Wissen! <BadgeCheck className='mx-1 mt-1' /> </h3>
                        <p className="text-gray-600 mb-4">Du hast dir Wissen in 13 verschieden Bereichen angeeignet.</p>
                        <div className="flex justify-between items-center">
                        <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Englisch</span>
                        <ChevronRight className="h-5 w-5 text-indigo-400" />
                        </div>
                    </Link>
                    <Link href="/dashboard/mediaSearch?theme=faust" className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-lg text-indigo-700 mb-2 flex align-center">Schule wird zum Hobby <BadgeCheck className='mx-1 mt-1' /></h3>
                        <p className="text-gray-600 mb-4">Du hast diesen Monat 7 Stunden und 27 Minuten auf der Website verbracht.</p>
                        <div className="flex justify-between items-center">
                        <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Alle Lernmaterialien</span>
                        <ChevronRight className="h-5 w-5 text-indigo-400" />
                        </div>
                    </Link>
                    </div>
                </div>
                </section>

            )}
        </div>
    )
}