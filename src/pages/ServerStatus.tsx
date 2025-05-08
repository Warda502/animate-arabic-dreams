
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ServerStatus = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Authorization Server", status: "Operational", uptime: 99.98, loading: true },
    { id: 2, name: "Firmware Database", status: "Operational", uptime: 99.95, loading: true },
    { id: 3, name: "User Authentication", status: "Operational", uptime: 100, loading: true },
    { id: 4, name: "License Validation", status: "Operational", uptime: 99.97, loading: true },
    { id: 5, name: "EDL Service", status: "Operational", uptime: 99.92, loading: true },
    { id: 6, name: "Xiaomi Service", status: "Operational", uptime: 99.89, loading: true },
    { id: 7, name: "Vivo Service", status: "Operational", uptime: 99.94, loading: true },
    { id: 8, name: "Oppo Service", status: "Operational", uptime: 99.91, loading: true }
  ]);

  const [incidents, setIncidents] = useState([
    {
      id: 1,
      date: "2023-04-15",
      service: "Firmware Database",
      description: "Temporary slowdown due to database maintenance",
      duration: "45 minutes",
      resolved: true
    },
    {
      id: 2,
      date: "2023-03-22",
      service: "Authorization Server",
      description: "Brief outage during server migration",
      duration: "20 minutes",
      resolved: true
    },
    {
      id: 3,
      date: "2023-02-10",
      service: "EDL Service",
      description: "Service disruption due to network issues",
      duration: "1 hour",
      resolved: true
    }
  ]);

  useEffect(() => {
    // Simulate loading server status data
    const timer = setTimeout(() => {
      setServices(services.map(service => ({ ...service, loading: false })));
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Operational":
        return "bg-green-500";
      case "Degraded":
        return "bg-yellow-500";
      case "Outage":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getUptimeColor = (uptime) => {
    if (uptime >= 99.9) return "text-green-500";
    if (uptime >= 99) return "text-yellow-500";
    return "text-red-500";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 opacity-0 animate-fade-in-delay-1" style={{ animationFillMode: 'forwards' }}>
            Server Status
          </h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto opacity-0 animate-fade-in-delay-2" style={{ animationFillMode: 'forwards' }}>
            Monitor our service status and performance in real-time
          </p>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between mb-10">
                <div className="flex items-center mb-4 md:mb-0">
                  <span className="h-4 w-4 rounded-full bg-green-500 mr-3"></span>
                  <h2 className="text-2xl font-bold">All Systems Operational</h2>
                </div>
                
                <div className="text-gray-500 text-sm">
                  Last updated: {new Date().toLocaleString()}
                </div>
              </div>
              
              <div className="grid gap-6">
                {services.map((service) => (
                  <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="mb-3 md:mb-0">
                      <h3 className="text-lg font-semibold">{service.name}</h3>
                    </div>
                    
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className="flex items-center">
                        {service.loading ? (
                          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                        ) : (
                          <>
                            <span className={`h-3 w-3 rounded-full ${getStatusColor(service.status)} mr-2`}></span>
                            <span className="text-sm font-medium">{service.status}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center ml-auto md:ml-0">
                        {service.loading ? (
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        ) : (
                          <span className={`text-sm font-semibold ${getUptimeColor(service.uptime)}`}>
                            {service.uptime}% Uptime
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Uptime Performance */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">30-Day Uptime Performance</h2>
          
          <div className="max-w-5xl mx-auto">
            <Card className="p-8">
              <div className="grid grid-cols-1 gap-8">
                {services.slice(0, 4).map((service) => (
                  <div key={`uptime-${service.id}`}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{service.name}</span>
                      <span className={`font-semibold ${getUptimeColor(service.uptime)}`}>{service.uptime}%</span>
                    </div>
                    <Progress 
                      value={service.uptime} 
                      className="h-2" 
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Past Incidents */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Recent Incidents</h2>
          
          <div className="max-w-5xl mx-auto">
            <Card className="p-8">
              {incidents.length > 0 ? (
                <div className="space-y-8">
                  {incidents.map((incident) => (
                    <div key={incident.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold">{incident.service}</h3>
                        <div className="flex items-center">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${incident.resolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {incident.resolved ? 'Resolved' : 'Ongoing'}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{incident.description}</p>
                      
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                        <div>Date: {formatDate(incident.date)}</div>
                        <div>Duration: {incident.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">No Recent Incidents</h3>
                  <p className="text-gray-600">All systems have been running smoothly.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                <p className="mb-6 text-blue-100">
                  Subscribe to receive notifications about service disruptions and maintenance schedules.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full md:w-auto"
                  />
                  <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-md font-semibold transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServerStatus;
