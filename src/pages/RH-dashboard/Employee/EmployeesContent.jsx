import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import ActionButtons from "../components/ActionButtons";
import Badge from "../components/Badge";
import DeleteConfirmation from "../components/DeleteConfirmation";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { DepartmentService } from "../Departments/DepartmentService";
import EmployeeForm from "./EmployeeForm";
import { EmployeeService } from "./employeeService";

// Constants aligned with backend enums
const POSITION_OPTIONS = [
  { value: "CHEF_DEPARTEMENT", label: "Chef de Département" },
  { value: "ENCADRENT", label: "Encadrant" },
];

const STATUS_OPTIONS = [
  { value: "ACTIVE", label: "Actif" },
  { value: "ON_LEAVE", label: "En congé" },
  { value: "INACTIVE", label: "Inactif" },
];

const EmployeesContent = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalState, setModalState] = useState({
    view: false,
    edit: false,
    delete: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    isSubmitting: false,
    isDeleting: false,
  });
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [departments, setDepartments] = useState([]);

  // Memoized fetch functions
  const fetchEmployees = useCallback(
    async (retryCount = 0) => {
      try {
        setLoadingState((prev) => ({ ...prev, isLoading: true }));
        setError(null);
        const response = await EmployeeService.getAllEmployees({
          page: pagination.page - 1,
          size: pagination.limit,
          query: searchTerm,
        });

        if (!response?.data || typeof response.total !== "number") {
          throw new Error("Invalid response format");
        }

        setEmployees(response.data);
        setPagination((prev) => ({ ...prev, total: response.total }));
      } catch (err) {
        if (retryCount < 2) {
          setTimeout(() => fetchEmployees(retryCount + 1), 1000);
          return;
        }
        setError(err.message || "Échec du chargement des données des employés");
        toast.error("Échec du chargement des données des employés");
      } finally {
        setLoadingState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [pagination.page, pagination.limit, searchTerm]
  );

  const fetchDepartments = useCallback(async () => {
    try {
      const data = await DepartmentService.getAllDepartments();
      if (!Array.isArray(data)) {
        throw new Error("Invalid departments data");
      }
      setDepartments(data);
    } catch (error) {
      console.error("Erreur lors du chargement des départements:", error);
      toast.error("Échec du chargement des départements");
    }
  }, []);

  // Initial data load
  useEffect(() => {
    const controller = new AbortController();
    const loadInitialData = async () => {
      await Promise.all([
        fetchEmployees(0, { signal: controller.signal }),
        fetchDepartments({ signal: controller.signal }),
      ]);
    };

    loadInitialData();
    return () => controller.abort();
  }, [fetchEmployees, fetchDepartments]);

  // Handlers
  const handleSubmit = useCallback(
    async (data) => {
      try {
        setLoadingState((prev) => ({ ...prev, isSubmitting: true }));
        console.log("Sending create/update request with data:", data);

        const action = selectedEmployee
          ? EmployeeService.updateEmployee(selectedEmployee.id, data)
          : EmployeeService.createEmployee(data);

        const response = await action;
        console.log("API response:", response);

        toast.success(
          selectedEmployee
            ? "Employé mis à jour avec succès"
            : "Employé créé avec succès"
        );
        await fetchEmployees();
        setModalState((prev) => ({ ...prev, edit: false }));
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        const errorMessage =
          error.response?.data?.message ||
          (error.response?.data?.errorCode === "INVALID_REQUEST"
            ? "Données invalides. Vérifiez les champs saisis."
            : error.response?.data?.message?.includes(
                "Cannot deserialize value of type"
              )
            ? "Valeur invalide pour le poste ou le statut."
            : error.response?.status === 400 &&
              error.response?.data?.includes("Department already has a chef")
            ? "Ce département a déjà un chef"
            : error.response?.status === 404
            ? "Département non trouvé"
            : "Erreur lors de l'opération");
        toast.error(errorMessage);
      } finally {
        setLoadingState((prev) => ({ ...prev, isSubmitting: false }));
      }
    },
    [selectedEmployee, fetchEmployees]
  );

  const handleDelete = useCallback(async () => {
    try {
      setLoadingState((prev) => ({ ...prev, isDeleting: true }));
      await EmployeeService.deleteEmployee(selectedEmployee.id);
      toast.success("Employé supprimé avec succès");
      await fetchEmployees();
      setModalState((prev) => ({ ...prev, delete: false }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Échec de la suppression");
    } finally {
      setLoadingState((prev) => ({ ...prev, isDeleting: false }));
    }
  }, [selectedEmployee, fetchEmployees]);

  const handlePageChange = useCallback((newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const toggleModal = useCallback((modalType, isOpen) => {
    setModalState((prev) => ({ ...prev, [modalType]: isOpen }));
    if (!isOpen) setSelectedEmployee(null);
  }, []);

  // Memoized table rows
  const tableRows = useMemo(
    () =>
      employees.map((employee) => (
        <tr
          key={employee.id}
          className="hover:bg-gray-50 transition-colors"
          role="row"
        >
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={employee.avatar || "/images/default-avatar.png"}
                  alt={`${employee.firstName || "N/A"} ${
                    employee.lastName || "N/A"
                  }`}
                  onError={(e) => {
                    e.target.src = "/images/default-avatar.png";
                  }}
                />
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  {employee.firstName || "N/A"} {employee.lastName || "N/A"}
                </div>
                <div className="text-sm text-gray-500">
                  {employee.email || "N/A"}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {employee.phone || "N/A"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {employee.department?.name || "N/A"}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge
              color={
                employee.position === "CHEF_DEPARTEMENT" ? "purple" : "blue"
              }
              className="capitalize"
            >
              {POSITION_OPTIONS.find((p) => p.value === employee.position)
                ?.label ||
                employee.position ||
                "N/A"}
            </Badge>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
              {formatDate(employee.hireDate)}
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Badge
              color={
                employee.status === "ACTIVE"
                  ? "green"
                  : employee.status === "ON_LEAVE"
                  ? "yellow"
                  : "red"
              }
            >
              {STATUS_OPTIONS.find((s) => s.value === employee.status)?.label ||
                employee.status ||
                "N/A"}
            </Badge>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <ActionButtons
              onView={() => {
                setSelectedEmployee(employee);
                toggleModal("view", true);
              }}
              onEdit={() => {
                setSelectedEmployee(employee);
                toggleModal("edit", true);
              }}
              onDelete={() => {
                setSelectedEmployee(employee);
                toggleModal("delete", true);
              }}
              aria-label={`Actions for ${employee.firstName || "N/A"} ${
                employee.lastName || "N/A"
              }`}
            />
          </td>
        </tr>
      )),
    [employees, formatDate, toggleModal]
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen" role="main">
      <PageHeader
        title="Gestion des Employés"
        subtitle="Administration des chefs de département et encadrants"
        onAdd={() => {
          setSelectedEmployee(null);
          toggleModal("edit", true);
        }}
        addButtonLabel="Nouvel Employé"
      />

      <div className="mb-6">
        <SearchBar
          placeholder="Rechercher un employé..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPagination((prev) => ({ ...prev, page: 1 }));
          }}
          onSearch={fetchEmployees}
          disabled={loadingState.isLoading}
          aria-label="Rechercher des employés"
        />
      </div>

      {loadingState.isLoading ? (
        <LoadingSpinner className="mt-12" aria-label="Chargement des données" />
      ) : error ? (
        <div
          className="bg-white rounded-xl shadow-md overflow-hidden mt-6 p-6 text-center text-red-500"
          role="alert"
        >
          {error}
          <button
            onClick={() => fetchEmployees()}
            className="ml-4 text-blue-600 hover:underline"
            aria-label="Réessayer le chargement"
          >
            Réessayer
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table
                className="min-w-full divide-y divide-gray-200"
                role="table"
                aria-label="Liste des employés"
              >
                <thead className="bg-gray-50">
                  <tr role="row">
                    {[
                      "Employé",
                      "Contact",
                      "Département",
                      "Poste",
                      "Date Embauche",
                      "Statut",
                      "Actions",
                    ].map((header, index) => (
                      <th
                        key={header}
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                          index === 6 ? "text-right" : ""
                        }`}
                        scope="col"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody
                  className="bg-white divide-y divide-gray-200"
                  role="rowgroup"
                >
                  {tableRows}
                </tbody>
              </table>

              {employees.length === 0 && (
                <div className="text-center py-12" role="alert">
                  <p className="text-gray-500">Aucun employé trouvé</p>
                </div>
              )}
            </div>
          </div>

          {pagination.total > pagination.limit && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={pagination.page}
                totalPages={Math.ceil(pagination.total / pagination.limit)}
                onPageChange={handlePageChange}
                aria-label="Navigation de pagination"
              />
            </div>
          )}
        </>
      )}

      {/* View Employee Modal */}
      <Modal
        isOpen={modalState.view}
        onClose={() => toggleModal("view", false)}
        title="Détails de l'Employé"
        size="lg"
        aria-labelledby="view-employee-modal"
      >
        {selectedEmployee && (
          <div className="space-y-6" role="dialog">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-16 w-16">
                <img
                  className="h-16 w-16 rounded-full object-cover"
                  src={selectedEmployee.avatar || "/images/default-avatar.png"}
                  alt={`${selectedEmployee.firstName || "N/A"} ${
                    selectedEmployee.lastName || "N/A"
                  }`}
                  onError={(e) => {
                    e.target.src = "/images/default-avatar.png";
                  }}
                />
              </div>
              <div>
                <h3
                  className="text-lg font-medium text-gray-900"
                  id="view-employee-modal"
                >
                  {selectedEmployee.firstName || "N/A"}{" "}
                  {selectedEmployee.lastName || "N/A"}
                </h3>
                <p className="text-gray-500 capitalize">
                  {POSITION_OPTIONS.find(
                    (p) => p.value === selectedEmployee.position
                  )?.label ||
                    selectedEmployee.position ||
                    "N/A"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Email", value: selectedEmployee.email || "N/A" },
                { label: "Téléphone", value: selectedEmployee.phone || "N/A" },
                {
                  label: "Département",
                  value: selectedEmployee.department?.name || "N/A",
                },
                {
                  label: "Date d'embauche",
                  value: formatDate(selectedEmployee.hireDate),
                },
                {
                  label: "Statut",
                  value: (
                    <Badge
                      color={
                        selectedEmployee.status === "ACTIVE"
                          ? "green"
                          : selectedEmployee.status === "ON_LEAVE"
                          ? "yellow"
                          : "red"
                      }
                    >
                      {STATUS_OPTIONS.find(
                        (s) => s.value === selectedEmployee.status
                      )?.label ||
                        selectedEmployee.status ||
                        "N/A"}
                    </Badge>
                  ),
                },
                {
                  label: "Nom d'utilisateur",
                  value: selectedEmployee.username || "N/A",
                },
              ].map((item, index) => (
                <div key={index}>
                  <h4 className="text-sm font-medium text-gray-500">
                    {item.label}
                  </h4>
                  <p className="mt-1 text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Edit/Add Employee Modal */}
      <Modal
        isOpen={modalState.edit}
        onClose={() => toggleModal("edit", false)}
        title={selectedEmployee ? "Modifier l'Employé" : "Ajouter un Employé"}
        size="lg"
        aria-labelledby="edit-employee-modal"
      >
        <EmployeeForm
          employee={selectedEmployee}
          positions={POSITION_OPTIONS}
          statuses={STATUS_OPTIONS}
          departments={departments}
          onSubmit={handleSubmit}
          onCancel={() => toggleModal("edit", false)}
          isLoading={loadingState.isSubmitting}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={modalState.delete}
        onClose={() => toggleModal("delete", false)}
        onConfirm={handleDelete}
        title="Supprimer l'Employé"
        message={`Êtes-vous sûr de vouloir supprimer définitivement ${
          selectedEmployee?.firstName || "N/A"
        } ${
          selectedEmployee?.lastName || "N/A"
        } ? Cette action est irréversible.`}
        isLoading={loadingState.isDeleting}
        aria-labelledby="delete-employee-modal"
      />
    </div>
  );
};

export default memo(EmployeesContent);
