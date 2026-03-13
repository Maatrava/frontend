import React, { useState, useEffect } from 'react';
import { useBabyData } from '../hooks/useBabyData';
import BabyCard from '../components/BabyCard';
import GrowthChart from '../components/GrowthChart';
import VaccinationSchedule from '../components/VaccinationSchedule';
import QuickActions from '../components/QuickActions';

const Dashboard = () => {
  const { babies, loading, error } = useBabyData();

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-medium">Error loading data</h3>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Baby Dashboard</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {babies.map(baby => (
          <BabyCard key={baby._id} baby={baby} />
        ))}
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center">
          <button className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm font-medium">Add New Baby</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <GrowthChart babyId={babies[0]?._id} />
        <VaccinationSchedule babyId={babies[0]?._id} />
      </div>

      <QuickActions />
    </div>
  );
};

export default Dashboard;
