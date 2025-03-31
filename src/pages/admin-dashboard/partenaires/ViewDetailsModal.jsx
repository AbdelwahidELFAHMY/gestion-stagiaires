import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Globe,
  Building,
  MapPin,
  User,
  Mail,
  Phone,
  Users,
  Activity,
  Briefcase,
  Calendar,
  Image as ImageIcon,
  User as UserIcon,
  Shield,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import CompanyLogo from "../../../utils/CompanyLogo";

export default function ViewDetailsModal({ entrepriseId, onClose }) {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!entrepriseId) return;

    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(
          `/admin/entreprises/${entrepriseId}`
        );
        console.log("API Response:", response.data); // <-- Ajoutez ceci
        setCompany(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [entrepriseId]);

  if (!entrepriseId) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 p-4"
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-200 dark:border-gray-700 max-h-[99vh] overflow-y-auto"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Chargement des détails...
              </p>
            </div>
          ) : error ? (
            <div className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <X className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-gray-100">
                Erreur
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {error}
              </p>
              <button
                onClick={onClose}
                className="cursor-pointer mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : company ? (
            <>
              <div className="flex items-start justify-between mb-4 sticky top-0 bg-white dark:bg-gray-800">
                <div className="flex items-start gap-4">
                  {company.logo ? (
                    <CompanyLogo
                      logoUrl={`${axiosInstance.defaults.baseURL.replace(
                        "/api",
                        ""
                      )}/logos/${company.logo.replace("logos/", "")}`}
                      alt={`Logo ${company.name}`}
                      className="h-16 w-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700 shadow-sm"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                      {company.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="bg-transparent">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                      {company.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-5 mt-2">
                      {company.website && (
                        <a
                          href={`${
                            !company.website.startsWith("http")
                              ? "https://" + company.website
                              : company.website
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          <Globe className="w-4 h-4" />
                          {company.website.replace(/(^\w+:|^)\/\//, "")}
                        </a>
                      )}
                      <span className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        {company.active ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-green-600 dark:text-green-400">
                              Actif
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                            <span className="text-red-600 dark:text-red-400">
                              Inactif
                            </span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Section Informations générales */}
                <div className="space-y-4">
                <div className="bg-gray-100 dark:bg-gray-700/30 p-4 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-5">
                      Informations générales
                    </h4>

                    <div className="space-y-4">
                      <InfoItem
                        icon={
                          <Building className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        }
                        label="Secteur d'activité"
                        value={company.industry || "Non spécifié"}
                      />
                      <InfoItem
                        icon={
                          <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        }
                        label="Adresse"
                        value={company.address || "Non spécifiée"}
                      />
                      <InfoItem
                        icon={
                          <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        }
                        label="Nombre de stagiaires"
                        value={company.nbrStagiaires || "0"}
                      />
                      <InfoItem
                        icon={
                          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        }
                        label="Date de création"
                        value={new Date(company.createdAt).toLocaleDateString()}
                      />
                      <InfoItem
                        icon={
                          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        }
                        label="Dernière mise à jour"
                        value={new Date(company.updatedAt).toLocaleDateString()}
                      />
                    </div>
                  </div>

                  {/* Section Contact */}
                  <div className="bg-gray-100 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-5">
                      Contact
                    </h4>

                    <div className="space-y-3">
                      <InfoItem
                        icon={
                          <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        }
                        label="Email"
                        value={company.email}
                        isLink
                      />
                      <InfoItem
                        icon={
                          <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        }
                        label="Téléphone"
                        value={company.phone || "Non spécifié"}
                        isLink={!!company.phone}
                      />
                    </div>
                  </div>
                </div>

                {/* Section Responsable RH */}
                <div className="space-y-4">
                  {company.admin ? (
                    <div className="bg-gray-100 dark:bg-gray-700/30 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-5">
                        Responsable RH
                      </h4>

                      <div className="flex items-start gap-4 mb-4">
                        {company.admin.photo ? (
                          <CompanyLogo
                            logoUrl={`${axiosInstance.defaults.baseURL.replace(
                              "/api",
                              ""
                            )}/photos/${company.admin.photo.replace(
                              "photos/",
                              ""
                            )}`}
                            alt={`Photo ${company.admin.fullName}`}
                            className="h-16 w-16 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                          />
                        ) : (
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                            {company.admin.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        )}
                        <h4 className="text-xl justify-center font-semibold text-gray-900 dark:text-gray-100">
                          {company.admin.fullName}
                        </h4>
                      </div>

                      <div className="space-y-3">
                        <InfoItem
                          icon={
                            <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          }
                          label="Email"
                          value={company.admin.email}
                          isLink
                        />
                        <InfoItem
                          icon={
                            <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          }
                          label="Téléphone"
                          value={company.admin.phone || "Non spécifié"}
                          isLink={!!company.admin.phone}
                        />
                        <InfoItem
                          label="Statut"
                          value={
                            company.admin.active ? (
                              <span className="text-green-600 dark:text-green-400 ">
                                <CheckCircle className="w-4 h-4 inline mr-3 text-green-600 dark:text-green-400" />
                                Actif
                              </span>
                            ) : (
                              <span className="text-red-600 dark:text-red-400">
                                <XCircle className="w-4 h-4 inline mr-3 text-red-600 dark:text-red-400" />
                                Inactif
                              </span>
                            )
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-3">
                        <Shield className="w-4 h-4" />
                        Responsable RH
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Aucun responsable RH assigné
                      </p>
                    </div>
                  )}

                  {/* Section Départements */}
                  <div className="bg-gray-100 dark:bg-gray-700/30 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-5">

                      Départements ({company.departements?.length || 0})
                    </h4>

                    {company.departements?.length > 0 ? (
                      <ul className="space-y-2">
                        {company.departements.map((dept, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                          >
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span>{dept}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">
                        Aucun département enregistré
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-4 text-size14 border-t border-gray-300 dark:border-gray-700 flex justify-end">
                <button
                  onClick={onClose}
                  className=" cursor-pointer px-5 py-2.5 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Fermer
                </button>
              </div>
            </>
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Composant réutilisable pour afficher une information
function InfoItem({ icon, label, value, isLink = false }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="mt-0.5">{icon}</div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
      </div>
      {isLink ? (
        <a
          href={label === "Email" ? `mailto:${value}` : `tel:${value}`}
          className="text-sm text-gray-900 dark:text-gray-100 hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm text-gray-900 dark:text-gray-100">
          {typeof value === "string" || typeof value === "number"
            ? value
            : value}
        </p>
      )}
    </div>
  );
}
