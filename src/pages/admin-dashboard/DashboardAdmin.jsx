import { useState, useEffect } from "react";
import Header from "./header/Header";
import Performance from "./performance/Performance";
import Dashboard from "./dashboard/Dashboard";
import AdminSidebar from "./AdminSidebar";
import Companies from "./partenaires/Companies";
import StatistiquesSysteme from "./statistiques_system/StatistiquesSysteme";
import Maintenance from "./maintenance/Maintenance";
import Logout from "../../components/Logout";
import Parameters from "./comptes/Parameters";

function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("isDarkMode") === "true";
  });
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleCancelLogoutModale = ()=>{
    setIsLogoutModalOpen(false);
  }

  useEffect(() => {
    localStorage.setItem("isDarkMode", isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);


  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "partenaires":
        return <Companies />;
      case "Statistiques Systeme":
        return <StatistiquesSysteme />;
      case "performance":
        return <Performance  />;
      case "maintenance":
        return <Maintenance  />;
      case "parametres":
        return <Parameters  />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsLogoutModalOpen={setIsLogoutModalOpen}
      />

      <div className="flex-1 flex flex-col bg-white">
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          activeTab={activeTab}
        />

        <main
          className={`${
            isDarkMode ? "dark scrollbar-thin-dark" : " scrollbar-thin"
          } dark:bg-gray-900 flex-1 overflow-y-auto overflow-x-hidden `}
        >
          {renderContent()}
        </main>
      </div>
      <Logout isLogoutModalOpen={isLogoutModalOpen} onCancel={handleCancelLogoutModale}/>
    </div>
  );
}

export default DashboardAdmin;
