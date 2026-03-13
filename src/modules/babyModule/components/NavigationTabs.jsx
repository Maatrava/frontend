import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Plus, TrendingUp, Syringe, Activity, Download } from 'lucide-react';

const NavigationTabs = ({ tabs, activeTab, setActiveTab }) => {
  const location = useLocation();

  const getIcon = (label) => {
    const iconMap = {
      'Dashboard': Home,
      'Add Baby': Plus,
      'Growth': TrendingUp,
      'Vaccination': Syringe,
      'Health Logs': Activity,
      'Reports': Download
    };
    return iconMap[label] || Home;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-1">
      <div className="flex flex-wrap gap-2 py-2">
        {tabs.map(tab => {
          const Icon = getIcon(tab.label);
          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                location.pathname === tab.path
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-rose-600 hover:bg-rose-50 hover:text-rose-900'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationTabs;
