import { useEffect, useState } from "react";
import { Download, File, FileText, FileUser, User2, X } from "lucide-react";
import {
  BiSolidGraduation,
  BiUser,
  BiEnvelope,
  BiPhone,
  BiMap,
  BiIdCard,
  BiBookAlt,
  BiCalendar,
  BiBuilding,
} from "react-icons/bi";
import axiosInstance from "../../utils/axiosInstance";
import GetImageFromURL from "../../utils/getImageFromURL";
import { handleDownload } from "../../utils/handleDownloadFile";
import { handleViewFile } from "../../utils/handleViewFile";

export default function StagiaireInfosModale({ onClose, stagiaireUsername }) {
  const [stagiaireData, setStagiaireData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/encadrants/stagiaire_infos/${stagiaireUsername}`
        );
        setStagiaireData(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [stagiaireUsername]);

  if (loading)
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl animate-pulse h-96"></div>
      </div>
    );

  if (!stagiaireData) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-4xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-md font-semibold text-gray-800 flex items-center">
            <BiSolidGraduation className="text-3xl text-indigo-900 mr-4" />
            Profil Stagiaire
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer p-0.5 bg-gray-100 rounded-full text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image à gauche */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="w-32 h-32 rounded-md bg-gray-50 border-thin border-indigo-100 overflow-hidden">
              {stagiaireData.stagiaireInfos.photo ? (
                <GetImageFromURL
                  logoUrl={`${axiosInstance.defaults.baseURL.replace(
                    "/api",
                    ""
                  )}/photos/${stagiaireData.stagiaireInfos.photo.replace(
                    "photos/",
                    ""
                  )}`}
                  alt="photo"
                  className="h-full w-full rounded border-thin object-cover mr-3"
                />
              ) : (
                <div className=" h-full w-full p-8 bg-gray-100 border-thin border-gray-100 rounded-full">
                  <BiUser className="h-full w-full" />
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-600 text-center">
              {stagiaireData.academicInfosDTO.niveau} •{" "}
              {stagiaireData.academicInfosDTO.branche}
            </p>
          </div>

          {/* Infos à droite */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            {/* Infos personnelles */}
            <InfoRow
              icon={<BiUser />}
              label="Nom complet"
              value={`${stagiaireData.stagiaireInfos.prenom} ${stagiaireData.stagiaireInfos.nom}`}
            />
            <InfoRow
              icon={<BiEnvelope />}
              label="Email"
              value={stagiaireData.stagiaireInfos.email}
            />
            <InfoRow
              icon={<BiPhone />}
              label="Téléphone"
              value={stagiaireData.stagiaireInfos.phone}
            />
            <InfoRow
              icon={<BiMap />}
              label="Adresse"
              value={stagiaireData.stagiaireInfos.adresse}
            />

            {/* Infos académiques */}
            <InfoRow
              icon={<BiIdCard />}
              label="CNE"
              value={stagiaireData.academicInfosDTO.cne}
            />
            <InfoRow
              icon={<BiIdCard />}
              label="CIN"
              value={stagiaireData.academicInfosDTO.cin}
            />
            <InfoRow
              icon={<BiBuilding />}
              label="Université"
              value={stagiaireData.academicInfosDTO.universite}
            />
            <InfoRow
              icon={<BiCalendar />}
              label="Établissement"
              value={stagiaireData.academicInfosDTO.etablissement}
            />
          </div>
        </div>

        {/* Documents */}
        <div className="mt-6">
          <h4 className="flex items-center mb-2 text-size14 font-semibold text-gray-700">
            <span>Documents:</span>
          </h4>

          {stagiaireData.academicInfosDTO.cv ? (
            <div className="flex items-center gap-2 bg-gray-50 px-6 py-3 rounded-xs border-thin">
              <FileUser className="text-green-600 mr-1" size={20} />
              <span className="font-medium text-xs text-gray-700">CV :</span>
              <button
                onClick={() =>
                  handleViewFile(stagiaireData.academicInfosDTO.cv)
                }
                className="cursor-pointer ml-10  flex items-center gap-1 text-green-600 hover:text-green-700 text-size12 transition-transform hover:scale-105"
              >
                <File size={14} />
                Voir
              </button>
              <button
                onClick={() =>
                  handleDownload(
                    stagiaireData.academicInfosDTO.cv,
                    `CV_${stagiaireData.academicInfosDTO.cne}.pdf`
                  )
                }
                className="cursor-pointer flex items-center ml-4 gap-1 text-blue-600 hover:text-blue-700 text-size12 transition-transform hover:scale-105"
              >
                <Download size={14} />
                Télécharger
              </button>
            </div>
          ):(
            <div className="flex items-center gap-2 text-center justify-center bg-gray-50 px-6 py-3 rounded-xs border-thin">
            <span className="text-size12 text-center text-gray-500">Aucun document est disponible pour ce stagiaire</span>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-gray-500">{icon}</div>
      <span className="text-sm text-gray-500 w-28">{label} :</span>
      <span className="text-sm font-medium text-gray-800 break-words">
        {value || "-"}
      </span>
    </div>
  );
}
