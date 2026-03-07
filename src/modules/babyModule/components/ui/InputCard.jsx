import React from 'react';
import Card from './Card';

const InputCard = ({ 
  label, 
  value, 
  placeholder, 
  type = 'text',
  icon: Icon,
  onChange,
  className = '',
  ...props 
}) => {
  return (
    <Card className={className}>
      <div className="flex items-center gap-md">
        {Icon && <Icon className="icon-md text-light" />}
        <div className="flex-1">
          <label className="text-label block mb-sm text-light">
            {label}
          </label>
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="input"
            {...props}
          />
        </div>
      </div>
    </Card>
  );
};

export default InputCard;
