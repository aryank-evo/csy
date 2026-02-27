'use client';

import { useState, useRef, useEffect } from 'react';
import apiInstance from '@/utils/apiInstance';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
interface Country {
  id: number;
  name: string;
  thumbnail?: string;
  description?: string;
  is_active: boolean;
  display_order: number;
  createdAt: string;
  listings?: Listing[];
}

interface Listing {
  id: number;
  country_id: number;
  title: string;
  image?: string;
  link: string;
  is_active: boolean;
  display_order: number;
  createdAt: string;
}

const AbroadEditor = () => {
  const queryClient = useQueryClient();
  const [activeSection, setActiveSection] = useState<'countries' | 'listings'>('countries');
  const [isEditingCountry, setIsEditingCountry] = useState(false);
  const [isEditingListing, setIsEditingListing] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<Partial<Country> | null>(null);
  const [currentListing, setCurrentListing] = useState<Partial<Listing> | null>(null);
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
  const [expandedCountry, setExpandedCountry] = useState<number | null>(null);

  // Image refs
  const countryThumbnailInputRef = useRef<HTMLInputElement>(null);
  const listingImageInputRef = useRef<HTMLInputElement>(null);

  // Country image state
  const [countryThumbnailFile, setCountryThumbnailFile] = useState<File | null>(null);
  const [countryThumbnailPreview, setCountryThumbnailPreview] = useState('');

  // Listing image state
  const [listingImageFile, setListingImageFile] = useState<File | null>(null);
  const [listingImagePreview, setListingImagePreview] = useState('');

  // Fetch countries
  const { data: countries = [], isLoading: countriesLoading } = useQuery({
    queryKey: ['abroad-countries'],
    queryFn: async () => {
      const response = await apiInstance.get('/abroad/countries');
      return response.data.data || [];
    }
  });

  // Fetch listings (optionally filtered by country)
  const { data: listings = [], isLoading: listingsLoading } = useQuery({
    queryKey: ['abroad-listings', selectedCountryId],
    queryFn: async () => {
      const url = selectedCountryId 
        ? `/abroad/listings?country_id=${selectedCountryId}`
        : '/abroad/listings';
      const response = await apiInstance.get(url);
      return response.data.data || [];
    }
  });

  // Country mutation
  const countryMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (currentCountry?.id) {
        const response = await apiInstance.put(`/abroad/countries/${currentCountry.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      } else {
        const response = await apiInstance.post('/abroad/countries', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      }
    },
    onSuccess: () => {
      toast.success(currentCountry?.id ? 'Country updated successfully' : 'Country created successfully');
      queryClient.invalidateQueries({ queryKey: ['abroad-countries'] });
      queryClient.invalidateQueries({ queryKey: ['abroad-listings'] });
      resetCountryForm();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to save country');
    }
  });

  // Country delete mutation
  const countryDeleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiInstance.delete(`/abroad/countries/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Country deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['abroad-countries'] });
      queryClient.invalidateQueries({ queryKey: ['abroad-listings'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete country');
    }
  });

  // Listing mutation
  const listingMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (currentListing?.id) {
        const response = await apiInstance.put(`/abroad/listings/${currentListing.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      } else {
        const response = await apiInstance.post('/abroad/listings', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      }
    },
    onSuccess: () => {
      toast.success(currentListing?.id ? 'Listing updated successfully' : 'Listing created successfully');
      queryClient.invalidateQueries({ queryKey: ['abroad-listings'] });
      resetListingForm();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to save listing');
    }
  });

  // Listing delete mutation
  const listingDeleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiInstance.delete(`/abroad/listings/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Listing deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['abroad-listings'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete listing');
    }
  });

  // Country handlers
  const handleEditCountry = (country: Country) => {
    setCurrentCountry(country);
    setCountryThumbnailPreview(country.thumbnail || '');
    setIsEditingCountry(true);
  };

  const handleDeleteCountry = (id: number) => {
    if (window.confirm('Are you sure you want to delete this country? All listings under this country will also be deleted.')) {
      countryDeleteMutation.mutate(id);
    }
  };

  const resetCountryForm = () => {
    setCurrentCountry(null);
    setCountryThumbnailFile(null);
    setCountryThumbnailPreview('');
    setIsEditingCountry(false);
    if (countryThumbnailInputRef.current) countryThumbnailInputRef.current.value = '';
  };

  const handleCountryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCountryThumbnailFile(file);
      setCountryThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitCountry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCountry?.name) {
      toast.error('Country name is required');
      return;
    }

    const formData = new FormData();
    formData.append('name', currentCountry.name || '');
    formData.append('description', currentCountry.description || '');
    formData.append('is_active', String(currentCountry.is_active ?? true));
    formData.append('display_order', String(currentCountry.display_order || 0));

    if (countryThumbnailFile) {
      formData.append('thumbnail', countryThumbnailFile);
    }

    countryMutation.mutate(formData);
  };

  // Listing handlers
  const handleEditListing = (listing: Listing) => {
    setCurrentListing(listing);
    setListingImagePreview(listing.image || '');
    setIsEditingListing(true);
  };

  const handleDeleteListing = (id: number) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      listingDeleteMutation.mutate(id);
    }
  };

  const resetListingForm = () => {
    setCurrentListing(null);
    setListingImageFile(null);
    setListingImagePreview('');
    setIsEditingListing(false);
    if (listingImageInputRef.current) listingImageInputRef.current.value = '';
  };

  const handleListingFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setListingImageFile(file);
      setListingImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentListing?.country_id || !currentListing?.title || !currentListing?.link) {
      toast.error('Country, title, and link are required');
      return;
    }

    const formData = new FormData();
    formData.append('country_id', String(currentListing.country_id));
    formData.append('title', currentListing.title);
    formData.append('link', currentListing.link);
    formData.append('is_active', String(currentListing.is_active ?? true));
    formData.append('display_order', String(currentListing.display_order || 0));

    if (listingImageFile) {
      formData.append('image', listingImageFile);
    }

    listingMutation.mutate(formData);
  };

  const handleAddListing = (countryId: number) => {
    setCurrentListing({ country_id: countryId, is_active: true });
    setListingImagePreview('');
    setIsEditingListing(true);
  };

  if (countriesLoading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="abroad-editor">
      {/* Section Tabs */}
      <ul className="nav nav-tabs mb-4" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeSection === 'countries' ? 'active' : ''}`}
            onClick={() => setActiveSection('countries')}
          >
            Countries
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeSection === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveSection('listings')}
          >
            Listings
          </button>
        </li>
      </ul>

      {/* Countries Section */}
      {activeSection === 'countries' && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 fw-normal">
              {isEditingCountry 
                ? (currentCountry?.id ? 'Edit Country' : 'Add New Country') 
                : 'Manage Countries'}
            </h4>
            {!isEditingCountry && (
              <button className="btn btn-primary" onClick={() => setIsEditingCountry(true)}>
                <i className="bi bi-plus-circle me-2"></i>Add New Country
              </button>
            )}
          </div>

          {isEditingCountry ? (
            <div className="card border shadow-sm p-4 mb-5">
              <form onSubmit={handleSubmitCountry}>
                <div className="row">
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">Country Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentCountry?.name || ''}
                        onChange={(e) => setCurrentCountry({ ...currentCountry, name: e.target.value })}
                        placeholder="Enter country name"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">Description</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={currentCountry?.description || ''}
                        onChange={(e) => setCurrentCountry({ ...currentCountry, description: e.target.value })}
                        placeholder="Brief description"
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small d-block">Country Thumbnail</label>
                      <div 
                        className="image-upload-box border border-2 border-dashed rounded p-2 text-center bg-light cursor-pointer"
                        style={{ height: '150px', position: 'relative' }}
                        onClick={() => countryThumbnailInputRef.current?.click()}
                      >
                        {countryThumbnailPreview ? (
                          <Image src={countryThumbnailPreview} alt="Thumbnail" className="w-100 h-100 object-fit-cover rounded" />
                        ) : (
                          <div className="d-flex flex-column align-items-center justify-content-center h-100">
                            <i className="bi bi-image fs-2 text-muted"></i>
                            <small className="text-muted">Click to upload image</small>
                          </div>
                        )}
                      </div>
                      <input type="file" ref={countryThumbnailInputRef} className="d-none" accept="image/*" onChange={handleCountryFileChange} />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">Status</label>
                      <select
                        className="form-select"
                        value={currentCountry?.is_active ?? true ? 'active' : 'inactive'}
                        onChange={(e) => setCurrentCountry({ ...currentCountry, is_active: e.target.value === 'active' })}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">Display Order</label>
                      <input
                        type="number"
                        className="form-control"
                        value={currentCountry?.display_order || 0}
                        onChange={(e) => setCurrentCountry({ ...currentCountry, display_order: parseInt(e.target.value) || 0 })}
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4 pt-3 border-top">
                  <button type="submit" className="btn btn-primary px-4" disabled={countryMutation.isPending}>
                    {countryMutation.isPending ? 'Saving...' : currentCountry?.id ? 'Update Country' : 'Create Country'}
                  </button>
                  <button type="button" className="btn btn-secondary px-4" onClick={resetCountryForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="country-list">
              <div className="table-responsive bg-white rounded shadow-sm border">
                <table className="table table-hover mb-0 align-middle">
                  <thead className="bg-light border-bottom">
                    <tr>
                      <th className="ps-4 py-3 fw-normal text-muted small text-uppercase">Thumbnail</th>
                      <th className="py-3 fw-normal text-muted small text-uppercase">Name</th>
                      <th className="py-3 fw-normal text-muted small text-uppercase">Status</th>
                      <th className="text-end pe-4 py-3 fw-normal text-muted small text-uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countries.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-4 text-muted">No countries found. Add your first country!</td>
                      </tr>
                    ) : (
                      countries.map((country: Country) => (
                        <tr key={country.id} className="border-bottom">
                          <td className="ps-4 py-3">
                            <div className="d-flex align-items-center">
                              {country.thumbnail ? (
                                <Image src={country.thumbnail} alt="" className="rounded me-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                              ) : (
                                <div className="rounded me-3 bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                  <i className="bi bi-globe text-muted"></i>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 fw-normal">{country.name}</td>
                          <td className="py-3">
                            <span className={`badge ${country.is_active ? 'bg-success' : 'bg-secondary'} px-3 py-2`}>
                              {country.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="text-end pe-4 py-3">
                            <button className="btn btn-sm btn-light border me-2" onClick={() => handleEditCountry(country)} title="Edit">
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button className="btn btn-sm btn-light border text-danger" onClick={() => handleDeleteCountry(country.id)} title="Delete">
                              <i className="bi bi-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Listings Section */}
      {activeSection === 'listings' && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 fw-normal">
              {isEditingListing 
                ? (currentListing?.id ? 'Edit Listing' : 'Add New Listing') 
                : 'Manage Listings'}
            </h4>
            {!isEditingListing && (
              <select 
                className="form-select" 
                style={{ width: 'auto' }}
                value={selectedCountryId || ''}
                onChange={(e) => setSelectedCountryId(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">All Countries</option>
                {countries.map((c: Country) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            )}
          </div>

          {isEditingListing ? (
            <div className="card border shadow-sm p-4 mb-5">
              <form onSubmit={handleSubmitListing}>
                <div className="row">
                  <div className="col-md-8">
                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">Country *</label>
                      <select
                        className="form-select"
                        value={currentListing?.country_id || ''}
                        onChange={(e) => setCurrentListing({ ...currentListing, country_id: parseInt(e.target.value) })}
                        required
                      >
                        <option value="">Select a country</option>
                        {countries.map((c: Country) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">Listing Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentListing?.title || ''}
                        onChange={(e) => setCurrentListing({ ...currentListing, title: e.target.value })}
                        placeholder="Enter listing title"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">Property Link *</label>
                      <input
                        type="url"
                        className="form-control"
                        value={currentListing?.link || ''}
                        onChange={(e) => setCurrentListing({ ...currentListing, link: e.target.value })}
                        placeholder="https://example.com/property"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small d-block">Listing Image</label>
                      <div 
                        className="image-upload-box border border-2 border-dashed rounded p-2 text-center bg-light cursor-pointer"
                        style={{ height: '150px', position: 'relative' }}
                        onClick={() => listingImageInputRef.current?.click()}
                      >
                        {listingImagePreview ? (
                          <Image src={listingImagePreview} alt="Listing" className="w-100 h-100 object-fit-cover rounded" />
                        ) : (
                          <div className="d-flex flex-column align-items-center justify-content-center h-100">
                            <i className="bi bi-image fs-2 text-muted"></i>
                            <small className="text-muted">Click to upload image</small>
                          </div>
                        )}
                      </div>
                      <input type="file" ref={listingImageInputRef} className="d-none" accept="image/*" onChange={handleListingFileChange} />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">Status</label>
                      <select
                        className="form-select"
                        value={currentListing?.is_active ?? true ? 'active' : 'inactive'}
                        onChange={(e) => setCurrentListing({ ...currentListing, is_active: e.target.value === 'active' })}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-medium text-muted small">Display Order</label>
                      <input
                        type="number"
                        className="form-control"
                        value={currentListing?.display_order || 0}
                        onChange={(e) => setCurrentListing({ ...currentListing, display_order: parseInt(e.target.value) || 0 })}
                        min="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4 pt-3 border-top">
                  <button type="submit" className="btn btn-primary px-4" disabled={listingMutation.isPending}>
                    {listingMutation.isPending ? 'Saving...' : currentListing?.id ? 'Update Listing' : 'Create Listing'}
                  </button>
                  <button type="button" className="btn btn-secondary px-4" onClick={resetListingForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="listing-list">
              {/* Group listings by country */}
              {countriesLoading ? (
                <div className="text-center py-5">Loading...</div>
              ) : countries.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted">No countries found. Please add countries first.</p>
                </div>
              ) : (
                <div className="accordion" id="listingsAccordion">
                  {countries.map((country: Country) => {
                    const countryListings = selectedCountryId 
                      ? listings.filter((l: Listing) => l.country_id === country.id)
                      : listings.filter((l: Listing) => l.country_id === country.id);
                    
                    return (
                      <div className="accordion-item border mb-3 rounded" key={country.id}>
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${expandedCountry === country.id ? '' : 'collapsed'}`}
                            type="button"
                            onClick={() => setExpandedCountry(expandedCountry === country.id ? null : country.id)}
                          >
                            <div className="d-flex align-items-center w-100">
                              {country.thumbnail && (
                                <Image 
                                  src={country.thumbnail} 
                                  alt="" 
                                  className="rounded me-3"
                                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                />
                              )}
                              <span className="me-auto">{country.name}</span>
                              <span className="badge bg-primary me-3">{countryListings.length} listings</span>
                            </div>
                          </button>
                        </h2>
                        <div className={`accordion-collapse collapse ${expandedCountry === country.id ? 'show' : ''}`}>
                          <div className="accordion-body p-0">
                            <div className="d-flex justify-content-end p-3 border-bottom bg-light">
                              <button 
                                className="btn btn-sm btn-primary" 
                                onClick={() => handleAddListing(country.id)}
                              >
                                <i className="bi bi-plus-circle me-1"></i>Add Listing
                              </button>
                            </div>
                            {countryListings.length === 0 ? (
                              <div className="text-center py-4 text-muted">
                                No listings for this country yet.
                              </div>
                            ) : (
                              <table className="table table-hover mb-0 align-middle">
                                <thead className="bg-light border-bottom">
                                  <tr>
                                    <th className="ps-4 py-3 fw-normal text-muted small text-uppercase">Image</th>
                                    <th className="py-3 fw-normal text-muted small text-uppercase">Title</th>
                                    <th className="py-3 fw-normal text-muted small text-uppercase">Link</th>
                                    <th className="py-3 fw-normal text-muted small text-uppercase">Status</th>
                                    <th className="text-end pe-4 py-3 fw-normal text-muted small text-uppercase">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {countryListings.map((listing: Listing) => (
                                    <tr key={listing.id} className="border-bottom">
                                      <td className="ps-4 py-3">
                                        {listing.image ? (
                                          <Image 
                                            src={listing.image} 
                                            alt="" 
                                            className="rounded"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                                          />
                                        ) : (
                                          <div className="rounded bg-light d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                            <i className="bi bi-house text-muted"></i>
                                          </div>
                                        )}
                                      </td>
                                      <td className="py-3 fw-normal">{listing.title}</td>
                                      <td className="py-3">
                                        <a 
                                          href={listing.link} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="text-truncate d-inline-block"
                                          style={{ maxWidth: '200px' }}
                                        >
                                          {listing.link}
                                        </a>
                                      </td>
                                      <td className="py-3">
                                        <span className={`badge ${listing.is_active ? 'bg-success' : 'bg-secondary'} px-3 py-2`}>
                                          {listing.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                      </td>
                                      <td className="text-end pe-4 py-3">
                                        <button className="btn btn-sm btn-light border me-2" onClick={() => handleEditListing(listing)} title="Edit">
                                          <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-sm btn-light border text-danger" onClick={() => handleDeleteListing(listing.id)} title="Delete">
                                          <i className="bi bi-trash"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AbroadEditor;
