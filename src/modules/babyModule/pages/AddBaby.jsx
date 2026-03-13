import React, { useState } from 'react';
import { useBabyOperations } from '../hooks/useBabyOperations';
import BabyForm from '../components/BabyForm';

const AddBaby = () => {
  const { createBaby, loading, error } = useBabyOperations();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (babyData) => {
    try {
      await createBaby(babyData);
      setSuccess(true);
    } catch (err) {
      console.error('Failed to create baby:', err);
    }
  };

  if (success) {
    return (
      <div className="p-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-green-800 font-medium">Baby Profile Created</h3>
              <p className="text-green-600 text-sm mt-1">
                The baby profile has been successfully created.
              </p>
            </div>
          </div>
          <button
            onClick={() => setSuccess(false)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Add Another Baby
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Baby</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        <BabyForm 
          onSubmit={handleSubmit} 
          loading={loading}
          submitText="Create Baby Profile"
        />
      </div>
    </div>
  );
};

export default AddBaby;
