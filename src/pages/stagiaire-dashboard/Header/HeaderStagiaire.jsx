import Notifications from "../../../components/Notifications";
import axiosInstance from "../../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import Menu from "./Menu";
import CompanyInfo from "../../../components/CompanyInfo";
import { Image, UserCircle } from "lucide-react";
import SearchBar from "../../../components/SearchBar";
import HesderSkeleton from "../../../components/HesderSkeleton";

const HeaderStagiaire = () => {
  const [userHeader, setUserHeader] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = getUsernameFromToken();

  useEffect(() => {
    const fetchUserHeader = async () => {
      try {
        if (username) {
          const response = await axiosInstance.get(
            `/current_user_header/${username}`
          );
          setUserHeader(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError(error);
      }
    };

    fetchUserHeader();

    const interval = setInterval(fetchUserHeader, 60000);

    return () => clearInterval(interval);
  }, [username]);

  if (loading) {
    <HesderSkeleton />
  }

  if (error) {
    return (
      <header className="flex justify-between items-center h-16 bg-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-2 p-2">
          <Image className="h-11 w-11 rounded-full text-gray-500" />
          <span>{error}</span>
        </div>
        <div className="flex items-center space-x-2 p-2">
          <span>{error}</span>
          <UserCircle className="h-12 w-12 text-gray-500" />
        </div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center h-16 bg-white px-6 py-4 border-b border-gray-200">
      <CompanyInfo />

      <div className="flex items-center space-x-4">
        <SearchBar />
        <Notifications notifications={userHeader.notifications || []} />

        <Menu
          userData={{
            nom: userHeader.nom,
            prenom: userHeader.prenom,
            photo: userHeader.photo,
          }}
        />
      </div>
    </header>
  );
};

export default HeaderStagiaire;
