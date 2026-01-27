"use client"
import { fetchCmsPage } from '@/utils/cmsApi';
import { useQuery } from '@tanstack/react-query';

interface DynamicContentProps {
  slug: string;
  type?: 'title' | 'content';
  defaultContent?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const DynamicContent = ({ 
  slug, 
  type = 'content',
  defaultContent = '', 
  className = '',
  as: Component = 'div'
}: DynamicContentProps) => {
  const { data: pageData, isLoading: loading } = useQuery({
    queryKey: ['cms-page', slug],
    queryFn: () => fetchCmsPage(slug),
  });

  if (loading) {
    return <Component className={className}>{defaultContent}</Component>;
  }

  const content = pageData ? pageData[type] : defaultContent;
  
  if (!content) return <Component className={className}>{defaultContent}</Component>;

  // If content is HTML (from Classic Editor), render it safely
  if (type === 'content') {
    return (
      <div 
        className={`cms-dynamic-content ${className}`}
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  }

  return <Component className={className}>{content}</Component>;
};

export default DynamicContent;
