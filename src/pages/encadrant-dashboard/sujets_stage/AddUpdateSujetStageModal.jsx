import { useState, useEffect } from 'react';
import axiosInstance from '../../../utils/axiosInstance';
import { getUsernameFromToken } from '../../../utils/getUsernameFromToken';
import { toast } from 'react-toastify';
import { StageType } from '../../../utils/enums';

const AddUpdateSujetStageModal = ({ 
  showModal, 
  closeModal, 
  refreshSujets, 
  currentSujet 
}) => {

  const [formData, setFormData] = useState({
    title: '',
    duration: '1 mois',
    stageType: StageType.INITIATION,
    file: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentSujet) {
      setFormData({
        title: currentSujet.title,
        duration: currentSujet.duration,
        stageType: currentSujet.stageType,
        file: null
      });
    } else {
      setFormData({
        title: '',
        duration: '1 mois',
        stageType: StageType.INITIATION,
        file: null
      });
    }
  }, [currentSujet]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.file && !currentSujet) {
      toast.error("Un fichier PDF est monquant");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      const jsonData = {
        title: formData.title,
        duration: formData.duration,
        stageType: formData.stageType
      };
      
      formDataToSend.append('request', new Blob([JSON.stringify(jsonData)], {
        type: 'application/json'
      }));
      
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      if (currentSujet) {
        await axiosInstance.patch(
          `/sujets_stage/${currentSujet.id}`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      } else {
        const username = getUsernameFromToken();
        await axiosInstance.post(
          `/sujets_stage/${username}`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      }

      refreshSujets();
      closeModal();
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.response?.data?.message || 
        `Erreur lors de ${currentSujet ? 'la modification' : "l'ajout"} du sujet`);
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="p-6">
          <h2 className="text-size15 font-semibold text-gray-800 mb-6">
            {currentSujet ? 'Modifier le sujet' : 'Ajouter un nouveau sujet'}
          </h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 text-size13">
                <div>
                  <label className="block text-size12 font-medium text-gray-700 mb-1">
                    Titre *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-size12 font-medium text-gray-700 mb-1">
                    Durée *
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 cursor-pointer  border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    {["1 mois", "2 mois", "3 mois", "4 mois", "5 mois", "6 mois"].map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-size12 font-medium text-gray-700 mb-1">
                    Type de stage *
                  </label>
                  <select
                    name="stageType"
                    value={formData.stageType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border cursor-pointer  text-size12 border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    {Object.values(StageType).map(type => (
                      <option key={type} value={type} >
                        {type.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-size12 font-medium text-gray-700 mb-1">
                    Fichier PDF *
                  </label>
                  <div className="flex items-center">
                    <label className="flex flex-col max-h-4 items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-200 rounded cursor-pointer hover:border-blue-400">
                      <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf"
                        required={true}
                      />
                      <span className="text-sm text-gray-500">
                        {formData.file 
                          ? formData.file.name 
                          : currentSujet?.fileName 
                            ? `Fichier actuel: ${currentSujet.fileName}` 
                            : 'Cliquez pour sélectionner un fichier PDF'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-6">
              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer  px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
                disabled={loading}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="cursor-pointer  px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
                disabled={loading}
              >
                {loading 
                  ? currentSujet 
                    ? 'Enregistrement...' 
                    : 'Ajout en cours...'
                  : currentSujet
                    ? 'Enregistrer'
                    : 'Ajouter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUpdateSujetStageModal;