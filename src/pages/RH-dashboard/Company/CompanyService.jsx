// src/services/companyService.js
import axiosInstance from "../../../utils/axiosInstance";

export const CompanyService = {
  async getCompany(companyId) {
    try {
      const response = await axiosInstance.get(`/rh/${companyId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching company:", error);
      throw error;
    }
  },

  async updateCompany(companyId, companyData) {
    try {
      const response = await axiosInstance.put(`/rh/${companyId}`, companyData);
      return response.data;
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    }
  },

  async createCompany(companyData) {
    try {
      const response = await axiosInstance.post("/rh", companyData);
      return response.data;
    } catch (error) {
      console.error("Error creating company:", error);
      throw error;
    }
  },

  async deleteCompany(companyId) {
    try {
      const response = await axiosInstance.delete(`/rh/${companyId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting company:", error);
      throw error;
    }
  },
};
