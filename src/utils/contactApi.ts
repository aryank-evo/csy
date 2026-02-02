import apiInstance from './apiInstance';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const contactApi = {
  // Send contact form data to backend
  send: async (data: ContactFormData): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiInstance.post('/contact/send', data);
      return response.data;
    } catch (error: any) {
      console.error('Error sending contact form:', error);
      throw new Error(
        error.response?.data?.message || 'Failed to send message. Please try again.'
      );
    }
  },

  // Test SMTP connection (for debugging)
  testSmtp: async (): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await apiInstance.get('/contact/test-smtp');
      return response.data;
    } catch (error: any) {
      console.error('SMTP test failed:', error);
      throw new Error(
        error.response?.data?.message || 'SMTP connection test failed.'
      );
    }
  },
};
