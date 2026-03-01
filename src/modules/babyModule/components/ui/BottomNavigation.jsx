import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Calendar, FileText } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/growth', icon: TrendingUp, label: 'Growth' },
    { path: '/vaccinations', icon: Calendar, label: 'Vaccines' },
    { path: '/logs', icon: FileText, label: 'Logs' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
      <div className="container">
        <div className="flex justify-between items-center py-md">
          {/* Back Button */}
          <Link 
            to="/" 
            className="flex items-center gap-sm p-sm rounded-lg hover:bg-gray-50 transition"
          >
            <ArrowLeft className="icon-md text-dark" />
            <span className="text-body-medium text-dark">Back</span>
          </Link>

          {/* Navigation Items */}
          <div className="flex gap-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-xs transition ${
                    isActive 
                      ? 'text-primary' 
                      : 'text-light hover:text-dark'
                  }`}
                >
                  <Icon className="icon-md" />
                  <span className="text-xs font-medium hidden sm:block">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
