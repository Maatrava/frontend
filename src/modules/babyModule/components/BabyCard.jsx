import React from 'react';
import { Calendar, Weight, Ruler } from 'lucide-react';

const BabyCard = ({ baby }) => {
  const age = baby.dateOfBirth 
    ? Math.floor((new Date() - new Date(baby.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
    : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{baby.name}</h3>
          <p className="text-sm text-gray-600">{age} years old</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          baby.gender === 'Male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
        }`}>
          {baby.gender}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          Born: {baby.dateOfBirth ? new Date(baby.dateOfBirth).toLocaleDateString() : 'Not set'}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Weight className="w-4 h-4 mr-2" />
          Birth Weight: {baby.weight || 'Not set'} kg
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Ruler className="w-4 h-4 mr-2" />
          Birth Height: {baby.height || 'Not set'} cm
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Growth Records</span>
          <span className="font-medium">{baby.growthRecords || 0}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600">Vaccinations</span>
          <span className="font-medium">{baby.vaccinations || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default BabyCard;
