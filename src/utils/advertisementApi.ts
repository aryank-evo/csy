import apiInstance from './apiInstance';

// Advertisement API functions
export const advertisementApi = {
  // Get all advertisements (admin only)
  getAll: async () => {
    try {
      const response = await apiInstance.get('/advertisements');
      return response.data;
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      throw error;
    }
  },

  // Get active advertisements (public)
  getActive: async () => {
    try {
      const response = await apiInstance.get('/advertisements/active');
      return response.data;
    } catch (error) {
      console.error('Error fetching active advertisements:', error);
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

  // Create new advertisement (admin only)
  create: async (data: {
    name: string;
    youtubeUrl?: string;
    isActive?: boolean;
    position?: string;
  }) => {
    try {
      const response = await apiInstance.post('/advertisements', data);
      return response.data;
    } catch (error) {
      console.error('Error creating advertisement:', error);
      throw error;
    }
  },

  // Update advertisement (admin only)
  update: async (id: number, data: {
    name?: string;
    youtubeUrl?: string;
    isActive?: boolean;
    position?: string;
  }) => {
    try {
      const response = await apiInstance.put(`/advertisements/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating advertisement:', error);
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