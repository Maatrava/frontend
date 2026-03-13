import { useState, useEffect } from 'react';
import { babyService } from '../services/babyService';

export const useBabyData = () => {
  const [babies, setBabies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBabies = async () => {
      try {
        setLoading(true);
        // Dummy data for Rose Baby
        const dummyBabies = [
          {
            _id: 'baby1',
            name: 'Rose Baby',
            dateOfBirth: '2024-01-15',
            gender: 'Female',
            weight: 3.5,
            height: 50,
            growthRecords: 6,
            vaccinations: 2
          },
          {
            _id: 'baby2',
            name: 'Tom',
            dateOfBirth: '2023-09-13',
            gender: 'Male',
            weight: 3.8,
            height: 52,
            growthRecords: 4,
            vaccinations: 1
          }
        ];
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setBabies(dummyBabies);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBabies();
  }, []);

  return { babies, loading, error };
};
