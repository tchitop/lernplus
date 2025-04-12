'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

// Mock Data
const subjects = {
  mathematik: {
    id: 'mathematik',
    title: 'Mathematik',
    icon: '📊',
    color: 'from-blue-500 to-blue-700',
  },
  deutsch: {
    id: 'deutsch',
    title: 'Deutsch',
    icon: '📝',
    color: 'from-red-500 to-red-700',
  },
  englisch: {
    id: 'englisch',
    title: 'Englisch',
    icon: '🌍',
    color: 'from-green-500 to-green-700',
  },
};

const topics = {
  mathematik: [
    { id: 'grundrechenarten', name: 'Grundrechenarten', description: 'Addition, Subtraktion, Multiplikation und Division' },
    { id: 'bruchrechnung', name: 'Bruchrechnung', description: 'Brüche verstehen und rechnen' },
    { id: 'geometrie', name: 'Geometrie', description: 'Formen, Winkel und räumliches Denken' },
  ],
  deutsch: [
    { id: 'grammatik', name: 'Grammatik', description: 'Wortarten und Satzstrukturen' },
    { id: 'rechtschreibung', name: 'Rechtschreibung', description: 'Richtig schreiben lernen' },
    { id: 'literatur', name: 'Literatur', description: 'Texte verstehen und interpretieren' },
  ],
  englisch: [
    { id: 'vokabeln', name: 'Vokabeln', description: 'Wortschatz erweitern und festigen' },
    { id: 'grammatik', name: 'Grammatik', description: 'Englische Grammatikregeln verstehen' },
    { id: 'konversation', name: 'Konversation', description: 'Sprechen und Hören üben' },
  ],
};

export default function SubjectPage() {
  const params = useParams();
  const classId = params?.class as string;
  const subjectId = params?.subject as string;

  const subject = subjects[subjectId];
  const subjectTopics = topics[subjectId];

  if (!classId || !subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold text-indigo-700">Lade Fach...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Startseite</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/classes" className="hover:text-indigo-600 transition-colors">Klassenstufen</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/classes/${classId}`} className="hover:text-indigo-600 transition-colors">Klasse {classId}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-900">{subject.title}</span>
      </nav>

      {/* Subject Header */}
      <div className="flex items-center gap-4">
        <span className="text-3xl">{subject.icon}</span>
        <h1 className="text-3xl font-bold text-gray-800">{subject.title}</h1>
      </div>

      {/* Topics List */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Themen in {subject.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjectTopics.map((topic) => (
            <Link 
              key={topic.id} 
              href={`/classes/${classId}/${subjectId}/${topic.id}`}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow transition-all border border-gray-100 group"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors">
                {topic.name}
              </h3>
              <p className="text-gray-600">{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
