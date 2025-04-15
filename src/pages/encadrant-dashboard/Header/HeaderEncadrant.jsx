import CompanyInfo from "../../../components/CompanyInfo";
import Notifications from "../../../components/Notifications";
import axiosInstance from "../../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";
import { User, User2, UserCircle2 } from "lucide-react";
import GetImageFromURL from "../../../utils/getImageFromURL";
import SearchBar from "../../../components/SearchBar";

const HeaderEncadrant= () => {
  
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
    return (
      <div className="flex items-center space-x-2 p-2">
        <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-12 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 p-2 text-red-500">
        <UserCircle2 className="h-12 w-12" />
        <span>Error</span>
      </div>
    );
  }
  return (
    <header className="flex justify-between items-center h-16 bg-white px-6 py-4 border-b border-gray-200">
      <CompanyInfo />


      <div className="flex items-center space-x-4">
        <SearchBar />
        <Notifications notifications={userHeader.notifications || []} />

      <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-100 transition-all duration-300">
        {userHeader?.photo ? (
          <GetImageFromURL 
          logoUrl={`${axiosInstance.defaults.baseURL.replace(
            "/api",
            ""
          )}/photos/${userHeader.photo.replace("photos/", "")}`}
            alt="photo" 
            className="h-11 w-11 rounded-full border-thin object-cover"
          />
        ) : (
          <div className="p-1 bg-gray-200 border-thin border-gray-300 rounded-full">
          <User2 className="h-8 w-8 text-neutral-700" />
          </div>
        )}
        <p className="text-size13 font-semibold">
          {userHeader ? `${userHeader.prenom} ${userHeader.nom}` :"nom-prenom"}
        </p>
      </div>
      </div>

    </header>
  );
};

export default HeaderEncadrant;
