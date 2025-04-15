import { useEffect,useRef, useState } from "react";
import { X, Sparkles,ChevronDown, User2 } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import GetImageFromURL from "../../../utils/getImageFromURL";
import { toast } from "react-toastify";

const AddTacheModal = ({ isOpen, onClose, stageId, setStagesWithTaches }) => {
  const [stagiaires, setStagiaires] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [formData, setFormData] = useState({
    description: "",
    duree: 1,
    dateCreation: new Date().toISOString().split("T")[0], 
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      axiosInstance
        .get(`/encadrants/equipe/${stageId}`)
        .then((res) => {
          setStagiaires(res.data);
          if (res.data.length > 0) {
            setSelectedUsername(res.data[0].username);
          }
        })
        .catch((err) => {
          console.error("Erreur lors du chargement des stagiaires :", err);
        });
    }
  }, [isOpen, stageId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedUsername) {
      toast.error("Veuillez sélectionner un stagiaire");
      return;
    }
  
    try {
      const requestData = {
        usernameStagiare: selectedUsername,
        ...formData,
        duree: `${formData.duree} semaine${formData.duree > 1 ? "s" : ""}`,
      };
  
      const response = await axiosInstance.post(
        `/encadrants/taches/${stageId}`, 
        requestData
      );
  
      setStagesWithTaches(prev => prev.map(stage => 
        stage.stageId === stageId 
          ? { ...stage, tacheDTOList: [...stage.tacheDTOList, response.data] }
          : stage
      ));
      setFormData({
        description: "",
        duree: 1,
        dateCreation: new Date().toISOString().split("T")[0], 
      })
      onClose();
    } catch (err) {
      console.error("Erreur lors de l'ajout de la tâche :", err);
      toast.error(err);
    }
  };

  if (!isOpen) return null;

  const selectedStagiaire = stagiaires.find(s => s.username === selectedUsername);


  return (
    <div className="fixed inset-0 bg-black/35 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="flex items-center space-x-2 text-size14 font-maFont font-medium bg-gradient-to-r from-gray-600 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            <Sparkles size={16} className="text-gray-600" />{" "}
            <span>Ajouter une nouvelle tâche</span>
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer rounded-full justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 max-h-[70vh] overflow-auto pr-1">
            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm mt-4 font-medium text-gray-700 mb-1">
                Sélectionner un stagiaire
              </label>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="mt-1 cursor-pointer w-full flex items-center justify-between border-thin border-gray-200 rounded-md py-2 px-6 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white text-left"
              >
                <div className="flex items-center text-size13">
                  {selectedStagiaire ? (
                    <>
                      {selectedStagiaire.photo ? (
                        <GetImageFromURL
                          logoUrl={`${axiosInstance.defaults.baseURL.replace(
                            "/api",
                            ""
                          )}/photos/${selectedStagiaire.photo.replace(
                            "photos/",
                            ""
                          )}`}
                          alt="photo"
                          className="h-8 w-8 rounded-full border-thin object-cover mr-3"
                        />
                      ) : (
                        <div className="p-1 bg-gray-50 border-thin border-gray-100 rounded-full mr-3">
                          <User2 className="h-8 w-8 text-neutral-800" />
                        </div>
                      )}
                      <span>
                        {selectedStagiaire.nom} {selectedStagiaire.prenom}
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-400">
                      Sélectionnez un stagiaire
                    </span>
                  )}
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md py-1 px-2 max-h-60 overflow-auto">
                  {stagiaires.map((stagiaire, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setSelectedUsername(stagiaire.username);
                        setIsDropdownOpen(false);
                      }}
                      className={`flex  rounded-md items-center px-4 py-2 cursor-pointer ${
                        selectedUsername === stagiaire.username
                          ? "bg-blue-50"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {stagiaire.photo ? (
                        <GetImageFromURL
                          logoUrl={`${axiosInstance.defaults.baseURL.replace(
                            "/api",
                            ""
                          )}/photos/${stagiaire.photo.replace("photos/", "")}`}
                          alt="photo"
                          className="h-8 w-8 rounded-full border-thin object-cover mr-3"
                        />
                      ) : (
                        <div className="p-1 bg-gray-50 border-thin border-gray-100 rounded-full mr-3">
                          <User2 className="h-6 w-6 text-neutral-800" />
                        </div>
                      )}
                      <span>
                        {stagiaire.nom} {stagiaire.prenom}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Date de début
                </label>
                <input
                  type="date"
                  name="dateCreation"
                  value={formData.dateCreation}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]} // Date minimale = aujourd'hui
                  className="mt-1 text-size13 block w-full border-thin border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Durée (semaines)
                </label>
                <select
                  name="duree"
                  value={formData.duree}
                  onChange={handleChange}
                  className="mt-1 cursor-pointer text-size13 block w-full border-thin border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  {[1, 2, 3, 4, 5].map((week) => (
                    <option key={week} value={week} className="cursor-pointer p-1">
                      {week} semaine{week > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="mt-1 cursor-pointer text-size13 block w-full border-thin border-gray-200 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-center gap-12 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer px-4 py-2 border-thin border-gray-200 rounded-md text-size13 font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 bg-blue-600 rounded-md text-size13 font-medium text-white hover:bg-blue-700"
              >
                Ajouter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTacheModal;
