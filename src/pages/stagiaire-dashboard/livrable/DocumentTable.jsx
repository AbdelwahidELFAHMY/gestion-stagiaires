import React from "react";
import { FileText } from "lucide-react";
import { handleDownload } from "../../../utils/handleDownloadFile";

const DocumentTable = ({ documents, onDelete }) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden mb-8">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-size11 font-medium text-gray-500 uppercase tracking-wider">
              Nom
            </th>
            <th className="px-6 py-3 text-left text-size11 font-medium text-gray-500 uppercase tracking-wider w-32">
              Type
            </th>
            <th className="px-6 py-3 text-left text-size11 font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
            <th className="px-6 py-3 text-left text-size11 font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-size11 font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <tr key={doc.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {doc.nom}
                  {doc.githubLink && (
                    <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Lien
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate" title={doc.type || "N/A"}>
                  { doc.type || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.githubLink ? "N/A" : formatFileSize(doc.taille)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doc.dateSoumession}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-8 text-size12">
                    <button
                      onClick={() => handleDownload(doc.path, doc.nom+".pdf")}
                      className="cursor-pointer text-blue-600 hover:text-blue-900"
                    >
                      {doc.githubLink ? "Voir" : "Télécharger"}
                    </button>
                    <button
                      onClick={() => onDelete(doc.id)}
                      className="cursor-pointer text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                Aucun document soumis
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentTable;