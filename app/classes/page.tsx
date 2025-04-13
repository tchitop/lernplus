'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

// Interface for class level
interface ClassLevel {
  id: string;
  name: string;
  description: string;
  subjectCount: number;
  image: string;
  color: string;
}

// Mock data for class levels
const classLevels: ClassLevel[] = [
  {
    id: '5-6',
    name: 'Klasse 5-6',
    description: 'Grundlegende Konzepte und Übungen für die Orientierungsstufe',
    subjectCount: 6,
    image: '/images/classes/5-6.jpg',
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: '7-8',
    name: 'Klasse 7-8',
    description: 'Vertiefte Konzepte und Übungen für die Mittelstufe',
    subjectCount: 8,
    image: '/images/classes/7-8.jpg',
    color: 'from-green-500 to-green-700',
  },
  {
    id: '9-10',
    name: 'Klasse 9-10',
    description: 'Fortgeschrittene Konzepte und Vorbereitung für die Oberstufe',
    subjectCount: 10,
    image: '/images/classes/9-10.jpg',
    color: 'from-yellow-500 to-yellow-700',
  },
  {
    id: 'oberstufe',
    name: 'Oberstufe',
    description: 'Vertiefte Konzepte und Vorbereitung für das Abitur',
    subjectCount: 12,
    image: '/images/classes/oberstufe.jpg',
    color: 'from-red-500 to-red-700',
  },
];

export default function ClassPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-white">
        <div className="group flex items-center hover:text-indigo-600 duration-500 transition-colors text-gray-100">
          <Link href="/" className="">
            Startseite
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-100 group-hover:text-indigo-600 duration-500 transition-colors ml-[9px]" />
        </div>
        <span className="font-medium text-white">Klassenstufen</span>
      </nav>

      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-grey-0">Klassenstufen</h1>
        <p className="text-xl text-gray-250 mx-auto">
          Wähle deine Klassenstufe, um auf dich zugeschnittene Lernmaterialien und Aufgaben zu entdecken.
        </p>
      </section>

      {/* Class Levels Grid */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {classLevels.map((classLevel) => (
            <Link
              key={classLevel.id}
              href={`/classes/${classLevel.id}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${classLevel.color} opacity-80`}></div>
              <div className="absolute inset-0 bg-pattern opacity-30"></div>
              <div className="relative p-8 flex flex-col h-full justify-between text-white">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{classLevel.name}</h2>
                  <p className="text-white/90 mb-4">{classLevel.description}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{classLevel.subjectCount} Fächer</span>
                  <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-stone-200 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-2xl mt-16">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Lernen nach deinem Niveau</h2>
          <p className="text-gray-600 text-lg">
            Unsere Inhalte sind speziell auf die Anforderungen deiner Klassenstufe zugeschnitten.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Lehrplangerecht</h3>
            <p className="text-gray-600 text-center">
              Alle Inhalte sind nach aktuellem Lehrplan gestaltet und helfen dir, die Anforderungen deiner Klassenstufe zu erfüllen.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Personalisiert</h3>
            <p className="text-gray-600 text-center">
              Adaptives Lernen, das sich an dein individuelles Tempo und deine Stärken anpasst.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">Vielfältig</h3>
            <p className="text-gray-600 text-center">
              Eine breite Palette an Übungen und Materialien, die verschiedene Lerntypen ansprechen.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 rounded-2xl p-8 text-white text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Bereit zum Lernen?</h2>
        <p className="mb-6 max-w-xl mx-auto text-indigo-100">
          Melde dich jetzt an und starte deine persönliche Lernreise mit tausenden interaktiven Aufgaben.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
            Jetzt anmelden
          </button>
          <button className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-800 transition-colors">
            Mehr erfahren
          </button>
        </div>
      </section>
    </div>
  );
}