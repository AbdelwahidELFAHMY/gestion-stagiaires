import { jwtDecode } from "jwt-decode"; // Correct import

// Utility function to extract roles from the token
export const getUserRoles = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return [];

  try {
    const decoded = jwtDecode(token);
    return Array.isArray(decoded.roles) ? decoded.roles : [decoded.roles]; // Ensure array format
  } catch (error) {
    console.error("Invalid token:", error);
    return [];
  }
};