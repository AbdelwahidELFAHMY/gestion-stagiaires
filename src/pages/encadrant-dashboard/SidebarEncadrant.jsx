import {
  LayoutDashboard,
  Users,
  ClipboardList,
  FileCheck,
  FileText,
  CalendarDays,
  Mail,
  Settings
} from 'lucide-react';

export default function SidebarEncadrant({ isOpen, activeView, setActiveView, onClose, isMobile }) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { id: 'stagiaires', icon: Users, label: 'Stagiaires' },
    { id: 'taches', icon: ClipboardList, label: 'Tâches' },
    { id: 'evaluations', icon: FileCheck, label: 'Évaluations' },
    { id: 'rapports', icon: FileText, label: 'Rapports' },
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
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <h1 className="text-white font-bold text-lg">Espace Encadrant</h1>
        </div>

        <nav className="p-4 overflow-y-auto h-[calc(100%-4rem)]">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                    activeView === item.id 
                      ? 'bg-blue-50 text-blue-600 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
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