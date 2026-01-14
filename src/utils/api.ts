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
    // Get token from wherever it's stored in your app (localStorage, context, etc.)
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    const response = await axios.post(`${API_BASE_URL}/properties`, propertyData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
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
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const response = await axios.get(`${API_BASE_URL}/properties`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting properties:', error);
    throw error;
  }
};
