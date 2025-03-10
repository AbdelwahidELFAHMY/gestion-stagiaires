import {
  BarChart,
  BookOpen,
  Building2,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  LayoutDashboard,
  UserPlus,
  Users,
} from "lucide-react";

function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "interns", label: "Stagiaires", icon: <Users size={20} /> },
    { id: "companies", label: "Entreprises", icon: <Building2 size={20} /> },
    { id: "subjects", label: "Sujets", icon: <BookOpen size={20} /> },
    { id: "assignments", label: "Affectations", icon: <UserPlus size={20} /> },
    {
      id: "departments",
      label: "Départements",
      icon: <FolderKanban size={20} />,
    },
    { id: "documents", label: "Documents", icon: <FileText size={20} /> },
    { id: "stats", label: "Statistiques", icon: <BarChart size={20} /> },
  ];

  return (
    <div className="w-64 bg-indigo-800 min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8 text-white">
        <FileSpreadsheet size={24} />
        <h1 className="text-xl font-bold">HR Dashboard</h1>
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
              activeTab === item.id
                ? "bg-indigo-700 text-white"
                : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
export default Sidebar;
