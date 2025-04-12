'use client'
import SearchBar from '@/components/SearchBar';

export default function Page() {
  const handleSearch = (searchQuery: string) => {
    console.log('Suche nach:', searchQuery);
    // Hier kannst du deine Suchlogik implementieren
    // z.B. API-Anfragen senden, Daten filtern, etc.
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Passendes Material zum Buch</h1>
      <div className="flex justify-center">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Suche nach Inhalten..."
          className="mb-6 w-full max-w-md"
        />
      </div>
      {/* Rest deiner Komponente */}
    </div>
  );
}