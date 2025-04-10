import { useState, useEffect, useRef } from "react";
import { CalendarIcon, DownloadIcon } from "lucide-react";
import { jsPDF } from 'jspdf';
import axiosInstance from "../../../utils/axiosInstance";

const Agenda = () => {
  const [emplois, setEmplois] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const stageId = localStorage.getItem("stageId");
  const tableRef = useRef(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    const fetchEmplois = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(`/emplois/${stageId}`);

        if (response.status === 200) {
          setEmplois(response.data);
        } else {
          throw new Error(`Réponse inattendue: ${response.status}`);
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError(err.response?.data?.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    if (stageId) {
      fetchEmplois();
    } else {
      setError("Aucun stage sélectionné");
      setLoading(false);
    }
  }, [stageId]);

  const formatHeure = (heure) => {
    return heure.replace(/^0/, "").replace(":00", "h");
  };

  const exportToPDF = () => {
    try {
      setIsGeneratingPDF(true);
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
  
      // Styles améliorés
      const mainColor = [33, 150, 243]; 
      const accentColor = [76, 175, 80]; 
      const lightGray = [241, 241, 241];
      const darkGray = [51, 51, 51];
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Titre centré avec plus d'impact (Times New Roman)
      pdf.setFontSize(14);
      pdf.setTextColor(...mainColor);
      pdf.setFont('times', 'bold');
      pdf.text('EMPLOI DU TEMPS', pageWidth / 2, 20, { align: 'center' });
      
      // Dimensions du tableau
      const tableWidth = 150;
      const tableX = (pageWidth - tableWidth) / 2;
      const headerHeight = 12;
      const rowHeight = 12;
      let y = 30;
  
      // En-tête du tableau (Times en gras)
      pdf.setFillColor(...mainColor);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont('times', 'bold');
      pdf.setFontSize(12);
      
      // Cellules d'en-tête
      pdf.rect(tableX, y, 40, headerHeight, 'F');
      pdf.rect(tableX + 40, y, 55, headerHeight, 'F');
      pdf.rect(tableX + 95, y, 55, headerHeight, 'F');
      
      // Texte des en-têtes centré verticalement
      pdf.text('JOUR', tableX + 20, y + headerHeight/2 + 3, { align: 'center' });
      pdf.text('MATIN', tableX + 67.5, y + headerHeight/2 + 3, { align: 'center' });
      pdf.text('APRÈS-MIDI', tableX + 122.5, y + headerHeight/2 + 3, { align: 'center' });
      
      y += headerHeight;
  
      // Contenu du tableau (Times normal)
      pdf.setFont('times', 'normal');
      pdf.setFontSize(11);
      
      emploiParJour.forEach(({ jour, creneaux }, index) => {
        // Alternance des couleurs de fond
        pdf.setFillColor(...(index % 2 === 0 ? [255, 255, 255] : lightGray));
        pdf.rect(tableX, y, 40, rowHeight, 'F');
        pdf.rect(tableX + 40, y, 55, rowHeight, 'F');
        pdf.rect(tableX + 95, y, 55, rowHeight, 'F');
        
        // Jour
        pdf.setTextColor(...darkGray);
        pdf.text(jour, tableX + 20, y + rowHeight/2 + 3, { align: 'center' });
        
        // Matin
        const matin = creneaux.find(c => c.periodeJournee === "MATIN");
        if (matin) {
          pdf.setTextColor(...mainColor);
          pdf.text(
            `${formatHeure(matin.heureDebut)} - ${formatHeure(matin.heureFin)}`,
            tableX + 67.5,
            y + rowHeight/2 + 3,
            { align: 'center' }
          );
        }
        
        // Après-midi
        const soir = creneaux.find(c => c.periodeJournee === "SOIR");
        if (soir) {
          pdf.setTextColor(...accentColor);
          pdf.text(
            `${formatHeure(soir.heureDebut)} - ${formatHeure(soir.heureFin)}`,
            tableX + 122.5,
            y + rowHeight/2 + 3,
            { align: 'center' }
          );
        }
        
        y += rowHeight;
      });
  
      // Bordure du tableau
      pdf.setDrawColor(200, 200, 200);
      pdf.rect(tableX, 30, tableWidth, y - 30);
  
      // Pied de page centré (Times italique)
      pdf.setFontSize(10);
      pdf.setFont('times', 'italic');
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Document généré le ${new Date().toLocaleDateString('fr-FR')} • ${new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}`,
        pageWidth / 2,
        200,
        { align: 'center' }
      );
      
      pdf.save('emploi_du_temps.pdf');
    } catch (error) {
      console.error("PDF Error:", error);
      alert("Erreur lors de la création du PDF");
    } finally {
      setIsGeneratingPDF(false);
    }
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Chargement de l'emploi du temps...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 m-5 bg-red-50 border-l-4 border-red-500">
        <h3 className="text-lg font-medium text-red-800">Erreur</h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  const jours = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI"];
  const emploiParJour = jours.map((jour) => ({
    jour,
    creneaux: emplois.filter((e) => e.joursSemaine === jour),
  }));

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50">
      <div className="flex border-b-thin border-gray-200 justify-between items-center mb-3 pb-3">
        <h2 className="text-size15 font-semibold text-gray-800 flex items-center">
          <CalendarIcon className="h-5 w-5 text-blue-700 mr-2" />
          Votre Agenda
        </h2>
        <button
          onClick={exportToPDF}
          className="flex cursor-pointer text-size13 items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          disabled={isGeneratingPDF}
        >
          <DownloadIcon className="h-4 w-4 mr-2" />
          <span className="export-btn-text">
            {isGeneratingPDF ? "En cours..." : "Exporter en PDF"}
          </span>
        </button>
      </div>

      <div
        ref={tableRef}
        className="overflow-x-auto rounded-lg border border-gray-200 shadow"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                Jour
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider border-r border-gray-200">
                Matin
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                Après-midi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {emploiParJour.map(({ jour, creneaux }) => (
              <tr
                key={jour}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {jour}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center border-r border-gray-200">
                  {creneaux.find((c) => c.periodeJournee === "MATIN") ? (
                    <span className="inline-flex items-center bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      <span>
                        {formatHeure(
                          creneaux.find((c) => c.periodeJournee === "MATIN")
                            .heureDebut
                        )}
                      </span>
                      <span className="mx-2 ">→</span>
                      <span>
                        {formatHeure(
                          creneaux.find((c) => c.periodeJournee === "MATIN")
                            .heureFin
                        )}
                      </span>
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 text-center">
                  {creneaux.find((c) => c.periodeJournee === "SOIR") ? (
                    <span className="inline-flex items-center bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      <span>
                        {formatHeure(
                          creneaux.find((c) => c.periodeJournee === "SOIR")
                            .heureDebut
                        )}
                      </span>
                      <span className="mx-2">→</span>
                      <span>
                        {formatHeure(
                          creneaux.find((c) => c.periodeJournee === "SOIR")
                            .heureFin
                        )}
                      </span>
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agenda;
