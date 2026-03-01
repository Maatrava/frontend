import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Check } from 'lucide-react';
import { babyAPI, vaccinationAPI } from '../services/api';

const VaccinationTracker = () => {
  const navigate = useNavigate();
  const [babies, setBabies] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);

  useEffect(() => {
    fetchBabies();
  }, []);

  useEffect(() => {
    if (selectedBaby) {
      fetchVaccinations(selectedBaby.babyId);
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

  const fetchVaccinations = async (babyId) => {
    try {
      const response = await vaccinationAPI.getByBabyId(babyId);
      setVaccinations(response.data);
    } catch (error) {
      console.error('Error fetching vaccinations:', error);
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
        <h1 className="text-2xl font-bold">Vaccination Tracker</h1>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Vaccination Schedule
        </h2>
        
        {vaccinations.length > 0 ? (
          <div className="space-y-3">
            {vaccinations.map((vaccination) => (
              <div key={vaccination._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium">{vaccination.vaccineName}</h3>
                  <p className="text-sm text-gray-600">Due: {new Date(vaccination.dueDate).toLocaleDateString()}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  vaccination.status === 'Completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {vaccination.status === 'Completed' && <Check className="w-4 h-4 inline mr-1" />}
                  {vaccination.status}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-2" />
            <p>No vaccination records found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaccinationTracker;
