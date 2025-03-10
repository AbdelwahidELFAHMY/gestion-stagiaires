import React from "react";

const ActionButton = ({ icon, label, onClick, color = "blue" }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-md text-white bg-${color}-500 hover:bg-${color}-600 transition-colors`}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);
export default ActionButton;