import HttpMetricsChart from "./HttpMetricsChart";
import SystemStatus from "./SystemStatus";

// Dans Maintenance.jsx
export default function Maintenance() {
  return (
    <div className="grid grid-rows-[1fr_2fr] h-screen gap-4 overflow-visible">
      <SystemStatus className="bg-gray-100 p-4 overflow-visible" /> 
      <HttpMetricsChart className="bg-gray-200 p-4" />
    </div>
  );
}
