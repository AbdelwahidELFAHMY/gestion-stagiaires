import HttpMetricsChart from "./HttpMetricsChart";
import SystemStatus from "./SystemStatus";

export default function Maintenance({ handleAction }) {
  return (
    <div className="grid grid-rows-[1fr_2fr] h-screen gap-4">
      <SystemStatus className="bg-gray-100 p-4" />
      <HttpMetricsChart className="bg-gray-200 p-4" />
    </div>
  );
}
