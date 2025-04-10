import React from "react";
import { X } from "lucide-react";

const DocumentModal = ({
  show,
  onClose,
  onSubmit,
  documentData,
  onFileChange,
  onNameChange,
  isSubmitting,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/35 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <span className="bg-gradient-to-r from-blue-700 to-gray-900 font-semibold bg-clip-text text-transparent">
            Ajouter un document PDF
          </span>
          <button
            onClick={onClose}
            className="cursor-pointer p-1 rounded-full justify-center items-center bg-gray-100 text-gray-500 hover:text-gray-700"
          >
            <X size={14} />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-6 mt-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Nom du document
            </label>
            <input
              type="text"
              value={documentData.name}
              onChange={onNameChange}
              placeholder="Nom personnalisé"
              className="w-full px-3 py-2 border-thin placeholder:text-size12 text-size12 border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Fichier PDF <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              onChange={onFileChange}
              required
              accept=".pdf,application/pdf"
              className="block w-full text-xs text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-xs file:cursor-pointer file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              Seuls les fichiers PDF sont acceptés
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border-thin cursor-pointer text-size12 border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !documentData.file}
              className={`px-4 py-2 border-thin cursor-pointer text-size12 rounded-md text-white font-medium ${
                isSubmitting || !documentData.file
                  ? "bg-blue-300"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Envoi en cours..." : "Soumettre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentModal;