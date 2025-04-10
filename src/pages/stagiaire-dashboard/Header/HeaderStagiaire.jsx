import CompanyInfo from "./CompanyInfo";
import SearchBar from "./SearchBar";
import Notifications from "../../../components/Notifications";
import axiosInstance from "../../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import Menu from "./Menu";

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
    <header className="flex justify-between items-center h-16 bg-white px-6 py-4 border-b border-gray-200">
      <CompanyInfo />

      <div className="flex-grow text-center">
        <span className=" bg-gradient-to-r from-blue-700 via-blue-800 to-gray-700 bg-clip-text text-transparent font-semibold">B I E N V E N U E </span>
      </div>

      <div className="flex items-center space-x-4">
        <SearchBar />
        <Notifications notifications={notifications || []} />

        <Menu />
      </div>
    </header>
  );
};

export default HeaderStagiaire;
