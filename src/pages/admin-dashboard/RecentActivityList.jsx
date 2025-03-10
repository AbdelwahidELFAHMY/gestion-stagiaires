import React from "react";

function RecentActivityList() {
  const activities = [
    { time: "5 min ago", event: "New company registration: TechCorp" },
    { time: "15 min ago", event: "Internship completed: Web Development" },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center text-sm">
            <span className="text-gray-500 w-24">{activity.time}</span>
            <span className="text-gray-700">{activity.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivityList;