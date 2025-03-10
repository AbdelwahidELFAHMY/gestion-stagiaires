import { Download, Filter, Search } from "lucide-react";

function SearchBar({ placeholder }) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex-1 relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
        <Filter size={20} />
        Filtrer
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50">
        <Download size={20} />
        Exporter
      </button>
    </div>
  );
}

export default SearchBar;
