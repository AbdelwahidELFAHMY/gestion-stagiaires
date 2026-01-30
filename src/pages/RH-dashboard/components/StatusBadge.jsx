import React from "react";

const statusColors = {
  active: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-blue-100 text-blue-800",
  terminated: "bg-red-100 text-red-800",
};

const statusLabels = {
  active: "Active",
  pending: "Pending",
  completed: "Completed",
  terminated: "Terminated",
};

const StatusBadge = ({ status }) => {
  const colorClass = statusColors[status] || "bg-gray-100 text-gray-800";
  const label = statusLabels[status] || "Unknown";

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}
    >
      {label}
    </span>
  );
};

export default StatusBadge;
