'use client';

import { useState, useEffect } from 'react';
import apiInstance from '@/utils/apiInstance';
import { useQuery } from '@tanstack/react-query';

interface GallerySection {
  id: number;
  heading: string;
  youtube_links: string[];
  order: number;
}

const GalleryPage = () => {
  const [sections, setSections] = useState<GallerySection[]>([]);

  const { data: gallerySections, isLoading, isError } = useQuery({
    queryKey: ['gallery-sections'],
    queryFn: async () => {
      const response = await apiInstance.get('/gallery');
      return response.data.data || [];
    }
  });

  useEffect(() => {
    if (gallerySections) {
      setSections(gallerySections);
    }
  }, [gallerySections]);

  const extractYoutubeEmbedUrl = (input: string): string => {
    if (!input) return '';
    
    // If it's already an embed URL, return as is
    if (input.includes('embed')) {
      return input;
    }
    
    // If it's a full YouTube URL
    if (input.includes('youtube.com/watch')) {
      const videoId = new URL(input).searchParams.get('v');
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // If it's a youtu.be URL
    if (input.includes('youtu.be')) {
      const videoId = input.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // If it's just a video ID
    if (input.length === 11 && !input.includes('/')) {
      return `https://www.youtube.com/embed/${input}`;
    }
    
    return input;
  };

  if (isLoading) {
    return (
      <div className="pt-60 lg-pt-40 pb-60 lg-pb-40">
        <div className="container">
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || sections.length === 0) {
    return (
      <div className="pt-60 lg-pt-40 pb-60 lg-pb-40">
        <div className="container">
          <div className="text-center">
            <h2 className="text-muted">No gallery content available</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-page pt-60 lg-pt-40 pb-60 lg-pb-40">
      <div className="container">
        {sections.map((section) => {
          const validLinks = section.youtube_links.filter(link => link.trim());
          
          if (validLinks.length === 0) {
            return null;
          }

          return (
            <div key={section.id} className="gallery-section mb-60 lg-mb-40">
              {/* Section Heading */}
              <div className="section-title mb-40 lg-mb-30">
                <h2 className="text-capitalize">{section.heading}</h2>
              </div>

              {/* YouTube Videos Grid */}
              <div className="row g-4">
                {validLinks.map((link, linkIndex) => {
                  const embedUrl = extractYoutubeEmbedUrl(link);
                  return (
                    <div key={linkIndex} className="col-lg-4 col-md-6 col-sm-12">
                      <div className="video-wrapper" style={{ 
                        position: 'relative', 
                        paddingBottom: '56.25%', 
                        height: 0, 
                        overflow: 'hidden',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}>
                        <iframe
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            borderRadius: '8px'
                          }}
                          src={embedUrl}
                          title={`${section.heading} Video ${linkIndex + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryPage;
