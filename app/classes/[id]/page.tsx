'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react';

// Interfaces
interface ClassLevel {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  color: string;
  banner: string;
}

interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  topics: Topic[];
}

interface Topic {
  id: string;
  name: string;
  description: string;
  taskCount: number;
}

// Mock data
const classLevels: Record<string, ClassLevel> = {
  '5-6': {
    id: '5-6',
    name: 'Klasse 5-6',
    description: 'Grundlegende Konzepte und Übungen für die Orientierungsstufe',
    longDescription: 'In der Orientierungsstufe werden grundlegende Konzepte vermittelt, die das Fundament für deine weitere schulische Laufbahn legen. Hier lernst du die Basics in allen Fächern, die dir später helfen werden, komplexere Themen zu verstehen.',
    color: 'from-blue-500 to-blue-700',
    banner: '/images/classes/5-6-banner.jpg',
  },
  '7-8': {
    id: '7-8',
    name: 'Klasse 7-8',
    description: 'Vertiefte Konzepte und Übungen für die Mittelstufe',
    longDescription: 'In der Mittelstufe werden die Grundlagen vertieft und neue Konzepte eingeführt. Du wirst komplexere Probleme lösen und dein kritisches Denken weiterentwickeln, während du dich auf die höheren Klassen vorbereitest.',
    color: 'from-green-500 to-green-700',
    banner: '/images/classes/7-8-banner.jpg',
  },
  '9-10': {
    id: '9-10',
    name: 'Klasse 9-10',
    description: 'Fortgeschrittene Konzepte und Vorbereitung für die Oberstufe',
    longDescription: 'In den Klassen 9-10 bereitest du dich auf die Oberstufe vor. Du wirst fortgeschrittene Konzepte erlernen und dein Wissen in allen Fächern vertiefen. Diese Phase ist entscheidend für deine weitere akademische Laufbahn.',
    color: 'from-yellow-500 to-yellow-700',
    banner: '/images/classes/9-10-banner.jpg',
  },
  'oberstufe': {
    id: 'oberstufe',
    name: 'Oberstufe',
    description: 'Vertiefte Konzepte und Vorbereitung für das Abitur',
    longDescription: 'Die Oberstufe bereitet dich auf das Abitur und das weitere Studium vor. Hier wirst du komplexe Themen behandeln und deine analytischen Fähigkeiten weiterentwickeln. Die Oberstufe ist der letzte Schritt auf deinem Weg zum Abitur.',
    color: 'from-red-500 to-red-700',
    banner: '/images/classes/oberstufe-banner.jpg',
  },
};

const subjects: Record<string, Subject> = {
  'mathematik': {
    id: 'mathematik',
    title: 'Mathematik',
    description: 'Entdecke die Welt der Mathematik mit interaktiven Aufgaben zu Algebra, Geometrie, Analysis und mehr.',
    icon: '📊',
    color: 'from-blue-500 to-blue-700',
    topics: [
      {
        id: 'grundrechenarten',
        name: 'Grundrechenarten',
        description: 'Addition, Subtraktion, Multiplikation und Division',
        taskCount: 24
      },
      {
        id: 'bruchrechnung',
        name: 'Bruchrechnung',
        description: 'Brüche verstehen und rechnen',
        taskCount: 18
      },
      {
        id: 'geometrie',
        name: 'Geometrie',
        description: 'Formen, Winkel und räumliches Denken',
        taskCount: 20
      }
    ]
  },
  'deutsch': {
    id: 'deutsch',
    title: 'Deutsch',
    description: 'Verbessere deine Sprachkenntnisse mit Übungen zu Grammatik, Rechtschreibung und Literatur.',
    icon: '📝',
    color: 'from-red-500 to-red-700',
    topics: [
      {
        id: 'grammatik',
        name: 'Grammatik',
        description: 'Wortarten und Satzstrukturen',
        taskCount: 22
      },
      {
        id: 'rechtschreibung',
        name: 'Rechtschreibung',
        description: 'Richtig schreiben lernen',
        taskCount: 19
      },
      {
        id: 'literatur',
        name: 'Literatur',
        description: 'Texte verstehen und interpretieren',
        taskCount: 15
      }
    ]
  },
  'englisch': {
    id: 'englisch',
    title: 'Englisch',
    description: 'Verbessere deine Englischkenntnisse mit interaktiven Übungen zu Vokabeln, Grammatik und Konversation.',
    icon: '🌍',
    color: 'from-green-500 to-green-700',
    topics: [
      {
        id: 'vokabeln',
        name: 'Vokabeln',
        description: 'Wortschatz erweitern und festigen',
        taskCount: 25
      },
      {
        id: 'grammatik',
        name: 'Grammatik',
        description: 'Englische Grammatikregeln verstehen',
        taskCount: 20
      },
      {
        id: 'konversation',
        name: 'Konversation',
        description: 'Sprechen und Hören üben',
        taskCount: 15
      }
    ]
  }
};

// Class level specific subjects with topics
const classSubjects: Record<string, string[]> = {
  '5-6': ['mathematik', 'deutsch', 'englisch'],
  '7-8': ['mathematik', 'deutsch', 'englisch'],
  '9-10': ['mathematik', 'deutsch', 'englisch'],
  'oberstufe': ['mathematik', 'deutsch', 'englisch']
};

export default function ClassDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Handle the case when the page is still being generated
  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold text-indigo-700">Lade Klassenstufe...</div>
      </div>
    );
  }

  const classLevel = classLevels[id];

  // Handle non-existent class level
  if (!classLevel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-6xl mb-6">😕</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Klassenstufe nicht gefunden</h1>
        <p className="mb-8 text-gray-600 max-w-md text-center">Die gesuchte Klassenstufe existiert leider nicht oder ist derzeit nicht verfügbar.</p>
        <Link 
          href="/classes" 
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Zurück zur Klassenstufen-Übersicht
        </Link>
      </div>
    );
  }

  // Get subjects for this class level
  const classSubjectIds = classSubjects[id] || [];
  const currentSubjects = classSubjectIds.map(subId => subjects[subId]);

  // Find the currently selected subject
  const currentSubject = selectedSubject 
    ? subjects[selectedSubject]
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Startseite</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/classes" className="hover:text-indigo-600 transition-colors">Klassenstufen</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-900">{classLevel.name}</span>
      </nav>

      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl shadow-lg">
        <div className={`relative h-80 bg-gradient-to-r ${classLevel.color}`}>
          <div className="absolute inset-0 opacity-30 bg-pattern"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 md:px-16 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{classLevel.name}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">{classLevel.longDescription}</p>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Fächer</h2>
            <p className="text-gray-600">Wähle ein Fach, um die passenden Themen zu entdecken</p>
          </div>
          {selectedSubject && (
            <button 
              onClick={() => setSelectedSubject(null)} 
              className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center text-sm font-medium"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Alle Fächer
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentSubjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className={`text-left p-6 rounded-xl border transition-all transform ${
                selectedSubject === subject.id 
                  ? `bg-indigo-50 border-indigo-300 shadow-md scale-105` 
                  : `bg-white border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 hover:shadow`
              }`}
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-3">{subject.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{subject.title}</h3>
              </div>
              <p className="text-gray-600 mb-3 text-sm">{subject.description}</p>
              <div className="flex items-center text-indigo-600">
                <span className="font-medium">{subject.topics.length} Themengebiete</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Topics Section - Only shown if a subject is selected */}
      {currentSubject && (
        <section className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-2xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Themengebiete für {currentSubject.title}</h2>
                <p className="text-gray-600">{currentSubject.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentSubject.topics.map((topic) => (
                <Link 
  key={topic.id}
  href={`/classes/${classLevel.id}/${topic.id}?subject=${currentSubject.id}`}
  className="bg-white rounded-xl p-6 shadow hover:shadow-md transition-all hover:translate-y-[-2px] border border-gray-100 flex justify-between items-center group"
>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors">{topic.name}</h3>
                    <p className="text-gray-600 mb-3">{topic.description}</p>
                    <div className="flex items-center text-indigo-600 text-sm font-medium">
                      <span>{topic.taskCount} Aufgaben</span>
                    </div>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-full text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="bg-white rounded-2xl shadow border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Warum diese Klassenstufe?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 text-indigo-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Lehrplangerecht</h3>
            <p className="text-gray-600">Alle Inhalte sind auf die Anforderungen dieser Klassenstufe zugeschnitten.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Praxisnah</h3>
            <p className="text-gray-600">Lerne mit realen Beispielen und Anwendungen aus dem Alltag.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-yellow-100 text-yellow-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Effektiv</h3>
            <p className="text-gray-600">Lerne schneller und nachhaltiger mit unseren interaktiven Methoden.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 rounded-2xl p-8 text-white text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Bereit zum Lernen?</h2>
        <p className="mb-6 max-w-xl mx-auto text-indigo-100">Melde dich jetzt an und starte deine persönliche Lernreise mit tausenden interaktiven Aufgaben.</p>
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