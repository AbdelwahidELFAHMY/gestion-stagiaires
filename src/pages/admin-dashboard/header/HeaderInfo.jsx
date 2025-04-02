import { FaBell } from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import GetImageFromURL from "../../../utils/getImageFromURL";
import axiosInstance from "../../../utils/axiosInstance";
import Notifications from "./Notifications";
import { toast } from "react-toastify";

export default function HeaderInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const username = getUsernameFromToken();
      if (!username) throw new Error("No username found in token");

      const response = await axiosInstance.get(
        `/current_user_header/${username}`
      );

      setUserInfo(response.data);
      setUnreadCount(
        response.data.notifications.filter((n) => !n.read).length
      );
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

  const handleMarkAsRead = useCallback(async (notificationId) => {
    try {
      await axiosInstance.patch(`/notifications/${notificationId}/read`);
      
      // Optimistic update
      setUserInfo(prev => {
        const updatedNotifications = prev.notifications.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        );
        
        return {
          ...prev,
          notifications: updatedNotifications,
        };
      });
      
      setUnreadCount(prev => Math.max(0, prev - 1));
      
    } catch (err) {
      console.error("Error marking notification as read:", err);
      // Rollback optimistic update
      setUserInfo(prev => ({ ...prev }));
      toast.error("Échec de la mise à jour de la notification");
    }
  }, []);
  const toggleNotifications = useCallback(() => {
    setShowNotifications((prev) => !prev);
  }, []);

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
    <>
      <div className="relative ">
        <button
          onClick={toggleNotifications}
          className="relative cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Afficher les notifications"
        >
          <FaBell
            className="dark:text-gray-400 text-gray-600 transition duration-300 ease-in-out"
            size={22}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-size11 rounded-full h-4.5 w-4.5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        <Notifications
          notifications={userInfo?.notifications || []}
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
          onMarkAsRead={handleMarkAsRead}
        />
      </div>
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
    </>
  );
}
