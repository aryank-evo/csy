"use client"
import { fetchCmsPage } from '@/utils/cmsApi';
import { useQuery } from '@tanstack/react-query';
import { ElementType } from 'react';
import Image from 'next/image';
interface DynamicContentServerProps {
  slug: string;
  type: string;
  defaultContent?: string;
  className?: string;
  as?: ElementType;
  [key: string]: any;
}

const DynamicContentServer = ({ 
  slug, 
  type, 
  defaultContent = '', 
  className = '',
  as: Component = 'div',
  ...props
}: DynamicContentServerProps) => {
  const { data: pageData, isLoading, error } = useQuery({
    queryKey: ['cms-page', slug],
    queryFn: () => {
      console.log(`Fetching CMS page for slug: ${slug}`);
      return fetchCmsPage(slug);
    },
  });

  if (error) {
    console.error(`Error fetching CMS page for slug ${slug}:`, error);
  }

  if (isLoading) {
    // Show loading state
    if (type === 'primaryImage' || type === 'secondaryImage') {
      return <Image src={defaultContent} alt="" className={className} {...props} />;
    }
    return <Component className={className}>{defaultContent}</Component>;
  }

  const content = pageData ? (pageData as Record<string, any>)[type] : defaultContent;
  
  if (!content) {
    if (type === 'primaryImage' || type === 'secondaryImage') {
      return <Image src={defaultContent} alt="" className={className} {...props} />;
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
    if (!content) {
      // If no image content, render nothing or a placeholder
      return null;
    }
    return <Image src={content} alt="" className={className} {...props} />;
  }

  // For director message or name types, render it as text
  if (type === 'directorMsg' || type === 'directorName') {
    return <Component className={className}>{content}</Component>;
  }

  // For about-specific types, render as text
  if (type === 'aboutSubtitle' || type === 'aboutDesc1' || type === 'aboutTitle1' || 
      type === 'aboutTitle2' || type === 'aboutDesc2' || type === 'aboutDesc3' || type === 'aboutMission') {
    return <Component className={className}>{content}</Component>;
  }

  return <Component className={className}>{content}</Component>;
};

export default DynamicContentServer;