// Vaccination Records API Service
const API_BASE_URL = 'http://localhost:5000/api';

export const vaccinationService = {
  // Get vaccination records for a baby
  getVaccinationRecords: async (babyId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vaccinationrecords?babyId=${babyId}`);
      if (!response.ok) throw new Error('Failed to fetch vaccination records');
      return await response.json();
    } catch (error) {
      console.error('Error fetching vaccination records:', error);
      throw error;
    }
  },

  // Add vaccination record
  addVaccinationRecord: async (recordData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/vaccinationrecords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      });
      if (!response.ok) throw new Error('Failed to add vaccination record');
      return await response.json();
    } catch (error) {
      console.error('Error adding vaccination record:', error);
      throw error;
    }
  }
};
