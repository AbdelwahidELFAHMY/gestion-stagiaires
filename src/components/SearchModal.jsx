// SearchModal.js
import { X } from "lucide-react";
import { useState, useEffect } from "react";

const SearchModal = ({ query, onClose }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      // Simulate an API call or filter through data
      fetch(`/api/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => setResults(data))
        .catch((error) => console.error("Error fetching search results:", error));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="absolute top-11 left-1/4 min-h-36 items-center justify-center transform -translate-x-1/2 w-90 bg-white dark:bg-gray-700 shadow-md rounded-md mt-2 p-4 z-10">
      <div className="text-gray-700 h-full justify-center items-center">
        {results.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-200">Aucun résultat trouvé.</p>
        ) : (
          <ul>
            {results.map((result, index) => (
              <li key={index} className="py-2 hover:bg-gray-100 cursor-pointer">
                {result.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={onClose} className="absolute cursor-pointer rounded-full dark:bg-gray-600 bg-gray-100 p-1 top-2 right-2 dark:text-gray-200 text-gray-600"><X size={18}/></button>
    </div>
  );
};

export default SearchModal;
