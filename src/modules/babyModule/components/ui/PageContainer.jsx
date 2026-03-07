import React from 'react';

const PageContainer = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`container ${className}`} {...props}>
      {children}
    </div>
  );
};

export default PageContainer;
