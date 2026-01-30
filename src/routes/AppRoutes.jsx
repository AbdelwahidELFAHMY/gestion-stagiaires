import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Contact from "../pages/Contact.jsx"; // Correction de l'import
import ProtectedRoute from "./ProtectedRoute.jsx";
import DashboardAdmin from "../pages/admin-dashboard/DashboardAdmin.jsx";
import DashboardStagiaire from "../pages/stagiaire-dashboard/DashboardStagiaire.jsx";
import DashboardEncadrant from "../pages/encadrant-dashboard/DashboardEncadrant.jsx";
import DashboardRH from "../pages/RH-dashboard/DashboardRH.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import Login from "../components/Login.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<NotFoundPage />} />

        {/* Routes protégées */}
        <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
          <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["STAGIAIRE"]} />}>
          <Route path="/dashboard-stagiaire" element={<DashboardStagiaire />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["RH"]} />}>
          <Route path="/dashboard-rh" element={<DashboardRH />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["ENCADRANT"]} />}>
          <Route path="/dashboard-encadrant" element={<DashboardEncadrant />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["CHEF_DEPARTEMENT"]} />}>
          <Route path="/dashboard-chef-" element={<DashboardEncadrant />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
