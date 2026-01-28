"use client"
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface AdvertisementSettings {
  id?: number;
  iframe1_url: string;
  iframe2_url: string;
  iframe3_url: string;
}

const AdvertisementEditor = () => {
  const [advertisements, setAdvertisements] = useState<AdvertisementSettings>({
    iframe1_url: '',
    iframe2_url: '',
    iframe3_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Get auth token
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  // Load advertisement settings on component mount
  useEffect(() => {
    loadAdvertisements();
  }, []);

  const loadAdvertisements = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/api/advertisements`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.success && data.data && data.data.length > 0) {
        // Use the first advertisement record
        const ad = data.data[0];
        setAdvertisements({
          id: ad.id,
          iframe1_url: ad.iframe1_url || '',
          iframe2_url: ad.iframe2_url || '',
          iframe3_url: ad.iframe3_url || ''
        });
      }
    } catch (error) {
      console.error('Failed to load advertisements:', error);
      toast.error('Failed to load advertisements');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/api/advertisements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(advertisements)
      });

      if (response.ok) {
        toast.success('Advertisement links saved successfully');
        loadAdvertisements();
      } else {
        toast.error('Failed to save advertisement links');
      }
    } catch (error) {
      console.error('Failed to save advertisement:', error);
      toast.error('Failed to save advertisement links');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdvertisements(prev => ({
      ...prev,
      [name]: value
    }));
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="advertisement-editor">
      <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
        <h5 className="mb-4">Advertisement YouTube Links</h5>
        <p className="text-muted small mb-4">Enter the YouTube video links that will appear in the homepage advertisement section.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* YouTube Link 1 */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">YouTube Link 1</label>
                <input
                  type="url"
                  className="form-control"
                  name="iframe1_url"
                  value={advertisements.iframe1_url}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <div className="form-text">Paste the full YouTube video URL</div>
              </div>
              
              {/* Preview */}
              {advertisements.iframe1_url && (
                <div className="ratio ratio-16x9 rounded overflow-hidden mb-3">
                  <iframe
                    src={getYoutubeEmbedUrl(advertisements.iframe1_url)}
                    title="YouTube video preview 1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            {/* YouTube Link 2 */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">YouTube Link 2</label>
                <input
                  type="url"
                  className="form-control"
                  name="iframe2_url"
                  value={advertisements.iframe2_url}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <div className="form-text">Paste the full YouTube video URL</div>
              </div>
              
              {/* Preview */}
              {advertisements.iframe2_url && (
                <div className="ratio ratio-16x9 rounded overflow-hidden mb-3">
                  <iframe
                    src={getYoutubeEmbedUrl(advertisements.iframe2_url)}
                    title="YouTube video preview 2"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            {/* YouTube Link 3 */}
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold">YouTube Link 3</label>
                <input
                  type="url"
                  className="form-control"
                  name="iframe3_url"
                  value={advertisements.iframe3_url}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <div className="form-text">Paste the full YouTube video URL</div>
              </div>
              
              {/* Preview */}
              {advertisements.iframe3_url && (
                <div className="ratio ratio-16x9 rounded overflow-hidden mb-3">
                  <iframe
                    src={getYoutubeEmbedUrl(advertisements.iframe3_url)}
                    title="YouTube video preview 3"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Advertisement Links'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvertisementEditor;
