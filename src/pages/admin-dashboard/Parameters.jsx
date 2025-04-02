import { useEffect, useState } from "react";
import axios from "axios";
import { getUsernameFromToken } from "../../utils/getUsernameFromToken";
import axiosInstance from "../../utils/axiosInstance";
import { User2, Save, Key, UserCog } from "lucide-react";
import { toast } from "react-toastify";
import GetImageFromURL from "../../utils/getImageFromURL";

export default function Parameters() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    adresse: "",
    newRole: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [existingRoles, setExistingRoles] = useState([]); // Rôles existants (non modifiables)
  const [newRoles, setNewRoles] = useState([]); // Nouveaux rôles à ajouter

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = getUsernameFromToken();
        if (!username) {
          throw new Error("No username found in token");
        }

        const response = await axios.get(
          `http://localhost:8080/current_user/${username}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setUserData(response.data);
        setFormData({
          nom: response.data.nom || "",
          prenom: response.data.prenom || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          adresse: response.data.adresse || "",
          newRole: "",
        });
        setExistingRoles(response.data.roles || []);
        if (response.data.photo) {
          setPhotoPreview(
            `${axiosInstance.defaults.baseURL.replace(
              "/api",
              ""
            )}/photos/${response.data.photo.replace("photos/", "")}`
          );
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddRole = () => {
    if (
      formData.newRole &&
      !newRoles.includes(formData.newRole) &&
      !existingRoles.includes(formData.newRole)
    ) {
      setNewRoles([...newRoles, formData.newRole]);
      setFormData((prev) => ({ ...prev, newRole: "" }));
    }
  };

  const handleRemoveNewRole = (roleToRemove) => {
    setNewRoles(newRoles.filter((role) => role !== roleToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = getUsernameFromToken();

      // Création du FormData pour envoyer les données (y compris la photo si modifiée)
      const formDataToSend = new FormData();

      // Ajout des champs texte
      formDataToSend.append("nom", formData.nom);
      formDataToSend.append("prenom", formData.prenom);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("adresse", formData.adresse);

      // Ajout des nouveaux rôles
      newRoles.forEach((role) => {
        formDataToSend.append("roles", role);
      });

      // Ajout de la photo si elle a été modifiée
      if (photoFile) {
        formDataToSend.append("photo", photoFile);
      }

      // Envoi de la requête PUT
      const response = await axios.put(
        `http://localhost:8080/current_user/${username}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Mise à jour de l'état avec la réponse du serveur
      setUserData(response.data);
      setExistingRoles(response.data.roles || []);
      setNewRoles([]);

      // Mise à jour de la prévisualisation de la photo si elle a changé
      if (response.data.photo) {
        setPhotoPreview(
          `${axiosInstance.defaults.baseURL.replace(
            "/api",
            ""
          )}/photos/${response.data.photo.replace("photos/", "")}`
        );
      }

      toast.success(
        <div className="text-center mt-3 mb-2">
          <strong className="text-size15">Profil mis à jour avec succès</strong>
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
    } catch (err) {
      console.error("Échec de la mise à jour des données utilisateur:", err);
      setError(err.message);
      toast.error(
        <div className="text-center mt-3 mb-2">
          <strong className="text-size15">
            Ooops: {err.response?.data?.message || err.message}
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

  if (loading)
    return (
      <div className="p-6 text-gray-800 dark:text-gray-200">
        Chargement des données...
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-red-600 dark:text-red-400">Erreur: {error}</div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex justify-between text-gray-700 dark:text-gray-200  items-center mb-6">
        <div className="flex items-center gap-3">
          <UserCog size={22} className="text-gray-600 dark:text-gray-300" />
          <h4 className="text-lg font-semibold">Paramètres du Compte</h4>
        </div>{" "}
        <button
          onClick={handleSubmit}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors dark:bg-green-700 dark:hover:bg-green-800"
        >
          <Save size={16} /> Enregistrer
        </button>
      </div>

      <div className="rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Photo à droite */}
          <div className="md:order-2 flex flex-col items-center">
            {userData?.photo ? (
              <GetImageFromURL
                logoUrl={`${axiosInstance.defaults.baseURL.replace(
                  "/api",
                  ""
                )}/photos/${
                  userData.photo.includes("photos/")
                    ? userData.photo.replace("photos/", "")
                    : userData.photo
                }`}
                alt={`Photo ${formData.nom} ${formData.prenom}`}
                className="h-40 w-40 rounded-full object-cover border border-gray-200 dark:border-gray-600 mb-4"
              />
            ) : (
              <div className="h-40 w-40 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 flex items-center justify-center text-white text-4xl font-bold mb-4">
                <User2 size={64} />
              </div>
            )}

            <div className="w-full ">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Changer de photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full  text-sm text-gray-500 dark:text-gray-400
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm  file:font-semibold
        file:bg-purple-50 file:text-purple-700
        hover:file:bg-purple-100
        dark:file:bg-purple-900  dark:file:text-purple-200
        dark:hover:file:bg-purple-800"
              />
            </div>
          </div>

          {/* Formulaire à gauche */}
          <div className="md:order-1 flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="nom"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nom
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>

              <div>
                <label
                  htmlFor="prenom"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Prénom
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>

            <div>
              <label
                htmlFor="adresse"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Adresse
              </label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>

            {/* Section Rôles */}
            <div>
              <label
                htmlFor="newRole"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Ajouter un rôle
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  id="newRole"
                  name="newRole"
                  value={formData.newRole}
                  onChange={handleInputChange}
                  className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-purple-500 dark:focus:ring-purple-400"
                  placeholder="Entrez un nouveau rôle"
                />
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="cursor-pointer px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors dark:bg-purple-700 dark:hover:bg-purple-800 flex items-center gap-2"
                >
                  <Key size={16} /> Ajouter
                </button>
              </div>
            </div>

            {/* Rôles existants (non modifiables) */}
            {existingRoles.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Rôles existants
                </h3>
                <div className="flex flex-wrap gap-2">
                  {existingRoles.map((role, index) => (
                    <div
                      key={`existing-${index}`}
                      className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full"
                    >
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nouveaux rôles à ajouter (modifiables) */}
            {newRoles.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nouveaux rôles à ajouter
                </h3>
                <div className="flex flex-wrap gap-2">
                  {newRoles.map((role, index) => (
                    <div
                      key={`new-${index}`}
                      className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full"
                    >
                      <span>{role}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveNewRole(role)}
                        className="cursor-pointer text-red-500 hover:text-red-700 dark:hover:text-red-400"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
