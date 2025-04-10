import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import {
  X,
  Upload,
  Image as ImageIcon,
  FileEdit,
  UserCircle,
  SaveAllIcon,
} from "lucide-react";
import GetImageFromURL from "../../../utils/getImageFromURL";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStagiaire,
  resetUpdateStatus,
} from "../../../stores/stagiaire_slices/stagiaireSlice";

export default function EditPersonalInfoModal({
  isOpen,
  onClose,
  stagiaireInfos,
}) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    photo: null,
    preview: null,
  });
  const dispatch = useDispatch();
  const { updateStatus } = useSelector((state) => state.stagiaire);

  useEffect(() => {
    if (stagiaireInfos) {
      setFormData({
        nom: stagiaireInfos.nom || "",
        prenom: stagiaireInfos.prenom || "",
        email: stagiaireInfos.email || "",
        telephone: stagiaireInfos.phone || "",
        adresse: stagiaireInfos.adresse || "",
        photo: null,
        preview: stagiaireInfos.photo
          ? `${axiosInstance.defaults.baseURL.replace(
              "/api",
              ""
            )}/photos/${stagiaireInfos.photo.replace("photos/", "")}`
          : null,
      });
    }
  }, [stagiaireInfos]);

  useEffect(() => {
    if (updateStatus === "succeeded") {
      onClose();
      dispatch(resetUpdateStatus());
    }
  }, [updateStatus, onClose, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    
    // Ajoutez seulement les champs qui ont une valeur
    if (formData.nom) formDataToSend.append('nom', formData.nom);
    if (formData.prenom) formDataToSend.append('prenom', formData.prenom);
    if (formData.email) formDataToSend.append('email', formData.email);
    if (formData.telephone) formDataToSend.append('telephone', formData.telephone);
    if (formData.adresse) formDataToSend.append('adresse', formData.adresse);
    
    // Gestion spéciale pour removePhoto
    const shouldRemove = formData.preview === null && stagiaireInfos.photo;
    if (shouldRemove) {
      formDataToSend.append('removePhoto', 'true');
    }
    
    // Gestion de la photo
    if (formData.photo) {
      formDataToSend.append('photo', formData.photo);
    }
  
    // Debug: Affichez le contenu de FormData
    for (let [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
  
    try {
      await dispatch(updateStagiaire({
        id: stagiaireInfos.userId,
        formData: formDataToSend
      })).unwrap();
      
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      // Ajoutez un feedback utilisateur ici
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
      preview: null,
      // Gardez une trace si l'utilisateur veut supprimer l'image existante
      shouldRemoveExisting: !!stagiaireInfos.photo,
    }));
  };

  if (updateStatus === "loading") {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>Enregistrement en cours...</p>
        </div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 w-full h-full flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-2 shadow-lg max-h-full h-2/3 w-full max-w-2/3">
        <div className="flex justify-between items-center border-b-thin px-4 py-2">
          <div className="flex items-center space-x-2">
            <FileEdit className="h-5 w-5 text-blue-600" />
            <h2 className="text-size14 font-semibold text-gray-800">
              Modifier le profil
            </h2>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full p-1"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Colonne de gauche - Image */}
            <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
              <div className="relative">
                {formData.preview ? (
                  <>
                  {formData.preview.includes("photos") ? (
                    <GetImageFromURL
                      logoUrl={formData.preview}
                      alt="Preview"
                      className="w-48 h-48 rounded-full object-cover border-thin border-blue-100 shadow"
                    />
                  ):(
                    <img
                      src={formData.preview}
                      alt="Preview"
                      className="w-48 h-48 rounded-full object-cover border-thin border-blue-100 shadow"
                    />
                  )}
                    
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute cursor-pointer top-4.5 right-4 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : stagiaireInfos.photo ? (
                  <>
                    <GetImageFromURL
                      logoUrl={`${axiosInstance.defaults.baseURL.replace(
                        "/api",
                        ""
                      )}/photos/${stagiaireInfos.photo.replace("photos/", "")}`}
                      alt="Current Profile"
                      className="w-48 h-48 rounded-full object-cover border-thin border-blue-100 shadow"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute cursor-pointer top-4.5 right-4 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <div className="w-48 h-48 rounded-full bg-gray-100 flex items-center justify-center">
                    <UserCircle className="w-full h-full text-gray-400" />
                  </div>
                )}
              </div>

              <label className="flex cursor-pointer text-size12  items-center justify-center px-4 py-2 bg-white border-thin border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
                <Upload size={14} className="mr-2" />
                Changer la photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden "
                />
              </label>
            </div>

            {/* Colonne de droite - Formulaire avec icônes */}
            <div className="w-full h-full items-center justify-center p-2 md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Champ Nom avec icône */}
                <div className="space-y-1">
                  <label className="flex items-center text-size10 font-medium text-gray-500 uppercase tracking-wide">
                    Nom
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="text-size12 w-full px-3 py-2 border-thin border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Champ Prénom avec icône */}
                <div className="space-y-1">
                  <label className="flex items-center text-size10 font-medium text-gray-500 uppercase tracking-wide">
                    Prénom
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="text-size12  w-full  px-3 py-2 border-thin border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Champ Email avec icône */}
                <div className="space-y-1">
                  <label className="flex items-center text-size10 font-medium text-gray-500 uppercase tracking-wide">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="text-size12 w-full px-3 py-2 border-thin border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Champ Téléphone avec icône */}
                <div className="space-y-1">
                  <label className="flex items-center text-size10 font-medium text-gray-500 uppercase tracking-wide">
                    Téléphone
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="text-size12 w-full px-3 py-2 border-thin border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Champ Adresse avec icône (pleine largeur) */}
                <div className="md:col-span-2 space-y-1">
                  <label className="flex items-center text-size10 font-medium text-gray-500 uppercase tracking-wide">
                    Adresse
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleChange}
                      className="text-size12 w-full px-3 py-2 border-thin border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons avec icônes */}
          <div className="flex text-size12 justify-end space-x-8 pt-3 mt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center px-4 py-2 text-gray-800 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-sm transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 rounded-sm transition-colors"
            >
              <SaveAllIcon className="h-4 w-4 mr-2" />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
