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
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Angepasste Lernmaterialien</h3>
            <p className="text-gray-600">
              Alle Materialien sind speziell für deine Klassenstufe entwickelt und helfen dir,
              dich gezielt weiterzuentwickeln.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Strukturiertes Lernen</h3>
            <p className="text-gray-600">
              Unsere Themen sind klar strukturiert, damit du Schritt für Schritt neue Inhalte meistern kannst.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Motivation & Fortschritt</h3>
            <p className="text-gray-600">
              Verfolge deinen Fortschritt und bleibe motiviert durch sichtbare Erfolge.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
