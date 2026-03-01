import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { babyAPI } from '../services/api';

const HealthReports = () => {
  const navigate = useNavigate();
  const [babies, setBabies] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState(null);

  useEffect(() => {
    fetchBabies();
  }, []);

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

  const generateReport = () => {
    // Placeholder for report generation
    alert('Report generation feature coming soon!');
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
        <h1 className="text-2xl font-bold">Health Reports</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Baby Selection */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Select Baby</h2>
          <div className="space-y-2">
            {babies.map((baby) => (
              <div 
                key={baby.babyId}
                onClick={() => setSelectedBaby(baby)}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedBaby?.babyId === baby.babyId 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-medium">{baby.babyName}</h3>
                <p className="text-sm text-gray-600">Blood Group: {baby.bloodGroup}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Report Types */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Available Reports</h2>
          <div className="space-y-3">
            <button className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-medium">Growth Report</h3>
                    <p className="text-sm text-gray-600">Weight and height progress</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </div>
            </button>
            
            <button className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="font-medium">Vaccination Report</h3>
                    <p className="text-sm text-gray-600">Immunization history</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </div>
            </button>
            
            <button className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div>
                    <h3 className="font-medium">Health Summary</h3>
                    <p className="text-sm text-gray-600">Complete health overview</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {selectedBaby && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-900">Generate Report for {selectedBaby.babyName}</h3>
              <p className="text-sm text-blue-700">Download comprehensive health report</p>
            </div>
            <button 
              onClick={generateReport}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthReports;
