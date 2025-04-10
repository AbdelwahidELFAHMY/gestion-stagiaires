import { UserCircle2, FileEdit, FileText } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import GetImageFromURL from "../../../utils/getImageFromURL";
import { useState } from "react";
import EditPersonalInfoModal from "./EditPersonalInfoModal";

export default function PersonalInfos({ stagiaireInfos }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!stagiaireInfos) {
    return (
      <div className="animate-pulse bg-white rounded-xl shadow-sm p-6 mb-6 h-64 flex items-center justify-center">
        <div className="text-gray-500">
          Chargement des informations personnelles...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-md border-thin border-gray-100 p-6 mb-3 relative transition-all ">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 flex justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-thin border-white">
              {stagiaireInfos?.photo ? (
                <GetImageFromURL
                  logoUrl={`${axiosInstance.defaults.baseURL.replace(
                    "/api",
                    ""
                  )}/photos/${stagiaireInfos.photo.replace("photos/", "")}`}
                  alt="photo"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <UserCircle2 className="h-36 w-36 text-gray-700" />
              )}
            </div>
          </div>

          <div className="md:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-5 w-5">
                  <FileText className="h-5 w-5 text-blue-600" />
                </span>
                <h2 className="text-size12 font-medium text-gray-800">
                  Informations Personnelles
                </h2>
              </div>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="absolute cursor-pointer top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-blue-500 transition-colors"
                aria-label="Modifier les informations"
              >
                <FileEdit size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <p className="text-size11 font-medium text-gray-500 uppercase tracking-wider">
                  Nom complet
                </p>
                <p className="text-size12 font-semibold text-gray-800">
                  {stagiaireInfos.nom} {stagiaireInfos.prenom} 
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-size11 font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </p>
                <p className="text-size12 font-medium text-gray-800">
                  {stagiaireInfos.email || "Non renseigné"}
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-size11 font-medium text-gray-500 uppercase tracking-wider">
                  Téléphone
                </p>
                <p className="text-size12 font-medium text-gray-800">
                  {stagiaireInfos.phone || "Non renseigné"}
                </p>
              </div>
              <div className="space-y-1.5">
                <p className="text-size11 font-medium text-gray-500 uppercase tracking-wider">
                  Adresse
                </p>
                <p className="text-size12 font-medium text-gray-800">
                  {stagiaireInfos.adresse || "Non renseignée"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditPersonalInfoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        stagiaireInfos={stagiaireInfos}
      />
    </>
  );
}
