import { FileText } from "lucide-react";
import React from "react";
import ActionButtons from "./components/ActionButtons";
import PageHeader from "./components/PageHeader";
import SearchBar from "./components/SearchBar";

function DocumentsContent() {
  return (
    <div className="p-6">
      <PageHeader title="Gestion des Documents" onAdd={() => {}} />
      <SearchBar placeholder="Rechercher un document..." />

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stagiaire
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        Convention de Stage {i}
                      </div>
                      <div className="text-sm text-gray-500">
                        convention_{i}.pdf
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Convention</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Stagiaire {i}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">01/03/2024</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    En attente
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <ActionButtons />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default DocumentsContent;
