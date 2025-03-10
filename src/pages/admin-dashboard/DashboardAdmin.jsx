import { useState } from "react";
import Header from "./Header";
import ActionModal from "./ActionModal";
import TechnicalStats from "./technicalStats";
import Performance from "./Performance";
import Scalability from "./Scalability";
import Maintenance from "./Maintenance";
import NotFoundPage from "../NotFoundPage";
import Dashboard from "./Dashboard";
import AdminSidebar from "./AdminSidebar";

function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("system-stats");
  const [showActionModal, setShowActionModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  
  const handleAction = (action, details) => {
    setModalContent({
      title: "Action Confirmation",
      message: `Are you sure you want to ${action.toLowerCase()} ${details}?`,
    });
    setShowActionModal(true);
  };

  

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard handleAction={handleAction} />;
      case "technical-stats":
        return <TechnicalStats handleAction={handleAction} />;
      case "performance":
        return <Performance handleAction={handleAction} />;
      case "scalabilite":
        return <Scalability handleAction={handleAction} />;
      case "maintenance":
        return <Maintenance handleAction={handleAction} />;
      default:
        return <NotFoundPage/>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar - Largeur fixe */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className="h-screen bg-gradient-to-b from-gray-950 to-gray-900 max-w-3/16"
      />

      {/* Conteneur principal - Prend le reste de l'espace */}
      <div className="flex-1 flex flex-col bg-gray-800 ">
        {/* Header - Prend la largeur restante */}
        <Header/>

        {/* Contenu principal - Scrollable */}
        <main className=" border-t-thin border-gray-500 flex-1 overflow-y-auto overflow-x-hidden">
          {renderContent()}
        </main>
      </div>

      {/* Modal d'action */}
      {showActionModal && (
        <ActionModal
          title={modalContent.title}
          message={modalContent.message}
          setShowActionModal={setShowActionModal}
        />
      )}
    </div>
  );
}

export default DashboardAdmin;