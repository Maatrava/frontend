import React from 'react';
import { Syringe, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const VaccinationSchedule = ({ babyId }) => {
  // Dummy vaccination data
  const vaccinations = [
    {
      _id: '1',
      vaccineName: 'BCG',
      vaccineType: 'Routine',
      administeredDate: '2024-01-15',
      nextDoseDate: null,
      status: 'completed',
      notes: 'Given at birth'
    },
    {
      _id: '2',
      vaccineName: 'Hepatitis B',
      vaccineType: 'Routine',
      administeredDate: '2024-01-15',
      nextDoseDate: '2024-02-15',
      status: 'completed',
      notes: 'First dose'
    },
    {
      _id: '3',
      vaccineName: 'DTP',
      vaccineType: 'Routine',
      administeredDate: null,
      nextDoseDate: '2024-03-15',
      status: 'scheduled',
      notes: 'First dose due'
    },
    {
      _id: '4',
      vaccineName: 'Polio',
      vaccineType: 'Routine',
      administeredDate: null,
      nextDoseDate: '2024-04-15',
      status: 'upcoming',
      notes: 'First dose'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'scheduled':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'upcoming':
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default:
        return <Syringe className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'scheduled':
        return 'bg-yellow-50 border-yellow-200';
      case 'upcoming':
        return 'bg-gray-50 border-gray-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'scheduled':
        return 'bg-yellow-500 text-white';
      case 'upcoming':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Vaccination Schedule</h3>
      
      <div className="space-y-3">
        {vaccinations.map(vaccine => (
          <div
            key={vaccine._id}
            className={`p-4 rounded-lg border transition-all hover:shadow-sm ${
              getStatusColor(vaccine.status)
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getStatusIcon(vaccine.status)}
                <div>
                  <h4 className="font-medium text-gray-900">{vaccine.vaccineName}</h4>
                  <p className="text-sm text-gray-600">{vaccine.vaccineType}</p>
                  {vaccine.administeredDate && (
                    <p className="text-sm text-gray-500">
                      Given: {new Date(vaccine.administeredDate).toLocaleDateString()}
                    </p>
                  )}
                  {vaccine.nextDoseDate && (
                    <p className="text-sm text-gray-500">
                      Next dose: {new Date(vaccine.nextDoseDate).toLocaleDateString()}
                    </p>
                  )}
                  {vaccine.notes && (
                    <p className="text-sm text-gray-500 mt-1">{vaccine.notes}</p>
                  )}
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                getStatusBadge(vaccine.status)
              }`}>
                {vaccine.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Completed</span>
          <span className="font-medium text-green-600">
            {vaccinations.filter(v => v.status === 'completed').length}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600">Scheduled</span>
          <span className="font-medium text-yellow-600">
            {vaccinations.filter(v => v.status === 'scheduled').length}
          </span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-gray-600">Upcoming</span>
          <span className="font-medium text-gray-600">
            {vaccinations.filter(v => v.status === 'upcoming').length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VaccinationSchedule;
