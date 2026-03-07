import React from 'react';

const Card = ({ 
  children, 
  variant = 'default', 
  className = '', 
  onClick,
  ...props 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'pink':
        return 'card-pink';
      case 'yellow':
        return 'card-yellow';
      default:
        return '';
    }
  };

  const classes = [
    'card',
    getVariantClasses(),
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
