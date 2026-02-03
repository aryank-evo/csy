import axios from 'axios';

const getBaseURL = () => {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';
  return base.endsWith('/api') ? base : `${base}/api`;
};

// Public API instance - no auth headers
const publicApiInstance = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LeadData {
  name: string;
  phone: string;
  address: string;
  email?: string | null;
  description: string;
  propertyId?: number | string | null;
  propertyTitle?: string | null;
  propertyPrice?: string | null;
  propertyLocation?: string | null;
  propertyType?: string | null;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const leadApi = {
  createLead: async (data: LeadData): Promise<LeadResponse> => {
    try {
      const response = await publicApiInstance.post("/lead", data);
      return response.data;
    } catch (error: any) {
      console.error("Lead API error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to create lead",
      };
    }
  },

  getLeads: async (): Promise<any[]> => {
    try {
      const response = await publicApiInstance.get("/lead");
      return response.data.data || [];
    } catch (error) {
      console.error("Get leads error:", error);
      return [];
    }
  },

  getLeadById: async (id: number): Promise<any> => {
    try {
      const response = await publicApiInstance.get(`/lead/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Get lead by ID error:", error);
      return null;
    }
  },
};