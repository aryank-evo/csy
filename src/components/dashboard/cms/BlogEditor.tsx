'use client';

import { useState, useRef, useEffect } from 'react';
import apiInstance from '@/utils/apiInstance';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ClassicEditor from './ClassicEditor';

interface Blog {
  id: number;
  title: string;
  content: string;
  primary_image?: string;
  secondary_image?: string;
  author_name?: string;
  category?: string;
  keywords?: string;
  createdAt: string;
}

const BlogEditor = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog> | null>(null);
  
  const [primaryImageFile, setPrimaryImageFile] = useState<File | null>(null);
  const [secondaryImageFile, setSecondaryImageFile] = useState<File | null>(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState('');
  const [secondaryImagePreview, setSecondaryImagePreview] = useState('');
  
  const primaryImageInputRef = useRef<HTMLInputElement>(null);
  const secondaryImageInputRef = useRef<HTMLInputElement>(null);

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await apiInstance.get('/blogs');
      return response.data.data || [];
    }
  });

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      if (currentBlog?.id) {
        const response = await apiInstance.put(`/blogs/${currentBlog.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      } else {
        const response = await apiInstance.post('/blogs', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
      }
    },
    onSuccess: () => {
      toast.success(currentBlog?.id ? 'Blog updated successfully' : 'Blog created successfully');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      resetForm();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to save blog');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiInstance.delete(`/blogs/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Blog deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete blog');
    }
  });

  const handleEdit = (blog: Blog) => {
    setCurrentBlog(blog);
    setPrimaryImagePreview(blog.primary_image || '');
    setSecondaryImagePreview(blog.secondary_image || '');
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteMutation.mutate(id);
    }
  };

  const resetForm = () => {
    setCurrentBlog(null);
    setPrimaryImageFile(null);
    setSecondaryImageFile(null);
    setPrimaryImagePreview('');
    setSecondaryImagePreview('');
    setIsEditing(false);
    if (primaryImageInputRef.current) primaryImageInputRef.current.value = '';
    if (secondaryImageInputRef.current) secondaryImageInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'primary' | 'secondary') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === 'primary') {
        setPrimaryImageFile(file);
        setPrimaryImagePreview(URL.createObjectURL(file));
      } else {
        setSecondaryImageFile(file);
        setSecondaryImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBlog?.title || !currentBlog?.content) {
      toast.error('Title and Content are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', currentBlog.title || '');
    formData.append('content', currentBlog.content || '');
    formData.append('author_name', currentBlog.author_name || '');
    formData.append('category', currentBlog.category || '');
    formData.append('keywords', currentBlog.keywords || '');

    if (primaryImageFile) {
      formData.append('primary_image', primaryImageFile);
    }
    if (secondaryImageFile) {
      formData.append('secondary_image', secondaryImageFile);
    }

    mutation.mutate(formData);
  };

  if (isLoading) return <div className="text-center py-5">Loading blogs...</div>;

  return (
    <div className="blog-editor">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">{isEditing ? (currentBlog?.id ? 'Edit Blog' : 'Add New Blog') : 'Manage Blogs'}</h4>
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            <i className="bi bi-plus-circle me-2"></i>Add New Blog
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="card border shadow-sm p-4 mb-5">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label fw-bold">Blog Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBlog?.title || ''}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
                    placeholder="Enter blog title"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Main Content</label>
                  <ClassicEditor
                    value={currentBlog?.content || ''}
                    onChange={(content) => setCurrentBlog({ ...currentBlog, content })}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label fw-bold">Author Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBlog?.author_name || ''}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, author_name: e.target.value })}
                    placeholder="Author name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBlog?.category || ''}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })}
                    placeholder="e.g. Real Estate, News"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Keywords</label>
                  <input
                    type="text"
                    className="form-control"
                    value={currentBlog?.keywords || ''}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, keywords: e.target.value })}
                    placeholder="keywords, comma, separated"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold d-block">Primary Image (Thumbnail)</label>
                  <div 
                    className="image-upload-box border border-2 border-dashed rounded p-2 text-center bg-light cursor-pointer"
                    style={{ height: '150px', position: 'relative' }}
                    onClick={() => primaryImageInputRef.current?.click()}
                  >
                    {primaryImagePreview ? (
                      <img src={primaryImagePreview} alt="Primary" className="w-100 h-100 object-fit-cover rounded" />
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <i className="bi bi-image fs-2 text-muted"></i>
                        <small className="text-muted">Click to upload primary image</small>
                      </div>
                    )}
                  </div>
                  <input type="file" ref={primaryImageInputRef} className="d-none" accept="image/*" onChange={(e) => handleFileChange(e, 'primary')} />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold d-block">Secondary Image</label>
                  <div 
                    className="image-upload-box border border-2 border-dashed rounded p-2 text-center bg-light cursor-pointer"
                    style={{ height: '150px', position: 'relative' }}
                    onClick={() => secondaryImageInputRef.current?.click()}
                  >
                    {secondaryImagePreview ? (
                      <img src={secondaryImagePreview} alt="Secondary" className="w-100 h-100 object-fit-cover rounded" />
                    ) : (
                      <div className="d-flex flex-column align-items-center justify-content-center h-100">
                        <i className="bi bi-image fs-2 text-muted"></i>
                        <small className="text-muted">Click to upload secondary image</small>
                      </div>
                    )}
                  </div>
                  <input type="file" ref={secondaryImageInputRef} className="d-none" accept="image/*" onChange={(e) => handleFileChange(e, 'secondary')} />
                </div>
              </div>
            </div>

            <div className="d-flex gap-2 mt-4 pt-3 border-top">
              <button type="submit" className="btn btn-primary px-4" disabled={mutation.isPending}>
                {mutation.isPending ? 'Saving...' : currentBlog?.id ? 'Update Blog' : 'Create Blog'}
              </button>
              <button type="button" className="btn btn-secondary px-4" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="blog-list">
          <div className="table-responsive bg-white rounded shadow-sm border">
            <table className="table table-hover mb-0 align-middle">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Blog Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">No blogs found. Add your first blog!</td>
                  </tr>
                ) : (
                  blogs.map((blog: Blog) => (
                    <tr key={blog.id}>
                      <td className="ps-4">
                        <div className="d-flex align-items-center">
                          {blog.primary_image && (
                            <img src={blog.primary_image} alt="" className="rounded me-3" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                          )}
                          <span className="fw-medium">{blog.title}</span>
                        </div>
                      </td>
                      <td><span className="badge bg-light text-dark border">{blog.category || 'N/A'}</span></td>
                      <td>{blog.author_name || 'Admin'}</td>
                      <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                      <td className="text-end pe-4">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(blog)}>
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(blog.id)}>
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

export default BlogEditor;
