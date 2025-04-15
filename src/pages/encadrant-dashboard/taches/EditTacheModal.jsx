import { useState, useEffect } from "react";
import { X, Sparkles, Save } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import { BiCog } from "react-icons/bi";

const EditTacheModal = ({ isOpen, onClose, tache, setStagesWithTaches }) => {
  const [initialProgress, setInitialProgress] = useState(tache?.progress || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    description: tache?.description || "",
    duree: tache?.duree ? parseInt(tache.duree.split(" ")[0]) : 1,
    dateCreation: tache?.dateCreation || new Date().toISOString().split("T")[0],
    status: tache?.status || "A_FAIRE",
    progress: tache?.progress || 0,
    valide: tache?.valide || false,
    stageId: tache?.stageId,
    stagiaireId: tache?.stagiaireId,
  });

  useEffect(() => {
    if (tache) {
      setInitialProgress(tache.progress);
      setFormData({
        description: tache.description,
        duree: parseInt(tache.duree.split(" ")[0]),
        dateCreation: tache.dateCreation,
        status: tache.status,
        progress: tache.progress,
        valide: tache.valide,
        stageId: tache.stageId,
        stagiaireId: tache.stagiaireId,
      });
    }
  }, [tache]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "progress" ? parseInt(value) : value,
    }));
  };

  const handleValideChange = (e) => {
    const isChecked = e.target.checked;
    setFormData((prev) => {
      const newStatus = isChecked
        ? "TERMINE"
        : prev.progress === 100
        ? "EN_COURS"
        : prev.status;

      return {
        ...prev,
        valide: isChecked,
        progress: isChecked ? 100 : initialProgress,
        status: newStatus,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.valide && formData.progress !== 100) {
      toast.warning("Une tâche validée doit avoir une progression de 100%");
      return;
    }

    try {
      const updatedData = {
        ...formData,
        duree: `${formData.duree} semaine${formData.duree > 1 ? "s" : ""}`,
      };

      setIsSubmitting(true);
      await axiosInstance.put(`/encadrants/taches/${tache.id}`, updatedData);

      // Mise à jour optimiste
      setStagesWithTaches((prev) =>
        prev.map((stage) => ({
          ...stage,
          tacheDTOList: stage.tacheDTOList.map((item) =>
            item.id === tache.id
              ? {
                  ...item,
                  ...updatedData,
                  duree: updatedData.duree, // Garder le format texte pour la durée
                }
              : item
          ),
        }))
      );
      setIsSubmitting(false);
      toast.success("Tâche mise à jour avec succès");
      onClose();
    } catch (err) {
      setIsSubmitting(false)
      console.error("Erreur lors de la mise à jour:", err);
      toast.error(
        err.response?.data?.message || "Échec de la mise à jour de la tâche"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/35 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="flex items-center space-x-2 text-size14 font-medium bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">
            <BiCog size={20} className="text-gray-600" />
            <span>Modifier la tâche</span>
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 rounded-full p-0.5 cursor-pointer hover:bg-gray-300 hover:text-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-size12 font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full text-size13 border-thin border-gray-200 rounded-md p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-size12 font-medium text-gray-700 mb-1">
                  Durée (semaines)
                </label>
                <select
                  name="duree"
                  value={formData.duree}
                  onChange={handleChange}
                  className="w-full text-size13 border-thin border-gray-200 rounded-md p-2"
                >
                  {[1, 2, 3, 4, 5].map((week) => (
                    <option key={week} value={week}>
                      {week} semaine{week > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-size12 font-medium text-gray-700 mb-1">
                  Date de création
                </label>
                <input
                  type="date"
                  name="dateCreation"
                  value={formData.dateCreation}
                  onChange={handleChange}
                  className="w-full text-size13 border-thin border-gray-200 rounded-md p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-size12 font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full text-size13 border-thin border-gray-200 rounded-md p-2"
                >
                  <option value="A_FAIRE">À faire</option>
                  <option value="EN_COURS">En cours</option>
                  <option value="TERMINE">Terminé</option>
                </select>
              </div>

              <div>
                <label className="block text-size12 font-medium text-gray-700 mb-1">
                  Progression (%)
                </label>
                <input
                  type="number"
                  name="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  readOnly
                  className="w-full text-size13 border-thin border-gray-200 rounded-md p-2"
                />
              </div>
            </div>

            <div className="flex w-full justify-center items-center">
              <input
                type="checkbox"
                id="valide"
                name="valide"
                checked={formData.valide}
                onChange={handleValideChange}
                className="mr-2"
              />
              <label
                htmlFor="valide"
                className="text-size14 font-medium text-gray-700"
              >
                Tâche validée
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer text-size14 px-4 py-2 border-thin hover:bg-gray-200 border-gray-300 rounded-md"
              >
                <X size={14} className="inline mr-3" />
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400 justify-center items-center border-thin border-blue-300 text-size14 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save size={14} className="inline mr-2" />
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 z-50 bg-transparent w-full h-full flex items-center justify-center">
          <div className="bg-transparent rounded-2xl p-8 w-fit h-fit flex flex-col items-center">
            <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditTacheModal;
