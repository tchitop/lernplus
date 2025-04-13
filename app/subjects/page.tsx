import Link from "next/link";
export default function Subjects() {

    interface Subject {
        id: string;
        title: string;
        description: string;
        image: string;
        tasksCount: number;
        color: string;
        icon: string;
        classes: string;
      }

    const subjects: Subject[] = [
        {
          id: 'mathematik',
          title: 'Mathematik',
          description: 'Algebra, Geometrie, Analysis und mehr - interaktive Aufgaben für alle Schwierigkeitsgrade.',
          image: '/images/subjects/math-bg.jpg',
          tasksCount: 120,
          color: 'from-blue-500 to-blue-700',
          icon: '📊',
          classes: "5,6,7,8,9,10,11,12"
        },
        {
          id: 'deutsch',
          title: 'Deutsch',
          description: 'Grammatik, Rechtschreibung, Literatur und Textanalyse mit maßgeschneiderten Übungen.',
          image: '/images/subjects/german-bg.jpg',
          tasksCount: 85,
          color: 'from-red-500 to-red-700',
          icon: '📝',
          classes: "5,6,7,8,9,10,11,12",
        },
        {
          id: 'englisch',
          title: 'Englisch',
          description: 'Vokabeln, Grammatik und Sprachübungen für alle Niveaustufen.',
          image: '/images/subjects/english-bg.jpg',
          tasksCount: 98,
          color: 'from-green-500 to-green-700',
          icon: '🌍',
          classes: "5,6,7,8,9,10 [11,12]"
        },
        {
          id: 'informatik',
          title: 'Informatik',
          description: 'Grundlagen der Programmierung, Datenbanken und Webentwicklung für Einsteiger.',
          image: '/images/subjects/coding-bg.jpg',
          tasksCount: 75,
          color: 'from-purple-500 to-purple-700',
          icon: '💻',
          classes: "7,8,9,10 [11,12]"
        }
      ];
    return ( 
        <div>
            <p className="my-4">Verfügbare Fächer:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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
                  <span className="text-gray-400 font-medium text-center">Verfügbar für Klasse: {subject.classes}</span> 
                  <span className="inline-flex items-center text-sm bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-medium">
                    Mehr erfahren
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
    )
}