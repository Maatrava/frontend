import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Home, TrendingUp, Calendar, Download, Zap, Baby, Activity, Pill } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { babyAPI, growthAPI, vaccinationAPI } from '../services/api';

const BabyDashboard = () => {
  const navigate = useNavigate();
  const [babies, setBabies] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [growthData, setGrowthData] = useState([]);
  const [vaccinationData, setVaccinationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const motherId = 'MOTHER123';
      const babiesResponse = await babyAPI.getAll(motherId);
      const babiesList = babiesResponse.data;
      setBabies(babiesList);
      
      if (babiesList.length > 0) {
        const firstBaby = babiesList[0];
        setSelectedBaby(firstBaby);
        
        const [growthResponse, vaccinationResponse] = await Promise.all([
          growthAPI.getChart(firstBaby.babyId),
          vaccinationAPI.getByBabyId(firstBaby.babyId)
        ]);
        
        setGrowthData(growthResponse.data.weightData || []);
        setVaccinationData(vaccinationResponse.data || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const vaccinationStats = {
    completed: vaccinationData.filter(v => v.status === 'Completed').length,
    due: vaccinationData.filter(v => v.status === 'Due').length,
  };

  const pieData = [
    { name: 'Completed', value: vaccinationStats.completed, color: '#FADADD' },
    { name: 'Due', value: vaccinationStats.due, color: '#FFF6CC' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Baby Selector */}
      {babies.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Baby
          </label>
          <select 
            value={selectedBaby?.babyId || ''}
            onChange={(e) => {
              const baby = babies.find(b => b.babyId === e.target.value);
              setSelectedBaby(baby);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {babies.map(baby => (
              <option key={baby.babyId} value={baby.babyId}>
                {baby.babyName} - {baby.age || 'Age not specified'}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedBaby ? (
        <>
          {/* Baby Info Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedBaby.babyName}</h2>
                <p className="text-gray-600">{selectedBaby.age || 'Age not specified'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="text-lg font-semibold text-gray-900">{selectedBaby.bloodGroup}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-pink-100 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-600 text-sm font-medium">Total Vaccinations</p>
                  <p className="text-2xl font-bold text-pink-900">{vaccinationStats.completed + vaccinationStats.due}</p>
                </div>
                <Calendar className="w-8 h-8 text-pink-600" />
              </div>
            </div>
            
            <div className="bg-green-100 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-900">{vaccinationStats.completed}</p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-yellow-100 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Due</p>
                  <p className="text-2xl font-bold text-yellow-900">{vaccinationStats.due}</p>
                </div>
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Growth Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Trend</h3>
              {growthData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" stroke="#F47CA8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-500">
                  No growth data available
                </div>
              )}
            </div>

            {/* Vaccination Pie Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Vaccination Status</h3>
              {vaccinationStats.completed > 0 || vaccinationStats.due > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-500">
                  No vaccination data available
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/baby/growth')}
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg p-4 text-center transition-colors"
            >
              <TrendingUp className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Growth</span>
            </button>
            
            <button 
              onClick={() => navigate('/baby/vaccination')}
              className="bg-green-50 hover:bg-green-100 text-green-700 rounded-lg p-4 text-center transition-colors"
            >
              <Calendar className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Vaccination</span>
            </button>
            
            <button 
              onClick={() => navigate('/baby/health-logs')}
              className="bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg p-4 text-center transition-colors"
            >
              <Activity className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Health Logs</span>
            </button>
            
            <button 
              onClick={() => navigate('/baby/health-reports')}
              className="bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg p-4 text-center transition-colors"
            >
              <Download className="w-6 h-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Reports</span>
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <Baby className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Baby Records Found</h3>
          <p className="text-gray-600 mb-6">Start by adding your baby's information</p>
          <button 
            onClick={() => navigate('/baby/add-baby')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Add Baby
          </button>
        </div>
      )}
    </div>
  );
};

export default BabyDashboard;
