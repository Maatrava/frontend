import React, { useState } from 'react';
import { useHealthLogsData } from '../hooks/useHealthLogsData';
import HealthLogForm from '../components/HealthLogForm';
import HealthLogTable from '../components/HealthLogTable';

const HealthLogs = () => {
  const [babyId, setBabyId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('illness');
  const { healthLogs, loading, error, addHealthLog } = useHealthLogsData(babyId);

  const handleAddLog = async (logData) => {
    try {
      await addHealthLog(logData);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add health log:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Health Logs</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Baby
        </label>
        <select
          value={babyId}
          onChange={(e) => setBabyId(e.target.value)}
          className="w-full md:w-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Choose a baby...</option>
          <option value="baby1">Rose Baby</option>
          <option value="baby2">Tom</option>
        </select>
      </div>

      {babyId && (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('illness')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'illness'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Illness Records
                </button>
                <button
                  onClick={() => setActiveTab('medication')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'medication'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Medication Records
                </button>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {showForm ? 'Cancel' : 'Add Record'}
              </button>
            </div>

            {showForm && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <HealthLogForm
                  onSubmit={handleAddLog}
                  babyId={babyId}
                  type={activeTab}
                />
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              {activeTab === 'illness' ? 'Illness History' : 'Medication History'}
            </h3>
            <HealthLogTable 
              records={healthLogs.filter(log => log.type === activeTab)} 
              loading={loading} 
              type={activeTab}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default HealthLogs;
