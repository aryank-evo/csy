import apiInstance from "./apiInstance";

export const fetchCmsContent = async (componentName: string) => {
  const response = await apiInstance.get(`/cms/${componentName}`);
  return response.data;
};

export const updateCmsContent = async (componentName: string, fields: any[]) => {
  const response = await apiInstance.post(`/cms/${componentName}`, { fields });
  return response.data;
};
