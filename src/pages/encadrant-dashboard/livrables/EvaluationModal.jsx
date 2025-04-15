import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "react-toastify";
import GetImageFromURL from "../../../utils/getImageFromURL";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const EvaluationModal = ({ visible, stagiaireUsername, stageId, onClose }) => {
  const [stageData, setStageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notesTaches, setNotesTaches] = useState({});
  const [competencesTechniques, setCompetencesTechniques] = useState(10);
  const [qualiteTravail, setQualiteTravail] = useState(10);
  const [communication, setCommunication] = useState(10);
  const [tenueGenerale, setTenueGenerale] = useState(10);
  const [pointsForts, setPointsForts] = useState("");
  const [pointsAmeliorer, setPointsAmeliorer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (visible && stageId && stagiaireUsername) {
      fetchStageData();
    }
  }, [visible, stageId, stagiaireUsername]);

  const fetchStageData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/encadrants/evaluation/${stagiaireUsername}/${stageId}`
      );
      setStageData(response.data);

      // Initialiser les notes des tâches si elles existent déjà
      if (response.data.tacheDTOS) {
        const initialNotes = {};
        response.data.tacheDTOS.forEach((tache) => {
          if (tache.note) {
            initialNotes[tache.id] = tache.note;
          }
        });
        setNotesTaches(initialNotes);
      }
    } catch (err) {
      console.error("Failed to fetch stage data:", err);
      setError("Échec du chargement des données du stage");
      toast.error("Impossible de charger les données du stage");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleNoteTacheChange = (tacheId, note) => {
    setNotesTaches((prev) => ({
      ...prev,
      [tacheId]: Math.min(20, Math.max(0, note)), // Limite entre 0 et 20
    }));
  };

  const generateEvaluationPDF = () => {
    const doc = new jsPDF();

    // Style pour les titres
    const titleStyle = {
      fontSize: 12,
      textColor: [40, 40, 40],
      fontStyle: "bold",
    };
    const subtitleStyle = {
      fontSize: 11,
      textColor: [60, 60, 60],
    };
    const sectionTitleStyle = {
      fontSize: 11,
      textColor: [50, 50, 50],
      fontStyle: "bold",
    };

    // En-tête du document
    doc.setFontSize(titleStyle.fontSize);
    doc.setTextColor(...titleStyle.textColor);
    doc.setFont(undefined, titleStyle.fontStyle);
    doc.text(`FICHE D'ÉVALUATION DE STAGE`, 105, 15, { align: "center" });

    // Intitulé du stage
    doc.setFontSize(subtitleStyle.fontSize);
    doc.setTextColor(...subtitleStyle.textColor);
    doc.text(`Intitulé: ${stageData.intituleStage}`, 105, 25, {
      align: "center",
    });

    // Ligne séparatrice
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 30, 190, 30);

    // Informations en deux colonnes
    doc.setFontSize(subtitleStyle.fontSize);

    // Colonne de gauche
    doc.text(`Entreprise: ${stageData.entrepriseName}`, 14, 40);
    doc.text(`Stagiaire: ${stageData.stagiaire}`, 14, 48);

    // Colonne de droite
    const rightColumnX = 130; // Position de départ de la colonne droite
    doc.text(
      `Période: ${new Date(stageData.dateDebutStage).toLocaleDateString(
        "fr-FR"
      )} au ${new Date(stageData.dateFinStage).toLocaleDateString("fr-FR")}`,
      rightColumnX,
      40
    );
    doc.text(`Encadrant: ${stageData.encadrant}`, rightColumnX, 48);

    // Espacement avant la section suivante
    const spacing = 3;

    // Section Évaluation des tâches
    doc.setFontSize(sectionTitleStyle.fontSize - 2);
    doc.setTextColor(...sectionTitleStyle.textColor);
    doc.setFont(undefined, sectionTitleStyle.fontStyle);
    doc.text(`ÉVALUATION DES TÂCHES`, 14, 55 + spacing + 1);

    // Tableau simplifié
    const tasksData = stageData.tacheDTOS.map((tache) => [
      tache.description,
      notesTaches[tache.id] || "0/20",
    ]);

    autoTable(doc, {
      startY: 60 + spacing,
      head: [["Tâche", "Note"]],
      body: tasksData,
      margin: { left: 14 },
      styles: {
        cellPadding: 4,
        fontSize: 10,
        lineColor: [200, 200, 200],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        cellPadding: 3,
      },
      bodyStyles: {
        cellPadding: 3,
      },
    });

    // Section Évaluation Globale
    doc.setFontSize(sectionTitleStyle.fontSize - 2);
    doc.text(`ÉVALUATION GLOBALE`, 14, doc.lastAutoTable.finalY + 10 + spacing);

    const globalEvalData = [
      ["Compétences Techniques", `${competencesTechniques}/20`],
      ["Qualité du travail", `${qualiteTravail}/20`],
      ["Communication", `${communication}/20`],
      ["Tenue Générale", `${tenueGenerale}/20`],
    ];

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 15 + spacing,
      head: [["Critère", "Note"]],
      body: globalEvalData,
      margin: { left: 14 },
      styles: {
        cellPadding: 4,
        fontSize: 10,
        lineColor: [200, 200, 200],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        cellPadding: 3,
      },
      bodyStyles: {
        cellPadding: 3,
      },
    });

    // Section Commentaires
    doc.setFontSize(sectionTitleStyle.fontSize - 2);
    doc.setTextColor(...sectionTitleStyle.textColor);
    doc.setFont(undefined, sectionTitleStyle.fontStyle);
    doc.text(`NOTES GÉNÉRALES`, 14, doc.lastAutoTable.finalY + 10);

    // Configuration d'espacement
    const lineHeight = 7; // Hauteur de base par ligne
    const sectionGap = 10; // Espace entre sections
    const indent = 20; // Marge gauche du contenu

    // Points forts
    doc.setFontSize(subtitleStyle.fontSize - 1);
    doc.setTextColor(...subtitleStyle.textColor);
    const pointsFortsY = doc.lastAutoTable.finalY + 18;
    doc.text(`Points forts:`, 14, pointsFortsY);

    // Calcul dynamique de la hauteur occupée
    const pointsFortsLines = doc.splitTextToSize(pointsForts, 175);
    const pointsFortsHeight = pointsFortsLines.length * lineHeight;
    doc.text(pointsFortsLines, indent, pointsFortsY + lineHeight, {
      lineHeightFactor: 1.5,
    });

    // Points à améliorer - Positionnement dynamique
    const pointsAmeliorerY = pointsFortsY + pointsFortsHeight + sectionGap;
    doc.text(`Points à améliorer:`, 14, pointsAmeliorerY);

    const pointsAmeliorerLines = doc.splitTextToSize(pointsAmeliorer, 175);
    const pointsAmeliorerHeight = pointsAmeliorerLines.length * lineHeight;
    doc.text(pointsAmeliorerLines, indent, pointsAmeliorerY + lineHeight, {
      lineHeightFactor: 1.5,
    });

    // Signature - Positionnement basé sur le contenu précédent
    const signatureY = pointsAmeliorerY + pointsAmeliorerHeight + 10;
    doc.setFontSize(sectionTitleStyle.fontSize);
    doc.text(`Signature de l'encadrant`, 14, signatureY);
    doc.setDrawColor(0, 0, 0);
    doc.line(14, signatureY + 5, 60, signatureY + 5);

    // Date
    doc.setFontSize(9);
    doc.text(`${new Date().toLocaleDateString("fr-FR")}`, 180, signatureY);
    return doc.output("blob");
  };

  const handleSubmit = async () => {
    if (!stagiaireUsername || !stageId) return;

    setIsSubmitting(true);
    try {
      // 1. Générer le PDF
      const pdfBlob = generateEvaluationPDF();

      // 2. Créer FormData
      const formData = new FormData();
      formData.append(
        "evaluation",
        pdfBlob,
        `evaluation_${stageId}_${stagiaireUsername}.pdf`
      );

      // 3. Options de requête avec timeout
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 secondes timeout
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      };

      // 4. Envoyer la requête
      const response = await axiosInstance.post(
        `/encadrants/evaluation/${stagiaireUsername}/${stageId}`,
        formData,
        config
      );

      toast.success("Évaluation enregistrée avec succès");
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, "_blank");
      onClose();
    } catch (error) {
      console.error("Erreur détaillée:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de l'enregistrement. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!visible) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex h-full items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full h-[95vh] max-w-md text-center">
          <h3 className="text-xl font-semibold mb-4">Chargement en cours...</h3>
          <p>Veuillez patienter pendant le chargement des données du stage.</p>
        </div>
      </div>
    );
  }

  if (error || !stageData) {
    return (
      <div className="fixed inset-0 bg-black/40  h-full flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg  h-[95vh]  w-full max-w-md text-center">
          <h3 className="text-xl font-semibold mb-4 text-red-600">Erreur</h3>
          <p className="mb-4">
            {error || "Impossible de charger les données du stage"}
          </p>
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 overflow-y-auto py-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-2/3 max-h-[97vh] overflow-y-auto scrollbar-thin">
        {/* Dans le header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          {/* Logo + nom entreprise */}
          <div className="flex-1 flex items-center min-w-0">
            {stageData.entrepriseLogo ? (
              <GetImageFromURL
                logoUrl={`${axiosInstance.defaults.baseURL.replace(
                  "/api",
                  ""
                )}/photos/${stageData.entrepriseLogo.replace("logos/", "")}`}
                alt={`${stageData.entrepriseName} Logo`}
                className="h-10 w-auto"
              />
            ) : (
              <div className="h-12 w-12 bg-orange-400 flex rounded-full items-center justify-center text-white font-logoFont text-size10">
                {stageData.entrepriseName.substring(0, 2).toLocaleUpperCase()}
              </div>
            )}
            <span className="ml-4 font-semibold text-gray-700 truncate">
              {stageData.entrepriseName}
            </span>
          </div>

          {/* Titre */}
          <div className="flex-1 text-center px-2">
            <h3 className="text-xl font-semibold text-gray-800 whitespace-nowrap">
              Évaluation de Mr. {stageData.stagiaire}
            </h3>
          </div>

          {/* Date */}
          <div className="flex-1 text-right min-w-0">
            <p className="text-gray-600 whitespace-nowrap">
              {new Date().toLocaleDateString("fr-FR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mb-6 w-full border-b pb-4">
          <div className="w-full flex  justify-between items-center">
            <div>
              <div className="text-size15 font-bold">
                <span className="mr-2 bg-gray-50 text-left text-size12 font-medium text-gray-600 uppercase tracking-wider">
                  Intitulé:
                </span>{" "}
                {stageData.intituleStage}
              </div>
            </div>
            <div>
              <div>
                <span className="mr-2 bg-gray-50 text-left text-size12 font-medium text-gray-600 uppercase tracking-wider">
                  Encadrant:
                </span>{" "}
                {stageData.encadrant}
              </div>
              <p>
                <span className="mr-8 bg-gray-50 text-left text-size12 font-medium text-gray-600 uppercase tracking-wider">
                  Période:
                </span>{" "}
                {new Date(stageData.dateDebutStage).toLocaleDateString()} --
                {">"} {new Date(stageData.dateFinStage).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-size14 mb-3 text-gray-700 uppercase tracking-wider">
            Évaluation des tâches
          </h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100 text-size11 uppercase tracking-wider">
                  <th className="py-2 px-4 border text-left">Tâche</th>
                  <th className="py-2 px-4 border text-left">
                    Progression Achevée
                  </th>
                  <th className="py-2 px-4 border text-left">Note/20</th>
                </tr>
              </thead>
              <tbody>
                {stageData.tacheDTOS.map((tache) => (
                  <tr key={tache.id} className="border-b">
                    <td className="py-2  px-4 border-thin">
                      {tache.description}
                    </td>
                    <td className="py-2 px-4 border">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            tache.progress === 100
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }`}
                          style={{ width: `${tache.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">
                        {tache.progress}%
                      </span>
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        className="w-16 px-2 py-1 border rounded"
                        value={notesTaches[tache.id] || ""}
                        onChange={(e) =>
                          handleNoteTacheChange(
                            tache.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-medium text-size14 mb-6 text-gray-700 uppercase tracking-wider">
            Évaluation globale
          </h4>
          <div className="grid grid-cols-2 gap-x-32 gap-y-3 mb-6">
            <div className="flex items-center justify-between">
              <label className="font-medium  text-size14">
                Compétences Techniques:
              </label>
              <input
                type="number"
                min="0"
                max="20"
                className="w-16 px-2 py-1 border rounded"
                value={competencesTechniques}
                onChange={(e) =>
                  setCompetencesTechniques(parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium  text-size14">
                Qualité du travail:
              </label>
              <input
                type="number"
                min="0"
                max="20"
                className="w-16 px-2 py-1 border rounded"
                value={qualiteTravail}
                onChange={(e) =>
                  setQualiteTravail(parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium  text-size14">Communication:</label>
              <input
                type="number"
                min="0"
                max="20"
                className="w-16 px-2 py-1 border rounded"
                value={communication}
                onChange={(e) =>
                  setCommunication(parseInt(e.target.value) || 0)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="font-medium  text-size14">
                Tenue Générale:
              </label>
              <input
                type="number"
                min="0"
                max="20"
                className="w-16 px-2 py-1 border rounded"
                value={tenueGenerale}
                onChange={(e) =>
                  setTenueGenerale(parseInt(e.target.value) || 0)
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">
              Points forts:{" "}
              <span className="text-size10 text-gray-500">
                (max 300 caractères)
              </span>
            </label>
            <textarea
              className="w-full px-3 py-2 border-thin border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              value={pointsForts}
              onChange={(e) => setPointsForts(e.target.value)}
              placeholder="Les points positifs à souligner..."
              maxLength={300}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">
              Points à améliorer:{" "}
              <span className="text-size10 text-gray-500">
                (max 300 caractères)
              </span>
            </label>
            <textarea
              className="w-full px-3 py-2 border-thin border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
              value={pointsAmeliorer}
              onChange={(e) => setPointsAmeliorer(e.target.value)}
              placeholder="Les aspects qui pourraient être améliorés..."
              maxLength={300}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-md transition-colors"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            className={`flex items-center justify-center cursor-pointer disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors ${
              isSubmitting ? "opacity-75" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                {/* Spinner amélioré avec animation */}
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                <span>Patientez...</span>
              </div>
            ) : (
              "Sauvegarder"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvaluationModal;
