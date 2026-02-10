"use client";

import { useState, useEffect, useRef } from 'react';
import { fetchCmsPage, updateCmsPage } from '@/utils/cmsApi';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ClassicEditor from './ClassicEditor';
import apiInstance from '@/utils/apiInstance';

// Function to update CMS page with file uploads
const updateCmsPageWithFiles = async (slug: string, formData: FormData) => {
  const response = await apiInstance.post(`/cms/${slug}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

const ContactPageEditor = () => {
  const queryClient = useQueryClient();  
  const [primaryImage, setPrimaryImage] = useState('');
  const [secondaryImage, setSecondaryImage] = useState('');
  
  // State for contact page fields
  const [contactTitle, setContactTitle] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [googleMapEmbedUrl, setGoogleMapEmbedUrl] = useState('');
  
  // State for social media links
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  
  const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);
  const [secondaryImageFile, setSecondaryImageFile] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState('');
  const [secondaryImagePreview, setSecondaryImagePreview] = useState('');
  const primaryImageInputRef = useRef<HTMLInputElement>(null);
  const secondaryImageInputRef = useRef<HTMLInputElement>(null);

  // Use React Query to fetch content
  const { data: pageData, isLoading: loading } = useQuery({
    queryKey: ['cms-page', 'contact'],
    queryFn: () => fetchCmsPage('contact'),
  });

  // Use React Query Mutation for saving
  const mutation = useMutation({
    mutationFn: async (data: { 
        primaryImage?: string, 
        secondaryImage?: string, 
        contactTitle?: string, 
        contactAddress?: string, 
        contactPhone?: string, 
        contactEmail?: string, 
        googleMapEmbedUrl?: string, 
        facebookLink?: string, 
        instagramLink?: string, 
        youtubeLink?: string }) => {

      // Create FormData to handle file uploads
      const formData = new FormData();     
     
      // Add contact page fields
      if (data.contactTitle) {
        formData.append('contactTitle', data.contactTitle);
      }
      if (data.contactAddress) {
        formData.append('contactAddress', data.contactAddress);
      }
      if (data.contactPhone) {
        formData.append('contactPhone', data.contactPhone);
      }
      if (data.contactEmail) {
        formData.append('contactEmail', data.contactEmail);
      }
      if (data.googleMapEmbedUrl) {
        formData.append('googleMapEmbedUrl', data.googleMapEmbedUrl);
      }
      
      // Add social media link fields
      if (data.facebookLink) {
        formData.append('facebookLink', data.facebookLink);
      }
      if (data.instagramLink) {
        formData.append('instagramLink', data.instagramLink);
      }
      if (data.youtubeLink) {
        formData.append('youtubeLink', data.youtubeLink);
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
      
      return updateCmsPageWithFiles('contact', formData);
    },
    onSuccess: () => {
      toast.success('Page content updated successfully');
      queryClient.invalidateQueries({ queryKey: ['cms-page', 'contact'] });
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
      setPrimaryImage(pageData.primaryImage || '');
      setSecondaryImage(pageData.secondaryImage || '');
      
      // Set contact page fields
      setContactTitle(pageData.contactTitle || '');
      setContactAddress(pageData.contactAddress || '');
      setContactPhone(pageData.contactPhone || '');
      setContactEmail(pageData.contactEmail || '');
      setGoogleMapEmbedUrl(pageData.googleMapEmbedUrl || '');
      
      // Set social media links
      setFacebookLink(pageData.facebookLink || '');
      setInstagramLink(pageData.instagramLink || '');
      setYoutubeLink(pageData.youtubeLink || '');
    }
  }, [pageData]);

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
    mutation.mutate({     
      primaryImage, 
      secondaryImage,
      contactTitle,
      contactAddress,
      contactPhone,
      contactEmail,
      googleMapEmbedUrl,
      facebookLink,
      instagramLink,
      youtubeLink
    });
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

      <div className="contact-page-fields mt-4 p-4 bg-light rounded-3 border">
        <h5 className="mb-3">Contact Page Settings</h5>
        <p className="text-muted small mb-4">Configure the contact page content below.</p>
        
        <div className="mb-4">
          <label className="form-label fw-bold">Contact Title / Message</label>
          <input 
            type="text" 
            className="form-control" 
            value={contactTitle}
            onChange={(e) => setContactTitle(e.target.value)}
            placeholder="e.g., Questions? Feel Free to Reach Out Via Message."
          />
          <div className="form-text">The main heading/message for the contact page</div>
        </div>
        
        <div className="mb-4">
          <label className="form-label fw-bold">Address</label>
          <textarea 
            className="form-control" 
            rows={2}
            value={contactAddress}
            onChange={(e) => setContactAddress(e.target.value)}
            placeholder="Enter your business address"
          />
        </div>
        
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Phone Number</label>
            <input 
              type="text" 
              className="form-control" 
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="+1 234 567 8900"
            />
          </div>
          
          <div className="col-md-6 mb-3">
            <label className="form-label fw-bold">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="contact@example.com"
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="form-label fw-bold">Google Maps Embed URL</label>
          <textarea 
            className="form-control" 
            rows={3}
            value={googleMapEmbedUrl}
            onChange={(e) => setGoogleMapEmbedUrl(e.target.value)}
            placeholder='<iframe src="https://www.google.com/maps/embed?..."></iframe>'
          />
          <div className="form-text">Paste the embed URL or iframe code from Google Maps</div>
        </div>
      </div>

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

      <div className="mb-4">
        <label className="form-label fw-bold">Secondary Image</label>
        <div 
          className="border border-2 border-dashed rounded p-4 text-center cursor-pointer bg-light mt-2"
          style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={triggerSecondaryImageUpload}
        >
          {secondaryImagePreview ? (
            <img 
              src={secondaryImagePreview} 
              alt="Secondary Preview" 
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
          ref={secondaryImageInputRef}
          onChange={handleSecondaryImageChange}
          className="d-none"
          accept="image/*"
        />
        {secondaryImagePreview && (
          <div className="mt-2">
            <button 
              type="button" 
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                setSecondaryImageFile(null);
                setSecondaryImagePreview('');
                if (secondaryImageInputRef.current) {
                  secondaryImageInputRef.current.value = '';
                }
              }}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-light rounded-3 border">
        <h5 className="mb-3">Social Media Links</h5>
        <p className="text-muted small mb-4">Add your social media profile links. Leave empty to hide the icon.</p>
        
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">
              <i className="bi bi-facebook text-primary me-2"></i>Facebook
            </label>
            <input 
              type="url" 
              className="form-control" 
              value={facebookLink}
              onChange={(e) => setFacebookLink(e.target.value)}
              placeholder="https://facebook.com/yourpage"
            />
          </div>
          
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">
              <i className="bi bi-instagram text-danger me-2"></i>Instagram
            </label>
            <input 
              type="url" 
              className="form-control" 
              value={instagramLink}
              onChange={(e) => setInstagramLink(e.target.value)}
              placeholder="https://instagram.com/yourpage"
            />
          </div>
          
          <div className="col-md-4 mb-3">
            <label className="form-label fw-bold">
              <i className="bi bi-youtube text-danger me-2"></i>YouTube
            </label>
            <input 
              type="url" 
              className="form-control" 
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="https://youtube.com/yourchannel"
            />
          </div>
        </div>
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

export default ContactPageEditor;