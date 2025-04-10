import React, { useState } from "react";
import { FileEdit, SaveAllIcon, X } from "lucide-react";

export default function EditAcademicModal({ 
  academicInfos, 
  onClose, 
  onSave 
}) {
  const [editedInfos, setEditedInfos] = useState(academicInfos || {});
  const [cvFile, setCvFile] = useState(null);
  const [conventionFile, setConventionFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfos(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'cv') {
      setCvFile(files[0]);
    } else if (name === 'convention') {
      setConventionFile(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      data: editedInfos,
      cvFile,
      conventionFile
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 w-full h-full flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <FileEdit className="h-5 w-5 text-blue-600" />
            <h2 className="text-size14 font-semibold text-gray-800">
              Modifier les Infos Academiques
            </h2>
          </div>       
          <button 
            onClick={onClose}
            className="cursor-pointer hover:bg-gray-400 rounded-full bg-gray-100 text-gray-700 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "CNE", name: "cne" },
              { label: "CIN", name: "cin" },
              { label: "Niveau", name: "niveau" },
              { label: "Branche", name: "branche" },
              { label: "Établissement", name: "etablissement" },
              { label: "Université", name: "universite" },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="flex items-center text-size10 font-medium text-gray-500 uppercase tracking-wide">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={editedInfos[field.name] || ''}
                  onChange={handleInputChange}
                  className="text-size12 w-full px-3 py-2 border-thin border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 mt-4 gap-4">
            <div className="space-y-2">
              <label className="flex items-center text-size10 font-medium text-gray-500 uppercase tracking-wide">
                CV (PDF)
              </label>
              <input
                type="file"
                name="cv"
                onChange={handleFileChange}
                accept=".pdf"
                className="block w-full text-size10 text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-size11 file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
              {cvFile && (
                <p className="text-size11 text-gray-600 mt-1">
                  Fichier sélectionné: {cvFile.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-size10 font-medium text-gray-500 uppercase tracking-wide">
                Convention (PDF)
              </label>
              <input
                type="file"
                name="convention"
                onChange={handleFileChange}
                accept=".pdf"
                className="block w-full text-size10 text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-size11 file:font-semibold
                  file:bg-green-50 file:text-green-700
                  hover:file:bg-green-100"
              />
              {conventionFile && (
                <p className="text-size11 text-gray-600 mt-1">
                  Fichier sélectionné: {conventionFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="text-size13 flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center px-4 py-2 text-gray-800 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded-sm transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Annuler
            </button>
            <button
              type="submit"
              className="flex items-center px-4 py-2 cursor-pointer bg-blue-600 text-white hover:bg-blue-700 rounded-sm transition-colors"
            >
              <SaveAllIcon className="h-4 w-4 mr-2" />
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}