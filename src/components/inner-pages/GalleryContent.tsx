'use client';

import { useState, useEffect } from 'react';
import apiInstance from '@/utils/apiInstance';
import { useQuery } from '@tanstack/react-query';
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";

interface GallerySection {
  id: number;
  heading: string;
  description?: string;
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
          <div className="text-center mt-4">
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p className="text-muted">Coming Soon ....!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main>
      <BreadcrumbOne title="Gallery" sub_title="Our Gallery" style={false} />
      <div className="gallery-page pt-60 lg-pt-40 pb-60 lg-pb-40">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {sections.map((section) => {
              const validLinks = section.youtube_links.filter(link => link.trim());

              if (validLinks.length === 0) {
                return null;
              }

              return (
                <div key={section.id} className="gallery-section mb-70">

                  {/* Section Header */}
                  <div className="text-center mb-5">
                    <h2 className="fw-bold mb-3 h4">{section.heading}</h2>
                    {section.description && (
                      <p className="text-muted mx-auto fs-16 text-start" style={{ maxWidth: "700px" }}>
                        {section.description}
                      </p>
                    )}
                  </div>

                  {/* Videos Grid */}

                  {validLinks.map((link, linkIndex) => {
                    const embedUrl = extractYoutubeEmbedUrl(link);

                    return (
                      <div key={linkIndex} className="col">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 gallery-card">

                          <div className="ratio ratio-16x9">
                            <iframe
                              src={embedUrl}
                              title={`${section.heading} Video ${linkIndex + 1}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;
