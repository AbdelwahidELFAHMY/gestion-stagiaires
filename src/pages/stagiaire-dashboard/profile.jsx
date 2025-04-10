import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserEdit, FaFilePdf, FaUpload } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const Profile = ({ isOpen, onClose, user, academiqueInfo }) => {
  const [formData, setFormData] = useState({ 
    ...user,
    ...academiqueInfo
  });
  const [cvFile, setCvFile] = useState(null);
  const [conventionFile, setConventionFile] = useState(null);
  const cvInputRef = useRef(null);
  const conventionInputRef = useRef(null);

  useEffect(() => {
    if (user && academiqueInfo) {
      setFormData({
        ...user,
        ...academiqueInfo
      });
    }
  }, [user, academiqueInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      if (type === 'cv') {
        setCvFile(file);
      } else {
        setConventionFile(file);
      }
    } else {
      alert("Veuillez sélectionner un fichier PDF");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    
    // Ajouter les données textuelles
    Object.keys(formData).forEach(key => {
      if (key !== 'id' && formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });
    
    // Ajouter les fichiers
    if (cvFile) formDataToSend.append('cv', cvFile);
    if (conventionFile) formDataToSend.append('convention', conventionFile);

    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        body: formDataToSend
      });

      if (response.ok) {
        onClose();
        // Rafraîchir les données utilisateur si nécessaire
      } else {
        console.error('Erreur lors de la mise à jour');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <FaUserEdit className="mr-2" /> Mon Profil
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            <MdClose size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Colonne 1 : Infos personnelles */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Informations personnelles</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input 
                type="text" 
                name="nom" 
                value={formData.nom || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input 
                type="text" 
                name="prenom" 
                value={formData.prenom || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input 
                type="text" 
                name="adresse" 
                value={formData.adresse || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          {/* Colonne 2 : Infos académiques */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-blue-600">Informations académiques</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">CNE</label>
              <input 
                type="text" 
                name="CNE" 
                value={formData.CNE || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">CIN</label>
              <input 
                type="text" 
                name="CIN" 
                value={formData.CIN || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
              <input 
                type="text" 
                name="niveau" 
                value={formData.niveau || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Branche</label>
              <input 
                type="text" 
                name="branche" 
                value={formData.branche || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Établissement</label>
              <input 
                type="text" 
                name="Etablissement" 
                value={formData.Etablissement || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Université</label>
              <input 
                type="text" 
                name="universite" 
                value={formData.universite || ''} 
                onChange={handleChange} 
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            
            {/* Section CV */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">CV (PDF)</label>
              <div className="flex items-center">
                {formData.cv ? (
                  <a 
                    href={`/uploads/${formData.cv}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline mr-2"
                  >
                    <FaFilePdf className="mr-1" /> Voir le CV
                  </a>
                ) : (
                  <span className="text-gray-500 mr-2">Aucun fichier</span>
                )}
                <button
                  type="button"
                  onClick={() => cvInputRef.current.click()}
                  className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
                >
                  <FaUpload className="mr-1" /> {cvFile ? cvFile.name : 'Changer'}
                </button>
                <input
                  type="file"
                  ref={cvInputRef}
                  onChange={(e) => handleFileChange(e, 'cv')}
                  accept="application/pdf"
                  className="hidden"
                />
              </div>
            </div>
            
            {/* Section Convention */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Convention (PDF)</label>
              <div className="flex items-center">
                {formData.convention ? (
                  <a 
                    href={`/uploads/${formData.convention}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline mr-2"
                  >
                    <FaFilePdf className="mr-1" /> Voir la convention
                  </a>
                ) : (
                  <span className="text-gray-500 mr-2">Aucun fichier</span>
                )}
                <button
                  type="button"
                  onClick={() => conventionInputRef.current.click()}
                  className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded"
                >
                  <FaUpload className="mr-1" /> {conventionFile ? conventionFile.name : 'Changer'}
                </button>
                <input
                  type="file"
                  ref={conventionInputRef}
                  onChange={(e) => handleFileChange(e, 'convention')}
                  accept="application/pdf"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </form>
        
        <div className="flex justify-end mt-6 space-x-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Annuler
          </button>
          <button 
            onClick={handleSubmit} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center"
          >
            Enregistrer les modifications
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;