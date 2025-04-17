import {
  LayoutDashboard,
  ClipboardList,
  Settings,
  FileText,
  CalendarCheck,
  LogOutIcon,
} from "lucide-react";
import { useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import Logout from "../../components/Logout";

export default function SidebarEncadrant({
  isOpen,
  activeView,
  setActiveView,
  onClose,
  isMobile,
}) {
  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Tableau de bord" },
    { id: "taches", icon: ClipboardList, label: "Tâches" },
    { id: "livrables", icon: FaRegFolderOpen, label: "Livrables" },
    { id: "sujetStage", icon: FileText, label: "Sujets de Stage" },
    { id: "presence", icon: CalendarCheck, label: "Presence" },
    { id: "parametres", icon: Settings, label: "Paramètres" },
  ];

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleItemClick = (itemId) => {
    setActiveView(itemId);
    if (isMobile) onClose();
  };

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <aside className="h-screen max-w-1/6 w-1/6 flex flex-col  overflow-hidden border-r-thin ">
        <nav className="text-size13 px-6 py-8 overflow-y-auto h-[calc(100%-4rem)]">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex cursor-pointer items-center p-3 font-semibold rounded-md transition-colors ${
                    activeView === item.id
                      ? "bg-gradient-to-r from-gray-300 via-neutral-200 to-neutral-300 text-blue-700 "
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogoutClick}
            className="cursor-pointer mt-1 font-semibold rounded-md transition-colors text-start p-3 w-full text-gray-700 hover:bg-gray-200 items-center justify-center space-x-3"
          >
            {" "}
            <LogOutIcon className="inline h-5 w-5 mr-3.5" size={20} />
            <span className="">Logout</span>
          </button>
        </nav>
      </aside>
      <Logout
        isLogoutModalOpen={isLogoutModalOpen}
        onCancel={handleCloseLogoutModal}
      />
    </>
  );
}
