import apiInstance from "./apiInstance";

export interface CmsPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export const fetchAllCmsPages = async (): Promise<CmsPage[]> => {
  const response = await apiInstance.get('/cms');
  return response.data.data;
};

export const fetchCmsPage = async (slug: string): Promise<CmsPage> => {
  const response = await apiInstance.get(`/cms/${slug}`);
  return response.data.data;
};

export const updateCmsPage = async (slug: string, data: { title: string, content: string }) => {
  const response = await apiInstance.post(`/cms/${slug}`, data);
  return response.data;
};
