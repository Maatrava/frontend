import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Save, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { babyAPI, growthAPI } from '../services/api';

const GrowthTracker = () => {
  const navigate = useNavigate();
  const [babies, setBabies] = useState([]);
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [growthRecords, setGrowthRecords] = useState([]);
  const [formData, setFormData] = useState({
    babyId: '',
    date: '',
    weight: '',
    height: '',
    headCircumference: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBabies();
  }, []);

  const fetchBabies = async () => {
    try {
      const response = await babyAPI.getAll('MOTHER123');
      setBabies(response.data);
      if (response.data.length > 0) {
        setSelectedBaby(response.data[0]);
        setFormData(prev => ({ ...prev, babyId: response.data[0].babyId }));
      }
    } catch (error) {
      console.error('Error fetching babies:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await growthAPI.create(formData);
      setFormData({
        babyId: selectedBaby?.babyId || '',
        date: '',
        weight: '',
        height: '',
        headCircumference: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error adding growth record:', error);
    } finally {
      setLoading(false);
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
        <h1 className="text-2xl font-bold">Growth Tracker</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Add Growth Record</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Add Record'}
            </button>
          </form>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Growth Chart</h2>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <Activity className="w-12 h-12 mb-2" />
            <p>No growth data available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthTracker;
