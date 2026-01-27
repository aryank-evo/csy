"use client"
import { fetchCmsPage } from '@/utils/cmsApi';
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
    queryKey: ['cms-page', componentName],
    queryFn: () => fetchCmsPage(componentName),
  });

  // For iframe content, we'll use the content field directly
  // In the future, this could be enhanced to support specific field extraction
  const src = cmsData?.content ? cmsData.content : defaultSrc;

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
