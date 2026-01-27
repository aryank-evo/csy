"use client"
import { useState, useEffect } from 'react';
import { fetchCmsPage, updateCmsPage } from '@/utils/cmsApi';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ClassicEditor from './ClassicEditor';

interface CmsComponentEditorProps {
  slug: string;
  title: string;
}

const CmsComponentEditor = ({ slug, title: defaultTitle }: CmsComponentEditorProps) => {
  const queryClient = useQueryClient();
  const [pageTitle, setPageTitle] = useState(defaultTitle);
  const [content, setContent] = useState('');

  // Use React Query to fetch content
  const { data: pageData, isLoading: loading } = useQuery({
    queryKey: ['cms-page', slug],
    queryFn: () => fetchCmsPage(slug),
  });

  // Use React Query Mutation for saving
  const mutation = useMutation({
    mutationFn: (data: { title: string, content: string }) => updateCmsPage(slug, data),
    onSuccess: () => {
      toast.success('Page content updated successfully');
      queryClient.invalidateQueries({ queryKey: ['cms-page', slug] });
    },
    onError: (error: any) => {
      console.error('Error saving CMS content:', error);
      const message = error.response?.data?.error || 'Error saving content';
      toast.error(message);
    },
  });

  // Update local state when data is fetched
  useEffect(() => {
    if (pageData) {
      setPageTitle(pageData.title || defaultTitle);
      setContent(pageData.content || '');
    }
  }, [pageData, defaultTitle]);

  const handleSave = () => {
    mutation.mutate({ title: pageTitle, content });
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
      <div className="mb-4">
        <label className="form-label fw-bold">Page Title</label>
        <input 
          type="text" 
          className="form-control" 
          value={pageTitle}
          onChange={(e) => setPageTitle(e.target.value)}
          placeholder="Enter page title"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-bold">Page Content</label>
        <ClassicEditor 
          value={content}
          onChange={setContent}
          placeholder="Start formatting your content here..."
        />
      </div>
      
      <div className="mt-5 border-top pt-3">
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
          ) : 'Update Page Content'}
        </button>
      </div>
    </div>
  );
};

export default CmsComponentEditor;
