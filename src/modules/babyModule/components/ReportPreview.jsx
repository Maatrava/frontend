import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ReportPreview = ({ data, type }) => {
  // Dummy report data
  const dummyGrowthData = [
    { month: 'Jan', weight: 3.5, height: 50 },
    { month: 'Feb', weight: 4.2, height: 54 },
    { month: 'Mar', weight: 5.1, height: 58 },
    { month: 'Apr', weight: 5.8, height: 61 },
    { month: 'May', weight: 6.5, height: 64 },
    { month: 'Jun', weight: 7.2, height: 67 }
  ];

  const dummyVaccinationData = [
    { name: 'Completed', value: 2, color: '#10B981' },
    { name: 'Scheduled', value: 1, color: '#F59E0B' },
    { name: 'Upcoming', value: 3, color: '#6B7280' }
  ];

  const dummyHealthData = [
    { type: 'Illness', count: 2 },
    { type: 'Medication', count: 3 }
  ];

  const renderGrowthReport = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Growth Progress</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dummyGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="weight" fill="#3B82F6" name="Weight (kg)" />
            <Bar dataKey="height" fill="#10B981" name="Height (cm)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-sm text-blue-600 font-medium">Total Weight Gain</p>
          <p className="text-xl font-bold text-blue-900">3.7 kg</p>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <p className="text-sm text-green-600 font-medium">Total Height Gain</p>
          <p className="text-xl font-bold text-green-900">17 cm</p>
        </div>
      </div>
    </div>
  );

  const renderVaccinationReport = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Vaccination Status</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={dummyVaccinationData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {dummyVaccinationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Completion Rate</span>
          <span className="font-medium">33%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Next Due</span>
          <span className="font-medium">DTP - Mar 15</span>
        </div>
      </div>
    </div>
  );

  const renderHealthSummary = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Health Events Overview</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dummyHealthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-purple-50 p-4 rounded">
          <p className="text-sm text-purple-600 font-medium">Total Health Events</p>
          <p className="text-xl font-bold text-purple-900">5</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded">
          <p className="text-sm text-yellow-600 font-medium">Active Medications</p>
          <p className="text-xl font-bold text-yellow-900">1</p>
        </div>
      </div>
    </div>
  );

  const renderCompleteReport = () => (
    <div className="space-y-8">
      {renderGrowthReport()}
      {renderVaccinationReport()}
      {renderHealthSummary()}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {type === 'growth' && 'Growth Report'}
          {type === 'vaccination' && 'Vaccination Report'}
          {type === 'health-summary' && 'Health Summary'}
          {type === 'complete' && 'Complete Health Report'}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Generated on {new Date().toLocaleDateString()}
        </p>
      </div>

      {type === 'growth' && renderGrowthReport()}
      {type === 'vaccination' && renderVaccinationReport()}
      {type === 'health-summary' && renderHealthSummary()}
      {type === 'complete' && renderCompleteReport()}

      <div className="pt-4 border-t border-gray-200">
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ReportPreview;
