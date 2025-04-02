import { useEffect, useState } from "react";
import {
  FaEye,
  FaTrashAlt,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import DeleteCompanyModal from "./DeleteCompanyModal";
import ViewDetailsModal from "./ViewDetailsModal";
import {
  fetchEntreprises,
  deleteEntreprise,
  toggleEntrepriseStatus,
  createEntreprise,
} from "../../../stores/entreprises_slices/entreprisesSlice";
import { useDispatch, useSelector } from "react-redux";
import AddCompanyModal from "./AddCompanyModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Companies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCompany, setCurrentCompany] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [modalType, setModalType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const companiesPerPage = 6;

  const dispatch = useDispatch();
  const entreprises = useSelector((state) => state.entreprises.entreprises);
  const loading = useSelector((state) => state.entreprises.loading);
  const error = useSelector((state) => state.entreprises.error);

  useEffect(() => {
    dispatch(fetchEntreprises());
  }, [dispatch]);
  // Filtrer les entreprises
  const filteredCompanies = entreprises.filter((company) => {
    const matchesSearch = company.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      filterStatus === "" ||
      (filterStatus === "active"
        ? company.active === true
        : company.active === false);
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleToggleStatus = (id) => {
    const entreprise = entreprises.find((e) => e.entrepriseId === id);
    if (entreprise != null) {
      dispatch(toggleEntrepriseStatus({ id, isActive: entreprise.active }));
    }
  };

  const handleAddCompany = async ({ entreprise, rh }) => {
    try {
      // Vérification supplémentaire côté client
      if (
        entreprise.logo?.size > 5 * 1024 * 1024 ||
        rh.photo?.size > 5 * 1024 * 1024
      ) {
        throw new Error("Les fichiers ne doivent pas dépasser 5MB");
      }

      const resultAction = await dispatch(createEntreprise({ entreprise, rh }));

      if (createEntreprise.fulfilled.match(resultAction)) {
        toast.success(
          <div className="text-center mt-3 mb-2">
            <strong className="text-size15">
              Entreprise créée avec succès
            </strong>
          </div>,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progressStyle: { background: "green" },
            progress: undefined,
          }
        );
        setShowAddModal(false);
        dispatch(fetchEntreprises()); // Rafraîchir la liste
      } else {
        throw new Error(resultAction.payload || "Erreur lors de la création");
      }
    } catch (error) {
      console.error("Erreur création entreprise:", error);
      let errorMessage = error.message || "Erreur lors de la création";

      if (error.response?.data?.message?.includes("size")) {
        errorMessage =
          "La taille des fichiers dépasse la limite autorisée (5MB max)";
      }

      toast.error(
        <div className="text-center mt-3 mb-2">
          <strong className=" text-size15">
            {errorMessage || "Une erreur est survenue"}
          </strong>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          pauseOnHover: true,
          progressStyle: { background: "red" },
          progress: undefined,
        }
      );
    }
  };

  // Fonction pour confirmer la suppression
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEntreprise(id)).unwrap();
      toast.success(
        <div className="text-center mt-3 mb-2">
          <strong className="text-size15">
            Entreprise supprimée avec succès{" "}
          </strong>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressStyle: { background: "green" },
          progress: undefined,
        }
      );
    } catch (error) {
      toast.error(
        <div className="text-center mt-3 mb-2">
          <strong className="text-size15">
          Erreur lors de la suppression: {error}
          </strong>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressStyle: { background: "green" },
          progress: undefined,
        }
      );
    }
  };



  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Chargement des entreprises en cours...
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Veuillez patienter
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-3xl text-red-500 dark:text-red-400" />
          <h3 className="text-xl font-medium text-red-700 dark:text-red-300">
            Erreur de chargement des entreprises
          </h3>
        </div>
        <p className="text-center text-gray-700 dark:text-gray-300">
          {error || "Une erreur inconnue est survenue"}
        </p>
        <button
          onClick={() => dispatch(fetchEntreprises())}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mt-3 flex items-center justify-between gap-6">
        <div className="relative w-full md:w-80 text-size13">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400" />
          <input
            type="search"
            placeholder="Rechercher une entreprise..."
            className="pl-10 w-full py-2 px-4 text-gray-800 placeholder:text-gray-600 dark:placeholder:text-gray-400 dark:text-gray-300 border-thin border-gray-200 dark:border-gray-500 focus:outline-none rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <span className="text-size14 text-gray-700 dark:text-gray-300">
              Filtrer par statut:
            </span>
            <select
              className="py-1.5 px-6 text-size14 cursor-pointer outline-none border-thin dark:text-gray-200 dark:bg-gray-800 border-gray-400 rounded"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all" className="text-size13">
                Tous
              </option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 text-white text-size14 cursor-pointer py-2 px-4 rounded"
          >
            Ajouter une entreprise
          </button>
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-md border">
        <table className="min-w-full table-auto border-thin border-gray-50 dark:border-gray-500">
          <thead>
            <tr className="text-size14 text-gray-700 dark:text-gray-400">
              <th className="px-4 py-2 text-left">Entreprise</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Localisation</th>
              <th className="px-4 py-2 text-left">Stagiaires</th>
              <th className="px-4 py-2 text-left">IsActive</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-size14">
            {currentCompanies.map((company) => (
              <tr
                key={company.entrepriseId}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800  "
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3 ">
                    <div
                      className="h-9 w-9 rounded-full text-center text-white flex items-center justify-center"
                      style={{
                        backgroundColor: getRandomColor(company.entrepriseId),
                      }}
                    >
                      {company.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium dark:text-gray-100">{company.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {company.industry}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 dark:text-gray-100">
                  {company.email}
                </td>
                <td className="px-4 py-2 dark:text-gray-100">{company.address}</td>
                <td className="px-4 py-2 dark:text-gray-100">{company.nbrStagiaires}</td>
                <td className="px-4 py-2 dark:text-gray-100">
                  <Toggle
                    isActive={company.active}
                    onToggle={() => handleToggleStatus(company.entrepriseId)}
                  />
                </td>

                <td className="px-4 py-2 relative justify-end">
                  <button
                    onClick={() => handleDropdown(company.entrepriseId)}
                    className="text-gray-700 dark:text-gray-100 cursor-pointer"
                  >
                    <FiMoreHorizontal size={18} />
                  </button>
                  {activeDropdown === company.entrepriseId && (
                    <div
                      className="fixed  mb-2 right-0 cursor-pointer w-38 dark:bg-neutral-800 bg-white shadow-lg rounded-md z-10"
                      onMouseLeave={closeDropdown}
                      style={{
                        // Positionnement dynamique
                        top: `${
                          document
                            .getElementById(`action-btn-${company.entrepriseId}`)
                            ?.getBoundingClientRect().bottom + window.scrollY
                        }px`,
                        // Pour la version mobile/tablette
                        left: 'auto',
                        right: '16px'
                      }}
                    >
                      <ul className="py-2 text-sm dark:text-gray-200 text-gray-700 z-50">
                        <li
                          className="px-4 py-2 dark:hover:bg-neutral-700 hover:bg-gray-100 flex items-center gap-2.5"
                          onClick={() => {
                            setModalType("view");
                            setCurrentCompany(company);
                            setActiveDropdown(null);
                          }}
                        >
                          <FaEye /> Voir détails
                        </li>
                        <li
                          className="px-4 py-2 dark:hover:bg-neutral-700 hover:bg-gray-100 flex items-center gap-2.5 text-red-500 dark:text-red-400"
                          onClick={() => {
                            setModalType("delete");
                            setCurrentCompany(company);
                            setActiveDropdown(null);
                          }}
                        >
                          <FaTrashAlt /> Supprimer
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center text-size12 mt-6 items-center gap-2">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={` cursor-pointer p-3 rounded flex items-center gap-2 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <FaArrowLeft />
        </button>

        {Array.from(
          { length: Math.ceil(filteredCompanies.length / companiesPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 p-2 cursor-pointer rounded-full ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage ===
            Math.ceil(filteredCompanies.length / companiesPerPage)
          }
          className={`cursor-pointer p-3 rounded flex items-center gap-2 ${
            currentPage ===
            Math.ceil(filteredCompanies.length / companiesPerPage)
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <FaArrowRight />
        </button>
      </div>

      {modalType === "view" && (
        <ViewDetailsModal
        entrepriseId={currentCompany.entrepriseId}
          onClose={() => setModalType(null)}
        />
      )}
      {modalType === "delete" && (
        <DeleteCompanyModal
          company={currentCompany}
          onClose={() => setModalType(null)}
          onDelete={handleDelete}
        />
      )}
      {showAddModal && (
        <AddCompanyModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCompany}
        />
      )}
    </div>
  );
};

export default Companies;

// Composant Toggle
const Toggle = ({ isActive: propIsActive, onToggle }) => {
  const [localIsActive, setLocalIsActive] = useState(propIsActive);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setLocalIsActive(propIsActive);
  }, [propIsActive]);

  const handleToggle = async (e) => {
    e.stopPropagation();

    if (isProcessing) return;

    setIsProcessing(true);
    const newState = !localIsActive;
    setLocalIsActive(newState);

    try {
      await onToggle();
    } catch (error) {
      setLocalIsActive(!newState);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 text-size11">
      <span className="text-gray-600 dark:text-gray-400">Off</span>
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          localIsActive ? "bg-blue-500" : "bg-gray-300"
        } ${isProcessing ? "opacity-70" : ""}`}
        onClick={handleToggle}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            localIsActive ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="text-gray-600 dark:text-gray-400">On</span>
    </div>
  );
};

// À mettre EN DEHORS de votre composant
const colorCache = new Map();
const usedHues = new Set();

const getRandomColor = (id) => {
  if (!id) return "#cccccc";

  if (colorCache.has(id)) {
    return colorCache.get(id);
  }

  // Génération d'une teute unique non utilisée
  let hue;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    hue = Math.floor(Math.random() * 360);
    attempts++;
    if (attempts > maxAttempts) {
      // Fallback si trop d'essais
      hue = Math.floor(Math.random() * 360);
      break;
    }
  } while (usedHues.has(hue) && attempts <= maxAttempts);

  usedHues.add(hue);

  // Saturation et luminosité fixes pour maximiser la différence visuelle
  const saturation = 80 + Math.floor(Math.random() * 15); // 80-95%
  const lightness = 50 + Math.floor(Math.random() * 10); // 50-60%

  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  colorCache.set(id, color);

  return color;
};
