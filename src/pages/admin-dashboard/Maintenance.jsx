import { Database, PlayCircle, RefreshCw, Settings, Shield, StopCircle, Trash2 } from 'lucide-react';
import React from 'react'
import ActionButton from './ActionButton';
import StatCard from './StatCard';

export default function Maintenance({handleAction}) {

  const systemHealth = [
    {
      name: "Main Database",
      status: "Healthy",
      time: "2min ago",
      metrics: { load: "65%", connections: "234", latency: "45ms" },
    },
    {
      name: "API Gateway",
      status: "Healthy",
      time: "1min ago",
      metrics: { requests: "850/s", errors: "0.01%", latency: "85ms" },
    },
    {
      name: "Authentication Service",
      status: "Warning",
      time: "5min ago",
      metrics: { active: "2.3k", failures: "0.5%", cache: "94%" },
    },
    {
      name: "Storage Service",
      status: "Healthy",
      time: "3min ago",
      metrics: { usage: "58%", iops: "1.2k/s", bandwidth: "45MB/s" },
    },
    {
      name: "Email Service",
      status: "Healthy",
      time: "4min ago",
      metrics: { queue: "12", sent: "1.5k/h", delivery: "99.9%" },
    },
  ];


  const stats = {
    users: 2456,
    companies: 128,
    activeInterns: 876,
    totalInternships: 1543,
    completedInternships: 667,
    averageRating: 4.8,
    systemUptime: "99.9%",
    responseTime: "120ms",
    errorRate: "0.02%",
    cpuUsage: "45%",
    memoryUsage: "62%",
    storageUsage: "58%",
    apiRequests: "1.2M/day",
    activeUsers: "342",
    serverLocations: ["Paris", "London", "Frankfurt"],
    lastDeployment: "2 hours ago",
    backupStatus: "Latest: 15 min ago",
    securityUpdates: "Up to date",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Last Deployment"
          value={stats.lastDeployment}
          subtitle="No issues reported"
          icon={<Settings className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          title="Backup Status"
          value={stats.backupStatus}
          subtitle="All systems"
          icon={<Database className="h-6 w-6 text-green-500" />}
        />
        <StatCard
          title="Security"
          value={stats.securityUpdates}
          subtitle="Last check: 5min ago"
          icon={<Shield className="h-6 w-6 text-purple-500" />}
        />
      </div>
      <div className="bg-gray-50 rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">System Health</h3>
          <div className="flex space-x-2">
            <ActionButton
              icon={<PlayCircle className="h-4 w-4" />}
              label="Start Maintenance"
              onClick={() => handleAction("start", "system maintenance")}
              color="green"
            />
            <ActionButton
              icon={<StopCircle className="h-4 w-4" />}
              label="Stop Maintenance"
              onClick={() => handleAction("stop", "system maintenance")}
              color="red"
            />
          </div>
        </div>
        <div className="space-y-4">
          {systemHealth.map((service) => (
            <div key={service.name} className="bg-gray-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">{service.name}</span>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      service.status === "Healthy"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {service.status}
                  </span>
                  <span className="text-sm text-gray-500">
                    Updated {service.time}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        handleAction("restart", service.name)
                      }
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleAction("clear logs", service.name)
                      }
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                {Object.entries(service.metrics).map(([key, value]) => (
                  <div key={key} className="bg-white p-2 rounded">
                    <span className="text-gray-500 capitalize">
                      {key}:{" "}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
