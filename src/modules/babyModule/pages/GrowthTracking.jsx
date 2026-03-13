import React, { useState } from 'react';
import { useGrowthData } from '../hooks/useGrowthData';
import GrowthChart from '../components/GrowthChart';
import GrowthForm from '../components/GrowthForm';
import GrowthTable from '../components/GrowthTable';

const GrowthTracking = () => {
  const [babyId, setBabyId] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { growthRecords, loading, error, addGrowthRecord } = useGrowthData(babyId);

  const handleAddRecord = async (recordData) => {
    try {
      await addGrowthRecord(recordData);
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add growth record:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Growth Tracking</h2>

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
              <h3 className="text-lg font-semibold">Growth Chart</h3>
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {showForm ? 'Cancel' : 'Add Measurement'}
              </button>
            </div>

            {showForm && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                <GrowthForm
                  onSubmit={handleAddRecord}
                  babyId={babyId}
                />
              </div>
            )}

            <GrowthChart babyId={babyId} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Growth History</h3>
            <GrowthTable records={growthRecords} loading={loading} />
          </div>
        </>
      )}
    </div>
  );
};

export default GrowthTracking;
