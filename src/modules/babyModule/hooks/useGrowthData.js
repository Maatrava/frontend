import { useState, useEffect } from 'react';
import { growthService } from '../services/growthService';

export const useGrowthData = (babyId) => {
  const [growthRecords, setGrowthRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!babyId) return;

    const fetchGrowthRecords = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Dummy growth records
        const dummyRecords = [
          { _id: '1', date: '2024-01-15', weight: 3.5, height: 50, headCircumference: 34.2 },
          { _id: '2', date: '2024-02-15', weight: 4.2, height: 54, headCircumference: 35.8 },
          { _id: '3', date: '2024-03-15', weight: 5.1, height: 58, headCircumference: 37.1 },
          { _id: '4', date: '2024-04-15', weight: 5.8, height: 61, headCircumference: 38.2 },
          { _id: '5', date: '2024-05-15', weight: 6.5, height: 64, headCircumference: 39.1 },
          { _id: '6', date: '2024-06-15', weight: 7.2, height: 67, headCircumference: 39.8 }
        ];
        
        await new Promise(resolve => setTimeout(resolve, 800));
        setGrowthRecords(dummyRecords);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrowthRecords();
  }, [babyId]);

  const addGrowthRecord = async (recordData) => {
    try {
      setLoading(true);
      setError('');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRecord = {
        _id: Date.now().toString(),
        ...recordData
      };
      
      setGrowthRecords(prev => [...prev, newRecord]);
      return newRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { growthRecords, loading, error, addGrowthRecord };
};
