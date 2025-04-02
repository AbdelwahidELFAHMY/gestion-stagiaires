import { useState, useEffect, useCallback } from "react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import GetImageFromURL from "../../../utils/getImageFromURL";
import axiosInstance from "../../../utils/axiosInstance";
import Notifications from "../../../components/Notifications";

export default function HeaderInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = useCallback(async () => {
    try {
      const username = getUsernameFromToken();
      if (!username) throw new Error("No username found in token");

      const response = await axiosInstance.get(
        `/current_user_header/${username}`
      );
      setUserInfo(response.data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (loading) {
    return (
      <div className="flex items-center gap-5">
        <div className="animate-pulse h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="animate-pulse h-14 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm">Error loading user data</div>;
  }

  return (
    <div className="flex items-center gap-6">
      <Notifications notifications={userInfo?.notifications || []} />
      
      <div className="flex items-center gap-4">
        {userInfo?.photo ? (
          <GetImageFromURL
            logoUrl={`${axiosInstance.defaults.baseURL.replace(
              "/api",
              ""
            )}/photos/${userInfo.photo.replace("photos/", "")}`}
            alt={userInfo.nom}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              {userInfo?.nom?.charAt(0) || "U"}
            </span>
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-gray-700 dark:text-gray-300 text-size13 font-medium">
            {userInfo?.nom} {userInfo?.prenom}
          </span>
          <span className="text-size11 font-semibold dark:text-neutral-400 text-gray-600">
            StageOnline Administrator
          </span>
        </div>
      </div>
    </div>
  );
}