import React from 'react';

const GrowthTable = ({ records, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  // Dummy growth records
  const dummyRecords = [
    { date: '2024-01-15', weight: 3.5, height: 50, headCircumference: 34.2 },
    { date: '2024-02-15', weight: 4.2, height: 54, headCircumference: 35.8 },
    { date: '2024-03-15', weight: 5.1, height: 58, headCircumference: 37.1 },
    { date: '2024-04-15', weight: 5.8, height: 61, headCircumference: 38.2 },
    { date: '2024-05-15', weight: 6.5, height: 64, headCircumference: 39.1 },
    { date: '2024-06-15', weight: 7.2, height: 67, headCircumference: 39.8 }
  ];

  const data = records.length > 0 ? records : dummyRecords;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Weight (kg)</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Height (cm)</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Head Circ. (cm)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4">
                {new Date(record.date).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 font-medium">{record.weight}</td>
              <td className="py-3 px-4 font-medium">{record.height}</td>
              <td className="py-3 px-4">{record.headCircumference || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GrowthTable;
