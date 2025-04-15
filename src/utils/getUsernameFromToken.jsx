import { jwtDecode } from "jwt-decode";

export const getUsernameFromToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.sub; // Le username est dans le champ 'sub' (subject) du token
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};