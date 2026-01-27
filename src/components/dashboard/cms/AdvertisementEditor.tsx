"use client"
import { useState, useEffect } from 'react';
import { advertisementApi } from '@/utils/advertisementApi';
import { toast } from 'sonner';

interface Advertisement {
  id: number;
  name: string;
  youtubeUrl: string;
  isActive: boolean;
  position: string;
  createdAt: string;
  updatedAt: string;
}

const AdvertisementEditor = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    youtubeUrl: '',
    isActive: true,
    position: ''
  });

  // Load advertisements on component mount
  useEffect(() => {
    loadAdvertisements();
  }, []);

  const loadAdvertisements = async () => {
    try {
      setLoading(true);
      const response = await advertisementApi.getAll();
      setAdvertisements(response.data || []);
    } catch (error) {
      console.error('Failed to load advertisements:', error);
      toast.error('Failed to load advertisements');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingId) {
        // Update existing advertisement
        await advertisementApi.update(editingId, formData);
        toast.success('Advertisement updated successfully');
      } else {
        // Create new advertisement
        await advertisementApi.create(formData);
        toast.success('Advertisement created successfully');
      }
      
      // Reset form and reload data
      setFormData({
        name: '',
        youtubeUrl: '',
        isActive: true,
        position: ''
      });
      setEditingId(null);
      loadAdvertisements();
    } catch (error) {
      console.error('Failed to save advertisement:', error);
      toast.error('Failed to save advertisement');
    }
  };

  const handleEdit = (ad: Advertisement) => {
    setEditingId(ad.id);
    setFormData({
      name: ad.name,
      youtubeUrl: ad.youtubeUrl || '',
      isActive: ad.isActive,
      position: ad.position || ''
    });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      try {
        await advertisementApi.delete(id);
        toast.success('Advertisement deleted successfully');
        loadAdvertisements();
      } catch (error) {
        console.error('Failed to delete advertisement:', error);
        toast.error('Failed to delete advertisement');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      name: '',
      youtubeUrl: '',
      isActive: true,
      position: ''
    });
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
      <div className="row">
        {/* Form Section */}
        <div className="col-lg-6">
          <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
            <h5 className="mb-4">{editingId ? 'Edit Advertisement' : 'Add New Advertisement'}</h5>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Advertisement Name *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter advertisement name"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">YouTube URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({...formData, youtubeUrl: e.target.value})}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                <div className="form-text">Paste the full YouTube video URL</div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Position/Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  placeholder="e.g., homepage-header, sidebar, footer"
                />
                <div className="form-text">Specify where this ad should appear</div>
              </div>

              <div className="mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    id="isActive"
                  />
                  <label className="form-check-label" htmlFor="isActive">
                    Active
                  </label>
                </div>
                <div className="form-text">Inactive ads won't be displayed on the website</div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Advertisement' : 'Add Advertisement'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <div className="col-lg-6">
          <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
            <h5 className="mb-4">Preview</h5>
            
            {formData.youtubeUrl ? (
              <div className="ratio ratio-16x9">
                <iframe
                  src={getYoutubeEmbedUrl(formData.youtubeUrl)}
                  title="YouTube video preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="bg-light border rounded p-4 text-center">
                <i className="bi bi-youtube fs-1 text-muted mb-2"></i>
                <p className="text-muted mb-0">Enter a YouTube URL to see preview</p>
              </div>
            )}
            
            <div className="mt-3">
              <h6 className="fw-bold">{formData.name || 'Advertisement Name'}</h6>
              <p className="text-muted small mb-0">
                {formData.position ? `Position: ${formData.position}` : 'No position specified'}
              </p>
              <span className={`badge ${formData.isActive ? 'bg-success' : 'bg-secondary'} mt-1`}>
                {formData.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Advertisements List */}
      <div className="bg-white rounded-3 shadow-sm p-4">
        <h5 className="mb-4">Existing Advertisements</h5>
        
        {advertisements.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-megaphone fs-1 text-muted mb-3"></i>
            <p className="text-muted">No advertisements found. Add your first advertisement above.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>YouTube URL</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {advertisements.map((ad) => (
                  <tr key={ad.id}>
                    <td>
                      <div className="fw-medium">{ad.name}</div>
                      <div className="small text-muted">
                        Created: {new Date(ad.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      {ad.youtubeUrl ? (
                        <a href={ad.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                          <i className="bi bi-youtube text-danger me-1"></i>
                          View on YouTube
                        </a>
                      ) : (
                        <span className="text-muted">No URL</span>
                      )}
                    </td>
                    <td>{ad.position || '-'}</td>
                    <td>
                      <span className={`badge ${ad.isActive ? 'bg-success' : 'bg-secondary'}`}>
                        {ad.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(ad)}
                        >
                          <i className="bi bi-pencil"></i> Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(ad.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvertisementEditor;