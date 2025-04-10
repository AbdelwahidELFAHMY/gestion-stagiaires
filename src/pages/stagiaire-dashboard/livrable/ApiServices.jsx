import axiosInstance from "../../../utils/axiosInstance";

  
  export const submitDocument = async (username, documentData) => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("nom", documentData.name || documentData.file.name);
      formData.append("type", documentData.file.type);
      formData.append("taille", documentData.file.size);
      formData.append("file", documentData.file);
  
      const response = await axiosInstance.post("/livrables/documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting document:", error);
      throw error;
    }
  };


  export const deleteDocument = async (id) => {
    try {
      await axiosInstance.delete(`/livrables/documents/${id}`);
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  };
  



    export const getDocuments = async (username) => {
      try {
        const response = await axiosInstance.get(`/livrables/documents/${username}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching documents:", error);
        throw error;
      }
    };


    export const submitGithubLink = async (username, githubLink) => {
      try {
        const response = await axiosInstance.post("/livrables/github", {
          username,
          githubLink,
        });
        return response.data;
      } catch (error) {
        console.error("Error submitting GitHub link:", error);
        throw error;
      }
    };
    