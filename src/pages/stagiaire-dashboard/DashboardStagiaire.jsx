
import { useState } from "react";
import SidebarStagiaire from "./SidebarStagiaire";
import StageProgress from "./StageProgress";
import HeaderStagiaire from "./HeaderStagiaire";
import Messaging from "./messages";
import Documents from "./Documents";
import Agenda from "./Agenda";
import Presence from "./Presence";

const DashboardStagiaire = () => {
  const [activeComponent, setActiveComponent] = useState("StageProgress");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Documents":
        return <Documents/>;
      case "Presence":
        return <Presence/>;
      case "Tasks":
        return <div>Tasks Content</div>;
      case "Agenda":
        return <Agenda/>;
      case "Resources":
        return <div>Resources Content</div>;
      default:
        return <StageProgress />;
    }
  };

  return (
      <div className="flex flex-col flex-grow h-screen overflow-hidden">
        <HeaderStagiaire />
        <div className="flex flex-grow overflow-hidden h-full">
      <SidebarStagiaire setActiveComponent={setActiveComponent} />

          <div className="flex-grow overflow-hidden">{renderComponent()}</div>
        
          {/* Messagerie (non redimensionnable) */}
          <div className="flex border-l border-gray-200 bg-white h-full max-w-[300px] min-w-[300px] transition-all duration-500 ease-in-out">
          <Messaging />
          </div>
        </div>
      </div>
  );
};

export default DashboardStagiaire;
