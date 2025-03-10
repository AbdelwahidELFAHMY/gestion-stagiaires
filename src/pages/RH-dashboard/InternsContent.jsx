import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ActionButtons from "./components/ActionButtons";
import DeleteConfirmation from "./components/DeleteConfirmation";
import InternForm from "./components/forms/InternForm";
import Modal from "./components/Modal";
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";

function InternsContent() {
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    toast.success(selectedIntern ? "Stagiaire mis à jour" : "Stagiaire ajouté");
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    console.log("Deleting intern:", selectedIntern);
    toast.success("Stagiaire supprimé");
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Gestion des Stagiaires"
        onAdd={() => {
          setSelectedIntern(null);
          setIsEditModalOpen(true);
        }}
      />
      <SearchBar placeholder="Rechercher un stagiaire..." />

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stagiaire
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Département
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sujet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Début
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://source.unsplash.com/random/100x100?face&${i}`}
                      alt=""
                    />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Stagiaire {i}
                      </div>
                      <div className="text-sm text-gray-500">
                        stagiaire{i}@example.com
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">IT</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Développement Web</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">01/03/2024</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Actif
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <ActionButtons
                    onView={() => {
                      setSelectedIntern({ id: i, name: `Stagiaire ${i}` });
                      setIsViewModalOpen(true);
                    }}
                    onEdit={() => {
                      setSelectedIntern({ id: i, name: `Stagiaire ${i}` });
                      setIsEditModalOpen(true);
                    }}
                    onDelete={() => {
                      setSelectedIntern({ id: i, name: `Stagiaire ${i}` });
                      setIsDeleteModalOpen(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Détails du Stagiaire"
      >
        {selectedIntern && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Nom complet</h4>
              <p className="mt-1">{selectedIntern.name}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={
          selectedIntern ? "Modifier le Stagiaire" : "Ajouter un Stagiaire"
        }
      >
        <InternForm
          intern={selectedIntern}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer le Stagiaire"
        message={`Êtes-vous sûr de vouloir supprimer ${selectedIntern?.name} ? Cette action est irréversible.`}
      />
    </div>
  );
}
export default InternsContent;
