import { BookOpenCheck, FileText, FolderKanban, Users } from "lucide-react";
import React from "react";
import StatCard from "./components/StatCard";
function DashboardContent() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Stagiaires Actifs"
          value="24"
          icon={Users}
          color="border-blue-500"
        />
        <StatCard
          title="Départements"
          value="8"
          icon={FolderKanban}
          color="border-green-500"
        />
        <StatCard
          title="Sujets de Stage"
          value="15"
          icon={BookOpenCheck}
          color="border-purple-500"
        />
        <StatCard
          title="Documents en Attente"
          value="6"
          icon={FileText}
          color="border-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Stagiaires Récents</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg"
              >
                <img
                  src={`https://source.unsplash.com/random/100x100?face&${i}`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">Stagiaire {i}</p>
                  <p className="text-sm text-gray-500">Département IT</p>
                </div>
                <span className="ml-auto text-sm text-gray-500">
                  Il y a {i} jour{i > 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Sujets de Stage Populaires
          </h3>
          <div className="space-y-4">
            {[
              "Développement Full Stack",
              "Data Science & Analytics",
              "UX/UI Design",
            ].map((subject, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{subject}</p>
                  <p className="text-sm text-gray-500">4 candidats</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Actif
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardContent;
