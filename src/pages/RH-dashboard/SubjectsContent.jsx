import React from "react";
import ActionButtons from "./components/ActionButtons";
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";
function SubjectsContent() {
  return (
    <div className="p-6">
      <PageHeader title="Sujets de Stage" onAdd={() => {}} />
      <SearchBar placeholder="Rechercher un sujet..." />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Développement Web {i}</h3>
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Disponible
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Stage de développement web fullstack avec React et Node.js.
              Création d'une application web moderne et responsive.
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>Département IT</span>
              <span>6 mois</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">3 candidats</span>
              <ActionButtons />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SubjectsContent;
