import {FiTrendingUp, FiLayers, FiGrid, FiSettings, FiLogOut } from "react-icons/fi"; // Feather Icons
import { HiShieldCheck, HiOfficeBuilding, HiChartPie } from "react-icons/hi"; // Heroicons
import Logo from "../../assets/logo";



function NavItem({ icon, title, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-9/10 cursor-pointer flex items-center rounded-lg transition-all duration-300 ease-in-out mx-4 my-1 px-4 py-3 text-size12 font-medium ${
        active
          ? "bg-gradient-to-r from-indigo-950 via-blue-950 to-blue-900 text-gray-100 shadow-sm"
          : "text-gray-400 hover:bg-gradient-to-r from-indigo-950 via-blue-950 to-blue-900 hover:text-gray-100"
      }`}
    >
      <span className={`mr-3 ${active ? "text-gray-100" : ""}`}>
        {icon}
      </span>
      <span className="flex-1 text-left">{title}</span>
    </button>
  );
}

function AdminSidebar({ activeTab, setActiveTab, className }) {
  return (
    <aside className={`${className} flex flex-col shadow-lg h-screen overflow-hidden border-r-thin border-gray-500`}>
      <div className="p-6">
        <Logo />
      </div>
      <nav className="mt-4 flex-1 px-4">
      <div className="mb-8">
          <h2 className="text-size9 border-b-thin border-gray-500 font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Menu</h2>
          <NavItem
            icon={<FiGrid className="w-5 h-5" />}
            title="Tableau de bord"
            active={activeTab === "dashboard"}
            onClick={() => setActiveTab("dashboard")}
          />
          <NavItem
            icon={<HiOfficeBuilding className="w-5 h-5" />}
            title="Partenaires"
            active={activeTab === "partenaires"}
            onClick={() => setActiveTab("partenaires")}
          />
          <NavItem
            icon={<HiChartPie className="w-5 h-5" />}
            title="Technical Statistics"
            active={activeTab === "technical-stats"}
            onClick={() => setActiveTab("technical-stats")}
          />
          <NavItem
            icon={<FiTrendingUp className="w-5 h-5" />}
            title="Performance"
            active={activeTab === "performance"}
            onClick={() => setActiveTab("performance")}
          />
          <NavItem
            icon={<FiLayers className="w-5 h-5" />}
            title="Scalabilité"
            active={activeTab === "scalabilite"}
            onClick={() => setActiveTab("scalabilite")}
          />
          <NavItem
            icon={<HiShieldCheck className="w-5 h-5" />}
            title="Maintenance"
            active={activeTab === "maintenance"}
            onClick={() => setActiveTab("maintenance")}
          />
        </div>
        <div className="mb-8">
        <h2 className="text-size9 border-b-thin border-gray-500 font-semibold text-gray-500 uppercase tracking-wider mb-4">
        Configuration</h2>
          <NavItem
            icon={<FiSettings className="w-5 h-5" />}
            title="Paramètres"
            active={activeTab === "parametres"}
            onClick={() => setActiveTab("parametres")}
          />
          <NavItem
          icon={<FiLogOut className="w-5 h-5" />}
          title="Deconnexion"
          active={activeTab === "logout"}
          onClick={() => setActiveTab("logout")}
        />
        </div>
      </nav>
    </aside>
  );
}

export default AdminSidebar;