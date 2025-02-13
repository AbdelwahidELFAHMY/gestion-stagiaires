import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function Documents() {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Gestion des Documents</h2>
      
      {/* Upload Section */}
      <div className="mb-6 p-4 border border-gray-300 rounded-md">
        <div className="flex items-center justify-between">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="flex items-center gap-2 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <UploadCloud size={20} />
            Télécharger des fichiers
          </label>
        </div>
      </div>
      
      {/* Documents Table */}
      <div className="border border-gray-300 rounded-md">
        <div className="p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Nom du Fichier</th>
                <th className="py-2 px-4 text-left">Taille</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.length > 0 ? (
                files.map((file, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{file.name}</td>
                    <td className="py-2 px-4">{(file.size / 1024).toFixed(2)} KB</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    Aucun document disponible
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
