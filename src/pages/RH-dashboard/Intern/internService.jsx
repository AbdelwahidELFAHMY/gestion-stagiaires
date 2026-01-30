import axiosInstance from "../../../utils/axiosInstance";

export const InternService = {
  async getAllInterns(params = {}) {
    try {
      const response = await axiosInstance.get("/interns", { params });
      return {
        items: response.data.items || response.data.content,
        total: response.data.total || response.data.totalElements,
        currentPage: response.data.currentPage || response.data.number,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error("Error fetching interns:", error);
      throw error;
    }
  },

  async getIntern(internId) {
    try {
      const response = await axiosInstance.get(`/interns/${internId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching intern:", error);
      throw error;
    }
  },

  async createIntern(internData) {
    try {
      const response = await axiosInstance.post("/interns", internData);
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.errors) {
          const formattedErrors = {};
          errorData.errors.forEach((err) => {
            formattedErrors[err.field] = err.defaultMessage;
          });
          throw formattedErrors;
        }
        throw new Error(errorData.message || "Failed to create intern");
      }
      throw error;
    }
  },

  async updateIntern(internId, internData) {
    try {
      const response = await axiosInstance.put(
        `/interns/${internId}`,
        internData
      );
      return response.data;
    } catch (error) {
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.errors) {
          const formattedErrors = {};
          errorData.errors.forEach((err) => {
            formattedErrors[err.field] = err.defaultMessage;
          });
          throw formattedErrors;
        }
        throw new Error(errorData.message || "Failed to update intern");
      }
      throw error;
    }
  },

  async deleteIntern(internId) {
    try {
      await axiosInstance.delete(`/interns/${internId}`);
    } catch (error) {
      console.error("Error deleting intern:", error);
      throw error;
    }
  },

  async getInternStats() {
    try {
      const response = await axiosInstance.get("/interns/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching intern stats:", error);
      throw error;
    }
  },

  async getInternsByDepartment(departmentId, params = {}) {
    try {
      const response = await axiosInstance.get(
        `/interns/department/${departmentId}`,
        { params }
      );
      return {
        items: response.data.content,
        total: response.data.totalElements,
        currentPage: response.data.number,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error("Error fetching interns by department:", error);
      throw error;
    }
  },

  async getInternsByStatus(status, params = {}) {
    try {
      const response = await axiosInstance.get(`/interns/status/${status}`, {
        params,
      });
      return {
        items: response.data.content,
        total: response.data.totalElements,
        currentPage: response.data.number,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error("Error fetching interns by status:", error);
      throw error;
    }
  },

  async searchInterns(query) {
    try {
      const response = await axiosInstance.get("/interns/search", {
        params: { q: query },
      });
      return {
        items: response.data.content,
        total: response.data.totalElements,
        currentPage: response.data.number,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      console.error("Error searching interns:", error);
      throw error;
    }
  },
};
