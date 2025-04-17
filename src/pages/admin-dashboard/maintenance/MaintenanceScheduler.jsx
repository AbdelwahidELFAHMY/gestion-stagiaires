import { useState, useEffect, useRef } from "react";
import { CalendarPlus, CheckCircle, CircleAlert, X } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import { getUsernameFromToken } from "../../../utils/getUsernameFromToken";

const MaintenanceScheduler = () => {
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleSuccess, setScheduleSuccess] = useState(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        const button = document.querySelector(
          '[aria-label="Programmer maintenance"]'
        );
        if (button && !button.contains(event.target)) {
          setShowTooltip(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSchedule = async () => {
    if (!maintenanceDate) return;
  
    const username = getUsernameFromToken();
    if (!username) {
      console.error("Aucun username trouvé dans le token");
      setScheduleSuccess(false);
      return;
    }
  
    setIsScheduling(true);
    try {
      await axiosInstance.post("notifications/maintenance/schedule", { 
        date: new Date(maintenanceDate).toISOString(), 
        username: username 
      });
      setScheduleSuccess(true);
    } catch (error) {
      console.error("Erreur lors de la planification:", error);
      setScheduleSuccess(false);
    } finally {
      setIsScheduling(false);
      setMaintenanceDate("");
    }
  };

  return (
    <div className="relative">
      <button
        aria-label="Programmer maintenance"
        className={`bg-blue-500 cursor-pointer hover:shadow-muted-foreground shadow-md shadow-blue-600 text-white text-size13 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
          showTooltip ? "bg-blue-600" : ""
        }`}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <CalendarPlus className="h-5 w-5" />
        <span>Programmer la maintenance</span>
      </button>

      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 z-[1000] w-72 animate-fade-in"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-custom-600 text-size15 dark:text-gray-200">
              Planifier une date
            </h3>
            <button
              onClick={() => {
                setShowTooltip(false);
                setScheduleSuccess(null);
              }}
              className="cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {scheduleSuccess === true ? (
            <div className="py-4 flex flex-col items-center justify-center text-green-600 dark:text-green-400 space-y-2">
              <CheckCircle className="h-8 w-8" />
              <span>Maintenance planifiée avec succès!</span>
            </div>
          ) : scheduleSuccess === false ? (
            <div className="py-4 flex flex-col items-center justify-center text-red-600 dark:text-red-400 space-y-2">
              <CircleAlert className="h-8 w-8" />
              <span>Erreur lors de la planification</span>
            </div>
          ) : (
            <div className="space-y-4 ">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-300 text-size13 font-medium mb-1">
                    Date et heure :
                  </label>
                  <input
                    type="datetime-local"
                    className="mt-1 text-size14 font-semibold block px-3 py-2 border-thin border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700"
                    value={maintenanceDate}
                    onChange={(e) => setMaintenanceDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                <button
                  className="bg-blue-500 text-white text-size14 cursor-pointer px-4 py-2 mr-3 h-[42px] rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!maintenanceDate || isScheduling}
                  onClick={handleSchedule}
                >
                  {isScheduling ? "..." : "OK"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MaintenanceScheduler;
