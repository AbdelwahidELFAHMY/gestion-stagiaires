const StageProgress = ({ isSidebarOpen }) => {
  // Correction du paramètre
  const stage = {
    id: 1,
    intern: "John Doe",
    stageSubject: {
      id: 1,
      title: "Développement d'une application Web",
      description:
        "Développement d'une application pour la gestion des stagiaires.",
      duration: 3,
      department: "Développement",
      service: "Web",
    },
    startDate: "2025-01-01",
    endDate: "2025-04-01",
    progress: 50,
    ListTaches: [
      {
        id: 1,
        description: "Analyse des besoins",
        status: "Terminé",
        progress: 100,
        duration: 5,
      },
      {
        id: 2,
        description: "Développement du backend",
        status: "En cours",
        progress: 60,
        duration: 15,
      },
      {
        id: 3,
        description: "Développement du frontend",
        status: "À faire",
        progress: 0,
        duration: 20,
      },
      {
        id: 4,
        description: "Create Logo",
        status: "À faire",
        progress: 0,
        duration: 20,
      },
      {
        id: 4,
        description: "Create Logo",
        status: "À faire",
        progress: 0,
        duration: 20,
      },
      {
        id: 4,
        description: "Create Logo",
        status: "À faire",
        progress: 0,
        duration: 20,
      },
      {
        id: 4,
        description: "Create Logo",
        status: "À faire",
        progress: 0,
        duration: 20,
      },
      {
        id: 4,
        description: "Create Logo",
        status: "À faire",
        progress: 0,
        duration: 20,
      },
      {
        id: 4,
        description: "Create Logo",
        status: "À faire",
        progress: 0,
        duration: 20,
      },
      {
        id: 4,
        description: "Create Logo",
        status: "À faire",
        progress: 0,
        duration: 20,
      },
      {
        id: 4,
        description: "Create Logo",
        status: "À faire",
        progress: 0,
        duration: 20,
      },
      {
        id: 4,
        description: "Create Logo",
        status: "À faire",
        progress: 0,
        duration: 20,
      },
    ],
  };

  const getRemainingDuration = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const remainingTime = end - now;
    const daysRemaining = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    return daysRemaining > 0 ? `${daysRemaining} jours restants` : "Terminé";
  };

  const taskGroups = {
    "À faire": [],
    "En cours": [],
    Terminé: [],
  };

  stage.ListTaches.forEach((task) => {
    taskGroups[task.status].push(task);
  });

  return (
    <div className="container h-full">
      {/* Header du stage avec background */}
      <div
        className={`bg-white p-4 w-full transition-all duration-300 ${
          isSidebarOpen ? "w-3/4" : "w-[85%]"
        }`}
      >
        <div className="grid grid-cols-2 p-4">
          <h3 className="font-semibold font-maFont">📊 Progression Achevée</h3>
          <div className="w-full bg-gray-300 rounded-md h-4 relative">
            <div
              className="bg-blue-500 h-4 rounded-md"
              style={{ width: `${stage.progress}%` }}
            ></div>
            {/* Label au-dessus de la barre */}
            <span
              className="absolute text-xs font-semibold text-gray-700"
              style={{
                left: `calc(${stage.progress}% - 15px)`, // Aligner le label avec la progression
                top: "-20px", // Positionner le label au-dessus de la barre
              }}
            >
              {stage.progress}%
            </span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-8 rounded-lg flex flex-row items-center">
          <div className="w-2/3 text-left">
            <h2 className="text-2xl font-bold">{stage.stageSubject.title}</h2>
            <p>{stage.stageSubject.description}</p>
          </div>
          <div className="w-1/3 text-left">
            <p>Département: {stage.stageSubject.department}</p>
            <p>Service: {stage.stageSubject.service}</p>
            <p className="font-semibold">
              {getRemainingDuration(stage.endDate)}
            </p>
          </div>
        </div>
      </div>
      {/* Section Kanban */}
      {/* Section Kanban avec un scroll général si une colonne dépasse */}
      <div className="mt-2 px-4 h-[calc(100vh-295px)] overflow-y-auto scrollbar-thin">
        <div className="grid grid-cols-3 gap-4">
          {["À faire", "En cours", "Terminé"].map((status) => (
            <div key={status} className="bg-gray-100 p-4 rounded-lg shadow">
              <h3 className="text-md font-semibold mb-2">{status}</h3>
              <div className="space-y-4">
                {stage.ListTaches.filter((task) => task.status === status).map(
                  (task) => (
                    <div key={task.id} className="p-4 bg-white shadow rounded">
                      <h4 className="font-semibold">{task.description}</h4>
                      <p className="text-gray-500 text-sm">
                        Durée: {task.duration} jours
                      </p>
                      <div className="w-full bg-gray-300 rounded h-2 mt-2">
                        <div
                          className="bg-blue-500 h-2 rounded"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StageProgress;
