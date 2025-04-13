"use client"; // Diese Zeile kennzeichnet die Datei als Client-Komponente

import { useState } from 'react';

export default function Page() {
  const Berufe = [
    { Beruf: "Kundenservice", wird_ersetzt: "Ja" },
    { Beruf: "Buchhaltung", wird_ersetzt: "Ja" },
    { Beruf: "Fließband Arbeiter", wird_ersetzt: "Ja" },
    { Beruf: "Verkaufspersonal", wird_ersetzt: "Ja" },
    { Beruf: "Telemarketing", wird_ersetzt: "Ja" }
  ];

  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Überprüfen, ob der eingegebene Beruf in der Liste vorhanden ist
    const found = Berufe.some(beruf => beruf.Beruf.toLowerCase() === value.toLowerCase());
    setResult(found ? "Ja" : "Nein");
  };

  const handleReset = () => {
    setInputValue('');
    setResult('');
  };

  return (
    <div>
      <div className="p-4 text-center bg-blue-600">
        <label htmlFor="Beruf" className="block text-white mb-2">Geben Sie einen Beruf ein:</label>
        <input
          type="text"
          className="bg-stone-100 text-gray-400"
          name="Beruf"
          id="Beruf"
          placeholder="Beruf:"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleReset} className="mt-2 bg-red-500 text-white p-2 rounded">Zurücksetzen</button>
      </div>
      <div className="p-4 text-center bg-blue-600">
        Wird der Job durch KI ersetzt?
        {result && (
          <div className="mt-4 text-white font-bold">
            <span>{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}