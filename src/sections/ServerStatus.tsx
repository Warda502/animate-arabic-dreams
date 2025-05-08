
import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ServerStatus = () => {
  const servers = [
    {
      name: "Main Authorization Server",
      location: "Europe",
      status: "Operational",
      load: 23,
      uptime: "99.98%"
    },
    {
      name: "File Distribution Server",
      location: "Asia",
      status: "Operational",
      load: 45,
      uptime: "99.95%"
    },
    {
      name: "Authentication Server",
      location: "North America",
      status: "Operational",
      load: 18,
      uptime: "100%"
    },
    {
      name: "Database Server",
      location: "Europe",
      status: "Operational",
      load: 37,
      uptime: "99.99%"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-500";
      case "Maintenance":
        return "bg-yellow-500";
      case "Issues":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getProgressColor = (load: number) => {
    if (load < 30) return "bg-green-500";
    if (load < 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 text-pegasus-orange">Server Status</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          Current status of all Pegasus Tool servers
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {servers.map((server, index) => (
            <Card key={index} className="p-6 border border-orange-200 dark:border-orange-900/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{server.name}</h2>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(server.status)}`}></div>
                  <span className="text-sm font-medium">{server.status}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Location</span>
                    <span>{server.location}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 dark:text-gray-400">Server Load</span>
                    <span>{server.load}%</span>
                  </div>
                  <Progress value={server.load} className={`h-2 ${getProgressColor(server.load)}`} />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Uptime (30 days)</span>
                    <span className="font-medium">{server.uptime}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Status History</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b dark:border-gray-700">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>May 7, 2025 04:30 UTC:</strong> All systems operational
              </p>
            </div>
            <div className="flex items-center gap-2 pb-3 border-b dark:border-gray-700">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>May 5, 2025 22:15 UTC:</strong> Scheduled maintenance completed
              </p>
            </div>
            <div className="flex items-center gap-2 pb-3 border-b dark:border-gray-700">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>May 5, 2025 20:00 UTC:</strong> Scheduled maintenance started
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>May 1, 2025 00:00 UTC:</strong> Monthly system report: 99.97% uptime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerStatus;
