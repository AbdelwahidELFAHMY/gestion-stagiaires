import {  useLayoutEffect, useRef, useState } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import axiosInstance from '../../../utils/axiosInstance';
import { DownloadIcon, GanttChart } from 'lucide-react';

export default function DiagrammeDeGantt() {
  const stageId = localStorage.getItem("stageId");
  const ganttContainerRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);
  const [ganttData, setGanttData] = useState(null);

  useLayoutEffect(() => {
    let isMounted = true;

    const fetchAndInitGantt = async () => {
        if (!stageId) return;

        try {
            // 1. Fetch data
            const { data } = await axiosInstance.get(`/stages/gantt/${stageId}`);
            if (!isMounted) return;

            // 2. Prepare tasks
            const tasks = [
                // Parent task
                {
                    id: -1,
                    text: data.titre,
                    start_date: new Date(data.dateDebut),
                    duration: Math.ceil((new Date(data.dateFin) - new Date(data.dateDebut)) / (86400000)),
                    open: true
                },
                // Child tasks
                ...data.tacheDTOList.map(tache => ({
                    id: tache.id,
                    text: tache.description,
                    start_date: new Date(tache.dateCreation),
                    duration: tache.duree.includes("semaine") ? parseInt(tache.duree) * 7 : parseInt(tache.duree) || 1,
                    parent: -1,
                    progress: tache.progress / 100
                }))
            ];

            // 3. Initialize Gantt
            if (!gantt.$initialized) {
                gantt.init(ganttContainerRef.current);
                gantt.config.readonly = true;
                gantt.config.autosize = true;
            }

            // 4. Load data
            gantt.clearAll();
            gantt.parse({ data: tasks });
            setGanttData(data);

        } catch (err) {
            if (isMounted) setError("Failed to load Gantt");
            console.error("Gantt error:", err);
        }
    };

    fetchAndInitGantt();

    return () => {
        isMounted = false;
        if (gantt.$initialized) gantt.destroy();
    };
}, [stageId]);

  const generateGanttImage = async () => {
    if (!ganttData) return;

    try {
        setIsExporting(true);

        // Configuration du style - Modifié pour meilleure lisibilité
        const config = {
            margin: { top: 120, right: 50, bottom: 50, left: 250 }, // Augmenté left pour plus d'espace
            barHeight: 30, // Légèrement augmenté
            rowGap: 15,
            fontSize: 12,
            fontFamily: 'Arial',
            colors: {
                A_FAIRE: '#f0ad4e',
                EN_COURS: '#5bc0de',
                TERMINE: '#5cb85c',
                background: '#ffffff',
                grid: '#e0e0e0',
                text: '#333333',
                today: '#ff6b6b'
            },
            scale: 4,
            maxTextWidth: 400 
        };

        // Calcul des dimensions
        const taskCount = ganttData.tacheDTOList.length + 1; // +1 pour la tâche parente
        const height = config.margin.top + (config.barHeight + config.rowGap) * taskCount + config.margin.bottom;
        const width = 1600;

        // Création du canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Fond blanc
        ctx.fillStyle = config.colors.background;
        ctx.fillRect(0, 0, width, height);

        // Dates et calculs
        const dateDebut = new Date(ganttData.dateDebut);
        const dateFin = new Date(ganttData.dateFin);
        const totalDays = Math.ceil((dateFin - dateDebut) / (1000 * 60 * 60 * 24)) + 1;
        const chartWidth = width - config.margin.left - config.margin.right;
        const dayWidth = chartWidth / totalDays;

        // Police
        ctx.font = `${config.fontSize}px ${config.fontFamily}`;
        ctx.textBaseline = 'middle';

        // Titre principal
        ctx.fillStyle = config.colors.text;
        ctx.font = `bold 16px ${config.fontFamily}`;
        ctx.fillText(`Diagramme de Gantt - ${ganttData.titre}`, config.margin.left, 30);

        // Légende
        ctx.font = `${config.fontSize}px ${config.fontFamily}`;
        const legendItems = [
            { color: config.colors.A_FAIRE, label: 'À faire' },
            { color: config.colors.EN_COURS, label: 'En cours' },
            { color: config.colors.TERMINE, label: 'Terminé' }
        ];
        legendItems.forEach((item, i) => {
            ctx.fillStyle = item.color;
            ctx.fillRect(config.margin.left + i * 100, 70, 20, 15);
            ctx.fillStyle = config.colors.text;
            ctx.fillText(item.label, config.margin.left + i * 100 + 25, 77);
        });

        // Grille et en-tête de dates
        ctx.fillStyle = config.colors.text;
        ctx.font = `bold ${config.fontSize}px ${config.fontFamily}`;
        
        // Dessiner les lignes verticales (jours/semaines)
        for (let i = 0; i <= totalDays; i++) {
            const x = config.margin.left + i * dayWidth;
            const currentDate = new Date(dateDebut);
            currentDate.setDate(currentDate.getDate() + i);

            // Ligne verticale
            ctx.strokeStyle = config.colors.grid;
            ctx.beginPath();
            ctx.moveTo(x, config.margin.top - 20);
            ctx.lineTo(x, height - config.margin.bottom);
            ctx.stroke();

            // Étiquette de semaine
            if (i % 7 === 0) {
                ctx.fillText(`S${Math.floor(i / 7) + 1}`, x + 2, config.margin.top - 5);
            }

            // Étiquette de date (1er du mois ou tous les 15 jours)
            if (currentDate.getDate() === 1 || i % 15 === 0) {
                ctx.fillText(
                    currentDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
                    x + 2,
                    config.margin.top - 25
                );
            }
        }

        // Dessiner les tâches
        let yPos = config.margin.top + 10;

        // Tâche parente (le projet global)
        const parentDuration = Math.ceil((dateFin - dateDebut) / (1000 * 60 * 60 * 24));
        drawTaskBar({
            ctx,
            x: config.margin.left,
            y: yPos,
            width: parentDuration * dayWidth,
            height: config.barHeight,
            text: ganttData.titre,
            color: '#6c757d',
            progress: 100,
            config
        });
        yPos += config.barHeight + config.rowGap;

        ganttData.tacheDTOList.forEach(tache => {
          const startDate = new Date(tache.dateCreation);
          const startOffset = Math.max(0, Math.ceil((startDate - dateDebut) / (1000 * 60 * 60 * 24)));
          
          let duration = 1;
          if (tache.duree.includes("semaine")) {
              duration = parseInt(tache.duree) * 7;
          } else if (tache.duree.includes("jour")) {
              duration = parseInt(tache.duree);
          }

          drawTaskBar({
              ctx,
              x: config.margin.left + startOffset * dayWidth,
              y: yPos,
              width: duration * dayWidth,
              height: config.barHeight,
              text: tache.description,
              color: config.colors[tache.status],
              progress: tache.progress,
              config
          });

          // Texte à gauche (nom de la tâche) - MODIFIÉ POUR MEILLEURE VISIBILITÉ
          ctx.fillStyle = config.colors.text;
          ctx.textAlign = 'right';
          
          // Fonction pour couper le texte avec ellipse si trop long
          const drawTextWithEllipsis = (text, x, y, maxWidth) => {
              const ellipsis = "...";
              let textWidth = ctx.measureText(text).width;
              
              if (textWidth <= maxWidth) {
                  ctx.fillText(text, x, y);
              } else {
                  let truncatedText = text;
                  while (textWidth > maxWidth && truncatedText.length > 0) {
                      truncatedText = truncatedText.substring(0, truncatedText.length - 1);
                      textWidth = ctx.measureText(truncatedText + ellipsis).width;
                  }
                  ctx.fillText(truncatedText + ellipsis, x, y);
              }
          };
          
          // Dessiner le texte avec gestion de la longueur
          drawTextWithEllipsis(
              tache.description,
              config.margin.left - 10, // Position ajustée
              yPos + config.barHeight / 2,
              config.maxTextWidth
          );
          
          ctx.textAlign = 'left';

          // Texte à droite (durée et progression)
          const durationText = tache.duree.includes("semaine") 
              ? `${parseInt(tache.duree)} sem` 
              : `${parseInt(tache.duree)} j`;
          ctx.fillText(
              `${durationText} | ${tache.progress}%`,
              config.margin.left + startOffset * dayWidth + duration * dayWidth + 5,
              yPos + config.barHeight / 2
          );

          yPos += config.barHeight + config.rowGap;
      });
        // Ligne de date actuelle
        const today = new Date();
        if (today >= dateDebut && today <= dateFin) {
            const todayOffset = Math.ceil((today - dateDebut) / (1000 * 60 * 60 * 24));
            const xToday = config.margin.left + todayOffset * dayWidth;
            
            ctx.strokeStyle = config.colors.today;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(xToday, config.margin.top - 20);
            ctx.lineTo(xToday, height - config.margin.bottom);
            ctx.stroke();
            ctx.lineWidth = 1;

            // Étiquette "Aujourd'hui"
            ctx.fillStyle = config.colors.today;
            ctx.fillText(
                "Aujourd'hui",
                xToday + 5,
                config.margin.top - 20
            );
        }

        // Télécharger l'image
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `gantt-${ganttData.titre.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();

    } catch (err) {
        console.error("Erreur lors de la génération du PNG", err);
        setError("Erreur lors de la génération du PNG");
    } finally {
        setIsExporting(false);
    }
};

// Fonction utilitaire pour dessiner une barre de tâche
function drawTaskBar({ ctx, x, y, width, height, text, color, progress, config }) {
    // Barre de fond
    ctx.fillStyle = color + '80'; // Ajoute de la transparence
    ctx.fillRect(x, y, width, height);
    
    // Progression
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width * (progress / 100), height);
    
    // Bordure
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, width, height);
    
    // Texte à l'intérieur (si assez de place)
    if (width > 50) {
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.fillText(
            text.substring(0, Math.floor(width / 8)), // Limite la longueur du texte
            x + width / 2,
            y + height / 2
        );
        ctx.textAlign = 'left';
    }
}
  


  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error} - <button 
          onClick={() => setError(null)} 
          className="text-blue-500 underline"
        >
          Réessayer
        </button>
      </div>
    );
  }

 return (
    <div className="w-full h-full bg-white p-4 overflow-y-auto scrollbar-thin">
      <div className="flex justify-between items-center mb-3 mt-1">
  <span className='text-sm bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 bg-clip-text text-transparent'>
    <GanttChart className=' text-blue-800 w-10 h-6 inline mr-3'/>Diagramme de Gantt
  </span>
        <button
          onClick={generateGanttImage}
          disabled={isExporting}
          className="flex cursor-pointer text-size13 items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <DownloadIcon className="h-4 w-4 mr-2" />
          <span className="export-btn-text">

          {isExporting ? 'Génération en cours...' : 'Exporter en PNG'}
          </span>
        </button>
      </div>

      <div 
        ref={ganttContainerRef}
        className="w-full border-thin text-size13 border-gray-200 rounded-lg overflow-hidden bg-white gantt-export-container"
        style={{ 
          height: 'calc(100vh)',
          color: '#000',
          backgroundColor: '#fff'
        }}
      ></div>
    </div>
  );
}