'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProperty } from '@/utils/api';

interface FormData {
  title: string;
  description: string;
  price: string;
  location: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  amenities: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  images: FileList | null;
}

interface BasePropertyFormProps {
  propertyType: string;
  propertyStatus: string;
  customFields?: JSX.Element;
}

const BasePropertyForm: React.FC<BasePropertyFormProps> = ({ 
  propertyType, 
  propertyStatus,
  customFields
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    location: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    propertyType: propertyType,
    bedrooms: '',
    bathrooms: '',
    area: '',
    amenities: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    images: null,
  });
  
  const [additionalFields, setAdditionalFields] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdditionalFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setAdditionalFields(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: e.target.files
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // Create form data object
      const propertyData = new FormData();
      
      // Basic fields
      propertyData.append('title', formData.title);
      propertyData.append('description', formData.description);
      propertyData.append('price', formData.price);
      propertyData.append('location', formData.location);
      propertyData.append('propertyStatus', propertyStatus);
      propertyData.append('approvalStatus', 'pending');
      propertyData.append('propertyType', propertyType);
      
      // Optional fields
      if (formData.address) propertyData.append('address', formData.address);
      if (formData.city) propertyData.append('city', formData.city);
      if (formData.state) propertyData.append('state', formData.state);
      if (formData.zipCode) propertyData.append('zipCode', formData.zipCode);
      if (formData.country) propertyData.append('country', formData.country);
      if (formData.bedrooms) propertyData.append('bedrooms', formData.bedrooms);
      if (formData.bathrooms) propertyData.append('bathrooms', formData.bathrooms);
      if (formData.area) propertyData.append('area', formData.area);
      if (formData.amenities) propertyData.append('amenities', formData.amenities);
      
      // Additional fields specific to property type
      Object.keys(additionalFields).forEach(key => {
        if (additionalFields[key] !== null && additionalFields[key] !== undefined) {
          propertyData.append(key, additionalFields[key].toString());
        }
      });
      
      // Contact information
      propertyData.append('contactName', formData.contactName);
      propertyData.append('contactEmail', formData.contactEmail);
      propertyData.append('contactPhone', formData.contactPhone);
      
      // Images
      if (formData.images) {
        for (let i = 0; i < formData.images.length; i++) {
          propertyData.append('images', formData.images[i]);
        }
      }

      // Submit the property
      await createProperty(propertyData);
      
      // Success message and redirect
      alert('Property listing submitted successfully! Awaiting admin approval.');
      router.push('/dashboard/properties-list');
    } catch (err) {
      console.error('Error submitting property:', err);
      setError('Failed to submit property. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container bg-white rounded shadow p-4">
      {error && (
        <div className="alert alert-danger mb-3">
          {error}
        </div>
      )}
      
      <p className="h4 fw-bold mb-4">
        Add {propertyStatus.charAt(0).toUpperCase() + propertyStatus.slice(1)} Property - {propertyType.toUpperCase()}
      </p>

      {/* Basic Information */}
      <div className="mb-4">
        <p className="h5 fw-semibold border-bottom pb-2">Basic Information</p>
        
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Property title"
            />
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="1"
              className="form-control"
              placeholder="Price"
            />
          </div>
        </div>
        
        <div className="mt-3">
          <label className="form-label">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="form-control"
            placeholder="Property description"
          ></textarea>
        </div>
        
        <div className="mt-3">
          <label className="form-label">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="form-control"
            placeholder="Property location"
          />
        </div>
      </div>

      {/* Location Details */}
      <div className="mb-4">
        <p className="h5 fw-semibold border-bottom pb-2">Location Details</p>
        
        <div className="row g-3">
          <div className="col-md-6 col-lg-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Street address"
            />
          </div>
          
          <div className="col-md-6 col-lg-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
              placeholder="City"
            />
          </div>
          
          <div className="col-md-6 col-lg-3">
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-control"
              placeholder="State"
            />
          </div>
          
          <div className="col-md-6 col-lg-3">
            <label className="form-label">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className="form-control"
              placeholder="ZIP/Postal code"
            />
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="mb-4">
        <p className="h5 fw-semibold border-bottom pb-2">Property Details</p>
        
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              min="0"
              className="form-control"
              placeholder="Number of bedrooms"
            />
          </div>
          
          <div className="col-md-4">
            <label className="form-label">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              min="0"
              className="form-control"
              placeholder="Number of bathrooms"
            />
          </div>
          
          <div className="col-md-4">
            <label className="form-label">Area (sq ft)</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              min="0"
              className="form-control"
              placeholder="Area in square feet"
            />
          </div>
        </div>
        
        <div className="mt-3">
          <label className="form-label">Amenities</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            className="form-control"
            placeholder="Comma separated list of amenities"
          />
          <p className="text-muted text-sm mt-1">Separate amenities with commas (e.g., WiFi, Parking, Gym)</p>
        </div>
      </div>

      {/* Custom Fields for Specific Property Types */}
      {customFields && (
        <div className="mb-4">
          <p className="h5 fw-semibold border-bottom pb-2">
            {propertyType.toUpperCase()} Specific Details
          </p>
          <div>
            {React.cloneElement(customFields, { 
              onChange: handleAdditionalFieldChange 
            })}
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className="mb-4">
        <p className="h5 fw-semibold border-bottom pb-2">Contact Information</p>
        
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Your Name *</label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter your name"
            />
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="col-md-6">
            <label className="form-label">Phone *</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
      </div>
      
      {/* Images Upload */}
      <div className="mb-4">
        <p className="h5 fw-semibold border-bottom pb-2">Images</p>
        <div className="d-flex align-items-center justify-content-center w-100">
          <label className="d-flex flex-column align-items-center justify-content-center w-100 border border-2 border-dashed rounded p-4 bg-light cursor-pointer">
            <div className="d-flex flex-column align-items-center justify-content-center py-3">
              <svg className="mb-3" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 13H18.5C19.6046 13 20.5 13.8954 20.5 15V18.5C20.5 19.6046 19.6046 20.5 18.5 20.5H5.5C4.39543 20.5 3.5 19.6046 3.5 18.5V15C3.5 13.8954 4.39543 13 5.5 13H11M13 13V9.5C13 8.11929 14.1193 7 15.5 7H17M13 13V7M17 7V13M17 7H15.5C14.1193 7 13 8.11929 13 9.5V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M7 13H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p className="mb-1 text-center"><span className="fw-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-muted text-xs mb-0">PNG, JPG, GIF (MAX. 5MB each)</p>
            </div>
            <input 
              type="file" 
              multiple 
              onChange={handleImageChange}
              className="d-none" 
            />
          </label>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-outline-secondary"
          disabled={submitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary"
        >
          {submitting ? 'Submitting...' : 'Submit Property'}
        </button>
      </div>
    </form>
  );
};

export default BasePropertyForm;