import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import AddBaby from './AddBaby';
import GrowthTracking from './GrowthTracking';
import Vaccination from './Vaccination';
import HealthLogs from './HealthLogs';
import HealthReports from './HealthReports';
import NavigationTabs from '../components/NavigationTabs';

const BabyModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', path: '/baby/dashboard' },
    { id: 'add-baby', label: 'Add Baby', path: '/baby/add' },
    { id: 'growth', label: 'Growth', path: '/baby/growth' },
    { id: 'vaccination', label: 'Vaccination', path: '/baby/vaccination' },
    { id: 'health-logs', label: 'Health Logs', path: '/baby/health-logs' },
    { id: 'reports', label: 'Reports', path: '/baby/reports' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <NavigationTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />

        <div className="mt-6">
          <Routes>
            <Route path="/" element={<Navigate to="/baby/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddBaby />} />
            <Route path="/growth" element={<GrowthTracking />} />
            <Route path="/vaccination" element={<Vaccination />} />
            <Route path="/health-logs" element={<HealthLogs />} />
            <Route path="/reports" element={<HealthReports />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default BabyModule;
