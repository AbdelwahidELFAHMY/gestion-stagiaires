import React from 'react'
import StatCard from './StatCard';
import { Activity, AlertTriangle, HardDrive, RefreshCw } from 'lucide-react';
import ActionButton from './ActionButton';
import ResourceBar from './ResourceBar';

export default function Performance({handleAction}) {

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
          title="System Uptime"
          value={stats.systemUptime}
          subtitle="30 days streak"
          icon={<Activity className="h-6 w-6 text-green-500" />}
        />
        <StatCard
          title="Response Time"
          value={stats.responseTime}
          subtitle="↓ 15% improvement"
          icon={<Activity className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          title="Error Rate"
          value={stats.errorRate}
          subtitle="24h average"
          icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">API Performance</h3>
            <div className="flex space-x-2">
              <ActionButton
                icon={<RefreshCw className="h-4 w-4" />}
                label="Clear Cache"
                onClick={() => handleAction("clear", "API cache")}
                color="yellow"
              />
              <ActionButton
                icon={<HardDrive className="h-4 w-4" />}
                label="Optimize"
                onClick={() =>
                  handleAction("optimize", "API performance")
                }
                color="green"
              />
            </div>
          </div>
          <div className="space-y-4">
            <ResourceBar
              label="Request Success Rate"
              value={99.8}
              text="99.8%"
            />
            <ResourceBar
              label="Average Response Time"
              value={85}
              text="85ms"
            />
            <ResourceBar label="Cache Hit Rate" value={92} text="92%" />
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Load Distribution</h3>
            <ActionButton
              icon={<RefreshCw className="h-4 w-4" />}
              label="Rebalance"
              onClick={() =>
                handleAction("rebalance", "load distribution")
              }
            />
          </div>
          <div className="space-y-4">
            {[
              { region: "Europe", load: 65, requests: "450k/hour" },
              { region: "Americas", load: 45, requests: "280k/hour" },
              { region: "Asia", load: 35, requests: "195k/hour" },
            ].map((region, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{region.region}</span>
                  <span className="text-gray-500">{region.requests}</span>
                </div>
                <ResourceBar
                  label=""
                  value={region.load}
                  text={`${region.load}%`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
