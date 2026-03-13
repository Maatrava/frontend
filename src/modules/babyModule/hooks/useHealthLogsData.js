import { useState, useEffect } from 'react';

export const useHealthLogsData = (babyId) => {
  const [healthLogs, setHealthLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!babyId) return;

    const fetchHealthLogs = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Dummy health logs
        const dummyLogs = [
          {
            _id: '1',
            type: 'illness',
            illnessType: 'Common Cold',
            symptoms: ['Runny nose', 'Cough'],
            severity: 'Mild',
            startDate: '2024-02-01',
            endDate: '2024-02-05',
            treatment: 'Rest and fluids'
          },
          {
            _id: '2',
            type: 'medication',
            medicationName: 'Vitamin D Drops',
            dosage: '1 drop daily',
            startDate: '2024-01-15',
            endDate: null,
            isActive: true
          }
        ];
        
        await new Promise(resolve => setTimeout(resolve, 800));
        setHealthLogs(dummyLogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthLogs();
  }, [babyId]);

  const addHealthLog = async (logData) => {
    try {
      setLoading(true);
      setError('');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newLog = {
        _id: Date.now().toString(),
        ...logData
      };
      
      setHealthLogs(prev => [...prev, newLog]);
      return newLog;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { healthLogs, loading, error, addHealthLog };
};
