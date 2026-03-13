// Growth Records API Service
const API_BASE_URL = 'http://localhost:5000/api';

export const growthService = {
  // Get growth records for a baby
  getGrowthRecords: async (babyId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/growthrecords?babyId=${babyId}`);
      if (!response.ok) throw new Error('Failed to fetch growth records');
      return await response.json();
    } catch (error) {
      console.error('Error fetching growth records:', error);
      throw error;
    }
  },

  // Add growth record
  addGrowthRecord: async (recordData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/growthrecords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      });
      if (!response.ok) throw new Error('Failed to add growth record');
      return await response.json();
    } catch (error) {
      console.error('Error adding growth record:', error);
      throw error;
    }
  },

  // Update growth record
  updateGrowthRecord: async (recordId, recordData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/growthrecords/${recordId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      });
      if (!response.ok) throw new Error('Failed to update growth record');
      return await response.json();
    } catch (error) {
      console.error('Error updating growth record:', error);
      throw error;
    }
  },

  // Delete growth record
  deleteGrowthRecord: async (recordId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/growthrecords/${recordId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete growth record');
      return await response.json();
    } catch (error) {
      console.error('Error deleting growth record:', error);
      throw error;
    }
  }
};
