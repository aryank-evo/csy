import apiInstance from './apiInstance';

// Advertisement API functions
export const advertisementApi = {
  // Get all advertisements (public)
  getAll: async () => {
    try {
      const response = await apiInstance.get('/advertisements');
      return response.data;
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      throw error;
    }
  },

  // Get advertisement by ID (admin only)
  getById: async (id: number) => {
    try {
      const response = await apiInstance.get(`/advertisements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching advertisement:', error);
      throw error;
    }
  },

  // Create or update advertisement (admin only)
  save: async (data: {
    id?: number;
    iframe1_url?: string;
    iframe2_url?: string;
    iframe3_url?: string;
  }) => {
    try {
      const response = await apiInstance.post('/advertisements', data);
      return response.data;
    } catch (error) {
      console.error('Error saving advertisement:', error);
      throw error;
    }
  },

  // Delete advertisement (admin only)
  delete: async (id: number) => {
    try {
      const response = await apiInstance.delete(`/advertisements/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting advertisement:', error);
      throw error;
    }
  }
};
