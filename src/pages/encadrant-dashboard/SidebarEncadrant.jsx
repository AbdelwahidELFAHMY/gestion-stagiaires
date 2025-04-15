import {
  LayoutDashboard,
  ClipboardList,
  FileCheck,
  CalendarDays,
  Mail,
  Settings,
  FileText
} from 'lucide-react';
import { FaRegFolderOpen } from 'react-icons/fa';

export default function SidebarEncadrant({ isOpen, activeView, setActiveView, onClose, isMobile }) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { id: 'taches', icon: ClipboardList, label: 'Tâches' },
    { id: 'livrables', icon: FaRegFolderOpen, label: 'Livrables' },
    { id: 'sujetStage', icon: FileText, label: 'Sujets de Stage' },
    { id: 'calendrier', icon: CalendarDays, label: 'Calendrier' },
    { id: 'messagerie', icon: Mail, label: 'Messagerie' },
    { id: 'parametres', icon: Settings, label: 'Paramètres' },
  ];

  const handleItemClick = (itemId) => {
    setActiveView(itemId);
    if (isMobile) onClose();
  };

  return (
    <>

<aside
      className="h-screen max-w-1/6 w-1/6 flex flex-col  overflow-hidden border-r-thin "
    >
        <nav className="text-size12 p-6 overflow-y-auto h-[calc(100%-4rem)]">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex cursor-pointer items-center p-3 font-semibold rounded-md transition-colors ${
                    activeView === item.id 
                      ? 'bg-gray-200 text-blue-700 ' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}