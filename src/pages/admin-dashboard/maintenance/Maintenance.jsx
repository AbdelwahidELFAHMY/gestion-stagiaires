import HttpMetricsChart from "./HttpMetricsChart";
import SystemStatus from "./SystemStatus";

export default function Maintenance({ handleAction }) {
  return (
    <div className="">
      <SystemStatus />
      <HttpMetricsChart />
    </div>
  );
}