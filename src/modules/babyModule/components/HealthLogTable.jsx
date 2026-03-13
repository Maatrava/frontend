import React from 'react';

const HealthLogTable = ({ records, loading, type }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  // Dummy health logs
  const dummyIllnessRecords = [
    {
      illnessType: 'Common Cold',
      symptoms: ['Runny nose', 'Cough', 'Sneezing'],
      severity: 'Mild',
      startDate: '2024-02-01',
      endDate: '2024-02-05',
      treatment: 'Rest and fluids',
      notes: 'Recovered well'
    },
    {
      illnessType: 'Fever',
      symptoms: ['High temperature', 'Irritability'],
      severity: 'Moderate',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      treatment: 'Acetaminophen',
      notes: 'Fever resolved in 2 days'
    }
  ];

  const dummyMedicationRecords = [
    {
      medicationName: 'Vitamin D Drops',
      dosage: '1 drop daily',
      startDate: '2024-01-15',
      endDate: null,
      prescribedBy: 'Dr. Smith',
      purpose: 'Vitamin supplementation',
      isActive: true
    },
    {
      medicationName: 'Acetaminophen',
      dosage: '2.5ml as needed',
      startDate: '2024-03-10',
      endDate: '2024-03-12',
      prescribedBy: 'Dr. Smith',
      purpose: 'Fever reduction',
      isActive: false
    }
  ];

  const data = type === 'illness' ? dummyIllnessRecords : dummyMedicationRecords;

  if (type === 'illness') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Illness</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Symptoms</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Severity</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{record.illnessType}</td>
                <td className="py-3 px-4">{record.symptoms.join(', ')}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    record.severity === 'Mild' 
                      ? 'bg-green-100 text-green-800'
                      : record.severity === 'Moderate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {record.severity}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {new Date(record.startDate).toLocaleDateString()} - 
                  {record.endDate ? new Date(record.endDate).toLocaleDateString() : 'Present'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Medication</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Dosage</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium">{record.medicationName}</td>
              <td className="py-3 px-4">{record.dosage}</td>
              <td className="py-3 px-4">
                {new Date(record.startDate).toLocaleDateString()} - 
                {record.endDate ? new Date(record.endDate).toLocaleDateString() : 'Present'}
              </td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  record.isActive 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {record.isActive ? 'Active' : 'Completed'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HealthLogTable;
