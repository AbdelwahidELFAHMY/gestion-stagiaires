import { FolderKanban } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ActionButtons from "../components/ActionButtons";
import DeleteConfirmation from "../components/DeleteConfirmation";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import DepartmentForm from "./DepartmentForm";
import { DepartmentService } from "./DepartmentService";

function DepartmentsContent() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAssignChefModalOpen, setIsAssignChefModalOpen] = useState(false);
  const [chefUsername, setChefUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);
      try {
        const data = await DepartmentService.getAllDepartments();
        setDepartments(data);
        setFilteredDepartments(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load departments");
        toast.error(err.message || "Failed to load departments");
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDepartments(departments);
    } else {
      const filtered = departments.filter((dept) =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDepartments(filtered);
    }
  }, [searchTerm, departments]);

  const handleSubmit = async (departmentData) => {
    try {
      console.log("HandleSubmit department data:", departmentData);
      let updatedDepartment;
      if (departmentData.id) {
        updatedDepartment = await DepartmentService.updateDepartment(
          departmentData.id,
          departmentData
        );
        setDepartments(
          departments.map((dept) =>
            dept.id === departmentData.id ? updatedDepartment : dept
          )
        );
        toast.success("Department updated successfully");
      } else {
        updatedDepartment = await DepartmentService.createDepartment(
          departmentData
        );
        setDepartments([...departments, updatedDepartment]);
        toast.success("Department created successfully");
      }
      setIsEditModalOpen(false);
      setSelectedDepartment(null);
    } catch (error) {
      console.error("Save error details:", error);
      toast.error(error || "Failed to save department");
      throw error; // Re-throw to let DepartmentForm display the error
    }
  };

  const handleDelete = async () => {
    if (!selectedDepartment) return;

    try {
      await DepartmentService.deleteDepartment(selectedDepartment.id);
      setDepartments(
        departments.filter((dept) => dept.id !== selectedDepartment.id)
      );
      toast.success("Department deleted successfully");
      setIsDeleteModalOpen(false);
      setSelectedDepartment(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error || "Failed to delete department");
    }
  };

  const handleAssignChef = async () => {
    if (!selectedDepartment || !chefUsername.trim()) return;

    try {
      const updatedDepartment = await DepartmentService.assignChefToDepartment(
        selectedDepartment.id,
        chefUsername
      );
      setDepartments(
        departments.map((dept) =>
          dept.id === selectedDepartment.id ? updatedDepartment : dept
        )
      );
      toast.success("Chef assigned successfully");
      setIsAssignChefModalOpen(false);
      setChefUsername("");
      setSelectedDepartment(null);
    } catch (error) {
      console.error("Assign chef error:", error);
      toast.error(error || "Failed to assign chef");
    }
  };

  const handleRemoveChef = async () => {
    if (!selectedDepartment) return;

    try {
      const updatedDepartment =
        await DepartmentService.removeChefFromDepartment(selectedDepartment.id);
      setDepartments(
        departments.map((dept) =>
          dept.id === selectedDepartment.id ? updatedDepartment : dept
        )
      );
      toast.success("Chef removed successfully");
      setSelectedDepartment(null);
    } catch (error) {
      console.error("Remove chef error:", error);
      toast.error(error || "Failed to remove chef");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Départements"
        onAdd={() => {
          setSelectedDepartment(null);
          setIsEditModalOpen(true);
        }}
      />
      <SearchBar
        placeholder="Rechercher un département..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredDepartments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {searchTerm
              ? "No departments match your search."
              : "No departments found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <div
              key={department.id}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{department.name}</h3>
                  <p className="text-sm text-gray-500">{department.sector}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FolderKanban className="text-indigo-600" size={20} />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Chef departement</span>
                  <span className="font-medium">
                    {department.chefUsername || "Non spécifié"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Localisation</span>
                  <span className="font-medium">{department.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium">
                    {department.email || "Non spécifié"}
                  </span>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <ActionButtons
                  onView={() => {
                    setSelectedDepartment(department);
                    setIsViewModalOpen(true);
                  }}
                  onEdit={() => {
                    setSelectedDepartment(department);
                    setIsEditModalOpen(true);
                  }}
                  onDelete={() => {
                    setSelectedDepartment(department);
                    setIsDeleteModalOpen(true);
                  }}
                />
                <button
                  onClick={() => {
                    setSelectedDepartment(department);
                    setIsAssignChefModalOpen(true);
                  }}
                  className="px-2 py-1 text-sm text-indigo-600 hover:text-indigo-800"
                  title="Assigner un chef"
                >
                  Assigner Chef
                </button>
                {department.chefUsername && (
                  <button
                    onClick={() => {
                      setSelectedDepartment(department);
                      handleRemoveChef();
                    }}
                    className="px-2 py-1 text-sm text-red-600 hover:text-red-800"
                    title="Retirer le chef"
                  >
                    Retirer Chef
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedDepartment(null);
        }}
        title="Détails du Département"
      >
        {selectedDepartment && (
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Nom</h4>
              <p className="mt-1">{selectedDepartment.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Secteur</h4>
              <p className="mt-1">{selectedDepartment.sector}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="mt-1">
                {selectedDepartment.description || "Non fournie"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Responsable</h4>
              <p className="mt-1">
                {selectedDepartment.chefUsername || "Non spécifié"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Localisation
              </h4>
              <p className="mt-1">{selectedDepartment.location}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="mt-1">
                {selectedDepartment.email || "Non spécifié"}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Entreprise ID
              </h4>
              <p className="mt-1">{selectedDepartment.entrepriseId}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedDepartment(null);
        }}
        title={
          selectedDepartment
            ? "Modifier le Département"
            : "Ajouter un Département"
        }
      >
        <DepartmentForm
          department={selectedDepartment}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedDepartment(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={isAssignChefModalOpen}
        onClose={() => {
          setIsAssignChefModalOpen(false);
          setSelectedDepartment(null);
          setChefUsername("");
        }}
        title="Assigner un Chef au Département"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom d'utilisateur du chef
            </label>
            <input
              type="text"
              value={chefUsername}
              onChange={(e) => setChefUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ex: john.doe"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsAssignChefModalOpen(false);
                setChefUsername("");
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={handleAssignChef}
              disabled={!chefUsername.trim()}
              className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 ${
                !chefUsername.trim() ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              Assigner
            </button>
          </div>
        </div>
      </Modal>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedDepartment(null);
        }}
        onConfirm={handleDelete}
        title="Supprimer le Département"
        message={`Êtes-vous sûr de vouloir supprimer "${selectedDepartment?.name}" ? Cette action est irréversible.`}
      />
    </div>
  );
}

export default DepartmentsContent;
