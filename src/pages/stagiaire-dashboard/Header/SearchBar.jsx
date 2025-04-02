import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchModal from "./SearchModal";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Handler défini dans le composant
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCloseSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        type="search"
        className="pl-10 rounded p-2 text-sm border-1 bg-gray-100 border-gray-300 focus:outline-none"
        placeholder="Rechercher"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchQuery && <SearchModal query={searchQuery} onClose={handleCloseSearch} />}
    </div>
  );
};

export default SearchBar;