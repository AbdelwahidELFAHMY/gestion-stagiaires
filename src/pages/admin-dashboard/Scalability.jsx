import React, { useState } from 'react'
import ResourceBar from './ResourceBar';
import { Activity, Minus, Plus, RefreshCw, Scale, Users } from 'lucide-react';
import ActionButton from './ActionButton';
import StatCard from './StatCard';

export default function Scalability(handleAction) {
    const [isScaling, setIsScaling] = useState(false);
    
      const [showActionModal, setShowActionModal] = useState(false);
      const [modalContent, setModalContent] = useState({ title: "", message: "" });
  
    const handleScaleService = (service, action) => {
      setIsScaling(true);
      setTimeout(() => {
        setIsScaling(false);
        setModalContent({
          title: "Scaling Complete",
          message: `Successfully scaled ${action} ${service}`,
        });
        setShowActionModal(true);
      }, 2000);
    };

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
          title="API Requests"
          value={stats.apiRequests}
          subtitle="Peak: 1.5M"
          icon={<Activity className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers}
          subtitle="Last 5 minutes"
          icon={<Users className="h-6 w-6 text-green-500" />}
        />
        <StatCard
          title="Server Load"
          value="68%"
          subtitle="Across all regions"
          icon={<Scale className="h-6 w-6 text-yellow-500" />}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">System Resources</h3>
            <div className="flex space-x-2">
              <ActionButton
                icon={<RefreshCw className="h-4 w-4" />}
                label="Auto-scale"
                onClick={() => handleAction("enable", "auto-scaling")}
              />
            </div>
          </div>
          <div className="space-y-4">
            <ResourceBar
              label="Server Load"
              value={75}
              text="75% - Normal"
            />
            <ResourceBar
              label="Database Connections"
              value={60}
              text="1.2k active"
            />
            <ResourceBar
              label="API Usage"
              value={45}
              text="4.5k req/min"
            />
            <ResourceBar
              label="Cache Usage"
              value={82}
              text="82% hit rate"
            />
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Auto-scaling Status</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                Manual Control
              </span>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { service: "Web Servers", instances: "4/8", load: "65%" },
              { service: "API Servers", instances: "3/6", load: "55%" },
              { service: "Worker Nodes", instances: "2/4", load: "45%" },
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{service.service}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      Active: {service.instances}
                    </span>
                    <button
                      onClick={() =>
                        handleScaleService(service.service, "up")
                      }
                      className="p-1 cursor-pointer hover:bg-gray-200 rounded"
                      disabled={isScaling}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleScaleService(service.service, "down")
                      }
                      className="p-1 cursor-pointer hover:bg-gray-200 rounded"
                      disabled={isScaling}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <ResourceBar
                  label=""
                  value={parseInt(service.load)}
                  text={service.load}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
