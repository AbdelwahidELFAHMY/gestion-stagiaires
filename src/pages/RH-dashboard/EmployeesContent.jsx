import React, { useState } from "react";
import ActionButtons from "./components/ActionButtons";
import DeleteConfirmation from "./components/DeleteConfirmation";
import EmployeeForm from "./components/forms/EmployeeForm";
import Modal from "./components/Modal";
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";
import Badge from "./components/Badge";
import { toast } from "react-toastify";

function EmployeesContent() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data for employees
  const employees = [
    {
      id: 1,
      name: "Mohamed Ali",
      email: "m.ali@entreprise.com",
      phone: "+212 612 345 678",
      department: "IT",
      position: "Chef Département",
      hireDate: "15/01/2020",
      status: "active",
      avatar: "https://source.unsplash.com/random/100x100?portrait&1",
    },
    {
      id: 2,
      name: "Fatima Zahra",
      email: "f.zahra@entreprise.com",
      phone: "+212 678 901 234",
      department: "RH",
      position: "Chef Département",
      hireDate: "22/05/2019",
      status: "active",
      avatar: "https://source.unsplash.com/random/100x100?portrait&2",
    },
    {
      id: 3,
      name: "Karim Benjelloun",
      email: "k.benjelloun@entreprise.com",
      phone: "+212 645 789 123",
      department: "IT",
      position: "Encadrent",
      hireDate: "10/09/2021",
      status: "active",
      avatar: "https://source.unsplash.com/random/100x100?portrait&3",
    },
    {
      id: 4,
      name: "Amina Elouardi",
      email: "a.elouardi@entreprise.com",
      phone: "+212 699 888 777",
      department: "Marketing",
      position: "Encadrent",
      hireDate: "03/03/2022",
      status: "inactive",
      avatar: "https://source.unsplash.com/random/100x100?portrait&4",
    },
  ];

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    toast.success(selectedEmployee ? "Employé mis à jour" : "Employé ajouté");
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    console.log("Deleting employee:", selectedEmployee);
    toast.success("Employé supprimé");
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Gestion des Employés"
        subtitle="Chefs de département et encadrents"
        onAdd={() => {
          setSelectedEmployee(null);
          setIsEditModalOpen(true);
        }}
      />

      <SearchBar
        placeholder="Rechercher un employé..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="bg-white rounded-xl shadow-md overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Employé
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Département
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Poste
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date Embauche
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Statut
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={employee.avatar}
                        alt={employee.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {employee.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {employee.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      color={
                        employee.position === "Chef Département"
                          ? "purple"
                          : "blue"
                      }
                    >
                      {employee.position}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {employee.hireDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      color={employee.status === "active" ? "green" : "red"}
                    >
                      {employee.status === "active" ? "Actif" : "Inactif"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <ActionButtons
                      onView={() => {
                        setSelectedEmployee(employee);
                        setIsViewModalOpen(true);
                      }}
                      onEdit={() => {
                        setSelectedEmployee(employee);
                        setIsEditModalOpen(true);
                      }}
                      onDelete={() => {
                        setSelectedEmployee(employee);
                        setIsDeleteModalOpen(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEmployees.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun employé trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* View Employee Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Détails de l'Employé"
        size="lg"
      >
        {selectedEmployee && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                className="h-16 w-16 rounded-full object-cover"
                src={selectedEmployee.avatar}
                alt={selectedEmployee.name}
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedEmployee.name}
                </h3>
                <p className="text-gray-500">{selectedEmployee.position}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="mt-1 text-gray-900">{selectedEmployee.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Téléphone</h4>
                <p className="mt-1 text-gray-900">{selectedEmployee.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Département
                </h4>
                <p className="mt-1 text-gray-900">
                  {selectedEmployee.department}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">
                  Date d'embauche
                </h4>
                <p className="mt-1 text-gray-900">
                  {selectedEmployee.hireDate}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Statut</h4>
                <div className="mt-1">
                  <Badge
                    color={
                      selectedEmployee.status === "active" ? "green" : "red"
                    }
                  >
                    {selectedEmployee.status === "active" ? "Actif" : "Inactif"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit/Add Employee Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={selectedEmployee ? "Modifier l'Employé" : "Ajouter un Employé"}
        size="lg"
      >
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer l'Employé"
        message={`Êtes-vous sûr de vouloir supprimer ${selectedEmployee?.name} ? Cette action est irréversible.`}
      />
    </div>
  );
}

export default EmployeesContent;
