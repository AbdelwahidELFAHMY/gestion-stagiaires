import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PersonalInfos from "./PersonalInfos";
import AcademicInfos from "./AcademicInfos";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import { fetchStagiaireInfos } from "../../../stores/stagiaire_slices/stagiaireSlice";
import { fetchAcademicInfos } from "../../../stores/stagiaire_slices/academicSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Important pour les styles
import { Settings, UserCog } from "lucide-react";

export default function Compte() {
  const dispatch = useDispatch();
  const {
    data: stagiaireInfos,
    loading: stagiaireLoading,
    error: stagiaireError,
  } = useSelector((state) => state.stagiaire);
  const {
    data: academicInfos,
    loading: academicLoading,
    error: academicError,
  } = useSelector((state) => state.academic);

  useEffect(() => {
    const username = getUsernameFromToken();
    if (username) {
      dispatch(fetchStagiaireInfos(username));
    }
  }, [dispatch]);

  useEffect(() => {
    if (stagiaireInfos?.userId) {
      dispatch(fetchAcademicInfos(stagiaireInfos.userId));
    }
  }, [dispatch, stagiaireInfos]);

  if (stagiaireError || academicError) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Erreur de chargement
          </h2>
          <p className="text-red-500">{stagiaireError || academicError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl h-full overflow-y-auto scrollbar-thin mx-auto p-6">
      <div className="flex mb-3 justify-between items-center border-b border-gray-200 pb-2">
        <h1 className="text-size14 font-semibold text-gray-800 flex items-center">
          <UserCog className="h-6 w-6 text-blue-700 mr-3 " />
          <span className="bg-gradient-to-r from-blue-700  to-gray-800 bg-clip-text text-transparent">
            Paramètres du Compte
          </span>
        </h1>

        {stagiaireLoading && (
          <div className="flex items-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="text-sm font-medium text-gray-500">
              Chargement des données...
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {stagiaireLoading ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <Skeleton height={200} />
          </div>
        ) : (
          <PersonalInfos stagiaireInfos={stagiaireInfos} />
        )}

        {academicLoading ?(
          <div className="space-y-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Skeleton height={200} />
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <Skeleton height={200} />
            </div>
          </div>
        ) : (
          <AcademicInfos academicInfos={academicInfos} />
        )}
      </div>
    </div>
  );
}
