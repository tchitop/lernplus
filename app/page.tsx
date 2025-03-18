import Link from 'next/link';
import { BookOpen, Users, Award, ChevronRight } from 'lucide-react';

// Interface for subject data
interface Subject {
  id: string;
  title: string;
  description: string;
  image: string;
  tasksCount: number;
  color: string; // Added color property for visual differentiation
  icon: string; // Added icon property
}

// Enhanced subject data with colors and icons
const subjects: Subject[] = [
  {
    id: 'mathematik',
    title: 'Mathematik',
    description: 'Algebra, Geometrie, Analysis und mehr - interaktive Aufgaben für alle Schwierigkeitsgrade.',
    image: '/images/subjects/math-bg.jpg',
    tasksCount: 120,
    color: 'from-blue-500 to-blue-700',
    icon: '📊'
  },
  {
    id: 'deutsch',
    title: 'Deutsch',
    description: 'Grammatik, Rechtschreibung, Literatur und Textanalyse mit maßgeschneiderten Übungen.',
    image: '/images/subjects/german-bg.jpg',
    tasksCount: 85,
    color: 'from-red-500 to-red-700',
    icon: '📝'
  },
  {
    id: 'englisch',
    title: 'Englisch',
    description: 'Vokabeln, Grammatik und Sprachübungen für alle Niveaustufen.',
    image: '/images/subjects/english-bg.jpg',
    tasksCount: 98,
    color: 'from-green-500 to-green-700',
    icon: '🌍'
  },
  {
    id: 'informatik',
    title: 'Informatik',
    description: 'Grundlagen der Programmierung, Datenbanken und Webentwicklung für Einsteiger.',
    image: '/images/subjects/coding-bg.jpg',
    tasksCount: 75,
    color: 'from-purple-500 to-purple-700',
    icon: '💻'
  }
];

// Statistics for the platform
const stats = [
  { label: 'Aktive Lernende', value: '10,000+' },
  { label: 'Aufgaben', value: '5,000+' },
  { label: 'Fächer', value: '12' },
  { label: 'Lehrer', value: '500+' }
];

// Testimonials
const testimonials = [
  {
    text: "LernPlus hat mir geholfen, meine Noten in Mathematik erheblich zu verbessern. Die interaktiven Aufgaben und das sofortige Feedback sind unglaublich hilfreich.",
    author: "Lisa M., Schülerin",
    stars: 5
  },
  {
    text: "Als Lehrer kann ich meinen Schülern individuelle Lernpfade zuweisen und ihren Fortschritt genau verfolgen. Die Plattform spart mir viel Zeit bei der Vorbereitung.",
    author: "Michael K., Lehrer",
    stars: 5
  }
];

export default function Home() {
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section - Modern and eye-catching */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:16px_16px]"></div>
        <div className="relative px-8 py-20 sm:px-12 md:px-16 md:py-24 lg:py-32 flex flex-col items-center text-white text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Lerne mit <span className="text-yellow-300">KI-gestütztem</span> Feedback
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-indigo-100 max-w-3xl">
            Entdecke personalisierte Lernwege, interaktive Übungen und sofortiges Feedback für deinen Bildungserfolg.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link 
              href="/auth/register" 
              className="px-8 py-4 bg-white text-indigo-700 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Kostenlos starten
            </Link>
            <Link 
              href="/subjects" 
              className="px-8 py-4 bg-indigo-800/50 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border border-indigo-400/30 hover:bg-indigo-700/60 transition-all"
            >
              Fächer entdecken
            </Link>
          </div>
          
          {/* Highlight cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="bg-indigo-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">Personalisiertes Lernen</h3>
              <p className="text-indigo-100">Auf dein Niveau angepasste Aufgaben und individuelle Lernpfade</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="bg-indigo-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">Community-Support</h3>
              <p className="text-indigo-100">Lerne gemeinsam mit Gleichgesinnten und erhalte Hilfe von Tutoren</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="bg-indigo-500 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">KI-Feedback</h3>
              <p className="text-indigo-100">Sofortiges, intelligentes Feedback zu jeder bearbeiteten Aufgabe</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="px-4">
        <div className="bg-gray-50 rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-indigo-600 mb-2">{stat.value}</span>
              <span className="text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects Section - Visually distinct cards */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Beliebte Fächer</h2>
          <Link 
            href="/subjects" 
            className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors"
          >
            Alle anzeigen <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subjects.map((subject) => (
            <Link 
              href={`/subjects/${subject.id}`} 
              key={subject.id}
              className="rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <div className={`h-32 bg-gradient-to-r ${subject.color} flex items-center justify-center`}>
                <span className="text-5xl">{subject.icon}</span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{subject.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{subject.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-medium">{subject.tasksCount} Aufgaben</span>
                  <span className="inline-flex items-center text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                    Mehr erfahren
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works - Clear process visualization */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">So funktioniert LernPlus</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute h-0.5 bg-indigo-200 top-24 left-0 right-0 z-0"></div>
          
          {/* Step 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 relative z-10">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6 mx-auto">1</div>
            <h3 className="text-xl font-bold text-center mb-4">Wähle dein Fach</h3>
            <p className="text-gray-600 text-center">
              Entdecke eine Vielzahl von Fächern und wähle die Themen, die dich interessieren oder in denen du dich verbessern möchtest.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 relative z-10">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6 mx-auto">2</div>
            <h3 className="text-xl font-bold text-center mb-4">Löse Aufgaben</h3>
            <p className="text-gray-600 text-center">
              Bearbeite interaktive Aufgaben mit steigendem Schwierigkeitsgrad und erhalte sofortiges, intelligentes Feedback zu deinen Antworten.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 relative z-10">
            <div className="bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-6 mx-auto">3</div>
            <h3 className="text-xl font-bold text-center mb-4">Verfolge deinen Fortschritt</h3>
            <p className="text-gray-600 text-center">
              Sieh dir deinen Lernfortschritt an, entdecke deine Stärken und arbeite gezielt an deinen Schwächen mit personalisierten Empfehlungen.
            </p>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Was unsere Nutzer sagen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border-l-4 border-indigo-500">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <p className="text-gray-600 font-medium">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-12 sm:px-12 lg:px-16 text-center text-white max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Bereit, dein Lernpotenzial zu entfalten?</h2>
            <p className="text-xl mb-10 text-indigo-100">
              Registriere dich kostenlos und beginne deinen personalisierten Lernweg mit LernPlus.
            </p>
            <Link 
              href="/auth/register" 
              className="px-8 py-4 bg-white text-indigo-700 rounded-xl font-semibold text-lg inline-block hover:bg-indigo-50 transition-all shadow-lg"
            >
              Kostenlos registrieren
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}