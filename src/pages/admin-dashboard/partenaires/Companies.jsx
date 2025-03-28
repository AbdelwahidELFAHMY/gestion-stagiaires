import { useState } from "react";
import { FaEye, FaTrashAlt, FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import DeleteCompanyModal from "./DeleteCompanyModal";
import ViewDetailsModal from "./ViewDetailsModal";


// Données initiales des entreprises
const initialCompanies = [
  {
    id: "1",
    name: "Tech Solutions Inc.",
    sector: "Technologie",
    location: "Paris",
    contactPerson: "Jean Dupont",
    email: "contact@techsolutions.com",
    phone: "01 23 45 67 89",
    internCount: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Digital Agency",
    sector: "Marketing Digital",
    location: "Lyon",
    contactPerson: "Marie Laurent",
    email: "contact@digitalagency.com",
    phone: "01 23 45 67 90",
    internCount: 8,
    status: "active",
  },
  {
    id: "3",
    name: "Innovative Systems",
    sector: "Informatique",
    location: "Marseille",
    contactPerson: "Pierre Martin",
    email: "contact@innovativesystems.com",
    phone: "01 23 45 67 91",
    internCount: 5,
    status: "active",
  },
  {
    id: "4",
    name: "Creative Design Co.",
    sector: "Design",
    location: "Bordeaux",
    contactPerson: "Sophie Moreau",
    email: "contact@creativedesign.com",
    phone: "01 23 45 67 92",
    internCount: 3,
    status: "inactive",
  },
  {
    id: "5",
    name: "Data Analytics Ltd.",
    sector: "Analyse de données",
    location: "Lille",
    contactPerson: "Thomas Lefebvre",
    email: "contact@dataanalytics.com",
    phone: "01 23 45 67 93",
    internCount: 7,
    status: "active",
  },
  {
    id: "6",
    name: "Marketing Solutions",
    sector: "Marketing",
    location: "Toulouse",
    contactPerson: "Julie Petit",
    email: "contact@marketingsolutions.com",
    phone: "01 23 45 67 94",
    internCount: 4,
    status: "active",
  },

  {
    id: "7",
    name: "Green Energy Solutions",
    sector: "Énergie Renouvelable",
    location: "Nantes",
    contactPerson: "Lucie Bernard",
    email: "contact@greenenergy.com",
    phone: "02 34 56 78 90",
    internCount: 9,
    status: "active",
  },
  {
    id: "8",
    name: "HealthTech Innovations",
    sector: "Santé",
    location: "Strasbourg",
    contactPerson: "Antoine Rousseau",
    email: "contact@healthtech.com",
    phone: "03 45 67 89 01",
    internCount: 6,
    status: "active",
  },
  {
    id: "9",
    name: "Future Logistics",
    sector: "Logistique",
    location: "Nice",
    contactPerson: "Élodie Lambert",
    email: "contact@futurelogistics.com",
    phone: "04 56 78 90 12",
    internCount: 10,
    status: "active",
  },
  {
    id: "10",
    name: "AI Dynamics",
    sector: "Intelligence Artificielle",
    location: "Toulon",
    contactPerson: "Nicolas Girard",
    email: "contact@aidynamics.com",
    phone: "05 67 89 01 23",
    internCount: 15,
    status: "active",
  },
  {
    id: "11",
    name: "EcoBuilders",
    sector: "Construction",
    location: "Montpellier",
    contactPerson: "Camille Morel",
    email: "contact@ecobuilders.com",
    phone: "06 78 90 12 34",
    internCount: 7,
    status: "inactive",
  },
  {
    id: "12",
    name: "FinTech Experts",
    sector: "Finance",
    location: "Rennes",
    contactPerson: "Hugo Dupuis",
    email: "contact@fintechexperts.com",
    phone: "07 89 01 23 45",
    internCount: 12,
    status: "active",
  },
  {
    id: "13",
    name: "Smart Home Systems",
    sector: "Domotique",
    location: "Bordeaux",
    contactPerson: "Laura Petit",
    email: "contact@smarthome.com",
    phone: "08 90 12 34 56",
    internCount: 5,
    status: "active",
  },
  {
    id: "14",
    name: "BioFoods Ltd.",
    sector: "Agroalimentaire",
    location: "Lyon",
    contactPerson: "Julien Lefevre",
    email: "contact@biofoods.com",
    phone: "09 01 23 45 67",
    internCount: 8,
    status: "active",
  },
  {
    id: "15",
    name: "CloudNet Solutions",
    sector: "Cloud Computing",
    location: "Paris",
    contactPerson: "Sandra Blanc",
    email: "contact@cloudnet.com",
    phone: "01 12 34 56 78",
    internCount: 14,
    status: "active",
  },
  {
    id: "16",
    name: "AutoTech Motors",
    sector: "Automobile",
    location: "Toulouse",
    contactPerson: "Marc Dubois",
    email: "contact@autotech.com",
    phone: "02 23 45 67 89",
    internCount: 11,
    status: "active",
  },
  {
    id: "17",
    name: "EduTech Solutions",
    sector: "Éducation",
    location: "Lille",
    contactPerson: "Claire Martin",
    email: "contact@edutech.com",
    phone: "03 34 56 78 90",
    internCount: 6,
    status: "inactive",
  },
  {
    id: "18",
    name: "NextGen Robotics",
    sector: "Robotique",
    location: "Marseille",
    contactPerson: "Pauline Leroy",
    email: "contact@nextgenrobotics.com",
    phone: "04 45 67 89 01",
    internCount: 9,
    status: "active",
  },
  {
    id: "19",
    name: "SolarTech Energy",
    sector: "Énergie Solaire",
    location: "Nantes",
    contactPerson: "Thierry Moreau",
    email: "contact@solartech.com",
    phone: "05 56 78 90 12",
    internCount: 7,
    status: "active",
  },
  {
    id: "20",
    name: "MediCare Systems",
    sector: "Santé",
    location: "Strasbourg",
    contactPerson: "Sophie Lambert",
    email: "contact@medicare.com",
    phone: "06 67 89 01 23",
    internCount: 10,
    status: "active",
  },
  {
    id: "21",
    name: "AgriTech Solutions",
    sector: "Agriculture",
    location: "Nice",
    contactPerson: "Pierre Bernard",
    email: "contact@agritech.com",
    phone: "07 78 90 12 34",
    internCount: 5,
    status: "active",
  },
  {
    id: "22",
    name: "CyberSec Ltd.",
    sector: "Cybersécurité",
    location: "Toulon",
    contactPerson: "Alexandre Girard",
    email: "contact@cybersec.com",
    phone: "08 89 01 23 45",
    internCount: 8,
    status: "active",
  },
  {
    id: "23",
    name: "Virtual Reality Co.",
    sector: "Réalité Virtuelle",
    location: "Montpellier",
    contactPerson: "Émilie Rousseau",
    email: "contact@virtualreality.com",
    phone: "09 90 12 34 56",
    internCount: 12,
    status: "active",
  },
  {
    id: "24",
    name: "GreenTech Innovations",
    sector: "Technologie Verte",
    location: "Rennes",
    contactPerson: "Thomas Morel",
    email: "contact@greentech.com",
    phone: "01 01 23 45 67",
    internCount: 6,
    status: "active",
  },
  {
    id: "25",
    name: "Future Mobility",
    sector: "Transport",
    location: "Bordeaux",
    contactPerson: "Laura Dupuis",
    email: "contact@futuremobility.com",
    phone: "02 12 34 56 78",
    internCount: 9,
    status: "active",
  },
  {
    id: "26",
    name: "BioTech Solutions",
    sector: "Biotechnologie",
    location: "Lyon",
    contactPerson: "Julien Petit",
    email: "contact@biotech.com",
    phone: "03 23 45 67 89",
    internCount: 7,
    status: "active",
  },
  {
    id: "27",
    name: "SmartCity Systems",
    sector: "Urbanisme",
    location: "Paris",
    contactPerson: "Sandra Leroy",
    email: "contact@smartcity.com",
    phone: "04 34 56 78 90",
    internCount: 10,
    status: "active",
  },
  {
    id: "28",
    name: "EcoTransport Ltd.",
    sector: "Transport Durable",
    location: "Toulouse",
    contactPerson: "Marc Lambert",
    email: "contact@ecotransport.com",
    phone: "05 45 67 89 01",
    internCount: 8,
    status: "active",
  },
  {
    id: "29",
    name: "AI Health Solutions",
    sector: "Santé",
    location: "Lille",
    contactPerson: "Claire Bernard",
    email: "contact@aihealth.com",
    phone: "06 56 78 90 12",
    internCount: 11,
    status: "active",
  },
  {
    id: "30",
    name: "Future Energy",
    sector: "Énergie",
    location: "Marseille",
    contactPerson: "Pauline Moreau",
    email: "contact@futureenergy.com",
    phone: "07 67 89 01 23",
    internCount: 9,
    status: "active",
  },
];



// Composant principal Companies
const Companies = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [currentCompany, setCurrentCompany] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");
  const [modalType, setModalType] = useState(null); // "view", "delete"
  const [companies, setCompanies] = useState(initialCompanies); // Utilisation d'un état pour les entreprises
  const [currentPage, setCurrentPage] = useState(1); // État pour la pagination
  const companiesPerPage = 7; // Nombre d'entreprises par page


  // Filtrer les entreprises en fonction de la recherche et du statut
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      filterStatus === "all" || filterStatus === "" || company.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculer les entreprises à afficher pour la page actuelle
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirstCompany, indexOfLastCompany);

  // Gérer le changement de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Gérer l'ouverture/fermeture du dropdown
  const handleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Fermer le dropdown
  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  // Gérer la suppression d'une entreprise
  const handleDelete = (id) => {
    const updatedCompanies = companies.filter((company) => company.id !== id);
    setCompanies(updatedCompanies);
    console.log("Entreprise supprimée :", id);
  };

  // Gérer le changement de statut (toggle)
  const handleToggleStatus = (id) => {
    const updatedCompanies = companies.map((company) =>
      company.id === id
        ? { ...company, status: company.status === "active" ? "inactive" : "active" }
        : company
    );
    setCompanies(updatedCompanies); // Mettre à jour l'état des entreprises
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between gap-6">
        <div className="relative w-full md:w-80 text-size13">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400" />
          <input
            type="search"
            placeholder="Rechercher une entreprise..."
            className="pl-10 w-full py-2 px-4 text-gray-800 placeholder:text-gray-600 dark:placeholder:text-gray-400 dark:text-gray-300 border-thin border-gray-100 focus:outline-none rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-size14 text-gray-700 dark:text-gray-300">
              Filtrer par statut:
            </span>
            <select
              className="py-1.5 px-6 text-size14 cursor-pointer outline-none border-thin dark:bg-gray-800 border-gray-400 rounded"
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
          <button className="bg-blue-500 text-white text-size14 cursor-pointer py-2 px-4 rounded">
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
                key={company.id}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-9 w-9 rounded-full text-center text-gray-100 flex items-center justify-center"
                      style={{ backgroundColor: getRandomColor(company.id) }}
                    >
                      {company.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {company.sector}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="font-medium">{company.contactPerson}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{company.email}</div>
                </td>
                <td className="px-4 py-2">{company.location}</td>
                <td className="px-4 py-2">{company.internCount}</td>
                <td className="px-4 py-2">
                  <Toggle
                    isActive={company.status === "active"}
                    onToggle={() => handleToggleStatus(company.id)}
                  />
                </td>

                <td className="px-4 py-2 relative justify-end">
                  <button
                    onClick={() => handleDropdown(company.id)}
                    className="text-gray-700 dark:text-gray-100 cursor-pointer"
                  >
                    <FiMoreHorizontal size={18} />
                  </button>
                  {activeDropdown === company.id && (
                    <div
                      className="absolute right-0 cursor-pointer w-38 dark:bg-neutral-800 bg-white shadow-md rounded-md z-10"
                      onMouseLeave={closeDropdown}
                    >
                      <ul className="py-2 text-sm dark:text-gray-200 text-gray-700">
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

      {/* Pagination */}
<div className="flex justify-center text-size12 mt-4 items-center gap-2">
  {/* Bouton Précédent */}
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

  {/* Boutons de pagination */}
  {Array.from({ length: Math.ceil(filteredCompanies.length / companiesPerPage) }, (_, index) => (
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
  ))}

  {/* Bouton Suivant */}
  <button
    onClick={() => paginate(currentPage + 1)}
    disabled={currentPage === Math.ceil(filteredCompanies.length / companiesPerPage)}
    className={`cursor-pointer p-3 rounded flex items-center gap-2 ${
      currentPage === Math.ceil(filteredCompanies.length / companiesPerPage)
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600"
    }`}
  >
     <FaArrowRight />
  </button>
</div>

      {modalType === "view" && (
        <ViewDetailsModal
          company={currentCompany}
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
    </div>
  );
};


export default Companies;

// Composant Toggle
const Toggle = ({ isActive, onToggle }) => {
  return (
    <div className="flex items-center gap-2 text-size11">
      <span className=" text-gray-600 dark:text-gray-400">No</span>
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
          isActive ? "bg-blue-500" : "bg-gray-300"
        }`}
        onClick={onToggle}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            isActive ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className=" text-gray-600 dark:text-gray-400">Yes</span>
    </div>
  );
};

// Fonction pour générer une couleur de fond aléatoire
const getRandomColor = (() => {
  const colorMap = new Map();

  return (id) => {
    if (!colorMap.has(id)) {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      colorMap.set(id, color);
    }
    return colorMap.get(id);
  };
})();