import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const FloatingActionButton = ({ to = '/logs', className = '' }) => {
  return (
    <Link
      to={to}
      className={`fixed bottom-20 right-6 w-14 h-14 bg-pink rounded-full flex items-center justify-center shadow-lg transition hover:scale-105 ${className}`}
      style={{
        boxShadow: '0 4px 12px rgba(244, 124, 168, 0.3)'
      }}
    >
      <Plus className="icon-xl text-white" />
    </Link>
  );
};

export default FloatingActionButton;
