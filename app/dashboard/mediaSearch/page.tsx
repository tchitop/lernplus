'use client'
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function MediaSearch() {
  const searchParams = useSearchParams();
  const [input, setInput] = useState('');
  const [summaryTitle, setSummaryTitle] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const [showSummaryBox, setShowSummaryBox] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  // Beim Laden der Komponente den Query-Parameter auslesen
  useEffect(() => {
    const themeParam = searchParams.get('theme');
    if (themeParam) {
      setInput(themeParam);
      
      // Prüfe, ob das Thema in den Büchern existiert
      const matchedBook = books.find(book => 
        book.toLowerCase().includes(themeParam.toLowerCase())
      );
      
      if (matchedBook) {
        showSummary(matchedBook);
        // Auch Vorschläge aktualisieren
        const filtered = books.filter(book => 
          book.toLowerCase().includes(themeParam.toLowerCase())
        );
        setSuggestions(filtered);
      }
    }
  }, [searchParams]);

  const books = [
    "Harry Potter und der Stein der Weisen", 
    "Der Herr der Ringe",
    "Die Tribute von Panem",
    "Das Parfum",
    "Der kleine Prinz",
    "1984",
    "Faust",
    "Die unendliche Geschichte",
    "Momo",
    "Tintenherz",
    "Winnetou",
    "Der Vorleser",
    "Kinder- und Hausmärchen",
    "Struwwelpeter",
    "Grimms Märchen",
    "Der Process",
    "Der Zauberberg",
    "Die Dreigroschenoper",
    "Siddhartha",
    "Kill",
    "In der Strafkolonie",
    "Medea",
    "Woyzeck",
    "Maria Stuart",
    "Nathan der Weise",
    "Nathan und seine Kinder",
    "SCHEIßE"
  ];

  const summaries = {
    "Harry Potter und der Stein der Weisen": `Harry entdeckt, dass er ein Zauberer ist und besucht die Hogwarts-Schule für Hexerei und Zauberei. 
Mehr Infos auf <a href="https://de.wikipedia.org/wiki/Harry_Potter_und_der_Stein_der_Weisen_(Film)" target="_blank">Wikipedia</a>.`,
    "Der Herr der Ringe": "Ein Hobbit erhält den Auftrag, einen mächtigen Ring zu zerstören, um das Böse zu besiegen.",
    "Die Tribute von Panem": "Katniss Everdeen kämpft ums Überleben in einem brutalen Wettkampf einer dystopischen Welt.",
    "Der kleine Prinz": "Ein Pilot trifft auf einen kleinen Prinzen von einem anderen Planeten, der ihm tiefe Wahrheiten über das Leben erzählt.",
    "1984": "Ein totalitärer Überwachungsstaat kontrolliert jede Bewegung seiner Bürger – doch Winston wagt den Widerstand.",
    "Faust": `Dr. Faust schließt einen Pakt mit Mephisto, um die Geheimnisse der Welt zu erfahren.  
<br>👉 <a href="https://de.wikipedia.org/wiki/Faust_(2011)" target="_blank">Moderner Film (2011)</a>  
<br>🎬 <a href="https://de.wikipedia.org/wiki/Faust_(1960)" target="_blank">Älterer Film (1960)</a>`,
    "Momo": "Ein Mädchen mit der Fähigkeit, Menschen wirklich zuzuhören, kämpft gegen die grauen Herren der Zeit.",
    "Tintenherz": "Ein Mann kann Figuren aus Büchern lebendig lesen – mit gefährlichen Folgen.",
    "Siddhartha": "Ein junger Brahmane begibt sich auf eine spirituelle Reise zur Erleuchtung.",
    "Nathan und seine Kinder": `Eine moderne Fortsetzung von Lessings "Nathan der Weise", die Themen wie Toleranz und Identität behandelt.  
👉 Eine Zusammenfassung aller Kapitel findest du <a href="https://www.buchhilfe.net/nathan-und-seine-kinder-mirjam-pressler/kapitelzusammenfassung/" target="_blank">hier auf buchhilfe.net</a>.`,
    "Nathan der Weise": `Ein klassisches Drama von Gotthold Ephraim Lessing über Humanität, Toleranz und religiöse Verständigung.  
📘 Weitere Informationen findest du <a href="https://www.schuelerhilfe.de/online-lernen/2-deutsch/3185-nathan-der-weise-zusammenfassung" target="_blank">hier bei Schülerhilfe</a>.`,
    "Der Vorleser": `Ein junger Mann erlebt eine geheimnisvolle Liebesbeziehung mit einer älteren Frau, deren Vergangenheit ihn später vor ein moralisches Dilemma stellt.  
🎬 Einen Film zum Buch findest du <a href="https://de.wikipedia.org/wiki/Der_Vorleser_(Film)" target="_blank">hier auf Wikipedia</a>.`,
    "Kill": `Ein spannendes Jugendbuch von Mats Wahl, das sich mit den Themen Gewalt, Schuld und Gerechtigkeit auseinandersetzt.  
📖 Eine Zusammenfassung aller Kapitel findest du <a href="https://dokumente-online.com/kapitelzusammenfassung-des-buches-kill-mats-wahl.html" target="_blank">hier auf dokumente-online.com</a>.`,
    // Weitere Zusammenfassungen kannst du hier hinzufügen
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    if (value === "") {
      setSuggestions([]);
      setShowSummaryBox(false);
      return;
    }
    
    const filtered = books.filter(book => 
      book.toLowerCase().includes(value.toLowerCase())
    );
    
    setSuggestions(filtered);
  };

  const handleSuggestionClick = (book) => {
    setInput(book);
    setSuggestions([]);
    showSummary(book);
  };

  const showSummary = (book) => {
    setSummaryTitle(book);
    setSummaryText(summaries[book] || "Für dieses Buch liegt noch keine Zusammenfassung vor.");
    setShowSummaryBox(true);
  };

  const goBack = () => {
    // In einer echten App würde dies zur Startseite navigieren
    // Für diese Komponente setzen wir einfach alles zurück
    setInput('');
    setSuggestions([]);
    setShowSummaryBox(false);
  };

  return (
    <div className="bg-purple-50 font-sans p-10">
      <h1 className="text-center text-purple-800 text-2xl font-bold mb-6">📚Buchsammlung</h1>

      <div className="max-w-xl mx-auto relative">
        <input 
          type="text" 
          value={input}
          onChange={handleInputChange}
          placeholder="Suche nach einem Buch..." 
          className="w-full p-4 text-base text-gray-400 border-2 border-purple-700 rounded-lg focus:outline-none focus:border-purple-900"
        />
        
        {suggestions.length > 0 && (
          <div className="absolute w-full bg-white border border-gray-300 border-t-0 rounded-b-lg shadow-md z-10 max-h-52 overflow-y-auto">
            {suggestions.map((book, index) => (
              <div 
                key={index} 
                onClick={() => handleSuggestionClick(book)}
                className="p-3 cursor-pointer hover:bg-gray-100 text-gray-300 hover:text-gray-400"
              >
                {book}
              </div>
            ))}
          </div>
        )}
      </div>

      {showSummaryBox && (
        <div className="max-w-xl mx-auto mt-8 bg-white p-5 rounded-lg shadow-md">
          <div className="font-bold text-lg mb-2 text-purple-800">{summaryTitle}</div>
          <div dangerouslySetInnerHTML={{ __html: summaryText }} className="text-gray-400"/>
        </div>
      )}

      <button 
        onClick={goBack}
        className="mt-6 mx-auto block py-4 px-8 text-lg bg-purple-700 text-white rounded-lg border-none cursor-pointer transition-colors duration-300 hover:bg-purple-800"
      >
        Zurück zur Startseite
      </button>
    </div>
  );
}
