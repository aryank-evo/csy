"use client"
import { fetchCmsPage } from '@/utils/cmsApi';
import { useQuery } from '@tanstack/react-query';

interface DynamicContentProps {
  slug: string;
  type?: 'title' | 'content' | 'primaryImage' | 'secondaryImage' | 'directorMsg' | 'directorName' | 'aboutSubtitle' | 'aboutDesc1' | 'aboutTitle1' | 'aboutTitle2' | 'aboutDesc2' | 'aboutDesc3' | 'aboutMission';
  defaultContent?: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any; // Allow additional props
}

const DynamicContent = ({ 
  slug, 
  type = 'content',
  defaultContent = '', 
  className = '',
  as: Component = 'div',
  ...props
}: DynamicContentProps) => {
  const { data: pageData, isLoading: loading } = useQuery({
    queryKey: ['cms-page', slug],
    queryFn: () => fetchCmsPage(slug),
  });

  if (loading) {
    // For image types, render img tag even during loading
    if (type === 'primaryImage' || type === 'secondaryImage') {
      return <img src={defaultContent} alt="" className={className} {...props} />;
    }
    // For director message or name types, render as text during loading
    if (type === 'directorMsg' || type === 'directorName') {
      return <Component className={className}>{defaultContent}</Component>;
    }
    return <Component className={className}>{defaultContent}</Component>;
  }

  const content = pageData ? (pageData as Record<string, any>)[type as string] : defaultContent;
  
  if (!content) {
    // For image types, render img tag with default content
    if (type === 'primaryImage' || type === 'secondaryImage') {
      return <img src={defaultContent} alt="" className={className} {...props} />;
    }
    return <Component className={className}>{defaultContent}</Component>;
  }

  // If content is HTML (from Classic Editor), render it safely
  if (type === 'content') {
    return (
      <div 
        className={`cms-dynamic-content ${className}`}
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    );
  }

  // If content is an image URL, render it as an img element
  if (type === 'primaryImage' || type === 'secondaryImage') {
    return <img src={content} alt="" className={className} {...props} />;
  }

  // For all text-based fields, render as text
  return <Component className={className}>{content}</Component>;
};

export default DynamicContent;
