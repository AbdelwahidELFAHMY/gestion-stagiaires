import React, { useState } from "react";
import { FileText, FileSignature, File, Edit, Download, FileType2Icon, ViewIcon } from "lucide-react";
import EditAcademicModal from "./EditAcademicModal";
import { updateAcademicInfos } from "../../../stores/stagiaire_slices/academicSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../utils/axiosInstance";
import { Document, Page } from "react-pdf";
import { handleDownload } from "../../../utils/handleDownloadFile";
import { handleViewFile } from "../../../utils/handleViewFile";

export default function AcademicInfos({ academicInfos }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentInfos, setCurrentInfos] = useState(academicInfos || {});
  const dispatch = useDispatch();
  const [pdfUrl, setPdfUrl] = useState(null);

  if (!academicInfos) {
    return (
      <div className="animate-pulse bg-white rounded-xl shadow-sm p-6 mb-6 h-64 flex items-center justify-center">
        <div className="text-gray-500">
          Chargement des informations académiques...
        </div>
      </div>
    );
  }

  const handleSave = async ({ data, cvFile, conventionFile }) => {
    try {
      await dispatch(
        updateAcademicInfos({
          data,
          cvFile,
          conventionFile,
        })
      ).unwrap();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      // Vous pouvez ajouter ici une notification d'erreur
    }
  };



  return (
    <div className="space-y-3">
      {/* Section Informations Académiques */}
      <div className="bg-white rounded-md border border-gray-100 p-6 mb-3 relative transition-all">
        <div className="flex items-center justify-between mb-6">
          <div className=" flex items-center space-x-2">
            <File className=" h-5 w-5 text-blue-600" />
            <h2 className="text-size14 font-medium text-gray-800">
              Informations Académiques
            </h2>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className=" cursor-pointer p-2 rounded-full bg-gray-50 hover:bg-gray-200 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Modifier les informations"
          >
            <Edit size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "CNE", value: currentInfos.cne, name: "cne" },
            { label: "CIN", value: currentInfos.cin, name: "cin" },
            { label: "Niveau", value: currentInfos.niveau, name: "niveau" },
            { label: "Branche", value: currentInfos.branche, name: "branche" },
            {
              label: "Établissement",
              value: currentInfos.etablissement,
              name: "etablissement",
            },
            {
              label: "Université",
              value: currentInfos.universite,
              name: "universite",
            },
          ].map((item, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-size12 text-gray-800 font-medium">
                {item.value || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section Documents */}
      <div className="bg-white rounded-md border-thin border-gray-100 px-6 py-3 relative transition-all">
      

        <div className="flex flex-wrap items-center justify-between">
  {currentInfos.cv && (
    <div className="flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-xs border-thin">
      <FileText className="text-green-600 mr-1" size={20} />
      <span className="font-medium text-xs text-gray-700">CV :</span>
      <button onClick={() => handleViewFile(currentInfos.cv)} 
      className="cursor-pointer ml-10  flex items-center gap-1 text-green-600 hover:text-green-700 text-size12 transition-transform hover:scale-105">
        <File size={14} />
        Voir
      </button>
      <button onClick={() => handleDownload(currentInfos.cv, `CV_${currentInfos.cne}.pdf`)} 
      className="cursor-pointer flex items-center ml-4 gap-1 text-blue-600 hover:text-blue-700 text-size12 transition-transform hover:scale-105">
        <Download size={14} />
        Télécharger
      </button>
    </div>
  )}
  {currentInfos.convention && (
    <div className="flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-xs border-thin">
      <FileType2Icon className="text-green-700" size={18} />
      <span className="font-medium text-size12 text-gray-700">Convention :</span>
      <button onClick={() => handleViewFile(currentInfos.convention)}
      className="cursor-pointer ml-10  flex items-center gap-1 text-yellow-600 hover:text-yellow-700 text-size12 transition-transform hover:scale-105">
        <File size={14} />
        Voir
      </button>
      <button onClick={() => handleDownload(currentInfos.convention, `Convention_${currentInfos.cne}.pdf`)} 
      className=" cursor-pointer ml-4 flex items-center gap-1 text-green-800 hover:text-green-900 text-size12 transition-transform hover:scale-105">
        <Download size={13} />
        Télécharger
      </button>
    </div>
  )}
</div>

      </div>

      {/* Modal d'édition */}
      {isEditModalOpen && (
        <EditAcademicModal
          academicInfos={currentInfos}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {pdfUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl max-h-screen overflow-auto">
            <Document file={pdfUrl}>
              <Page pageNumber={1} width={1000} />
            </Document>
            <button
              onClick={() => setPdfUrl(null)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
