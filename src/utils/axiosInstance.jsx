import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 1000000, // 10s timeout
  headers: { "Content-Type": "application/json" },
});

// Ajout de l'access token à chaque requête
axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Gestion des erreurs et refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Vérifier si l'erreur est une 401 et qu'on n'a pas déjà essayé un refresh
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        console.log("Attempting to refresh token...");
        
        const response = await axios.post(
          "http://localhost:8080/refreshToken",
          { refreshToken }, // Envoi le refreshToken dans le body
          {
            withCredentials: true,
          }
        );

        console.log("Refresh response:", response.data);

        const newAccessToken = response.data["access-token"];
        localStorage.setItem("accessToken", newAccessToken);

        // Rejouer la requête originale avec le nouveau token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);

        // Si le refresh échoue, rediriger vers la page de login
        if (window.location.pathname !== "/login") {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
