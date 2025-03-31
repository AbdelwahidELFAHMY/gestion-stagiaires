import { useState } from "react";

import CompaniesContent from "./CompaniesContent";
import Sidebar from "./components/SideBar";
import DashboardContent from "./DashboardContent";
import DepartmentsContent from "./DepartmentsContent";
import EmployeesContent from "./EmployeesContent";
import InternsContent from "./InternsContent";
import SubjectsContent from "./SubjectsContent";

function DashboardRH() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "interns":
        return <InternsContent />;
      case "companies":
        return <CompaniesContent />;
      case "subjects":
        return <SubjectsContent />;

      case "departments":
        return <DepartmentsContent />;
      case "employees":
        return <EmployeesContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Gestion des Stages
            </h1>
          </div>
        </header>
        {renderContent()}
      </main>
    </div>
  );
}

export default DashboardRH;
