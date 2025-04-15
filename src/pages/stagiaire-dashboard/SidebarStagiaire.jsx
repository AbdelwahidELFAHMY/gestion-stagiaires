import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdDashboard,
  MdGroup,
  MdCalendarToday,
  MdLibraryBooks,
} from "react-icons/md";
import { AiOutlineLeft, AiOutlineRight, AiOutlineDown } from "react-icons/ai";
import {
  ChartGantt,
  FileText,
  User2,
  UserCircle2,
  UserCogIcon,
  X,
} from "lucide-react";
import { getUsernameFromToken } from "../../utils/getUsernameFromToken";
import axiosInstance from "../../utils/axiosInstance";
import GetImageFromURL from "../../utils/getImageFromURL";
import { FaRegFolderOpen } from "react-icons/fa";

const SidebarStagiaire = ({ setActiveComponent }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("TableauDeBord");
  const [showMembers, setShowMembers] = useState(false);
  const [membersList, setMembersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberDetails, setMemberDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const fetchMemberDetails = async (username) => {
    try {
      const response = await axiosInstance.get(
        `/stagiaires/infos_personelle/${username}`
      );
      setMemberDetails(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch member details:", error);
      // Gérer l'erreur (afficher un toast, etc.)
    }
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member);
    fetchMemberDetails(member.username);
  };

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setActiveComponent(itemName);
  };

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const username = getUsernameFromToken();
      if (!username) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axiosInstance.get(`/stages/equipe/${username}`);
        setMembersList(
          response.data.map((member) => ({
            name: `${member.prenom} ${member.nom}`,
            image: member.photo,
            username: member.username,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch team members:", err);
        setError("Failed to load team members");
      } finally {
        setLoading(false);
      }
    };

    if (showMembers) {
      fetchTeamMembers();
    }
  }, [showMembers]);

  return (
    <motion.div
      initial={{ width: "80px" }}
      animate={{
        width: isOpen ? "200px" : "80px",
        minWidth: isOpen ? "200px" : "80px",
        maxWidth: isOpen ? "200px" : "80px",
      }}
      transition={{
        type: "tween",
        ease: [0.16, 0.3, 0.3, 1],
        duration: 0.8,
        delay: isOpen ? 0 : 0.15,
      }}
      className="h-screen bg-white shadow-lg relative border-r border-gray-200"
    >
      <motion.button
        onClick={toggleSidebar}
        className="absolute right-[-10px] top-0 cursor-pointer bg-gray-200 hover:bg-gray-400 text-blue-600 p-1.5 rounded-full shadow-md transition-all"
        transition={{ duration: 0.3 }}
      >
        {isOpen ? <AiOutlineLeft size={9} /> : <AiOutlineRight size={9} />}
      </motion.button>

      <nav className="mt-10 flex flex-col gap-2 px-4">
        <SidebarItem
          isOpen={isOpen}
          icon={<MdDashboard size={18} />}
          text="Tableau de bord"
          onClick={() => handleItemClick("TableauDeBord")}
          isActive={activeItem === "TableauDeBord"}
        />
        <SidebarItem
          isOpen={isOpen}
          icon={<UserCogIcon size={18} />}
          text="Compte"
          onClick={() => handleItemClick("MonCompte")}
          isActive={activeItem === "MonCompte"}
        />
        <SidebarItem
          isOpen={isOpen}
          icon={<FaRegFolderOpen size={18} />}
          text="Livrables"
          onClick={() => handleItemClick("MesLivrables")}
          isActive={activeItem === "MesLivrables"}
        />
        <SidebarItem
          isOpen={isOpen}
          icon={<ChartGantt size={18} />}
          text="Gantt Diagramm"
          onClick={() => handleItemClick("DiagrammeDeGantt")}
          isActive={activeItem === "DiagrammeDeGantt"}
        />
        <SidebarItem
          isOpen={isOpen}
          icon={<MdCalendarToday size={18} />}
          text="Agenda"
          onClick={() => handleItemClick("MonAgenda")}
          isActive={activeItem === "MonAgenda"}
        />
        <SidebarItem
          isOpen={isOpen}
          icon={<MdLibraryBooks size={18} />}
          text="Ressources"
          onClick={() => handleItemClick("Ressources")}
          isActive={activeItem === "Ressources"}
        />

        <div
          className="relative"
          onMouseEnter={() => setShowMembers(true)}
          onMouseLeave={() => setShowMembers(false)}
        >
          <motion.div className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white">
            <div className="flex items-center space-x-3">
              <span className="w-6 flex justify-center">
                <MdGroup size={18} />
              </span>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="text-size12 font-medium whitespace-nowrap"
                >
                  Équipe
                </motion.span>
              )}
            </div>
            {isOpen && (
              <span>
                {showMembers ? (
                  <AiOutlineDown size={10} />
                ) : (
                  <AiOutlineRight size={10} />
                )}
              </span>
            )}
          </motion.div>

          <AnimatePresence>
            {showMembers && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="overflow-y-scroll scrollbar-thin absolute w-44 h-44 bg-white shadow-lg rounded-lg p-3 border border-gray-200 z-10"
              >
                {loading ? (
                  <div className="flex justify-center items-center h-full">
                    <p>Loading...</p>
                  </div>
                ) : error ? (
                  <div className="text-red-500 text-sm p-2">{error}</div>
                ) : membersList.length > 0 ? (
                  <ul>
                    {membersList.map((member, index) => (
                      <motion.li
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="flex cursor-pointer items-center space-x-2 hover:bg-gray-100 p-1 rounded-xs"
                        onClick={() => handleMemberClick(member)}
                      >
                        {member.image ? (
                          <GetImageFromURL
                            logoUrl={`${axiosInstance.defaults.baseURL.replace(
                              "/api",
                              ""
                            )}/photos/${member.image.replace("photos/", "")}`}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="p-1 bg-gray-50 border-thin border-gray-100 rounded-full">
                            <User2 className="h-8 w-8 text-neutral-800" />
                          </div>
                        )}
                        <span className="text-size11 text-gray-800">
                          {member.name}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No team members found</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AnimatePresence>
        {isModalOpen && memberDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/35 flex items-center justify-center z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.5, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 20 }}
              className="bg-white rounded-md border-thin border-gray-100 p-6 w-full max-w-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Colonne photo */}
                <div className="md:w-1/4 flex justify-center">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-thin border-white">
                    {memberDetails.photo ? (
                      <GetImageFromURL
                        logoUrl={`${axiosInstance.defaults.baseURL.replace(
                          "/api",
                          ""
                        )}/photos/${memberDetails.photo.replace(
                          "photos/",
                          ""
                        )}`}
                        alt={`${memberDetails.prenom} ${memberDetails.nom}`}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <UserCircle2 className="h-36 w-36 text-gray-700" />
                    )}
                  </div>
                </div>

                {/* Colonne informations */}
                <div className="md:w-3/4">
                  {/* En-tête */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <span className="relative flex h-5 w-5">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </span>
                      <h2 className="text-size11 font-medium text-gray-800">
                        Informations du Membre
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-5 right-5 p-1 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-500 transition-colors"
                      aria-label="Fermer"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Grille d'informations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <p className="text-size11 font-medium text-gray-500 uppercase tracking-wider">
                        Nom complet
                      </p>
                      <p className="text-size11 font-semibold text-gray-800">
                        {memberDetails.prenom} {memberDetails.nom}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-size11 font-medium text-gray-500 uppercase tracking-wider">
                        Username
                      </p>
                      <p className="text-size11 font-medium text-gray-800">
                        {memberDetails.username}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-size11 font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-size11 font-medium text-gray-800">
                        {memberDetails.email || "Non renseigné"}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-size11 font-medium text-gray-500 uppercase tracking-wider">
                        Téléphone
                      </p>
                      <p className="text-size11 font-medium text-gray-800">
                        {memberDetails.phone || "Non renseigné"}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-size11 font-medium text-gray-500 uppercase tracking-wider">
                        Adresse
                      </p>
                      <p className="text-size11 font-medium text-gray-800">
                        {memberDetails.adresse || "Non renseignée"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SidebarItem = ({ isOpen, icon, text, onClick, isActive }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-300 overflow-hidden
        ${
          isActive
            ? "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-300 text-white shadow-glow"
            : "hover:bg-gray-100"
        }`}
      whileHover={{ scale: 1.01 }}
    >
      <motion.span
        className={`w-6 flex justify-center ${
          isActive ? "text-white" : "text-gray-800"
        }`}
        animate={{ color: isActive ? "#c9cdff" : "#1f2937" }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.span>

      {isOpen && (
        <motion.span
          className="text-size12 font-medium whitespace-nowrap ml-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  );
};

export default SidebarStagiaire;
