import Logo from "../../assets/logo";
import {
  LayoutDashboard,
  Building2,
  PieChart,
  ShieldCheck,
  Settings,
  LogOut,
  GaugeCircleIcon,
} from "lucide-react";

function NavItem({ icon, title, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-9/10 cursor-pointer flex items-center rounded-lg transition-all duration-300 ease-in-out mx-4 my-1 px-4 py-3 text-size12 font-medium ${
        active
          ? "dark:bg-gradient-to-r dark:from-indigo-900 dark:via-blue-900 dark:to-blue-800 dark:text-gray-100 bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 text-gray-200 shadow-sm"
          : "text-gray-900 dark:text-gray-300 dark:hover:bg-gray-100 dark:hover:text-gray-700 hover:bg-gray-200 "
      }`}
    >
      <span className={`mr-3 ${active ? "text-gray-100" : ""}`}>{icon}</span>
      <span className="flex-1 text-left">{title}</span>
    </button>
  );
}

export default function AdminSidebar({ activeTab, setActiveTab, isDarkMode, setIsLogoutModalOpen  }) {
  return (
    <aside
      className={`h-screen ${
        isDarkMode ? "dark:bg-gray-900" : "bg-white"
      } max-w-3/16 flex flex-col shadow-lg overflow-hidden border-r-thin ${
        isDarkMode ? "dark:border-gray-500" : "border-gray-200"
      }`}
    >
      <div className="p-6">
        <Logo />
      </div>
      <nav className="mt-4 flex-1 px-4">
        <div className="mb-12">
          <h2 className="text-size9 border-b-thin border-gray-200 dark:text-gray-300 dark:border-gray-500 text-gray-600 font-semibold uppercase tracking-wider mb-4">
            Menu
          </h2>
          <NavItem
            isDarkMode={isDarkMode}
            icon={<LayoutDashboard className="w-5 h-5" />}
            title="Tableau de bord"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <NavItem
            isDarkMode={isDarkMode}
            icon={<Building2 className="w-5 h-5" />}
            title="Partenaires"
            active={activeTab === "partenaires"}
            onClick={() => setActiveTab("partenaires")}
          />
          <NavItem
            isDarkMode={isDarkMode}
            icon={<PieChart className="w-5 h-5" />}
            title="Statistiques Systeme"
            active={activeTab === "Statistiques Systeme"}
            onClick={() => setActiveTab("Statistiques Systeme")}
          />
          <NavItem
            isDarkMode={isDarkMode}
            icon={<GaugeCircleIcon className="w-5 h-5" />}
            title="Performance"
            active={activeTab === "performance"}
            onClick={() => setActiveTab("performance")}
          />
          <NavItem
            isDarkMode={isDarkMode}
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Maintenance"
            active={activeTab === "maintenance"}
            onClick={() => setActiveTab("maintenance")}
          />
        </div>
        <div className="mb-8">
          <h2 className="text-size9 border-b-thin border-gray-200 dark:text-gray-300 dark:border-gray-500 text-gray-600 font-semibold uppercase tracking-wider mb-4">
            Configuration
          </h2>
          <NavItem
            isDarkMode={isDarkMode}
            icon={<Settings className="w-5 h-5" />}
            title="Paramètres"
            active={activeTab === "parametres"}
            onClick={() => setActiveTab("parametres")}
          />
          <NavItem
            icon={<LogOut className="w-5 h-5" />}
            title="Deconnexion"
            active={false} // Ne pas activer comme un onglet
            onClick={() => setIsLogoutModalOpen(true)}
            />
        </div>
      </nav>
    </aside>
  );
}
