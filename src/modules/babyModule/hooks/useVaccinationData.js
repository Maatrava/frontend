import { useState, useEffect } from 'react';

export const useVaccinationData = (babyId) => {
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!babyId) return;

    const fetchVaccinationRecords = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Dummy vaccination records
        const dummyRecords = [
          {
            _id: '1',
            vaccineName: 'BCG',
            vaccineType: 'Routine',
            administeredDate: '2024-01-15',
            nextDoseDate: null,
            status: 'completed',
            notes: 'Given at birth'
          },
          {
            _id: '2',
            vaccineName: 'Hepatitis B',
            vaccineType: 'Routine',
            administeredDate: '2024-01-15',
            nextDoseDate: '2024-02-15',
            status: 'completed',
            notes: 'First dose'
          },
          {
            _id: '3',
            vaccineName: 'DTP',
            vaccineType: 'Routine',
            administeredDate: null,
            nextDoseDate: '2024-03-15',
            status: 'scheduled',
            notes: 'First dose due'
          }
        ];
        
        await new Promise(resolve => setTimeout(resolve, 800));
        setVaccinationRecords(dummyRecords);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccinationRecords();
  }, [babyId]);

  const addVaccinationRecord = async (recordData) => {
    try {
      setLoading(true);
      setError('');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRecord = {
        _id: Date.now().toString(),
        ...recordData
      };
      
      setVaccinationRecords(prev => [...prev, newRecord]);
      return newRecord;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { vaccinationRecords, loading, error, addVaccinationRecord };
};
