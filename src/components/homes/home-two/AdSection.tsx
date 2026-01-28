"use client"
import React, { useState, useEffect } from 'react';

interface AdvertisementData {
  iframe1_url?: string;
  iframe2_url?: string;
  iframe3_url?: string;
}

const AdSection = () => {
  const [advertisements, setAdvertisements] = useState<AdvertisementData>({
    iframe1_url: '',
    iframe2_url: '',
    iframe3_url: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdvertisements();
  }, []);

  const loadAdvertisements = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/api/advertisements`);
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        const ad = data.data[0];
        setAdvertisements({
          iframe1_url: ad.iframe1_url || '',
          iframe2_url: ad.iframe2_url || '',
          iframe3_url: ad.iframe3_url || ''
        });
      }
    } catch (error) {
      console.error('Failed to load advertisements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getYoutubeEmbedUrl = (youtubeUrl: string) => {
    if (!youtubeUrl) return '';
    
    // Extract video ID from various YouTube URL formats
    const videoIdMatch = youtubeUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (videoIdMatch) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    return '';
  };

  // Build the ads array only with non-empty URLs
  const ads = [
    { url: advertisements.iframe1_url, label: 'Advertisement 1' },
    { url: advertisements.iframe2_url, label: 'Advertisement 2' },
    { url: advertisements.iframe3_url, label: 'Advertisement 3' }
  ].filter(ad => ad.url);

  if (loading) {
    return (
      <div className="ads-section ps-xl-4 md-mt-60">
        <div className="row g-4">
          <div className="col-12 text-center py-4">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return null; // Don't show the section if no advertisements
  }

  return (
    <div className="ads-section ps-xl-4 md-mt-60">
      <h4 className="mb-30 text-white font-garamond fst-italic mt-2">Also have a look ~</h4>
      <div className="row g-4">
        {ads.map((ad, index) => (
          <div key={index} className="col-12">
            <div className="ratio ratio-16x9 rounded overflow-hidden border border-light border-opacity-25 shadow-sm">
              <iframe
                src={getYoutubeEmbedUrl(ad.url || '')}
                title={ad.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdSection;
