import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">LernPlus</h3>
            <p className="text-gray-600">
              Interaktive Lernplattform für Schüler und Lehrer mit KI-gestütztem Feedback und personalisierten Lernwegen.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-indigo-600 hover:text-indigo-800">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="#" className="text-indigo-600 hover:text-indigo-800">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="#" className="text-indigo-600 hover:text-indigo-800">
                  Hilfe & Support
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Email: info@lernplus.de</li>
              <li>Telefon: +49 123 456789</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} LernPlus. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}