"use client"
import { useState, useEffect, useRef } from 'react';
import { fetchCmsPage, updateCmsPage } from '@/utils/cmsApi';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ClassicEditor from './ClassicEditor';

// Function to update CMS page with file uploads
const updateCmsPageWithFiles = async (slug: string, formData: FormData) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/api/cms/${slug}`, {
    method: 'POST',
    headers: {
      // Don't set Content-Type header when using FormData
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update CMS page');
  }
  
  return response.json();
};

interface CmsComponentEditorProps {
  slug: string;
  title: string;
}

const CmsComponentEditor = ({ slug, title: defaultTitle }: CmsComponentEditorProps) => {
  const queryClient = useQueryClient();
  const [pageTitle, setPageTitle] = useState(defaultTitle);
  const [content, setContent] = useState('');
  const [primaryImage, setPrimaryImage] = useState('');
  const [secondaryImage, setSecondaryImage] = useState('');
  const [directorMsg, setDirectorMsg] = useState('');
  const [directorName, setDirectorName] = useState('');
  
  // State for about-specific fields
  const [aboutSubtitle, setAboutSubtitle] = useState('');
  const [aboutDesc1, setAboutDesc1] = useState('');
  const [aboutTitle1, setAboutTitle1] = useState('');
  const [aboutTitle2, setAboutTitle2] = useState('');
  const [aboutDesc2, setAboutDesc2] = useState('');
  const [aboutDesc3, setAboutDesc3] = useState('');
  const [aboutMission, setAboutMission] = useState('');
  

  const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);
  const [secondaryImageFile, setSecondaryImageFile] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState('');
  const [secondaryImagePreview, setSecondaryImagePreview] = useState('');
  const primaryImageInputRef = useRef<HTMLInputElement>(null);
  const secondaryImageInputRef = useRef<HTMLInputElement>(null);

  // Use React Query to fetch content
  const { data: pageData, isLoading: loading } = useQuery({
    queryKey: ['cms-page', slug],
    queryFn: () => fetchCmsPage(slug),
  });

  // Use React Query Mutation for saving
  const mutation = useMutation({
    mutationFn: async (data: { title: string, content: string, primaryImage?: string, secondaryImage?: string, directorMsg?: string, directorName?: string, aboutSubtitle?: string, aboutDesc1?: string, aboutTitle1?: string, aboutTitle2?: string, aboutDesc2?: string, aboutDesc3?: string, aboutMission?: string }) => {
      // Create FormData to handle file uploads
      const formData = new FormData();
      
      // Add text fields
      formData.append('title', data.title);
      formData.append('content', data.content);
      
      // Add new director fields
      if (data.directorMsg) {
        formData.append('directorMsg', data.directorMsg);
      }
      if (data.directorName) {
        formData.append('directorName', data.directorName);
      }
      
      // Add about-specific fields if this is the about-us page
      if (slug === 'about-us') {
        if (data.aboutSubtitle) {
          formData.append('aboutSubtitle', data.aboutSubtitle);
        }
        if (data.aboutDesc1) {
          formData.append('aboutDesc1', data.aboutDesc1);
        }
        if (data.aboutTitle1) {
          formData.append('aboutTitle1', data.aboutTitle1);
        }
        if (data.aboutTitle2) {
          formData.append('aboutTitle2', data.aboutTitle2);
        }
        if (data.aboutDesc2) {
          formData.append('aboutDesc2', data.aboutDesc2);
        }
        if (data.aboutDesc3) {
          formData.append('aboutDesc3', data.aboutDesc3);
        }
        if (data.aboutMission) {
          formData.append('aboutMission', data.aboutMission);
        }
      }
      
      // Add image files if they exist
      if (primaryImageFile) {
        formData.append('primaryImage', primaryImageFile);
      }
      if (secondaryImageFile) {
        formData.append('secondaryImage', secondaryImageFile);
      }
      
      // Add fallback URLs if no file is selected
      if (!primaryImageFile && data.primaryImage) {
        formData.append('primaryImage', data.primaryImage);
      }
      if (!secondaryImageFile && data.secondaryImage) {
        formData.append('secondaryImage', data.secondaryImage);
      }
      
      return updateCmsPageWithFiles(slug, formData);
    },
    onSuccess: () => {
      toast.success('Page content updated successfully');
      queryClient.invalidateQueries({ queryKey: ['cms-page', slug] });
      // Clear file states after successful upload
      setPrimaryImageFile(null);
      setSecondaryImageFile(null);
      setPrimaryImagePreview('');
      setSecondaryImagePreview('');
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
      setPrimaryImage(pageData.primaryImage || '');
      setSecondaryImage(pageData.secondaryImage || '');
      setDirectorMsg(pageData.directorMsg || '');
      setDirectorName(pageData.directorName || '');
      
      // Set about-specific fields if this is the about-us page
      if (slug === 'about-us') {
        setAboutSubtitle(pageData.aboutSubtitle || '');
        setAboutDesc1(pageData.aboutDesc1 || '');
        setAboutTitle1(pageData.aboutTitle1 || '');
        setAboutTitle2(pageData.aboutTitle2 || '');
        setAboutDesc2(pageData.aboutDesc2 || '');
        setAboutDesc3(pageData.aboutDesc3 || '');
        setAboutMission(pageData.aboutMission || '');
      }
    }
  }, [pageData, defaultTitle]);

  // Handle primary image file selection
  const handlePrimaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPrimaryImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrimaryImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle secondary image file selection
  const handleSecondaryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSecondaryImageFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setSecondaryImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input clicks
  const triggerPrimaryImageUpload = () => {
    if (primaryImageInputRef.current) {
      primaryImageInputRef.current.click();
    }
  };

  const triggerSecondaryImageUpload = () => {
    if (secondaryImageInputRef.current) {
      secondaryImageInputRef.current.click();
    }
  };

  const handleSave = () => {
    const baseData = { title: pageTitle, content, primaryImage, secondaryImage, directorMsg, directorName };
    
    // Add about-specific fields if this is the about-us page
    if (slug === 'about-us') {
      mutation.mutate({ 
        ...baseData,
        aboutSubtitle,
        aboutDesc1,
        aboutTitle1,
        aboutTitle2,
        aboutDesc2,
        aboutDesc3,
        aboutMission
      });
    } else {
      mutation.mutate(baseData);
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
      {slug !== 'about-us' && (
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
      )}
      
      {slug !== 'about-us' && (
        <div className="mb-4">
          <label className="form-label fw-bold">Page Content</label>
          <ClassicEditor 
            value={content}
            onChange={setContent}
            placeholder="Start formatting your content here..."
          />
        </div>
      )}

      <div className="mb-4">
        <label className="form-label fw-bold">Primary Image</label>
        <div 
          className="border border-2 border-dashed rounded p-4 text-center cursor-pointer bg-light mt-2"
          style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={triggerPrimaryImageUpload}
        >
          {primaryImagePreview ? (
            <img 
              src={primaryImagePreview} 
              alt="Primary Preview" 
              className="img-fluid rounded" 
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div>
              <i className="bi bi-cloud-upload fs-1 text-muted"></i>
              <p className="mb-0 mt-2">Click to upload</p>
              <small className="text-muted">or drag and drop</small>
            </div>
          )}
        </div>
        <input
          type="file"
          ref={primaryImageInputRef}
          onChange={handlePrimaryImageChange}
          className="d-none"
          accept="image/*"
        />
        {primaryImagePreview && (
          <div className="mt-2">
            <button 
              type="button" 
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                setPrimaryImageFile(null);
                setPrimaryImagePreview('');
                if (primaryImageInputRef.current) {
                  primaryImageInputRef.current.value = '';
                }
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {slug === 'about-us' && (
        <div className="about-us-fields">
          <div className="mb-4">
            <label className="form-label fw-bold">Main Title</label>
            <input 
              type="text" 
              className="form-control" 
              value={aboutTitle1}
              onChange={(e) => setAboutTitle1(e.target.value)}
              placeholder="Enter first title (e.g. Secure your family's Dream home.)"
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Main Description</label>
            <textarea 
              className="form-control" 
              rows={3}
              value={aboutDesc1}
              onChange={(e) => setAboutDesc1(e.target.value)}
              placeholder="Enter first description"
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Sub Title</label>
            <input 
              type="text" 
              className="form-control" 
              value={aboutTitle2}
              onChange={(e) => setAboutTitle2(e.target.value)}
              placeholder="Enter second title (e.g. Who we are?)"
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Sub Description</label>
            <textarea 
              className="form-control" 
              rows={3}
              value={aboutDesc2}
              onChange={(e) => setAboutDesc2(e.target.value)}
              placeholder="Enter second description"
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Mission Title</label>
            <input 
              type="text" 
              className="form-control" 
              value={aboutMission}
              onChange={(e) => setAboutMission(e.target.value)}
              placeholder="Enter mission title (e.g. Our Mission)"
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-bold">Mission Description</label>
            <textarea 
              className="form-control" 
              rows={3}
              value={aboutDesc3}
              onChange={(e) => setAboutDesc3(e.target.value)}
              placeholder="Enter mission description"
            />
          </div>
        </div>
      )}

      {slug === 'city-builder' && (
        <>
          <div className="mb-4">
            <label className="form-label fw-bold">Director Message</label>
            <textarea 
              className="form-control"
              rows={3}
              value={directorMsg}
              onChange={(e) => setDirectorMsg(e.target.value)}
              placeholder="Enter director's message"
            />
            <div className="form-text">The message from the director that appears on the city builders page</div>
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-bold">Director Name</label>
            <input 
              type="text" 
              className="form-control" 
              value={directorName}
              onChange={(e) => setDirectorName(e.target.value)}
              placeholder="Enter director's name"
            />
            <div className="form-text">Name and title of the director</div>
          </div>
        </>
      )}
      
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
