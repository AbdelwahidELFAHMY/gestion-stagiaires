import { useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserRoles } from "../utils/getUserRoles";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectPath, setRedirectPath] = useState(null); // Store redirect path

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        { username, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
  
      // Extract tokens from response
      const { "access-token": accessToken, "refresh-token": refreshToken } =
        response.data;
        console.log(accessToken,"       ",refreshToken)


      // Store in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Get user roles
      const roles = getUserRoles();

      if (roles.includes("ADMIN")) setRedirectPath("/dashboard-admin");
      else if (roles.includes("RH")) setRedirectPath("/dashboard-rh");
      else if (roles.includes("STAGIAIRE")) setRedirectPath("/dashboard-stagiaire");
      else if (roles.includes("ENCADRANT")) setRedirectPath("/dashboard-encadrant");
      else setRedirectPath("/login");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed!");
    }
  };
  

  // Redirect if path is set
  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Se connecter</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Champ Email */}
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre email"
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="block text-gray-700 font-medium">Mot de passe</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entrez votre mot de passe"
            />
          </div>

          {/* Bouton Se connecter */}
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Se connecter
          </button>
        </form>

        {/* Lien Mot de passe oublié */}
        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Mot de passe oublié ?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
