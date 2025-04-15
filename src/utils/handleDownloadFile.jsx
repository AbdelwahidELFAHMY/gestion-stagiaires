import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export const handleDownload = async (filePath, fileName) => {
  try {
    // Utilisez votre instance axios configurée
    const response = await axiosInstance.get("/files/download", {
      params: { filePath },
      responseType: "blob", // Important pour les fichiers
    });

    // Créer un URL blob pour le téléchargement
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName || "document");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Une erreur est servenue lors de telechargement, Veuillez Ressayer!")
  }
};