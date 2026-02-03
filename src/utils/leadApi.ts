import apiInstance from "./apiInstance";

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
      const response = await apiInstance.post("/leads", data);
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
      const response = await apiInstance.get("/leads");
      return response.data.data || [];
    } catch (error) {
      console.error("Get leads error:", error);
      return [];
    }
  },

  getLeadById: async (id: number): Promise<any> => {
    try {
      const response = await apiInstance.get(`/leads/${id}`);
      return response.data.data;
    } catch (error) {
      console.error("Get lead by ID error:", error);
      return null;
    }
  },
};