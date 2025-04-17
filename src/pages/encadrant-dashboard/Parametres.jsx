import React, { useState, useEffect } from 'react';
import { UserCog, Save, User2 } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import GetImageFromURL from '../../utils/getImageFromURL';
import { toast } from 'react-toastify';
import { getUsernameFromToken } from '../../utils/getUsernameFromToken';

export default function Parametres() {
  const username = getUsernameFromToken();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    adresse: '',
    roles:[],
  });
  const [photoFile, setPhotoFile] = useState(null);

  // Charger les données utilisateur au montage du composant
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/current_user/${username}`);
        setUserData(response.data);
        setFormData({
          nom: response.data.nom || '',
          prenom: response.data.prenom || '',
          email: response.data.email || '',
          phone: response.data.phone || '',
          adresse: response.data.adresse || '',
        });
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateur:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      
      // Ajouter les champs du formulaire
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      // Ajouter la photo si elle a été modifiée
      if (photoFile) {
        formDataToSend.append('photo', photoFile);
      }

      const response = await axiosInstance.put(`/current_user/${username}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUserData(response.data);
      toast.success('Modifications enregistrées avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de l\'enregistrement des modifications');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-transparent text-gray-800 dark:text-gray-200">
      <div className="flex justify-between text-gray-700 dark:text-gray-200 items-center mb-3">
        <div className="flex items-center gap-3">
          <UserCog size={22} className="text-gray-600 dark:text-gray-300" />
          <h4 className="text-lg font-semibold">Paramètres du Compte</h4>
        </div>
        <button
          onClick={handleSubmit}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors dark:bg-green-700 dark:hover:bg-green-800"
        >
          <Save size={16} /> Enregistrer
        </button>
      </div>
      
      <div className="rounded-lg p-6 border-thin border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
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
                className="h-60 w-60 rounded-full object-cover border-thin border-gray-200 dark:border-gray-600 mb-4"
              />
            ) : (
              <div className="h-60 w-60 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 flex items-center justify-center text-white text-4xl font-bold mb-4">
                <User2 size={64} />
              </div>
            )}

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Changer de photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full text-sm text-gray-500 dark:text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-purple-50 file:text-purple-700
                  hover:file:bg-purple-100
                  dark:file:bg-purple-900 dark:file:text-purple-200
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
          </div>
        </div>
      </div>
    </div>
  );
}