import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaches } from "../../../stores/taches_slices/tachesSlice";
import Tache from "./Tache";
import { TacheStatus } from "../../../utils/enums";
import { FaTasks } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ListTaches = () => {
  const dispatch = useDispatch();
  const { items: taches, status, error } = useSelector((state) => state.taches);

  useEffect(() => {
    dispatch(fetchTaches());
  }, [dispatch]);

  if (status === "loading")
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow">
            <Skeleton width={100} height={20} className="mb-4" />
            {[...Array(3)].map((_, j) => (
              <div key={j} className="mb-4">
                <Skeleton height={80} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );

  if (status === "failed")
    return (
      <div className="text-red-500 p-4 bg-red-50 rounded-lg">
        Erreur: {error}
      </div>
    );

  if (taches.length === 0)
    return (
      <div className="text-center justify-center py-8">
        <FaTasks className="mx-auto text-gray-300 text-7xl mb-4" />
        <p className="text-gray-500">Aucune tâche est assignee</p>
      </div>
    );

  const taskGroups = {
    [TacheStatus.A_FAIRE]: {
      title: "À faire",
      color: "bg-blue-50 border-blue-100",
      iconColor: "bg-blue-500",
    },
    [TacheStatus.EN_COURS]: {
      title: "En cours",
      color: "bg-yellow-50 border-yellow-100",
      iconColor: "bg-yellow-500",
    },
    [TacheStatus.TERMINE]: {
      title: "Terminé",
      color: "bg-green-50 border-green-100",
      iconColor: "bg-green-500",
    },
  };

  // Grouper les tâches
  const groupedTasks = {};
  Object.keys(taskGroups).forEach((status) => {
    groupedTasks[status] = taches.filter((task) => task.status === status);
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn">
      {Object.entries(taskGroups).map(([status, group]) => (
        <div
          key={status}
          className={`${group.color} border rounded-lg p-4 shadow-sm transition-all hover:shadow-md`}
        >
          <h3 className="text-size14 font-semibold mb-4 flex items-center">
            <span className={`${group.iconColor} w-4 h-4 rounded-full mr-2`} />
            {group.title} ({groupedTasks[status]?.length || 0})
          </h3>

          <div className="space-y-3">
            {groupedTasks[status]?.map((task) => (
              <Tache key={task.id} tache={task} />
            ))}

            {(!groupedTasks[status] || groupedTasks[status].length === 0) && (
              <div className="flex flex-col items-center justify-center py-4 opacity-75">
                <FaTasks className="text-gray-300 text-6xl mb-2" />
                <p className="text-gray-400 text-sm">Aucune tâche ici</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListTaches;
