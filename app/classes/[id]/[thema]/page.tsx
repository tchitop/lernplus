'use client';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ChevronRight, BookOpen, CheckCircle } from 'lucide-react';

// Interfaces
interface ClassLevel {
  id: string;
  name: string;
  color: string;
}

interface Subject {
  id: string;
  title: string;
  icon: string;
  color: string;
}

interface Topic {
  id: string;
  name: string;
  description: string;
  longDescription: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'leicht' | 'mittel' | 'schwer';
  estimatedTime: string;
  completed: boolean;
}

// Mock data
const classLevels: Record<string, ClassLevel> = {
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
  'oberstufe': {
    id: 'oberstufe',
    name: 'Oberstufe',
    color: 'from-red-500 to-red-700',
  },
};

const subjects: Record<string, Subject> = {
  'mathematik': {
    id: 'mathematik',
    title: 'Mathematik',
    icon: '📊',
    color: 'from-blue-500 to-blue-700',
  },
  'deutsch': {
    id: 'deutsch',
    title: 'Deutsch',
    icon: '📝',
    color: 'from-red-500 to-red-700',
  },
  'englisch': {
    id: 'englisch',
    title: 'Englisch',
    icon: '🌍',
    color: 'from-green-500 to-green-700',
  }
};

const topics: Record<string, Record<string, Topic>> = {
  'mathematik': {
    'grundrechenarten': {
      id: 'grundrechenarten',
      name: 'Grundrechenarten',
      description: 'Addition, Subtraktion, Multiplikation und Division',
      longDescription: 'Die vier Grundrechenarten bilden das Fundament der Mathematik. In diesem Themenbereich lernst du, wie du mit Addition, Subtraktion, Multiplikation und Division sicher umgehen kannst und diese Operationen in verschiedenen Kontexten anwendest.',
    },
    'bruchrechnung': {
      id: 'bruchrechnung',
      name: 'Bruchrechnung',
      description: 'Brüche verstehen und rechnen',
      longDescription: 'Brüche sind ein wichtiger Teil der Mathematik und kommen in vielen Alltagssituationen vor. Hier lernst du, wie man Brüche darstellt, vergleicht und mit ihnen rechnet. Du wirst Brüche kürzen, erweitern und die Grundrechenarten mit Brüchen anwenden können.',
    },
    'geometrie': {
      id: 'geometrie',
      name: 'Geometrie',
      description: 'Formen, Winkel und räumliches Denken',
      longDescription: 'Die Geometrie beschäftigt sich mit Formen, Größen und räumlichen Beziehungen. In diesem Themenbereich lernst du grundlegende geometrische Konzepte wie Punkte, Linien, Winkel und verschiedene Formen sowie deren Eigenschaften kennen.',
    }
  },
  'deutsch': {
    'grammatik': {
      id: 'grammatik',
      name: 'Grammatik',
      description: 'Wortarten und Satzstrukturen',
      longDescription: 'Die Grammatik ist das Regelwerk unserer Sprache. In diesem Bereich lernst du die verschiedenen Wortarten und Satzstrukturen kennen und verstehst, wie sie zusammenwirken, um bedeutungsvolle Sätze zu bilden.',
    },
    'rechtschreibung': {
      id: 'rechtschreibung',
      name: 'Rechtschreibung',
      description: 'Richtig schreiben lernen',
      longDescription: 'Eine korrekte Rechtschreibung ist wichtig für klare Kommunikation. Hier lernst du die Regeln der deutschen Rechtschreibung und übst, wie man Wörter korrekt schreibt, Groß- und Kleinschreibung anwendet und Satzzeichen richtig setzt.',
    },
    'literatur': {
      id: 'literatur',
      name: 'Literatur',
      description: 'Texte verstehen und interpretieren',
      longDescription: 'Literatur öffnet uns Türen zu anderen Welten und Perspektiven. In diesem Themenbereich lernst du, literarische Texte zu lesen, zu verstehen und zu interpretieren. Du wirst verschiedene Textarten kennenlernen und ihre Merkmale unterscheiden können.',
    }
  },
  'englisch': {
    'vokabeln': {
      id: 'vokabeln',
      name: 'Vokabeln',
      description: 'Wortschatz erweitern und festigen',
      longDescription: 'Ein umfangreicher Wortschatz ist die Basis für jede Sprache. In diesem Themenbereich lernst du wichtige englische Vokabeln und übst, wie du sie dir merken und in verschiedenen Kontexten anwenden kannst.',
    },
    'grammatik': {
      id: 'grammatik',
      name: 'Grammatik',
      description: 'Englische Grammatikregeln verstehen',
      longDescription: 'Die englische Grammatik unterscheidet sich von der deutschen. Hier lernst du die grundlegenden Strukturen und Regeln der englischen Sprache kennen und übst, wie du grammatikalisch korrekte Sätze bildest.',
    },
    'konversation': {
      id: 'konversation',
      name: 'Konversation',
      description: 'Sprechen und Hören üben',
      longDescription: 'Kommunikation ist das Ziel jedes Sprachenlernens. In diesem Themenbereich übst du das Hören und Sprechen der englischen Sprache. Du lernst, wie du Gespräche führst, Informationen verstehst und dich in alltäglichen Situationen auf Englisch ausdrücken kannst.',
    }
  }
};

// Mock tasks for each topic
const generateTasksForTopic = (topicId: string, subjectId: string): Task[] => {
  const difficultyLevels: ('leicht' | 'mittel' | 'schwer')[] = ['leicht', 'mittel', 'schwer'];
  const times = ['5 Minuten', '10 Minuten', '15 Minuten', '20 Minuten'];
  
  const taskCount = 5 + Math.floor(Math.random() * 10); // Between 5 and 14 tasks
  const tasks: Task[] = [];
  
  for (let i = 1; i <= taskCount; i++) {
    const difficulty = difficultyLevels[Math.floor(Math.random() * difficultyLevels.length)];
    const time = times[Math.floor(Math.random() * times.length)];
    
    tasks.push({
      id: `task-${i}`,
      title: `Aufgabe ${i}: ${getTaskTitle(subjectId, topicId, i)}`,
      description: `Das ist eine ${difficulty}e Aufgabe zum Thema ${getTopicName(subjectId, topicId)}.`,
      difficulty: difficulty,
      estimatedTime: time,
      completed: Math.random() > 0.7 // 30% chance to be completed
    });
  }
  
  return tasks;
};

// Helper function to get topic name
const getTopicName = (subjectId: string, topicId: string): string => {
  return topics[subjectId]?.[topicId]?.name || 'Unbekanntes Thema';
};

// Helper function to generate task titles based on subject and topic
const getTaskTitle = (subjectId: string, topicId: string, index: number): string => {
  if (subjectId === 'mathematik') {
    if (topicId === 'grundrechenarten') {
      const titles = [
        'Addieren von natürlichen Zahlen',
        'Subtrahieren mit Übertrag',
        'Multiplikationstabelle anwenden',
        'Schriftliche Division',
        'Gemischte Rechenaufgaben lösen'
      ];
      return titles[index % titles.length];
    } else if (topicId === 'bruchrechnung') {
      const titles = [
        'Brüche kürzen',
        'Brüche erweitern',
        'Addition von Brüchen',
        'Multiplikation von Brüchen',
        'Brüche in Dezimalzahlen umwandeln'
      ];
      return titles[index % titles.length];
    }
  } else if (subjectId === 'deutsch') {
    if (topicId === 'grammatik') {
      const titles = [
        'Nomen erkennen',
        'Zeitformen der Verben',
        'Adjektive steigern',
        'Satzglieder bestimmen',
        'Aktiv und Passiv unterscheiden'
      ];
      return titles[index % titles.length];
    }
  }
  
  // Default titles if no specific ones are defined
  return `Übungsaufgabe zu ${getTopicName(subjectId, topicId)}`;
};

export default function TopicDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const classId = params?.id as string;
  const themaId = params?.thema as string;
  const subjectId = searchParams?.get('subject') as string;
  
  const [filter, setFilter] = useState<'alle' | 'offen' | 'abgeschlossen'>('alle');
  
  // Handle loading state
  if (!classId || !themaId || !subjectId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold text-indigo-700">Lade Thema...</div>
      </div>
    );
  }
  
  const classLevel = classLevels[classId];
  const subject = subjects[subjectId];
  const topic = topics[subjectId]?.[themaId];
  
  // Handle non-existent data
  if (!classLevel || !subject || !topic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-6xl mb-6">😕</div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Thema nicht gefunden</h1>
        <p className="mb-8 text-gray-600 max-w-md text-center">Das gesuchte Thema existiert leider nicht oder ist derzeit nicht verfügbar.</p>
        <Link 
          href={`/classes/${classId}`} 
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Zurück zur Klassenstufe
        </Link>
      </div>
    );
  }
  
  // Generate tasks for this topic
  const tasks = generateTasksForTopic(themaId, subjectId);
  
  // Apply filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'alle') return true;
    if (filter === 'offen') return !task.completed;
    if (filter === 'abgeschlossen') return task.completed;
    return true;
  });
  
  // Stats
  const completedCount = tasks.filter(task => task.completed).length;
  const progressPercentage = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16 pt-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Startseite</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/classes" className="hover:text-indigo-600 transition-colors">Klassenstufen</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/classes/${classId}`} className="hover:text-indigo-600 transition-colors">{classLevel.name}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-900">{topic.name}</span>
      </nav>

      {/* Topic Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="flex items-center mb-2">
            <span className="text-3xl mr-3">{subject.icon}</span>
            <h1 className="text-3xl font-bold text-gray-800">{topic.name}</h1>
          </div>
          <p className="text-gray-600 text-lg">{topic.longDescription}</p>
        </div>
        <div className="shrink-0">
          <Link
            href={`/classes/${classId}?subject=${subjectId}`}
            className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zu {subject.title}
          </Link>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dein Fortschritt</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-indigo-600 h-4 rounded-full" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>{completedCount} von {tasks.length} abgeschlossen</span>
              <span>{progressPercentage}%</span>
            </div>
          </div>
          <div className="shrink-0">
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Weiter lernen
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <section>
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Aufgaben</h2>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button 
              className={`px-4 py-2 rounded-md transition-colors ${filter === 'alle' ? 'bg-white shadow-sm font-medium' : 'hover:bg-gray-200'}`}
              onClick={() => setFilter('alle')}
            >
              Alle ({tasks.length})
            </button>
            <button 
              className={`px-4 py-2 rounded-md transition-colors ${filter === 'offen' ? 'bg-white shadow-sm font-medium' : 'hover:bg-gray-200'}`}
              onClick={() => setFilter('offen')}
            >
              Offen ({tasks.length - completedCount})
            </button>
            <button 
              className={`px-4 py-2 rounded-md transition-colors ${filter === 'abgeschlossen' ? 'bg-white shadow-sm font-medium' : 'hover:bg-gray-200'}`}
              onClick={() => setFilter('abgeschlossen')}
            >
              Abgeschlossen ({completedCount})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTasks.map((task) => (
            <Link 
              href={`/classes/${classId}/${themaId}/aufgabe/${task.id}?subject=${subjectId}`}
              key={task.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow transition-all border border-gray-100 group"
            >
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
                {task.completed && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              <p className="text-gray-600 mb-4">{task.description}</p>
              <div className="flex justify-between text-sm">
                <span className={`px-3 py-1 rounded-full ${
                  task.difficulty === 'leicht' ? 'bg-green-100 text-green-800' :
                  task.difficulty === 'mittel' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {task.difficulty}
                </span>
                <span className="text-gray-500">ca. {task.estimatedTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Learning Tips */}
      <section className="bg-indigo-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lerntipps für {topic.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-indigo-700">Wie du am besten lernst</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5 mr-2" />
                <span>Beginne mit den leichten Aufgaben, um dich aufzuwärmen.</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5 mr-2" />
                <span>Mache regelmäßige kurze Pausen, um das Gelernte zu verarbeiten.</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5 mr-2" />
                <span>Wiederhole regelmäßig abgeschlossene Aufgaben zur Festigung.</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-indigo-700">Zusätzliche Ressourcen</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <BookOpen className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5 mr-2" />
                <span>Schau dir unsere Erklärvideos zum Thema {topic.name} an.</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5 mr-2" />
                <span>Nutze unsere interaktiven Übungen für zusätzliche Praxis.</span>
              </li>
              <li className="flex items-start">
                <BookOpen className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5 mr-2" />
                <span>Lade unser Arbeitsblatt zu {topic.name} herunter.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 rounded-2xl p-8 text-white text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Brauchst du Hilfe?</h2>
        <p className="mb-6 max-w-xl mx-auto text-indigo-100">
          Unsere Tutoren sind da, um dir bei schwierigen Aufgaben zu helfen und deine Fragen zu beantworten.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
            Tutor kontaktieren
          </button>
          <button className="bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-800 transition-colors">
            Forum durchsuchen
          </button>
        </div>
      </section>
    </div>
  );
}