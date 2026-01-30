import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ActionButtons from "../components/ActionButtons";
import DeleteConfirmation from "../components/DeleteConfirmation";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import StatusBadge from "../components/StatusBadge";
import { DepartmentService } from "../Departments/DepartmentService";
import InternDetails from "./InternDetails";
import InternForm from "./InternForm";
import { InternService } from "./internService";

function InternsContent() {
  const [interns, setInterns] = useState([]);
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 0,
    sortBy: "lastName",
    direction: "asc",
  });
  const [sortConfig, setSortConfig] = useState({
    sortBy: "lastName",
    direction: "asc",
  });
  const [filter, setFilter] = useState({
    departmentId: "",
    status: "",
  });
  const [departments, setDepartments] = useState([]);
  const [stats, setStats] = useState({
    totalInterns: 0,
    activeInterns: 0,
    pendingInterns: 0,
    completedInterns: 0,
    terminatedInterns: 0,
  });

  useEffect(() => {
    const fetchInterns = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: pagination.page,
          size: pagination.size,
          search: searchQuery,
          sortBy: sortConfig.sortBy,
          direction: sortConfig.direction,
        };

        let data;
        if (filter.departmentId) {
          data = await InternService.getInternsByDepartment(
            filter.departmentId,
            params
          );
        } else if (filter.status) {
          data = await InternService.getInternsByStatus(filter.status, params);
        } else {
          data = await InternService.getAllInterns(params);
        }

        setInterns(data.items);
        setPagination((prev) => ({
          ...prev,
          total: data.total,
        }));
      } catch (error) {
        toast.error("Failed to load interns");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const data = await DepartmentService.getAllDepartments();
        setDepartments(data);
      } catch (error) {
        toast.error("Failed to load departments");
      }
    };

    const fetchStats = async () => {
      try {
        const data = await InternService.getInternStats();
        setStats(data);
      } catch (error) {
        toast.error("Failed to load stats");
      }
    };

    fetchInterns();
    fetchDepartments();
    fetchStats();
  }, [
    pagination.page,
    pagination.size,
    searchQuery,
    sortConfig.sortBy,
    sortConfig.direction,
    filter.departmentId,
    filter.status,
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPagination((prev) => ({ ...prev, page: 0 }));
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleSort = (field) => {
    setSortConfig((prev) => ({
      sortBy: field,
      direction:
        prev.sortBy === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (selectedIntern) {
        await InternService.updateIntern(selectedIntern.id, data);
        toast.success("Intern updated successfully");
      } else {
        await InternService.createIntern(data);
        toast.success("Intern created successfully");
      }

      const params = {
        page: pagination.page,
        size: pagination.size,
        search: searchQuery,
        sortBy: sortConfig.sortBy,
        direction: sortConfig.direction,
      };
      const updatedData = filter.departmentId
        ? await InternService.getInternsByDepartment(
            filter.departmentId,
            params
          )
        : filter.status
        ? await InternService.getInternsByStatus(filter.status, params)
        : await InternService.getAllInterns(params);
      setInterns(updatedData.items);

      setIsEditModalOpen(false);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await InternService.deleteIntern(selectedIntern.id);
      toast.success("Intern deleted successfully");

      const params = {
        page: pagination.page,
        size: pagination.size,
        search: searchQuery,
        sortBy: sortConfig.sortBy,
        direction: sortConfig.direction,
      };
      const updatedData = filter.departmentId
        ? await InternService.getInternsByDepartment(
            filter.departmentId,
            params
          )
        : filter.status
        ? await InternService.getInternsByStatus(filter.status, params)
        : await InternService.getAllInterns(params);
      setInterns(updatedData.items);

      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Intern Management"
        description="Manage and track all interns in your organization"
        onAdd={() => {
          setSelectedIntern(null);
          setIsEditModalOpen(true);
        }}
        addButtonText="Add New Intern"
      />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Interns</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {stats.totalInterns}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Active</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {stats.activeInterns}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {stats.pendingInterns}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {stats.completedInterns}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Terminated</h3>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {stats.terminatedInterns}
          </p>
        </div>
      </div>

      <SearchBar
        placeholder="Search interns by name, email, or department..."
        onSearch={handleSearch}
        className="mb-6"
      />

      <div className="flex gap-4 mb-6">
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Department
          </label>
          <select
            value={filter.departmentId}
            onChange={(e) =>
              setFilter({ departmentId: e.target.value, status: "" })
            }
            className="block w-full rounded-lg border border-gray-300 px-3 py-2"
            aria-label="Filter by Department"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            value={filter.status}
            onChange={(e) =>
              setFilter({ departmentId: "", status: e.target.value })
            }
            className="block w-full rounded-lg border border-gray-300 px-3 py-2"
            aria-label="Filter by Status"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("lastName")}
                    aria-sort={
                      sortConfig.sortBy === "lastName"
                        ? sortConfig.direction
                        : "none"
                    }
                  >
                    Intern{" "}
                    {sortConfig.sortBy === "lastName" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("departmentName")}
                    aria-sort={
                      sortConfig.sortBy === "departmentName"
                        ? sortConfig.direction
                        : "none"
                    }
                  >
                    Department{" "}
                    {sortConfig.sortBy === "departmentName" &&
                      (sortConfig.direction === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {interns.length > 0 ? (
                  interns.map((intern) => (
                    <tr key={intern.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                intern.avatarUrl ||
                                `https://ui-avatars.com/api/?name=${intern.firstName}+${intern.lastName}&background=random`
                              }
                              alt={`${intern.firstName} ${intern.lastName}`}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {intern.firstName} {intern.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {intern.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {intern.departmentName || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {intern.university || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {intern.fieldOfStudy || ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(intern.startDate)} -{" "}
                          {formatDate(intern.endDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={intern.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <ActionButtons
                          onView={() => {
                            setSelectedIntern(intern);
                            setIsViewModalOpen(true);
                          }}
                          onEdit={() => {
                            setSelectedIntern(intern);
                            setIsEditModalOpen(true);
                          }}
                          onDelete={() => {
                            setSelectedIntern(intern);
                            setIsDeleteModalOpen(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No interns found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {interns.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-200">
              <Pagination
                currentPage={pagination.page}
                totalPages={Math.ceil(pagination.total / pagination.size)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Intern Details"
        size="lg"
      >
        {selectedIntern && (
          <InternDetails
            intern={selectedIntern}
            departmentName={selectedIntern.departmentName}
          />
        )}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={selectedIntern ? "Edit Intern" : "Add New Intern"}
        size="xl"
      >
        <InternForm
          intern={selectedIntern}
          onSubmit={handleSubmit}
          onCancel={() => setIsEditModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Intern"
        message={`Are you sure you want to delete ${selectedIntern?.firstName} ${selectedIntern?.lastName}? This action cannot be undone.`}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default InternsContent;
