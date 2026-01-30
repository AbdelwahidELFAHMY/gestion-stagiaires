import axiosInstance from "../../../utils/axiosInstance";

export const DepartmentService = {
  async getAllDepartments() {
    try {
      const response = await axiosInstance.get("/departments");
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error.response?.data?.message || "Failed to fetch departments";
    }
  },

  async getDepartment(departmentId) {
    try {
      const response = await axiosInstance.get(`/departments/${departmentId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching department:", error);
      throw error.response?.data?.message || "Failed to fetch department";
    }
  },

  async createDepartment(departmentData) {
    try {
      const sanitizedData = {
        name: departmentData.name,
        description: departmentData.description,
        chefUsername: departmentData.chefUsername || null,
        email: departmentData.email || null,
        sector: departmentData.sector,
        location: departmentData.location,
        entrepriseId: Number(departmentData.entrepriseId), // Ensure number
      };
      console.log("Create department payload:", sanitizedData);
      const response = await axiosInstance.post("/departments", sanitizedData);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating department:",
        error.response?.data || error
      );
      throw error.response?.data?.message || "Failed to create department";
    }
  },

  async updateDepartment(departmentId, departmentData) {
    try {
      const sanitizedData = {
        id: Number(departmentId), // Ensure ID matches URL
        name: departmentData.name,
        description: departmentData.description,
        chefUsername: departmentData.chefUsername || null,
        email: departmentData.email || null,
        sector: departmentData.sector,
        location: departmentData.location,
        entrepriseId: Number(departmentData.entrepriseId), // Ensure number
      };
      console.log("Update department payload:", sanitizedData);
      const response = await axiosInstance.put(
        `/departments/${departmentId}`,
        sanitizedData
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating department:",
        error.response?.data || error
      );
      throw error.response?.data?.message || "Failed to update department";
    }
  },

  async deleteDepartment(departmentId) {
    try {
      const response = await axiosInstance.delete(
        `/departments/${departmentId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting department:", error);
      throw error.response?.data?.message || "Failed to delete department";
    }
  },

  async assignChefToDepartment(departmentId, chefUsername) {
    try {
      const response = await axiosInstance.put(
        `/departments/${departmentId}/chef/${chefUsername}`
      );
      return response.data;
    } catch (error) {
      console.error("Error assigning chef:", error);
      throw error.response?.data?.message || "Failed to assign chef";
    }
  },

  async removeChefFromDepartment(departmentId) {
    try {
      const response = await axiosInstance.delete(
        `/departments/${departmentId}/chef`
      );
      return response.data;
    } catch (error) {
      console.error("Error removing chef:", error);
      throw error.response?.data?.message || "Failed to remove chef";
    }
  },
};
