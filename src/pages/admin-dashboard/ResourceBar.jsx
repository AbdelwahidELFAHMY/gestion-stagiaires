import React from "react";

function ResourceBar({ label, value, text }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-700">{label}</span>
        <span className="font-medium">{text}</span>
      </div>
      <div className="w-full h-2 bg-gray-300 rounded-full">
        <div
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ResourceBar;