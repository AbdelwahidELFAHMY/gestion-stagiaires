import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";



  export const handleViewFile = async (filePath) => {
    try {
      const response = await axiosInstance.get("/files/view", {
        params: { filePath },
        responseType: "blob",
      });

      // Solution alternative sans react-pdf
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");

      // Nettoyage après 100ms
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error) {
      console.error("Error viewing file:", error);
      toast.error("Error viewing file:", error)
    }
  };