import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  Activity, 
  Settings, 
  AlertTriangle,
  Database,
  Cpu,
  Scale,
  Shield,
  Menu,
  X,
  Power,
  RefreshCw,
  HardDrive,
  Trash2,
  PlayCircle,
  StopCircle,
  Plus,
  Minus
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('system-stats');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScaling, setIsScaling] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

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
    securityUpdates: "Up to date"
  };

  const systemHealth = [
    { 
      name: 'Main Database',
      status: 'Healthy',
      time: '2min ago',
      metrics: { load: '65%', connections: '234', latency: '45ms' }
    },
    { 
      name: 'API Gateway',
      status: 'Healthy',
      time: '1min ago',
      metrics: { requests: '850/s', errors: '0.01%', latency: '85ms' }
    },
    { 
      name: 'Authentication Service',
      status: 'Warning',
      time: '5min ago',
      metrics: { active: '2.3k', failures: '0.5%', cache: '94%' }
    },
    { 
      name: 'Storage Service',
      status: 'Healthy',
      time: '3min ago',
      metrics: { usage: '58%', iops: '1.2k/s', bandwidth: '45MB/s' }
    },
    {
      name: 'Email Service',
      status: 'Healthy',
      time: '4min ago',
      metrics: { queue: '12', sent: '1.5k/h', delivery: '99.9%' }
    }
  ];

  const handleAction = (action: string, details: string) => {
    setModalContent({
      title: 'Action Confirmation',
      message: `Are you sure you want to ${action.toLowerCase()} ${details}?`
    });
    setShowActionModal(true);
  };

  const handleScaleService = (service: string, action: 'up' | 'down') => {
    setIsScaling(true);
    setTimeout(() => {
      setIsScaling(false);
      setModalContent({
        title: 'Scaling Complete',
        message: `Successfully scaled ${action} ${service}`
      });
      setShowActionModal(true);
    }, 2000);
  };

  const ActionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">{modalContent.title}</h3>
        <p className="text-gray-600 mb-6">{modalContent.message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowActionModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const ActionButton = ({ icon, label, onClick, color = "blue" }) => (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 rounded-md text-white bg-${color}-500 hover:bg-${color}-600 transition-colors`}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </button>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'system-stats':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StatCard
                title="Total Users"
                value={stats.users}
                subtitle="Active today: 342"
                icon={<Users className="h-6 w-6 text-blue-500" />}
              />
              <StatCard
                title="Partner Companies"
                value={stats.companies}
                subtitle="From 12 countries"
                icon={<Database className="h-6 w-6 text-green-500" />}
              />
              <StatCard
                title="Active Interns"
                value={stats.activeInterns}
                subtitle="↑ 12% this month"
                icon={<Activity className="h-6 w-6 text-purple-500" />}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4">Internship Overview</h3>
                <div className="space-y-4">
                  <ResourceBar label="Total Internships" value={(stats.completedInternships / stats.totalInternships) * 100} text={`${stats.completedInternships} / ${stats.totalInternships}`} />
                  <ResourceBar label="Average Rating" value={(stats.averageRating / 5) * 100} text={`${stats.averageRating}/5.0`} />
                  <ResourceBar label="Completion Rate" value={78} text="78%" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { time: '5 min ago', event: 'New company registration: TechCorp' },
                    { time: '15 min ago', event: 'Internship completed: Web Development' },
                    { time: '1 hour ago', event: 'System backup completed' },
                    { time: '2 hours ago', event: 'Performance report generated' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className="text-gray-500 w-24">{activity.time}</span>
                      <span className="text-gray-700">{activity.event}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'technical-stats':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="CPU Usage"
                value={stats.cpuUsage}
                subtitle="8 cores @ 2.5GHz"
                icon={<Cpu className="h-6 w-6 text-red-500" />}
              />
              <StatCard
                title="Memory Usage"
                value={stats.memoryUsage}
                subtitle="12GB / 16GB"
                icon={<Database className="h-6 w-6 text-yellow-500" />}
              />
              <StatCard
                title="Storage Usage"
                value={stats.storageUsage}
                subtitle="234GB / 500GB"
                icon={<Database className="h-6 w-6 text-indigo-500" />}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Network Statistics</h3>
                  <ActionButton
                    icon={<RefreshCw className="h-4 w-4" />}
                    label="Refresh Stats"
                    onClick={() => handleAction('refresh', 'network statistics')}
                  />
                </div>
                <div className="space-y-4">
                  <ResourceBar label="Bandwidth Usage" value={65} text="650MB/s" />
                  <ResourceBar label="Active Connections" value={45} text="4.5k" />
                  <ResourceBar label="SSL Certificate" value={80} text="80 days left" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Server Locations</h3>
                  <ActionButton
                    icon={<Power className="h-4 w-4" />}
                    label="Check Status"
                    onClick={() => handleAction('check', 'server status')}
                    color="green"
                  />
                </div>
                <div className="space-y-3">
                  {[
                    { location: 'Paris', status: 'Primary', load: '75%' },
                    { location: 'London', status: 'Secondary', load: '45%' },
                    { location: 'Frankfurt', status: 'Backup', load: '25%' }
                  ].map((server, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                      <span className="font-medium">{server.location}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{server.status}</span>
                        <span className="text-sm font-medium">{server.load}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'performance':
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
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">API Performance</h3>
                  <div className="flex space-x-2">
                    <ActionButton
                      icon={<RefreshCw className="h-4 w-4" />}
                      label="Clear Cache"
                      onClick={() => handleAction('clear', 'API cache')}
                      color="yellow"
                    />
                    <ActionButton
                      icon={<HardDrive className="h-4 w-4" />}
                      label="Optimize"
                      onClick={() => handleAction('optimize', 'API performance')}
                      color="green"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <ResourceBar label="Request Success Rate" value={99.8} text="99.8%" />
                  <ResourceBar label="Average Response Time" value={85} text="85ms" />
                  <ResourceBar label="Cache Hit Rate" value={92} text="92%" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Load Distribution</h3>
                  <ActionButton
                    icon={<RefreshCw className="h-4 w-4" />}
                    label="Rebalance"
                    onClick={() => handleAction('rebalance', 'load distribution')}
                  />
                </div>
                <div className="space-y-4">
                  {[
                    { region: 'Europe', load: 65, requests: '450k/hour' },
                    { region: 'Americas', load: 45, requests: '280k/hour' },
                    { region: 'Asia', load: 35, requests: '195k/hour' }
                  ].map((region, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{region.region}</span>
                        <span className="text-gray-500">{region.requests}</span>
                      </div>
                      <ResourceBar label="" value={region.load} text={`${region.load}%`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'scalability':
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
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">System Resources</h3>
                  <div className="flex space-x-2">
                    <ActionButton
                      icon={<RefreshCw className="h-4 w-4" />}
                      label="Auto-scale"
                      onClick={() => handleAction('enable', 'auto-scaling')}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <ResourceBar label="Server Load" value={75} text="75% - Normal" />
                  <ResourceBar label="Database Connections" value={60} text="1.2k active" />
                  <ResourceBar label="API Usage" value={45} text="4.5k req/min" />
                  <ResourceBar label="Cache Usage" value={82} text="82% hit rate" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Auto-scaling Status</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Manual Control</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { service: 'Web Servers', instances: '4/8', load: '65%' },
                    { service: 'API Servers', instances: '3/6', load: '55%' },
                    { service: 'Worker Nodes', instances: '2/4', load: '45%' }
                  ].map((service, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{service.service}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Active: {service.instances}</span>
                          <button
                            onClick={() => handleScaleService(service.service, 'up')}
                            className="p-1 hover:bg-gray-200 rounded"
                            disabled={isScaling}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleScaleService(service.service, 'down')}
                            className="p-1 hover:bg-gray-200 rounded"
                            disabled={isScaling}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <ResourceBar label="" value={parseInt(service.load)} text={service.load} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'maintenance':
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
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">System Health</h3>
                <div className="flex space-x-2">
                  <ActionButton
                    icon={<PlayCircle className="h-4 w-4" />}
                    label="Start Maintenance"
                    onClick={() => handleAction('start', 'system maintenance')}
                    color="green"
                  />
                  <ActionButton
                    icon={<StopCircle className="h-4 w-4" />}
                    label="Stop Maintenance"
                    onClick={() => handleAction('stop', 'system maintenance')}
                    color="red"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {systemHealth.map((service) => (
                  <div key={service.name} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">{service.name}</span>
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          service.status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {service.status}
                        </span>
                        <span className="text-sm text-gray-500">Updated {service.time}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAction('restart', service.name)}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleAction('clear logs', service.name)}
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
                          <span className="text-gray-500 capitalize">{key}: </span>
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
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {showActionModal && <ActionModal />}
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 transform ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-200 ease-in-out z-30`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="mt-6">
          <NavItem
            icon={<BarChart3 />}
            title="System Statistics"
            active={activeTab === 'system-stats'}
            onClick={() => setActiveTab('system-stats')}
          />
          <NavItem
            icon={<Activity />}
            title="Technical Statistics"
            active={activeTab === 'technical-stats'}
            onClick={() => setActiveTab('technical-stats')}
          />
          <NavItem
            icon={<Settings />}
            title="Performance"
            active={activeTab === 'performance'}
            onClick={() => setActiveTab('performance')}
          />
          <NavItem
            icon={<Scale />}
            title="Scalability"
            active={activeTab === 'scalability'}
            onClick={() => setActiveTab('scalability')}
          />
          <NavItem
            icon={<Shield />}
            title="Maintenance"
            active={activeTab === 'maintenance'}
            onClick={() => setActiveTab('maintenance')}
          />
        </nav>
      </aside>

      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 md:hidden z-40">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Main content */}
      <main className="md:ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            {activeTab === 'system-stats' && 'System Statistics'}
            {activeTab === 'technical-stats' && 'Technical Statistics'}
            {activeTab === 'performance' && 'Performance Monitoring'}
            {activeTab === 'scalability' && 'Scalability & Availability'}
            {activeTab === 'maintenance' && 'System Maintenance'}
          </h2>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, title, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-6 py-3 text-left ${
        active ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <span className="mr-4">{icon}</span>
      <span className="font-medium">{title}</span>
    </button>
  );
}

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-semibold text-gray-900">{value}</p>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
      )}
    </div>
  );
}

function ResourceBar({ label, value, text }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm font-medium text-gray-900">{text || `${value}%`}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default App;