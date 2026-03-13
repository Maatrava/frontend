import React, { useState } from 'react';
import { Calendar, Download } from 'lucide-react';

const ReportGenerator = ({ onGenerate, loading }) => {
  const [options, setOptions] = useState({
    startDate: '',
    endDate: '',
    includeCharts: true,
    includeTables: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(options);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="startDate"
              value={options.startDate}
              onChange={(e) => setOptions(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="endDate"
              value={options.endDate}
              onChange={(e) => setOptions(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.includeCharts}
            onChange={(e) => setOptions(prev => ({ ...prev, includeCharts: e.target.checked }))}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Include Charts</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={options.includeTables}
            onChange={(e) => setOptions(prev => ({ ...prev, includeTables: e.target.checked }))}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">Include Tables</span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          'Generating...'
        ) : (
          <>
            <Download className="w-5 h-5 mr-2" />
            Generate Report
          </>
        )}
      </button>
    </form>
  );
};

export default ReportGenerator;
