import Link from 'next/link';

// Typ für Fächer
interface Subject {
  id: string;
  title: string;
  description: string;
  image: string;
  tasksCount: number;
}

// Placeholder-Daten für die Fächer
const subjects: Subject[] = [
  {
    id: 'mathematik',
    title: 'Mathematik',
    description: 'Algebra, Geometrie, Analysis und mehr - interaktive Aufgaben für alle Schwierigkeitsgrade.',
    image: '/images/placeholder-math.jpg', // Später durch echte Bilder ersetzen
    tasksCount: 120
  },
  {
    id: 'deutsch',
    title: 'Deutsch',
    description: 'Grammatik, Rechtschreibung, Literatur und Textanalyse mit maßgeschneiderten Übungen.',
    image: '/images/placeholder-german.jpg',
    tasksCount: 85
  },
  {
    id: 'englisch',
    title: 'Englisch',
    description: 'Vokabeln, Grammatik und Sprachübungen für alle Niveaustufen.',
    image: '/images/placeholder-english.jpg',
    tasksCount: 98
  },
  {
    id: 'informatik',
    title: 'Informatik',
    description: 'Grundlagen der Programmierung, Datenbanken und Webentwicklung für Einsteiger.',
    image: '/images/placeholder-coding.jpg',
    tasksCount: 75
  }
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero-Sektion */}
      <section className="bg-indigo-50 rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-indigo-800 mb-4">Willkommen bei LernPlus</h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
          Entdecke interaktives Lernen mit personalisierten Aufgaben und KI-gestütztem Feedback.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/auth/register" 
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Jetzt starten
          </Link>
          <Link 
            href="/subjects" 
            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition"
          >
            Fächer entdecken
          </Link>
        </div>
      </section>

      {/* Fächerübersicht */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Unsere Fächer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <Link 
              href={`/subjects/${subject.id}`} 
              key={subject.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Placeholder für Bild - später durch echte Bilder ersetzen */}
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Fachbild: {subject.title}</span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{subject.title}</h3>
                <p className="text-gray-600 mt-2 mb-4 text-sm">{subject.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-600 font-medium">{subject.tasksCount} Aufgaben</span>
                  <span className="text-sm text-gray-500">Mehr erfahren →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Funktionsübersicht */}
      <section className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">So funktioniert LernPlus</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Aufgaben entdecken</h3>
            <p className="text-gray-600">Wähle aus einer Vielzahl von Fächern und Themen die passenden Aufgaben.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Interaktiv lernen</h3>
            <p className="text-gray-600">Bearbeite Aufgaben und erhalte sofortige Rückmeldung zu deinen Antworten.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fortschritt verfolgen</h3>
            <p className="text-gray-600">Verfolge deinen Lernfortschritt und erhalte personalisierte Empfehlungen.</p>
          </div>
        </div>
      </section>

      {/* Registrierungs-CTA */}
      <section className="bg-indigo-600 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Bereit zum Lernen?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Registriere dich jetzt kostenlos und erhalte Zugang zu allen Lernmaterialien und personalisierten Lernwegen.
        </p>
        <Link 
          href="/auth/register" 
          className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition"
        >
          Kostenlos registrieren
        </Link>
      </section>
    </div>
  );
}