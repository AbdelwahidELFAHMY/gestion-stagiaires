import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import GetImageFromURL from "../utils/getImageFromURL";
import { getUsernameFromToken } from "../utils/getUsernameFromToken";

const CompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    logo: "",
    website: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const username = getUsernameFromToken();
        if (!username) {
          throw new Error("Username not found in token");
        }

        const response = await axiosInstance.get(
          `/entreprise_header_info/${username}`
        );

        setCompanyInfo({
          name: response.data.name,
          logo: response.data.logo,
          website: response.data.website,
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
        setError("Failed to load company information");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

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
      <div className="flex items-center space-x-4 text-red-500">
        <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center">
          !
        </div>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {companyInfo.logo ? (
        <a
          href={companyInfo.website || "#"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GetImageFromURL
            logoUrl={`${axiosInstance.defaults.baseURL.replace(
              "/api",
              ""
            )}/photos/${companyInfo.logo.replace("logos/", "")}`}
            alt={`${companyInfo.name} Logo`}
            className="h-10 w-auto"
          />
        </a>
      ) : (
        <div className="h-12 w-12 bg-orange-400 flex rounded-full items-center justify-center text-white font-logoFont text-size10">
          {companyInfo.name.substring(0, 2).toLocaleUpperCase()}
        </div>
      )}
      <a
        href={companyInfo.website || "#"}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className="text-sm font-semibold">
          {companyInfo.name || "Nom de l'entreprise"}
        </h2>
      </a>
    </div>
  );
};

export default CompanyInfo;
