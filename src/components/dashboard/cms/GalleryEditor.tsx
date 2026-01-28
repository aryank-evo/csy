'use client';

import { useState, useEffect } from 'react';
import apiInstance from '@/utils/apiInstance';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface GallerySection {
  id: number;
  heading: string;
  description?: string;
  youtube_links: string[];
  order: number;
}

const GalleryEditor = () => {
  const queryClient = useQueryClient();
  const [sections, setSections] = useState<GallerySection[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const { data: gallerySections, isLoading } = useQuery({
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

  const createMutation = useMutation({
    mutationFn: async (data: { heading: string; description?: string; youtube_links: string[] }) => {
      const response = await apiInstance.post('/gallery', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Section added successfully');
      queryClient.invalidateQueries({ queryKey: ['gallery-sections'] });
      setSections([]);
      setEditingId(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to add section');
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { heading: string; description?: string; youtube_links: string[] } }) => {
      const response = await apiInstance.put(`/gallery/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Section updated successfully');
      queryClient.invalidateQueries({ queryKey: ['gallery-sections'] });
      setEditingId(null);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update section');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiInstance.delete(`/gallery/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Section deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['gallery-sections'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete section');
    }
  });

  const handleAddSection = () => {
    const newSection: GallerySection = {
      id: Date.now(),
      heading: '',
      description: '',
      youtube_links: [''],
      order: sections.length
    };
    setSections([...sections, newSection]);
    setEditingId(newSection.id);
  };

  const handleSaveSection = (section: GallerySection) => {
    if (!section.heading.trim()) {
      toast.error('Heading is required');
      return;
    }

    const links = section.youtube_links.filter(link => link.trim());

    if (sections.find(s => s.id === section.id && s.id > 1000)) {
      // New section
      createMutation.mutate({
        heading: section.heading,
        description: section.description,
        youtube_links: links
      });
    } else {
      // Existing section
      updateMutation.mutate({
        id: section.id,
        data: {
          heading: section.heading,
          description: section.description,
          youtube_links: links
        }
      });
    }
  };

  const handleDeleteSection = (id: number) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleHeadingChange = (id: number, value: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, heading: value } : s));
  };

  const handleDescriptionChange = (id: number, value: string) => {
    setSections(sections.map(s => s.id === id ? { ...s, description: value } : s));
  };

  const handleLinkChange = (sectionId: number, linkIndex: number, value: string) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        const links = [...s.youtube_links];
        links[linkIndex] = value;
        return { ...s, youtube_links: links };
      }
      return s;
    }));
  };

  const handleAddLink = (sectionId: number) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, youtube_links: [...s.youtube_links, ''] };
      }
      return s;
    }));
  };

  const handleRemoveLink = (sectionId: number, linkIndex: number) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          youtube_links: s.youtube_links.filter((_, i) => i !== linkIndex)
        };
      }
      return s;
    }));
  };

  if (isLoading) {
    return <div className="text-center py-5">Loading gallery sections...</div>;
  }

  return (
    <div className="gallery-editor">
      <div className="mb-4">
        <button
          onClick={handleAddSection}
          className="btn btn-primary"
          disabled={createMutation.isPending}
        >
          <i className="bi bi-plus-circle me-2"></i>Add New Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="alert alert-info">
          <i className="bi bi-info-circle me-2"></i>
          No gallery sections yet. Click "Add New Section" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section, idx) => (
            <div key={section.id} className="card border shadow-sm">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Section {idx + 1}</span>
                <div>
                  {editingId === section.id && section.id > 1000 && (
                    <>
                      <button
                        onClick={() => handleSaveSection(section)}
                        className="btn btn-sm btn-success me-2"
                        disabled={createMutation.isPending}
                      >
                        <i className="bi bi-check-circle me-1"></i>Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setSections(sections.filter(s => s.id !== section.id));
                        }}
                        className="btn btn-sm btn-secondary"
                      >
                        <i className="bi bi-x-circle me-1"></i>Cancel
                      </button>
                    </>
                  )}
                  {editingId === section.id && section.id <= 1000 && (
                    <>
                      <button
                        onClick={() => handleSaveSection(section)}
                        className="btn btn-sm btn-success me-2"
                        disabled={updateMutation.isPending}
                      >
                        <i className="bi bi-check-circle me-1"></i>Update
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="btn btn-sm btn-secondary"
                      >
                        <i className="bi bi-x-circle me-1"></i>Cancel
                      </button>
                    </>
                  )}
                  {editingId !== section.id && (
                    <>
                      <button
                        onClick={() => setEditingId(section.id)}
                        className="btn btn-sm btn-outline-primary me-2"
                      >
                        <i className="bi bi-pencil me-1"></i>Edit
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section.id)}
                        className="btn btn-sm btn-outline-danger"
                        disabled={deleteMutation.isPending}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="card-body">
                {editingId === section.id ? (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Section Heading</label>
                      <input
                        type="text"
                        className="form-control"
                        value={section.heading}
                        onChange={(e) => handleHeadingChange(section.id, e.target.value)}
                        placeholder="e.g., Properties for Sale"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Section Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={section.description || ''}
                        onChange={(e) => handleDescriptionChange(section.id, e.target.value)}
                        placeholder="Add a description for this gallery section..."
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">YouTube Links</label>
                      <div className="mb-2">
                        <small className="text-muted d-block mb-2">
                          Add YouTube video links (iFrame URLs or video IDs). You can add as many as you want.
                        </small>
                      </div>

                      {section.youtube_links.map((link, linkIdx) => (
                        <div key={linkIdx} className="input-group mb-2">
                          <input
                            type="text"
                            className="form-control"
                            value={link}
                            onChange={(e) => handleLinkChange(section.id, linkIdx, e.target.value)}
                            placeholder="https://www.youtube.com/embed/... or video ID"
                          />
                          <button
                            onClick={() => handleRemoveLink(section.id, linkIdx)}
                            className="btn btn-outline-danger"
                            type="button"
                            disabled={section.youtube_links.length === 1}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => handleAddLink(section.id)}
                        className="btn btn-sm btn-outline-secondary mt-2"
                      >
                        <i className="bi bi-plus-circle me-1"></i>Add Another Link
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="card-title mb-3">{section.heading}</h5>
                    {section.description && (
                      <p className="card-text mb-3 text-muted">{section.description}</p>
                    )}
                    <div>
                      <small className="text-muted">
                        <strong>YouTube Links:</strong> {section.youtube_links.filter(l => l.trim()).length} video(s)
                      </small>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GalleryEditor;
