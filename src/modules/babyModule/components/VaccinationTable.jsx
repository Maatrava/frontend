import React from 'react';

const VaccinationTable = ({ records, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  // Dummy vaccination records
  const dummyRecords = [
    {
      vaccineName: 'BCG',
      administeredDate: '2024-01-15',
      nextDoseDate: null,
      status: 'completed',
      notes: 'Given at birth'
    },
    {
      vaccineName: 'Hepatitis B',
      administeredDate: '2024-01-15',
      nextDoseDate: '2024-02-15',
      status: 'completed',
      notes: 'First dose'
    },
    {
      vaccineName: 'DTP',
      administeredDate: null,
      nextDoseDate: '2024-03-15',
      status: 'scheduled',
      notes: 'First dose due'
    }
  ];

  const data = records.length > 0 ? records : dummyRecords;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Vaccine</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Given Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Next Dose</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{record.vaccineName}</td>
              <td className="py-3 px-4">
                {record.administeredDate 
                  ? new Date(record.administeredDate).toLocaleDateString()
                  : '-'
                }
              </td>
              <td className="py-3 px-4">
                {record.nextDoseDate 
                  ? new Date(record.nextDoseDate).toLocaleDateString()
                  : '-'
                }
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  record.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : record.status === 'scheduled'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VaccinationTable;
