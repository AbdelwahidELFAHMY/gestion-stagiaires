import { FolderKanban } from "lucide-react";
import React, { useState } from "react"; //
import ActionButtons from "./components/ActionButtons";
import DeleteConfirmation from "./components/DeleteConfirmation";
import DepartmentForm from "./components/forms/DepartmentForm";
import Modal from "./components/Modal";
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";
function DepartmentsContent() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleSubmit = (departmentData) => {
    console.log("Données soumises :", departmentData);
    setIsEditModalOpen(false); // Ferme le modal après soumission
  };
  const handleDelete = () => {
    console.log(`Suppression de ${selectedDepartment?.name}`);
    setIsDeleteModalOpen(false); // Ferme la modal de suppression
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Départements"
        onAdd={() => {
          setSelectedDepartment(null);
          setIsEditModalOpen(true);
        }}
      />
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
              <ActionButtons
                onView={() => {
                  setSelectedDepartment({ id: i, name: `Department ${i}` });
                  setIsViewModalOpen(true);
                }}
                onEdit={() => {
                  setSelectedDepartment({ id: i, name: `Department ${i}` });
                  setIsEditModalOpen(true);
                }}
                onDelete={() => {
                  setSelectedDepartment({ id: i, name: `Department ${i}` });
                  setIsDeleteModalOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Détails du Stagiaire"
      >
        {selectedDepartment && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Nom complet</h4>
              <p className="mt-1">{selectedDepartment.name}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={
          selectedDepartment ? "Modifier le Stagiaire" : "Ajouter un Stagiaire"
        }
      >
        <DepartmentForm
          department={selectedDepartment}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer le Stagiaire"
        message={`Êtes-vous sûr de vouloir supprimer ${selectedDepartment?.name} ? Cette action est irréversible.`}
      />
    </div>
  );
}
export default DepartmentsContent;
