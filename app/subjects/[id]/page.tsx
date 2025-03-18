'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, BarChart2, ChevronRight } from 'lucide-react';

// Mock data for the subject details
interface SubjectDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  banner: string;
  color: string;
  icon: string;
  categories: {
    id: string;
    name: string;
    taskCount: number;
    description: string;
  }[];
  popularTasks: {
    id: string;
    title: string;
    difficulty: 'Leicht' | 'Mittel' | 'Schwer';
    completions: number;
    rating: number;
    estimatedTime: string;
  }[];
}

// Mock data for demonstration purposes
const subjectsData: Record<string, SubjectDetail> = {
  mathematik: {
    id: 'mathematik',
    title: 'Mathematik',
    description: 'Entdecke die Welt der Mathematik mit interaktiven Aufgaben zu Algebra, Geometrie, Analysis und mehr. Von grundlegenden Konzepten bis zu fortgeschrittenen Themen - für jedes Niveau das Richtige.',
    image: '/images/subjects/math-bg.jpg',
    banner: '/images/subjects/math-banner.jpg',
    color: 'from-blue-500 to-blue-700',
    icon: '📊',
    categories: [
      {
        id: 'algebra',
        name: 'Algebra',
        taskCount: 45,
        description: 'Grundlegende und fortgeschrittene algebraische Konzepte'
      },
      {
        id: 'geometrie',
        name: 'Geometrie',
        taskCount: 38,
        description: 'Formen, Winkel und räumliches Denken'
      },
      {
        id: 'analysis',
        name: 'Analysis',
        taskCount: 25,
        description: 'Differentialrechnung, Integralrechnung und mehr'
      },
      {
        id: 'statistik',
        name: 'Statistik & Wahrscheinlichkeit',
        taskCount: 22,
        description: 'Datenanalyse und Wahrscheinlichkeitskonzepte'
      }
    ],
    popularTasks: [
      {
        id: 't1',
        title: 'Quadratische Gleichungen lösen',
        difficulty: 'Mittel',
        completions: 1245,
        rating: 4.7,
        estimatedTime: '15 Min'
      },
      {
        id: 't2',
        title: 'Prozentrechnung im Alltag',
        difficulty: 'Leicht',
        completions: 2130,
        rating: 4.9,
        estimatedTime: '10 Min'
      },
      {
        id: 't3',
        title: 'Trigonometrische Funktionen',
        difficulty: 'Schwer',
        completions: 876,
        rating: 4.5,
        estimatedTime: '25 Min'
      }
    ]
  },
  deutsch: {
    id: 'deutsch',
    title: 'Deutsch',
    description: 'Verbessere deine Sprachkenntnisse mit Übungen zu Grammatik, Rechtschreibung, Textanalyse und Literatur. Entdecke die Vielfalt der deutschen Sprache und Literatur.',
    image: '/images/subjects/german-bg.jpg',
    banner: '/images/subjects/german-banner.jpg',
    color: 'from-red-500 to-red-700',
    icon: '📝',
    categories: [
      {
        id: 'grammatik',
        name: 'Grammatik',
        taskCount: 32,
        description: 'Grammatikregeln und Anwendungen'
      },
      {
        id: 'rechtschreibung',
        name: 'Rechtschreibung',
        taskCount: 28,
        description: 'Korrekte Schreibweise von Wörtern und Sätzen'
      },
      {
        id: 'textanalyse',
        name: 'Textanalyse',
        taskCount: 15,
        description: 'Literarische und nicht-literarische Texte verstehen'
      },
      {
        id: 'aufsatz',
        name: 'Aufsatz & Kreatives Schreiben',
        taskCount: 22,
        description: 'Strukturiertes und kreatives Schreiben üben'
      }
    ],
    popularTasks: [
      {
        id: 't4',
        title: 'Zeitformen der Verben',
        difficulty: 'Mittel',
        completions: 1568,
        rating: 4.6,
        estimatedTime: '12 Min'
      },
      {
        id: 't5',
        title: 'Groß- und Kleinschreibung',
        difficulty: 'Leicht',
        completions: 2345,
        rating: 4.8,
        estimatedTime: '8 Min'
      },
      {
        id: 't6',
        title: 'Gedichtanalyse',
        difficulty: 'Schwer',
        completions: 756,
        rating: 4.4,
        estimatedTime: '30 Min'
      }
    ]
  },
  englisch: {
    id: 'englisch',
    title: 'Englisch',
    description: 'Verbessere deine Englischkenntnisse mit interaktiven Übungen zu Vokabeln, Grammatik und Konversation für alle Niveaustufen von Anfänger bis Fortgeschritten.',
    image: '/images/subjects/english-bg.jpg',
    banner: '/images/subjects/english-banner.jpg',
    color: 'from-green-500 to-green-700',
    icon: '🌍',
    categories: [
      {
        id: 'vocabulary',
        name: 'Vokabeln',
        taskCount: 40,
        description: 'Wortschatz erweitern und festigen'
      },
      {
        id: 'grammar',
        name: 'Grammatik',
        taskCount: 35,
        description: 'Englische Grammatikregeln lernen und anwenden'
      },
      {
        id: 'conversation',
        name: 'Konversation',
        taskCount: 20,
        description: 'Dialoge und Alltagssituationen üben'
      },
      {
        id: 'listening',
        name: 'Hörverstehen',
        taskCount: 18,
        description: 'Gesprochene Texte verstehen'
      }
    ],
    popularTasks: [
      {
        id: 't7',
        title: 'Present Perfect vs. Simple Past',
        difficulty: 'Mittel',
        completions: 1345,
        rating: 4.5,
        estimatedTime: '15 Min'
      },
      {
        id: 't8',
        title: 'Alltags-Vokabeln: Im Restaurant',
        difficulty: 'Leicht',
        completions: 1987,
        rating: 4.9,
        estimatedTime: '10 Min'
      },
      {
        id: 't9',
        title: 'Conditional Sentences',
        difficulty: 'Schwer',
        completions: 876,
        rating: 4.6,
        estimatedTime: '20 Min'
      }
    ]
  },
  informatik: {
    id: 'informatik',
    title: 'Informatik',
    description: 'Entdecke die Grundlagen der Programmierung, Datenbanken und Webentwicklung. Lerne praxisnah mit interaktiven Coding-Aufgaben und Projekten.',
    image: '/images/subjects/coding-bg.jpg',
    banner: '/images/subjects/coding-banner.jpg',
    color: 'from-purple-500 to-purple-700',
    icon: '💻',
    categories: [
      {
        id: 'programmierung',
        name: 'Programmierung',
        taskCount: 30,
        description: 'Grundlagen der Programmierung in verschiedenen Sprachen'
      },
      {
        id: 'webentwicklung',
        name: 'Webentwicklung',
        taskCount: 25,
        description: 'HTML, CSS und JavaScript lernen'
      },
      {
        id: 'datenbanken',
        name: 'Datenbanken',
        taskCount: 15,
        description: 'Datenbankdesign und SQL-Abfragen'
      },
      {
        id: 'algorithmen',
        name: 'Algorithmen & Datenstrukturen',
        taskCount: 18,
        description: 'Grundlegende algorithmische Konzepte'
      }
    ],
    popularTasks: [
      {
        id: 't10',
        title: 'Erste Schritte mit Python',
        difficulty: 'Leicht',
        completions: 1765,
        rating: 4.9,
        estimatedTime: '20 Min'
      },
      {
        id: 't11',
        title: 'Responsives Design mit CSS',
        difficulty: 'Mittel',
        completions: 1234,
        rating: 4.7,
        estimatedTime: '25 Min'
      },
      {
        id: 't12',
        title: 'Sortier-Algorithmen verstehen',
        difficulty: 'Schwer',
        completions: 856,
        rating: 4.6,
        estimatedTime: '35 Min'
      }
    ]
  }
};

export default function SubjectDetailPage() {
  // Verwende useParams hook anstelle von router.query
  const params = useParams();
  const id = params?.id as string;
  
  // Handle the case when the page is still being generated
  if (!id) {
    return <div className="p-8 text-center">Lade Fachdetails...</div>;
  }
  
  const subject = subjectsData[id];
  
  // Handle non-existent subject
  if (!subject) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Fach nicht gefunden</h1>
        <p className="mb-6">Das gesuchte Fach existiert leider nicht.</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium"
        >
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner */}
      <section className={`relative overflow-hidden rounded-3xl h-64 bg-gradient-to-r ${subject.color}`}>
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:16px_16px]"></div>
        <div className="relative px-8 py-12 h-full flex flex-col justify-end text-white">
          <Link href="/" className="mb-6 inline-flex items-center text-indigo-100 hover:text-white">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Zurück zur Übersicht
          </Link>
          <h1 className="text-4xl font-bold mb-2">{subject.title}</h1>
          <p className="text-xl text-indigo-100 max-w-2xl">{subject.description}</p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Themengebiete</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subject.categories.map((category) => (
            <Link 
              key={category.id}
              href={`/subjects/${subject.id}/categories/${category.id}`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                <p className="text-gray-600 mb-2">{category.description}</p>
                <span className="text-sm text-indigo-600 font-medium">{category.taskCount} Aufgaben</span>
              </div>
              <ChevronRight className="h-6 w-6 text-gray-400" />
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Tasks */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Beliebte Aufgaben</h2>
          <Link 
            href={`/subjects/${subject.id}/tasks`} 
            className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors"
          >
            Alle Aufgaben <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subject.popularTasks.map((task) => (
            <Link 
              key={task.id} 
              href={`/tasks/${task.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold flex-1">{task.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.difficulty === 'Leicht' ? 'bg-green-100 text-green-800' :
                    task.difficulty === 'Mittel' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {task.difficulty}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{task.estimatedTime}</span>
                  <span className="mx-2">•</span>
                  <BarChart2 className="h-4 w-4 mr-1" />
                  <span>{task.completions.toLocaleString()} mal gelöst</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`h-4 w-4 ${i < Math.floor(task.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-600">{task.rating}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4">
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Bereit zum Lernen?</h2>
          <p className="text-indigo-600 mb-6 max-w-2xl mx-auto">
            Melde dich an, um deinen Lernfortschritt zu speichern und personalisierte Aufgabenempfehlungen zu erhalten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/login" 
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
            >
              Anmelden
            </Link>
            <Link 
              href="/auth/register" 
              className="px-6 py-3 bg-white text-indigo-600 border border-indigo-200 rounded-xl font-medium hover:bg-indigo-50 transition-colors"
            >
              Kostenlos registrieren
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}