"use client"
import { fetchCmsContent } from '@/utils/cmsApi';
import { useQuery } from '@tanstack/react-query';

interface DynamicContentProps {
  componentName: string;
  fieldName: string;
  defaultContent?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const DynamicContent = ({ 
  componentName, 
  fieldName, 
  defaultContent = '', 
  className = '',
  as: Component = 'div'
}: DynamicContentProps) => {
  const { data: cmsData, isLoading: loading } = useQuery({
    queryKey: ['cms-content', componentName],
    queryFn: () => fetchCmsContent(componentName),
  });

  if (loading) {
    return <Component className={className}>{defaultContent}</Component>;
  }

  const fieldData = cmsData?.success && cmsData?.data 
    ? cmsData.data.find((item: any) => item.fieldName === fieldName)
    : null;
  
  const content = fieldData ? fieldData.contentValue : defaultContent;

  // If content looks like HTML, render it as such
  if (typeof content === 'string' && (content.includes('<') && content.includes('>'))) {
    return (
      <Component 
        className={className}
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  }

  return <Component className={className}>{content}</Component>;
};

export default DynamicContent;
