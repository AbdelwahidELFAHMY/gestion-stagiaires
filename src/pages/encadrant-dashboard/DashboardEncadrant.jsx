// src/layouts/EncadrantLayout.jsx
import { useState, useEffect } from "react";
import Sidebar from "./SidebarEncadrant";
import DashboardView from "./DashboardView";
import CalendrierView from "./Stages";
import MessagerieView from "./Stages";
import ParametresView from "./Stages";
import HeaderEncadrant from "./Header/HeaderEncadrant";
import ListTaches from "./taches/ListTaches";
import Livrables from "./livrables/Livrables";
import SujetStage from "./sujets_stage/SujetStage";

export default function DashboardEncadrant() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "taches":
        return <ListTaches />;
      case "livrables":
        return <Livrables />;
        case "sujetStage":
          return <SujetStage />;
      case "calendrier":
        return <CalendrierView />;
      case "messagerie":
        return <MessagerieView />;
      case "parametres":
        return <ParametresView />;
      default:
        return <DashboardView />;
    }
  };


  return (
    <div className="flex flex-col flex-grow h-screen overflow-hidden">
      <HeaderEncadrant />
      <div className="flex flex-grow overflow-hidden h-full">
        <Sidebar
          isOpen={sidebarOpen}
          activeView={activeView}
          setActiveView={setActiveView}
          onClose={() => setSidebarOpen(false)}
          isMobile={isMobile}
        />

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6 bg-gray-50 transition-all duration-200">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
