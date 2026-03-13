// Baby API Service
const API_BASE_URL = 'http://localhost:5000/api';

export const babyService = {
  // Get all babies
  getAllBabies: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/babies`);
      if (!response.ok) throw new Error('Failed to fetch babies');
      return await response.json();
    } catch (error) {
      console.error('Error fetching babies:', error);
      throw error;
    }
  },

  // Get baby by ID
  getBabyById: async (babyId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/babies/${babyId}`);
      if (!response.ok) throw new Error('Failed to fetch baby');
      return await response.json();
    } catch (error) {
      console.error('Error fetching baby:', error);
      throw error;
    }
  },

  // Create new baby
  createBaby: async (babyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/babies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(babyData),
      });
      if (!response.ok) throw new Error('Failed to create baby');
      return await response.json();
    } catch (error) {
      console.error('Error creating baby:', error);
      throw error;
    }
  },

  // Update baby
  updateBaby: async (babyId, babyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/babies/${babyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(babyData),
      });
      if (!response.ok) throw new Error('Failed to update baby');
      return await response.json();
    } catch (error) {
      console.error('Error updating baby:', error);
      throw error;
    }
  },

  // Delete baby
  deleteBaby: async (babyId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/babies/${babyId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete baby');
      return await response.json();
    } catch (error) {
      console.error('Error deleting baby:', error);
      throw error;
    }
  }
};
