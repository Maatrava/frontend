import { useState } from 'react';
import { babyService } from '../services/babyService';

export const useBabyOperations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const createBaby = async (babyData) => {
    try {
      setLoading(true);
      setError('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Baby created:', babyData);
      return { success: true, data: { ...babyData, _id: Date.now().toString() } };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBaby = async (babyId, babyData) => {
    try {
      setLoading(true);
      setError('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Baby updated:', babyId, babyData);
      return { success: true, data: { ...babyData, _id: babyId } };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteBaby = async (babyId) => {
    try {
      setLoading(true);
      setError('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Baby deleted:', babyId);
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createBaby, updateBaby, deleteBaby, loading, error };
};
