"use client"
import { fetchCmsContent } from '@/utils/cmsApi';
import { useQuery } from '@tanstack/react-query';

interface DynamicIframeProps {
  componentName: string;
  fieldName: string;
  defaultSrc: string;
  title: string;
  className?: string;
  allow?: string;
}

const DynamicIframe = ({ 
  componentName, 
  fieldName, 
  defaultSrc, 
  title,
  className = "",
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
}: DynamicIframeProps) => {
  const { data: cmsData, isLoading: loading } = useQuery({
    queryKey: ['cms-content', componentName],
    queryFn: () => fetchCmsContent(componentName),
  });

  const fieldData = cmsData?.success && cmsData?.data 
    ? cmsData.data.find((item: any) => item.fieldName === fieldName)
    : null;
  
  const src = fieldData && fieldData.contentValue ? fieldData.contentValue : defaultSrc;

  return (
    <iframe 
      src={src} 
      title={title}
      className={className}
      allow={allow}
      allowFullScreen
    ></iframe>
  );
};

export default DynamicIframe;
