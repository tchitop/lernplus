'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Clock, BarChart2, ChevronRight, Star, Users } from 'lucide-react';

// Interfaces bleiben unverändert
interface SubjectDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  banner: string;
  color: string;
  icon: string;
  gradeLevels: {
    id: string;
    name: string;
    categoryCount: number;
    description: string;
    categories: {
      id: string;
      name: string;
      taskCount: number;
      description: string;
    }[];
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

// Mock-Daten bleiben unverändert
const subjectsData: Record<string, SubjectDetail> = {
  mathematik: {
    id: 'mathematik',
    title: 'Mathematik',
    description: 'Entdecke die Welt der Mathematik mit interaktiven Aufgaben zu Algebra, Geometrie, Analysis und mehr. Von grundlegenden Konzepten bis zu fortgeschrittenen Themen - für jedes Niveau das Richtige.',
    image: '/images/subjects/math-bg.jpg',
    banner: '/images/subjects/math-banner.jpg',
    color: 'from-blue-500 to-blue-700',
    icon: '📊',
    gradeLevels: [
      {
        id: 'klasse-5-6',
        name: 'Klasse 5-6',
        categoryCount: 4,
        description: 'Grundlegende mathematische Konzepte für Anfänger',
        categories: [
          {
            id: 'grundrechenarten',
            name: 'Grundrechenarten',
            taskCount: 20,
            description: 'Addition, Subtraktion, Multiplikation und Division'
          },
          {
            id: 'bruchrechnung',
            name: 'Bruchrechnung',
            taskCount: 15,
            description: 'Brüche verstehen und rechnen'
          },
          {
            id: 'geometrie-grundlagen',
            name: 'Geometrie Grundlagen',
            taskCount: 18,
            description: 'Formen, Winkel und räumliches Denken'
          },
          {
            id: 'textaufgaben',
            name: 'Textaufgaben',
            taskCount: 12,
            description: 'Mathematische Probleme aus Texten lösen'
          }
        ]
      },
      {
        id: 'klasse-7-8',
        name: 'Klasse 7-8',
        categoryCount: 4,
        description: 'Vertiefte mathematische Konzepte für mittlere Stufen',
        categories: [
          {
            id: 'algebra-grundlagen',
            name: 'Algebra Grundlagen',
            taskCount: 22,
            description: 'Terme, Gleichungen und lineare Funktionen'
          },
          {
            id: 'prozentrechnung',
            name: 'Prozentrechnung',
            taskCount: 18,
            description: 'Prozente berechnen und anwenden'
          },
          {
            id: 'flaechenberechnung',
            name: 'Flächenberechnung',
            taskCount: 15,
            description: 'Flächeninhalte verschiedener Formen'
          },
          {
            id: 'statistik-grundlagen',
            name: 'Statistik Grundlagen',
            taskCount: 14,
            description: 'Daten sammeln, darstellen und auswerten'
          }
        ]
      },
      {
        id: 'klasse-9-10',
        name: 'Klasse 9-10',
        categoryCount: 4,
        description: 'Fortgeschrittene mathematische Konzepte',
        categories: [
          {
            id: 'quadratische-funktionen',
            name: 'Quadratische Funktionen',
            taskCount: 18,
            description: 'Parabeln und quadratische Gleichungen'
          },
          {
            id: 'trigonometrie',
            name: 'Trigonometrie',
            taskCount: 16,
            description: 'Sinus, Kosinus und Tangens'
          },
          {
            id: 'satzgruppe-pythagoras',
            name: 'Satzgruppe des Pythagoras',
            taskCount: 12,
            description: 'Anwendungen des Satzes des Pythagoras'
          },
          {
            id: 'wahrscheinlichkeit',
            name: 'Wahrscheinlichkeit',
            taskCount: 14,
            description: 'Grundlagen der Wahrscheinlichkeitsrechnung'
          }
        ]
      },
      {
        id: 'klasse-11-13',
        name: 'Klasse 11-13',
        categoryCount: 4,
        description: 'Mathematik für die Oberstufe und Abitur',
        categories: [
          {
            id: 'analysis',
            name: 'Analysis',
            taskCount: 25,
            description: 'Differentialrechnung, Integralrechnung und mehr'
          },
          {
            id: 'vektoren',
            name: 'Vektoren und Analytische Geometrie',
            taskCount: 18,
            description: 'Vektorrechnung und räumliche Geometrie'
          },
          {
            id: 'stochastik',
            name: 'Stochastik',
            taskCount: 15,
            description: 'Erweiterte Wahrscheinlichkeitsrechnung und Statistik'
          },
          {
            id: 'komplexe-zahlen',
            name: 'Komplexe Zahlen',
            taskCount: 12,
            description: 'Einführung in die komplexen Zahlen'
          }
        ]
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
    gradeLevels: [
      {
        id: 'klasse-5-6',
        name: 'Klasse 5-6',
        categoryCount: 4,
        description: 'Grundlegende Sprachkenntnisse für Anfänger',
        categories: [
          {
            id: 'grammatik-grundlagen',
            name: 'Grammatik Grundlagen',
            taskCount: 18,
            description: 'Wortarten und einfache Satzstrukturen'
          },
          {
            id: 'rechtschreibung-grundlagen',
            name: 'Rechtschreibung Grundlagen',
            taskCount: 16,
            description: 'Grundlegende Rechtschreibregeln'
          },
          {
            id: 'leseverstaendnis',
            name: 'Leseverständnis',
            taskCount: 14,
            description: 'Texte lesen und verstehen'
          },
          {
            id: 'aufsatz-grundlagen',
            name: 'Aufsatz Grundlagen',
            taskCount: 12,
            description: 'Einfache Aufsätze schreiben'
          }
        ]
      },
      // Weitere Grade-Levels bleiben gleich
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
    gradeLevels: [
      // Grade-Levels bleiben gleich
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
    gradeLevels: [
      // Grade-Levels bleiben gleich
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

// Helper-Komponenten für Sternebewertung
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400' : 'stroke-yellow-400 fill-transparent'}`} 
          />
        ))}
      </div>
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function SubjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [selectedGradeLevel, setSelectedGradeLevel] = useState<string | null>(null);
  
  // Handle the case when the page is still being generated
  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold text-indigo-700">Lade Fachdetails...</div>
      </div>
    );
  }
  
  const subject = subjectsData[id];
  
  // Handle non-existent subject
  if (!subject) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-6xl mb-6">😕</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Fach nicht gefunden</h1>
        <p className="mb-8 text-gray-600 max-w-md text-center">Das gesuchte Fach existiert leider nicht oder ist derzeit nicht verfügbar.</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Zurück zur Startseite
        </Link>
      </div>
    );
  }

  // Find the currently selected grade level object
  const currentGradeLevel = selectedGradeLevel 
    ? subject.gradeLevels.find(grade => grade.id === selectedGradeLevel)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Startseite</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/subjects" className="hover:text-indigo-600 transition-colors">Fächer</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-900">{subject.title}</span>
      </nav>

      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl shadow-lg">
        <div className={`relative h-80 bg-gradient-to-r ${subject.color}`}>
          <div className="absolute inset-0 opacity-30 bg-pattern"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 md:px-16 text-white">
            <div className="text-5xl mb-4">{subject.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{subject.title}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">{subject.description}</p>
          </div>
        </div>
      </section>

      {/* Grade Levels Section */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Klassenstufen</h2>
            <p className="text-gray-600">Wähle deine Klassenstufe, um passende Inhalte zu entdecken</p>
          </div>
          {selectedGradeLevel && (
            <button 
              onClick={() => setSelectedGradeLevel(null)} 
              className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center text-sm font-medium"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Alle Klassenstufen
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subject.gradeLevels.map((grade) => (
            <button
              key={grade.id}
              onClick={() => setSelectedGradeLevel(grade.id)}
              className={`text-left p-6 rounded-xl border transition-all transform ${
                selectedGradeLevel === grade.id 
                  ? `bg-indigo-50 border-indigo-300 shadow-md scale-105` 
                  : `bg-white border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 hover:shadow`
              }`}
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{grade.name}</h3>
              <p className="text-gray-600 mb-3 text-sm">{grade.description}</p>
              <div className="flex items-center text-indigo-600">
                <span className="font-medium">{grade.categoryCount} Themengebiete</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Categories Section - Only shown if a grade level is selected */}
      {currentGradeLevel && (
        <section className="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 rounded-2xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Themengebiete für {currentGradeLevel.name}</h2>
                <p className="text-gray-600">{currentGradeLevel.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentGradeLevel.categories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/subjects/${subject.id}/grades/${currentGradeLevel.id}/categories/${category.id}`}
                  className="bg-white rounded-xl p-6 shadow hover:shadow-md transition-all hover:translate-y-[-2px] border border-gray-100 flex justify-between items-center group"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors">{category.name}</h3>
                    <p className="text-gray-600 mb-3">{category.description}</p>
                    <div className="flex items-center text-indigo-600 text-sm font-medium">
                      <span>{category.taskCount} Aufgaben</span>
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

      {/* Popular Tasks */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Beliebte Aufgaben</h2>
            <p className="text-gray-600">Von anderen Schülern am häufigsten bearbeitete Aufgaben</p>
          </div>
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
              href={`/subjects/${subject.id}/tasks/${task.id}`}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-all hover:translate-y-[-2px] border border-gray-100 flex flex-col group"
            >
              <div className={`h-2 w-full ${
                task.difficulty === 'Leicht' ? 'bg-green-500' :
                task.difficulty === 'Mittel' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}>
              </div>
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.difficulty === 'Leicht' ? 'bg-green-100 text-green-700' :
                    task.difficulty === 'Mittel' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {task.difficulty}
                  </span>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{task.estimatedTime}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                    <span>{task.completions.toLocaleString()}</span>
                  </div>
                  <div className="col-span-2">
                    <StarRating rating={task.rating} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
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