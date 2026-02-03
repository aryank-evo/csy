import apiInstance from "./apiInstance";

export interface CmsPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  primaryImage?: string;
  secondaryImage?: string;
  directorMsg?: string;
  directorName?: string;
  aboutSubtitle?: string;
  aboutDesc1?: string;
  aboutTitle1?: string;
  aboutTitle2?: string;
  aboutDesc2?: string;
  aboutDesc3?: string;
  aboutMission?: string;
  // Social media links
  facebookLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
  // Contact page fields
  contactTitle?: string;
  contactAddress?: string;
  contactPhone?: string;
  contactEmail?: string;
  googleMapEmbedUrl?: string;
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

export const updateCmsPage = async (slug: string, data: { title: string, content: string, primaryImage?: string, secondaryImage?: string, directorMsg?: string, directorName?: string, aboutSubtitle?: string, aboutDesc1?: string, aboutTitle1?: string, aboutTitle2?: string, aboutDesc2?: string, aboutDesc3?: string, aboutMission?: string }) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/api/cms/${slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update CMS page');
  }
  
  return response.json();
};
