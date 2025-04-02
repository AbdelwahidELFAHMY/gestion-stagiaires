// SearchModal.js
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
    <div className="absolute top-16 left-3/4 transform -translate-x-1/2 w-80 bg-white shadow-lg rounded-lg mt-2 p-4 z-10">
      <div className="text-gray-700">
        {results.length === 0 ? (
          <p className="text-gray-500">Aucun résultat trouvé.</p>
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
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">X</button>
    </div>
  );
};

export default SearchModal;
