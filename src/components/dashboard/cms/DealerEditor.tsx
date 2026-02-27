'use client';

import { useState, useRef, useEffect } from 'react';
import apiInstance from '@/utils/apiInstance';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
interface Dealer {
  id: number;
  name: string;
  title: string;
  short_description?: string;
  full_description?: string;
  primary_image?: string;
  phone?: string;
  email?: string;
  address?: string;
  is_active: boolean;
  display_order: number;
  createdAt: string;
}

const DealerEditor = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [currentDealer, setCurrentDealer] = useState<Partial<Dealer> | null>(null);
  
  const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState('');
  
  const primaryImageInputRef = useRef<HTMLInputElement>(null);

  const { data: dealers = [], isLoading } = useQuery({
    queryKey: ['dealers'],
    queryFn: async () => {
      const response = await apiInstance.get('/dealers');
      return response.data.data || [];
    }
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (currentDealer?.id) {
        const response = await apiInstance.put(`/dealers/${currentDealer.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      } else {
        const response = await apiInstance.post('/dealers', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      }
    },
    onSuccess: () => {
      toast.success(currentDealer?.id ? 'Dealer updated successfully' : 'Dealer created successfully');
      queryClient.invalidateQueries({ queryKey: ['dealers'] });
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to save dealer');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiInstance.delete(`/dealers/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Dealer deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['dealers'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete dealer');
    }
  });

  const handleEdit = (dealer: Dealer) => {
    setCurrentDealer(dealer);
    setPrimaryImagePreview(dealer.primary_image || '');
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this dealer?')) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setCurrentDealer(null);
    setPrimaryImageFile(null);
    setPrimaryImagePreview('');
    setIsEditing(false);
    if (primaryImageInputRef.current) primaryImageInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPrimaryImageFile(file);
      setPrimaryImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDealer?.name || !currentDealer?.title) {
      toast.error('Name and Title are required');
      return;
    }

    const formData = new FormData();
    formData.append('name', currentDealer.name || '');
    formData.append('title', currentDealer.title || '');
    formData.append('short_description', currentDealer.short_description || '');
    formData.append('full_description', currentDealer.full_description || '');
    formData.append('phone', currentDealer.phone || '');
    formData.append('email', currentDealer.email || '');
    formData.append('address', currentDealer.address || '');
    formData.append('is_active', String(currentDealer.is_active ?? true));
    formData.append('display_order', String(currentDealer.display_order || 0));

    if (primaryImageFile) {
      formData.append('primary_image', primaryImageFile);
    }

    mutation.mutate(formData);
  };

  if (isLoading) return <div className="text-center py-5">Loading dealers...</div>;

  return (
    <div className="dealer-editor">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0 fw-normal">{isEditing ? (currentDealer?.id ? 'Edit Dealer' : 'Add New Dealer') : 'Manage Dealers'}</h4>
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            <i className="bi bi-plus-circle me-2"></i>Add New Dealer
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="card border shadow-sm p-4 mb-5">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label fw-medium text-muted small">Dealer Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentDealer?.name || ''}
                    onChange={(e) => setCurrentDealer({ ...currentDealer, name: e.target.value })}
                    placeholder="Enter dealer name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium text-muted small">Title / Role *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentDealer?.title || ''}
                    onChange={(e) => setCurrentDealer({ ...currentDealer, title: e.target.value })}
                    placeholder="e.g. Senior Sales Agent, Branch Manager"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium text-muted small">Short Description</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={currentDealer?.short_description || ''}
                    onChange={(e) => setCurrentDealer({ ...currentDealer, short_description: e.target.value })}
                    placeholder="Brief description shown on dealer card"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium text-muted small">Full Description</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={currentDealer?.full_description || ''}
                    onChange={(e) => setCurrentDealer({ ...currentDealer, full_description: e.target.value })}
                    placeholder="Detailed description shown in modal popup"
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label fw-medium text-muted small d-block">Profile Image</label>
                  <div 
                    className="image-upload-box border border-2 border-dashed rounded p-2 text-center bg-light cursor-pointer"
                    style={{ height: '150px', position: 'relative' }}
                    onClick={() => primaryImageInputRef.current?.click()}
                  >
                    {primaryImagePreview ? (
                      <Image src={primaryImagePreview} alt="Primary" className="w-100 h-100 object-fit-cover rounded" />
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <i className="bi bi-image fs-2 text-muted"></i>
                        <small className="text-muted">Click to upload image</small>
                      </div>
                    )}
                  </div>
                  <input type="file" ref={primaryImageInputRef} className="d-none" accept="image/*" onChange={handleFileChange} />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium text-muted small">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentDealer?.phone || ''}
                    onChange={(e) => setCurrentDealer({ ...currentDealer, phone: e.target.value })}
                    placeholder="Phone number"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium text-muted small">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={currentDealer?.email || ''}
                    onChange={(e) => setCurrentDealer({ ...currentDealer, email: e.target.value })}
                    placeholder="Email address"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium text-muted small">Address</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={currentDealer?.address || ''}
                    onChange={(e) => setCurrentDealer({ ...currentDealer, address: e.target.value })}
                    placeholder="Full address"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium text-muted small">Status</label>
                  <select
                    className="form-select"
                    value={currentDealer?.is_active ?? true ? 'active' : 'inactive'}
                    onChange={(e) => setCurrentDealer({ ...currentDealer, is_active: e.target.value === 'active' })}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <small className="text-muted">Only active dealers will appear on the website</small>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-medium text-muted small">Display Order</label>
                  <input
                    type="number"
                    className="form-control"
                    value={currentDealer?.display_order || 0}
                    onChange={(e) => setCurrentDealer({ ...currentDealer, display_order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 mt-4 pt-3 border-top">
              <button type="submit" className="btn btn-primary px-4" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : currentDealer?.id ? 'Update Dealer' : 'Create Dealer'}
              </button>
              <button type="button" className="btn btn-secondary px-4" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="dealer-list">
          <div className="table-responsive bg-white rounded shadow-sm border">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light border-bottom">
                <tr>
                  <th className="ps-4 py-3 fw-normal text-muted small text-uppercase">Image</th>
                  <th className="py-3 fw-normal text-muted small text-uppercase">Name</th>
                  <th className="py-3 fw-normal text-muted small text-uppercase">Title</th>
                  <th className="py-3 fw-normal text-muted small text-uppercase">Status</th>
                  <th className="text-end pe-4 py-3 fw-normal text-muted small text-uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dealers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">No dealers found. Add your first dealer!</td>
                  </tr>
                ) : (
                  dealers.map((dealer: Dealer) => (
                    <tr key={dealer.id} className="border-bottom">
                      <td className="ps-4 py-3">
                        <div className="d-flex align-items-center">
                          {dealer.primary_image && (
                            <Image src={dealer.primary_image} alt="" className="rounded me-3" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                          )}
                        </div>
                      </td>
                      <td className="py-3 fw-normal">{dealer.name}</td>
                      <td className="py-3 text-muted">{dealer.title}</td>
                      <td className="py-3">
                        <span className={`badge ${dealer.is_active ? 'bg-success' : 'bg-secondary'} px-3 py-2`}>
                          {dealer.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="text-end pe-4 py-3">
                        <button className="btn btn-sm btn-light border me-2" onClick={() => handleEdit(dealer)} title="Edit">
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-light border text-danger" onClick={() => handleDelete(dealer.id)} title="Delete">
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
    </div>
  );
};

export default DealerEditor;
