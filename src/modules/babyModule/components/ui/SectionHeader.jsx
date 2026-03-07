import React from 'react';

const SectionHeader = ({ 
  title, 
  subtitle, 
  action,
  className = '' 
}) => {
  return (
    <div className={`flex justify-between items-center mb-lg ${className}`}>
      <div>
        <h2 className="text-section-title text-dark mb-xs">
          {title}
        </h2>
        {subtitle && (
          <p className="text-body text-light">
            {subtitle}
          </p>
        )}
      </div>
      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
