import { useState, useEffect } from "react";
import Agenda from "./Agenda";

const Presence = () => {
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [isWorkDay, setIsWorkDay] = useState(false);

  const workDays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

  useEffect(() => {
    const today = new Date();
    const dayName = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(today);
    setIsWorkDay(workDays.includes(dayName));
  }, []);

  const markAttendance = () => {
    if (isWorkDay) {
      setAttendanceMarked(true);
      alert("Présence marquée avec succès !");
    } else {
      alert("Aujourd'hui n'est pas un jour de travail.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
      <h2 className="text-xl font-semibold mb-4">✅ Marquer la Présence</h2>
      <Agenda />
      <div className="mt-4">
        <button
          onClick={markAttendance}
          disabled={attendanceMarked}
          className={`px-4 py-2 text-white font-semibold rounded ${
            attendanceMarked ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {attendanceMarked ? "Présence déjà marquée" : "Marquer la présence"}
        </button>
      </div>
    </div>
  );
};

export default Presence;
