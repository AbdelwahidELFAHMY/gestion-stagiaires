import PropTypes from "prop-types"; // Importation de PropTypes
import { Navigate, Outlet } from "react-router-dom";
import { getUserRoles } from "../utils/getUserRoles";

const ProtectedRoute = ({ allowedRoles }) => {
  const roles = getUserRoles();

  if (!roles) {
    return <Navigate to="/login" replace />;
  }

  const hasAccess = roles.some((role) => allowedRoles.includes(role));

  return hasAccess ? <Outlet /> : <Navigate to="/login" replace />;
};

// Validation des props
ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // allowedRoles doit être un tableau de chaînes de caractères
};

export default ProtectedRoute;
