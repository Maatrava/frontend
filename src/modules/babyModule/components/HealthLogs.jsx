import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Activity, Plus } from 'lucide-react';
import { babyAPI, illnessAPI } from '../services/api';

const HealthLogs = () => {
  const navigate = useNavigate();
  const [babies, setBabies] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [healthLogs, setHealthLogs] = useState([]);

  useEffect(() => {
    fetchBabies();
  }, []);

  useEffect(() => {
    if (selectedBaby) {
      fetchHealthLogs(selectedBaby.babyId);
    }
  }, [selectedBaby]);

  const fetchBabies = async () => {
    try {
      const response = await babyAPI.getAll('MOTHER123');
      setBabies(response.data);
      if (response.data.length > 0) {
        setSelectedBaby(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching babies:', error);
    }
  };

  const fetchHealthLogs = async (babyId) => {
    try {
      const response = await illnessAPI.getByBabyId(babyId);
      setHealthLogs(response.data);
    } catch (error) {
      console.error('Error fetching health logs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => navigate('/baby')}
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Health Logs</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Health Records
          </h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Log
          </button>
        </div>
        
        {healthLogs.length > 0 ? (
          <div className="space-y-3">
            {healthLogs.map((log) => (
              <div key={log._id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{log.illnessName}</h3>
                    <p className="text-sm text-gray-600">Date: {new Date(log.date).toLocaleDateString()}</p>
                    {log.notes && <p className="text-sm text-gray-500 mt-1">{log.notes}</p>}
                  </div>
                  <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                    Illness
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-2" />
            <p>No health logs found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthLogs;
