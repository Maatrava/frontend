import React from 'react';
import { Plus, Syringe, Activity, Download } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      label: 'Add Growth Record',
      description: 'Log new weight and height measurements',
      color: 'blue'
    },
    {
      icon: Syringe,
      label: 'Schedule Vaccination',
      description: 'Add upcoming vaccination appointments',
      color: 'green'
    },
    {
      icon: Activity,
      label: 'Log Health Event',
      description: 'Record illness or medication',
      color: 'yellow'
    },
    {
      icon: Download,
      label: 'Generate Report',
      description: 'Create health summary report',
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
            green: 'bg-green-50 text-green-600 hover:bg-green-100',
            yellow: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
            purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
          };

          return (
            <button
              key={index}
              className={`p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all text-left ${
                colorClasses[action.color]
              }`}
            >
              <Icon className="w-6 h-6 mb-2" />
              <h4 className="font-medium text-sm">{action.label}</h4>
              <p className="text-xs opacity-75 mt-1">{action.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
