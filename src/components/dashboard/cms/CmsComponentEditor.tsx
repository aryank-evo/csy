"use client"
import { useState, useEffect } from 'react';
import { fetchCmsContent, updateCmsContent } from '@/utils/cmsApi';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface FieldConfig {
  name: string;
  type: 'text' | 'html' | 'link' | 'image' | 'iframe';
  label: string;
}

interface CmsComponentEditorProps {
  componentName: string;
  fields: FieldConfig[];
}

const CmsComponentEditor = ({ componentName, fields }: CmsComponentEditorProps) => {
  const queryClient = useQueryClient();
  const [localContent, setLocalContent] = useState<Record<string, string>>({});

  // Use React Query to fetch content
  const { data: cmsData, isLoading: loading } = useQuery({
    queryKey: ['cms-content', componentName],
    queryFn: () => fetchCmsContent(componentName),
  });

  // Use React Query Mutation for saving
  const mutation = useMutation({
    mutationFn: (fieldsToUpdate: any[]) => updateCmsContent(componentName, fieldsToUpdate),
    onSuccess: () => {
      toast.success('Content updated successfully');
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cms-content', componentName] });
    },
    onError: (error: any) => {
      console.error('Error saving CMS content:', error);
      const message = error.response?.data?.error || 'Error saving content';
      toast.error(message);
    },
  });

  // Update local state when data is fetched
  useEffect(() => {
    if (cmsData?.success && cmsData?.data) {
      const contentMap: Record<string, string> = {};
      cmsData.data.forEach((item: any) => {
        contentMap[item.fieldName] = item.contentValue || '';
      });
      setLocalContent(contentMap);
    }
  }, [cmsData]);

  const handleInputChange = (fieldName: string, value: string) => {
    setLocalContent(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSave = () => {
    const fieldsToUpdate = fields.map(field => ({
      fieldName: field.name,
      contentType: field.type,
      contentValue: localContent[field.name] || ''
    }));

    mutation.mutate(fieldsToUpdate);
  };

  const renderField = (field: FieldConfig) => {
    const value = localContent[field.name] || '';

    switch (field.type) {
      case 'html':
        return (
          <div className="mb-3">
            <label className="form-label fw-500">{field.label}</label>
            <textarea
              className="form-control"
              rows={5}
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder="Enter HTML or text content"
            />
          </div>
        );
      case 'iframe':
      case 'link':
        return (
          <div className="mb-3">
            <label className="form-label fw-500">{field.label}</label>
            <input
              type="url"
              className="form-control"
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        );
      default:
        return (
          <div className="mb-3">
            <label className="form-label fw-500">{field.label}</label>
            <input
              type="text"
              className="form-control"
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cms-editor bg-white p-4 rounded-3 shadow-sm mt-3">
      <div className="row">
        {fields.map((field, index) => (
          <div key={index} className="col-12">
            {renderField(field)}
          </div>
        ))}
      </div>
      
      <div className="mt-4 border-top pt-3">
        <button 
          className="btn btn-primary px-4 py-2"
          onClick={handleSave}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : 'Save Content'}
        </button>
      </div>
    </div>
  );
};

export default CmsComponentEditor;
