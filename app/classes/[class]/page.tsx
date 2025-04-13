'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

// Mock Data
const classLevels = {
  '5-6': {
    id: '5-6',
    name: 'Klasse 5-6',
    color: 'from-blue-500 to-blue-700',
  },
  '7-8': {
    id: '7-8',
    name: 'Klasse 7-8',
    color: 'from-green-500 to-green-700',
  },
  '9-10': {
    id: '9-10',
    name: 'Klasse 9-10',
    color: 'from-yellow-500 to-yellow-700',
  },
  oberstufe: {
    id: 'oberstufe',
    name: 'Oberstufe',
    color: 'from-red-500 to-red-700',
  },
};

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

export default function ClassPage() {
  const params = useParams();
  const classId = params?.class as string;

  const classLevel = classLevels[classId];

  if (!classLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold text-indigo-700">Lade Klassenstufe...</div>
      </div>
    );
  }

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
        <div className="group flex items-center hover:text-indigo-600 duration-500 transition-colors text-gray-100">
          <Link href="/classes" className="">
            Klassenstufen
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-100 group-hover:text-indigo-600 duration-500 transition-colors ml-[9px]" />
        </div>
        <span className="font-medium text-white">{classLevel.name}</span>
      </nav>

      {/* Class Header */}
      <div className="flex items-center">
        <h1 className="text-3xl font-bold text-gray-50">{classLevel.name}</h1>
      </div>

      {/* Subjects List */}
      <section>
        <h2 className="text-xl text-gray-250 mb-4">Fächer in {classLevel.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.values(subjects).map((subject) => (
            <Link 
              key={subject.id} 
              href={`/classes/${classId}/${subject.id}`}
              className={`bg-gradient-to-r ${subject.color} rounded-xl p-6 shadow-sm hover:shadow transition-all group`}
            >
              <div className="flex items-center gap-4">
                <span className="text-white text-xl">{subject.icon}</span>
                <h3 className="text-white text-lg font-semibold group-hover:text-gray-100 transition-colors">
                  {subject.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
