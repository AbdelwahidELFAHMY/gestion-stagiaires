import axiosInstance from "../../../utils/axiosInstance";

// Custom error class
class EmployeeServiceError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = "EmployeeServiceError";
    this.status = status;
    this.details = details;
  }
}

export const EmployeeService = {
  async getAllEmployees(params = {}, config = {}) {
    const controller = new AbortController();
    try {
      const response = await axiosInstance.get("/employees", {
        params: {
          page: params.page,
          size: params.size || 10,
          query: params.query,
        },
        signal: controller.signal,
        ...config,
      });

      if (!response.data || !Array.isArray(response.data.content)) {
        throw new EmployeeServiceError("Invalid response format", 500);
      }

      return {
        data: response.data.content.map((employee) => ({
          ...employee,
          position: employee.position,
          status: employee.status,
        })),
        total: response.data.totalElements,
      };
    } catch (error) {
      if (error.name === "AbortError") {
        throw new EmployeeServiceError("Request cancelled", 0);
      }
      const message =
        error.response?.data?.message || "Error fetching employees";
      throw new EmployeeServiceError(
        message,
        error.response?.status || 500,
        error
      );
    } finally {
      controller.abort();
    }
  },

  async createEmployee(employeeData, config = {}) {
    const controller = new AbortController();
    try {
      if (!employeeData) {
        throw new EmployeeServiceError("Employee data is required", 400);
      }
      console.log("Sending POST /employees with data:", employeeData);
      const response = await axiosInstance.post("/employees", employeeData, {
        signal: controller.signal,
        ...config,
      });
      console.log("Create employee response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error);
      if (error.name === "AbortError") {
        throw new EmployeeServiceError("Request cancelled", 0);
      }
      const message =
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
          : error.response?.status === 400
          ? "Erreur de validation des données"
          : error.response?.status === 404
          ? "Département non trouvé"
          : "Erreur lors de la création de l'employé");
      throw new EmployeeServiceError(
        message,
        error.response?.status || 500,
        error.response?.data
      );
    } finally {
      controller.abort();
    }
  },

  async updateEmployee(employeeId, employeeData, config = {}) {
    console.log(employeeData);
    const controller = new AbortController();
    try {
      if (!employeeId || !employeeData) {
        throw new EmployeeServiceError(
          "Employee ID and data are required",
          400
        );
      }
      console.log(
        `Sending PUT /employees/${employeeId} with data:`,
        employeeData
      );
      const response = await axiosInstance.put(
        `/employees/${employeeId}`,
        employeeData,
        {
          signal: controller.signal,
          ...config,
        }
      );
      console.log("Update employee response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating employee:", error);
      if (error.name === "AbortError") {
        throw new EmployeeServiceError("Request cancelled", 0);
      }
      const message =
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
          : error.response?.status === 400
          ? "Erreur de validation des données"
          : error.response?.status === 404
          ? "Employé ou département non trouvé"
          : "Erreur lors de la mise à jour de l'employé");
      throw new EmployeeServiceError(
        message,
        error.response?.status || 500,
        error.response?.data
      );
    } finally {
      controller.abort();
    }
  },

  async deleteEmployee(employeeId, config = {}) {
    const controller = new AbortController();
    try {
      if (!employeeId) {
        throw new EmployeeServiceError("Employee ID is required", 400);
      }
      const response = await axiosInstance.delete(`/employees/${employeeId}`, {
        signal: controller.signal,
        ...config,
      });
      return response.data;
    } catch (error) {
      if (error.name === "AbortError") {
        throw new EmployeeServiceError("Request cancelled", 0);
      }
      throw new EmployeeServiceError(
        error.response?.data?.message || "Error deleting employee",
        error.response?.status || 500,
        error
      );
    } finally {
      controller.abort();
    }
  },
};
