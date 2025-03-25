import { FolderKanban } from "lucide-react";
import React from "react";
import ActionButtons from "./components/ActionButtons";
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";
function DepartmentsContent() {
  return (
    <div className="p-6">
      <PageHeader title="Départements" onAdd={() => {}} />
      <SearchBar placeholder="Rechercher un département..." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Département {i}</h3>
                <p className="text-sm text-gray-500">IT & Digital</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <FolderKanban className="text-indigo-600" size={20} />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Stagiaires actifs</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sujets disponibles</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Encadrants</span>
                <span className="font-medium">5</span>
              </div>
            </div>
            <div className="flex justify-end">
              <ActionButtons />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DepartmentsContent;
