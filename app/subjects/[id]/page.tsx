import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// Typen
interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'leicht' | 'mittel' | 'schwer';
  estimatedTime: number; // in Minuten
}

interface SubjectData {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tasks: Task[];
}

// Platzhalterdaten für Fächer - später durch API-Anfragen ersetzen
const subjectsData: { [key: string]: SubjectData } = {
  'mathematik': {
    id: 'mathematik',
    title: 'Mathematik',
    description: 'Algebra, Geometrie, Analysis und mehr - interaktive Aufgaben für alle Schwierigkeitsgrade.',
    longDescription: 'Mathematik bildet die Grundlage für viele andere Wissenschaften und technische Disziplinen. In unserem Mathematik-Kurs decken wir alle wichtigen Bereiche ab, von grundlegender Algebra bis hin zu fortgeschrittener Analysis. Die interaktiven Aufgaben helfen dir, mathematische Konzepte zu verstehen und anzuwenden.',
    image: '/images/placeholder-math.jpg',
    tasks: [
      {
        id: 'math-001',
        title: 'Grundlagen der Algebra',
        description: 'Lerne die Grundoperationen und einfache Gleichungen.',
        difficulty: 'leicht',
        estimatedTime: 15
      },
      {
        id: 'math-002',
        title: 'Quadratische Gleichungen',
        description: 'Verstehe und löse quadratische Gleichungen mit verschiedenen Methoden.',
        difficulty: 'mittel',
        estimatedTime: 25
      },
      {
        id: 'math-003',
        title: 'Einführung in die Trigonometrie',
        description: 'Lerne die grundlegenden trigonometrischen Funktionen kennen.',
        difficulty: 'mittel',
        estimatedTime: 30
      },
      {
        id: 'math-004',
        title: 'Differentialrechnung',
        description: 'Verstehe die Grundlagen der Differentialrechnung und berechne Ableitungen.',
        difficulty: 'schwer',
        estimatedTime: 45
      }
    ]
  },
  'deutsch': {
    id: 'deutsch',
    title: 'Deutsch',
    description: 'Grammatik, Rechtschreibung, Literatur und Textanalyse mit maßgeschneiderten Übungen.',
    longDescription: 'Unser Deutschkurs bietet umfassende Übungen zur Grammatik und Rechtschreibung sowie spannende Module zur Literaturanalyse und kreativen Textproduktion. Von der Zeichensetzung bis zur Textinterpretation - hier findest du alles, was du für einen sicheren Umgang mit der deutschen Sprache brauchst.',
    image: '/images/placeholder-german.jpg',
    tasks: [
      {
        id: 'deutsch-001',
        title: 'Grammatik: Zeitformen',
        description: 'Lerne die verschiedenen Zeitformen und ihre Anwendung.',
        difficulty: 'leicht',
        estimatedTime: 20
      },
      {
        id: 'deutsch-002',
        title: 'Textanalyse: Kurzgeschichten',
        description: 'Analysiere Kurzgeschichten und identifiziere literarische Stilmittel.',
        difficulty: 'mittel',
        estimatedTime: 35
      }
    ]
  },
  // Weitere Fächer können hier ergänzt werden
};

export default function SubjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: subjectId } = use(params);
  const subject = subjectsData[subjectId];
  
  if (!subject) {
    notFound();
  }

  const groupedTasks = {
    leicht: subject.tasks.filter(task => task.difficulty === 'leicht'),
    mittel: subject.tasks.filter(task => task.difficulty === 'mittel'),
    schwer: subject.tasks.filter(task => task.difficulty === 'schwer')
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden shadow-xl mb-12">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 p-12">
            <h1 className="text-4xl font-bold text-white mb-4">{subject.title}</h1>
            <p className="text-xl text-indigo-100 mb-8">{subject.description}</p>
            <Link 
              href="#tasks"
              className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-full hover:bg-indigo-50 transition"
            >
              Zu den Aufgaben
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image 
              src={subject.image} 
              alt={subject.title}
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* Aufgabenübersicht */}
      <section id="tasks" className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Verfügbare Aufgaben</h2>
        
        {Object.entries(groupedTasks).map(([difficulty, tasks]) => {
          if (tasks.length === 0) return null;
          
          const colors = {
            leicht: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
            mittel: { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
            schwer: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' }
          };
          
          return (
            <div key={difficulty} className="mb-12">
              <h3 className={`text-2xl font-semibold ${colors[difficulty].text} mb-6 flex items-center`}>
                <span className={`inline-block w-3 h-3 ${colors[difficulty].dot} rounded-full mr-2`}></span>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map(task => (
                  <Link 
                    key={task.id}
                    href={`/tasks/${task.id}`}
                    className={`${colors[difficulty].bg} p-6 rounded-xl shadow-md hover:shadow-lg transition group`}
                  >
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">{task.title}</h4>
                    <p className="text-gray-600 mb-4">{task.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">ca. {task.estimatedTime} Min.</span>
                      <span className={`${colors[difficulty].text} font-medium group-hover:underline`}>
                        Aufgabe starten →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Registrierungs-CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Mehr Aufgaben entdecken</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Registriere dich kostenlos und erhalte Zugang zu allen Lernmaterialien, personalisiertem Feedback und deinem Lernfortschritt.
        </p>
        <Link 
          href="/auth/register" 
          className="px-8 py-4 bg-white text-indigo-600 text-lg font-medium rounded-full hover:bg-indigo-50 transition"
        >
          Kostenlos registrieren
        </Link>
      </section>
    </div>
  );
}
