import axiosInstance from "../../../utils/axiosInstance";

export const SupervisorService = {
  /**
   * Fetches all supervisors with optional pagination and filtering
   * @param {Object} params - Query parameters (page, size, search, etc.)
   * @returns {Promise<Object>} - Paginated response with content, totalPages, etc.
   */
  async getAllSupervisors(params = {}) {
    try {
      const response = await axiosInstance.get("/supervisors", { params });
      return {
        content: response.data.content,
        totalPages: response.data.totalPages,
        totalElements: response.data.totalElements,
      };
    } catch (error) {
      console.error("Error fetching supervisors:", error);
      throw this.handleError(error);
    }
  },

  /**
   * Fetches a single supervisor by ID
   * @param {string} supervisorId - ID of the supervisor to fetch
   * @returns {Promise<Object>} - Supervisor data
   */
  async getSupervisorById(supervisorId) {
    try {
      const response = await axiosInstance.get(`/supervisors/${supervisorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching supervisor ${supervisorId}:`, error);
      throw this.handleError(error);
    }
  },

  /**
   * Creates a new supervisor
   * @param {Object} supervisorData - Supervisor data to create
   * @returns {Promise<Object>} - Created supervisor data
   */
  async createSupervisor(supervisorData) {
    try {
      const response = await axiosInstance.post("/supervisors", supervisorData);
      return response.data;
    } catch (error) {
      console.error("Error creating supervisor:", error);
      throw this.handleError(error);
    }
  },

  /**
   * Updates an existing supervisor
   * @param {string} supervisorId - ID of the supervisor to update
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} - Updated supervisor data
   */
  async updateSupervisor(supervisorId, updateData) {
    try {
      const response = await axiosInstance.patch(
        `/supervisors/${supervisorId}`,
        updateData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating supervisor ${supervisorId}:`, error);
      throw this.handleError(error);
    }
  },

  /**
   * Deletes a supervisor
   * @param {string} supervisorId - ID of the supervisor to delete
   * @returns {Promise<Object>} - Delete confirmation
   */
  async deleteSupervisor(supervisorId) {
    try {
      const response = await axiosInstance.delete(
        `/supervisors/${supervisorId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting supervisor ${supervisorId}:`, error);
      throw this.handleError(error);
    }
  },

  /**
   * Updates supervisor's capacity (max interns)
   * @param {string} supervisorId - ID of the supervisor
   * @param {number} newCapacity - New max interns capacity
   * @returns {Promise<Object>} - Updated supervisor data
   */
  async updateSupervisorCapacity(supervisorId, newCapacity) {
    try {
      const response = await axiosInstance.patch(
        `/supervisors/${supervisorId}/capacity`,
        { maxInterns: newCapacity }
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error updating capacity for supervisor ${supervisorId}:`,
        error
      );
      throw this.handleError(error);
    }
  },

  /**
   * Fetches all interns assigned to a supervisor
   * @param {string} supervisorId - ID of the supervisor
   * @returns {Promise<Array>} - Array of interns
   */
  async getSupervisorInterns(supervisorId) {
    try {
      const response = await axiosInstance.get(
        `/supervisors/${supervisorId}/interns`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching interns for supervisor ${supervisorId}:`,
        error
      );
      throw this.handleError(error);
    }
  },

  /**
   * Handles API errors consistently
   * @param {Error} error - The error object
   * @returns {Error} - Processed error with user-friendly message
   */
  handleError(error) {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      // Server responded with a status code outside 2xx
      switch (error.response.status) {
        case 400:
          errorMessage = "Invalid request data";
          break;
        case 401:
          errorMessage = "Unauthorized access";
          break;
        case 404:
          errorMessage = "Resource not found";
          break;
        case 409:
          errorMessage = "Conflict - resource already exists";
          break;
        case 500:
          errorMessage = "Server error - please try again later";
          break;
        default:
          errorMessage = `Request failed with status ${error.response.status}`;
      }

      // If server provides specific error message, use that
      if (error.response.data?.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = "No response from server - please check your connection";
    }

    const processedError = new Error(errorMessage);
    processedError.status = error.response?.status;
    processedError.details = error.response?.data;

    return processedError;
  },
};
