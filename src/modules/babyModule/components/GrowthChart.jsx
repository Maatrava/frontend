import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGrowthData } from '../hooks/useGrowthData';
import { TrendingUp, Activity, BarChart3 } from 'lucide-react';

const GrowthChart = ({ babyId }) => {
  const { growthRecords, loading } = useGrowthData(babyId);
  const [chartType, setChartType] = useState('both');

  if (loading) {
    return (
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="animate-pulse">
          <div className="h-48 sm:h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Dummy data for Rose Baby and Tom
  const dummyData = babyId === 'baby1' ? [
    { date: 'Jan', weight: 3.5, height: 50 },
    { date: 'Feb', weight: 4.2, height: 54 },
    { date: 'Mar', weight: 5.1, height: 58 },
    { date: 'Apr', weight: 5.8, height: 61 },
    { date: 'May', weight: 6.5, height: 64 },
    { date: 'Jun', weight: 7.2, height: 67 }
  ] : [
    { date: 'Sep', weight: 3.8, height: 52 },
    { date: 'Oct', weight: 4.5, height: 56 },
    { date: 'Nov', weight: 5.2, height: 59 },
    { date: 'Dec', weight: 5.9, height: 62 },
    { date: 'Jan', weight: 6.6, height: 65 },
    { date: 'Feb', weight: 7.3, height: 68 }
  ];

  const data = growthRecords.length > 0 ? growthRecords : dummyData;

  // Custom tooltip for better mobile display
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 text-sm">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.dataKey === 'weight' ? ' kg' : ' cm'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
      {/* Header with responsive layout */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-3 sm:space-y-0">
        <h3 className="text-lg font-semibold text-gray-900">Growth Chart</h3>
        
        {/* Chart type buttons - responsive */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setChartType('weight')}
            className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
              chartType === 'weight' 
                ? 'bg-rose-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span className="hidden xs:inline">Weight</span>
            <span className="xs:hidden">W</span>
          </button>
          <button
            onClick={() => setChartType('height')}
            className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
              chartType === 'height' 
                ? 'bg-rose-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="hidden xs:inline">Height</span>
            <span className="xs:hidden">H</span>
          </button>
          <button
            onClick={() => setChartType('both')}
            className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
              chartType === 'both' 
                ? 'bg-rose-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="hidden xs:inline">Both</span>
            <span className="xs:hidden">B</span>
          </button>
        </div>
      </div>

      {/* Chart container - responsive height */}
      <div className="w-full h-48 sm:h-64 md:h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f0f0f0" 
              className="opacity-50"
            />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{
                fontSize: '12px',
                paddingTop: '10px'
              }}
              iconSize={12}
            />
            {(chartType === 'weight' || chartType === 'both') && (
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#f43f5e" 
                strokeWidth={2}
                dot={{ fill: '#f43f5e', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Weight (kg)"
              />
            )}
            {(chartType === 'height' || chartType === 'both') && (
              <Line 
                type="monotone" 
                dataKey="height" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Height (cm)"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Stats cards - responsive grid */}
      <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
        <div className="bg-rose-50 p-3 sm:p-4 rounded-lg border border-rose-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-rose-600 font-medium">Current Weight</p>
              <p className="text-lg sm:text-xl font-bold text-rose-900">
                {data[data.length - 1]?.weight || 7.2} kg
              </p>
            </div>
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-rose-500" />
          </div>
          <div className="mt-2">
            <p className="text-xs text-rose-600">
              +{((data[data.length - 1]?.weight || 7.2) - (data[0]?.weight || 3.5)).toFixed(1)} kg from birth
            </p>
          </div>
        </div>
        
        <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-green-600 font-medium">Current Height</p>
              <p className="text-lg sm:text-xl font-bold text-green-900">
                {data[data.length - 1]?.height || 67} cm
              </p>
            </div>
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
          </div>
          <div className="mt-2">
            <p className="text-xs text-green-600">
              +{((data[data.length - 1]?.height || 67) - (data[0]?.height || 50)).toFixed(1)} cm from birth
            </p>
          </div>
        </div>
      </div>

      {/* Growth summary - mobile friendly */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs sm:text-sm text-gray-600">
          <span className="font-medium">Growth Summary:</span> 
          {data.length > 1 && (
            <span className="ml-1">
              Average monthly weight gain: {((data[data.length - 1]?.weight - data[0]?.weight) / (data.length - 1)).toFixed(2)} kg,
              height gain: {((data[data.length - 1]?.height - data[0]?.height) / (data.length - 1)).toFixed(2)} cm
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default GrowthChart;
