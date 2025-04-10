// src/layouts/EncadrantLayout.jsx
import { useState, useEffect } from 'react';
import Sidebar from './SidebarEncadrant';
import Header from './Header';
import DashboardView from './Header';
import StagiairesView from './Stages';
import TachesView from './Stages';
import EvaluationsView from './Stages';
import RapportsView from './Stages';
import CalendrierView from './Stages';
import MessagerieView from './Stages';
import ParametresView from './Stages';

export default function DashboardEncadrant() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <DashboardView />;
      case 'stagiaires': return <StagiairesView />;
      case 'taches': return <TachesView />;
      case 'evaluations': return <EvaluationsView />;
      case 'rapports': return <RapportsView />;
      case 'calendrier': return <CalendrierView />;
      case 'messagerie': return <MessagerieView />;
      case 'parametres': return <ParametresView />;
      default: return <DashboardView />;
    }
  };

  const getViewTitle = () => {
    const titles = {
      dashboard: 'Tableau de Bord',
      stagiaires: 'Gestion des Stagiaires',
      taches: 'Tâches et Projets',
      evaluations: 'Évaluations',
      rapports: 'Rapports',
      calendrier: 'Calendrier',
      messagerie: 'Messagerie',
      parametres: 'Paramètres'
    };
    return titles[activeView] || 'Tableau de Bord';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        activeView={activeView}
        setActiveView={setActiveView}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          title={getViewTitle()}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          isMobile={isMobile}
        />
        
        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 transition-all duration-200">
          {renderView()}
        </main>
      </div>
    </div>
  );
}