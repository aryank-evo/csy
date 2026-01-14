import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 


export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Property related API calls
export const createProperty = async (propertyData: FormData) => {
  try {
    // No authentication required for property submission
    const response = await axios.post(`${API_BASE_URL}/properties`, propertyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating property:', error);
    throw error;
  }
};

export const getProperties = async () => {
  try {
    // No authentication required to get approved properties
    const response = await axios.get(`${API_BASE_URL}/properties`, {});
    return response.data;
  } catch (error) {
    console.error('Error getting properties:', error);
    throw error;
  }
};

// Get pending properties for admin
export const getPendingProperties = async () => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const response = await axios.get(`${API_BASE_URL}/properties/pending/all`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting pending properties:', error);
    throw error;
  }
};

// Approve property
export const approveProperty = async (id: number) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const response = await axios.put(`${API_BASE_URL}/properties/${id}/approve`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error approving property:', error);
    throw error;
  }
};

// Reject property
export const rejectProperty = async (id: number) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const response = await axios.put(`${API_BASE_URL}/properties/${id}/reject`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error rejecting property:', error);
    throw error;
  }
};
