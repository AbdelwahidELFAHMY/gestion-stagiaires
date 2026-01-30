import { useState, useEffect } from "react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import axiosInstance from "../../../utils/axiosInstance";
import GetImageFromURL from "../../../utils/getImageFromURL";
import { FolderGitIcon, LucideClipboardCheck, User2 } from "lucide-react";
import EvaluationModal from "./EvaluationModal";
import { handleDownload } from "../../../utils/handleDownloadFile";

const Livrables = () => {
  const [livrables, setLivrables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false);
  const [currentStageId, setCurrentStageId] = useState(null);
  const [stagiaireUsername, setStagiaireUsername] = useState(null);

  const username = getUsernameFromToken();

  useEffect(() => {
    const fetchLivrables = async () => {
      try {
        if (!username) {
          throw new Error("Username non disponible");
        }

        const response = await axiosInstance.get(
          `/encadrants/livrables/${username}`
        );
        setLivrables(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching livrables:", error);
        alert("Erreur lors du chargement des livrables");
        setLoading(false);
      }
    };

    fetchLivrables();
  }, [username]);

  const getFileIcon = (type) => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("word")) return "📝";
    if (type.includes("zip")) return "🗄️";
    return "📁";
  };

  const openEvaluationModal = (stageId, stagiaire) => {
    setCurrentStageId(stageId);
    setStagiaireUsername(stagiaire.username);
    setEvaluationModalVisible(true);
  };

  return (
    <div className="container w-full">
      <div className="flex items-center space-x-3 mb-6">
              <FolderGitIcon className="w-6 h-6 text-gray-600" />
              <h1 className="text-md font-maFont font-medium bg-gradient-to-r from-gray-700  to-gray-900 bg-clip-text text-transparent">
              Livrables des Stagiaires
              </h1>
            </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {livrables.map((livrable) => (
            <div
              key={livrable.id}
              className="border-thin border-gray-200 rounded-md p-6 "
            >
              <div className="flex w-full mb-4">
                <div className="flex justify-between items-center w-full">
                  {" "}
                  <h2 className="text-xl font-semibold text-gray-800">
                    Stage: {livrable.stageTitre}
                  </h2>
                  {livrable.gitHubCodeSource && (
                    <a
                      href={livrable.gitHubCodeSource}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex justify-end items-end gap-1 text-sm"
                    >
                      <span>🔗</span> Lien Vers GitHub Repository
                    </a>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-700">Équipe:</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {livrable.equipe.map((stagiaire) => (
                    <div
                      key={stagiaire.username}
                      className="flex items-center  text-size15 gap-2 bg-gray-100 p-3 rounded-full"
                    >
                      {stagiaire.photo ? (
                        <GetImageFromURL
                          logoUrl={`${axiosInstance.defaults.baseURL.replace(
                            "/api",
                            ""
                          )}/photos/${stagiaire.photo.replace("photos/", "")}`}
                          alt="photo"
                          className="h-12 w-12 rounded-full border-thin object-cover mr-3"
                        />
                      ) :(
                        <div className="p-1 bg-gray-200 border-thin border-gray-300 rounded-full">
                        <User2 className="h-8 w-8 text-neutral-700" />
                        </div>
                      )}
                      <span>
                        {stagiaire.prenom} {stagiaire.nom}
                      </span>
                      <button
                        onClick={() =>
                          openEvaluationModal(livrable.stageId, stagiaire)
                        }
                        className="bg-gray-200 cursor-pointer p-2 ml-6 rounded-full  text-blue-700 hover:text-blue-800 text-size14 flex items-center gap-2"
                      >
                        <LucideClipboardCheck className="h-4 w-4" />
                        Évaluation Finale
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <h3 className="font-semibold mb-2 text-gray-700">
                Rapports déposés:
              </h3>
              {livrable.documents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {livrable.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <span className="text-xl mt-1">
                            {getFileIcon(doc.type)}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {doc.nom}
                            </div>
                            <div className="text-sm text-gray-500">
                              Déposé le {doc.dateSoumession}
                            </div>
                            <div className="text-sm text-gray-500">
                              {(doc.taille / 1024).toFixed(2)} KB
                            </div>
                          </div>
                        </div>
                        <button
  onClick={() =>
    handleDownload(
      doc.path, 
      doc.nom + `${doc.type.includes("pdf") ? ".pdf" : doc.type.includes("word") ? ".docx" : ".txt"}`
    )
  }
  className="cursor-pointer text-size13 text-blue-700 hover:text-blue-800 border border-blue-500 hover:border-blue-700 px-3 py-1 rounded flex items-center gap-1 transition-colors"
>
  <span>⬇️</span>
  Télécharger
</button>
                        
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">
                  Aucun document déposé pour ce livrable.
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <EvaluationModal
        visible={evaluationModalVisible}
        stagiaireUsername={stagiaireUsername}
        stageId={currentStageId}
        onClose={() => setEvaluationModalVisible(false)}
      />
    </div>
  );
};

export default Livrables;
