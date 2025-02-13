import { useState } from "react";

const Agenda = () => {
  const [schedule, setSchedule] = useState([
    { day: "Lundi", startTime: "09:00", endTime: "17:00" },
    { day: "Mardi", startTime: "09:00", endTime: "17:00" },
    { day: "Mercredi", startTime: "09:00", endTime: "17:00" },
    { day: "Jeudi", startTime: "09:00", endTime: "17:00" },
    { day: "Vendredi", startTime: "09:00", endTime: "17:00" },
  ]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">📅 Emploi du Temps</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Jour</th>
            <th className="border p-2">Heure de début</th>
            <th className="border p-2">Heure de fin</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((day, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{day.day}</td>
              <td className="border p-2">{day.startTime}</td>
              <td className="border p-2">{day.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Agenda;
