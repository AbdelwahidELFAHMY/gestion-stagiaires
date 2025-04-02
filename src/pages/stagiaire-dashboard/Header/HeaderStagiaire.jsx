import CompanyInfo from "./CompanyInfo";
import SearchBar from "./SearchBar";
import ProfileMenu from "./ProfileMenu";
import Notifications from "../../../components/Notifications";
import axiosInstance from "../../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";

const HeaderStagiaire = () => {
  const [notifications, setNotifications] = useState([]);
  const username = getUsernameFromToken();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (username) {
          const response = await axiosInstance.get(
            `/stagiaires/notifications/${username}`
          );
          setNotifications(response.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 60000);

    return () => clearInterval(interval);
  }, [username]);

  return (
    <header className="flex justify-between items-center h-16 bg-white px-8 py-4 border-b border-gray-200">
      <CompanyInfo />

      <div className="flex-grow text-center">
        <h2 className="text-lg font-semibold text-gray-700">Bienvenue 👋</h2>
      </div>

      <div className="flex items-center space-x-4">
        <SearchBar />
        <Notifications notifications={notifications || []} />

        <ProfileMenu />
      </div>
    </header>
  );
};

export default HeaderStagiaire;
