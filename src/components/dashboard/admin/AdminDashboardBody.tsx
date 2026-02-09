'use client'

import { useState, useEffect } from 'react';
import { getAllProperties, approveProperty, rejectProperty } from '@/utils/api';
import { getLocalStorageItem } from '@/utils/localstorage';

interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  propertyType: string;
  propertyStatus: string;
  approvalStatus: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  updatedAt: string;
}

const AdminDashboardBody = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllProperties();
  }, []);

  const fetchAllProperties = async () => {
    try {
      setLoading(true);
      const token = getLocalStorageItem('token');
      
      if (!token) {
        // Fallback: try to get all properties with admin parameter if not logged in as admin
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}/api/properties/all-combined?admin=true`);
        const data = await response.json();
        
        if (data.success) {
          setProperties(data.data);
        }
      } else {
        // Use the admin endpoint that shows all properties (approved and pending)
        const response = await getAllProperties(token);
        setProperties(response.properties || response.data || []);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number, propertyType: string) => {
    try {
      const token = getLocalStorageItem('token');
      if (!token) return;

      await approveProperty(id, propertyType, token);
      // Refresh the list
      fetchAllProperties();
      alert('Property approved successfully!');
    } catch (err) {
      console.error('Error approving property:', err);
      alert('Failed to approve property');
    }
  };

  const handleReject = async (id: number, propertyType: string) => {
    try {
      const token = getLocalStorageItem('token');
      if (!token) return;

      await rejectProperty(id, propertyType, token);
      // Refresh the list
      fetchAllProperties();
      alert('Property rejected successfully!');
    } catch (err) {
      console.error('Error rejecting property:', err);
      alert('Failed to reject property');
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Admin Dashboard - Property Management</h2>
        </div>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <div className="bg-white card-box p-4 border-20">
          <h4 className="mb-4">All Property Listings</h4>
          
          {properties.length === 0 ? (
            <div className="alert alert-info">No properties found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Approval Status</th>
                    <th>Contact</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property) => (
                    <tr 
                      key={property.id} 
                      className={property.approvalStatus === 'pending' ? 'table-warning' : ''}
                    >
                      <td>{property.id}</td>
                      <td>
                        <strong>{property.title}</strong>
                        <div className="small text-muted">
                          {property.description.substring(0, 50)}...
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-primary">{property.propertyType}</span>
                      </td>
                      <td>₹{property.price}</td>
                      <td>{property.location}</td>
                      <td>
                        <span className="badge bg-info">{property.propertyStatus}</span>
                      </td>
                      <td>
                        <span className={`badge ${
                          property.approvalStatus === 'approved' ? 'bg-success' :
                          property.approvalStatus === 'pending' ? 'bg-warning text-dark' :
                          'bg-danger'
                        }`}>
                          {property.approvalStatus}
                        </span>
                      </td>
                      <td>
                        <div>{property.contactName}</div>
                        <div className="small">{property.contactEmail}</div>
                      </td>
                      <td>
                        {new Date(property.createdAt).toLocaleDateString()}
                      </td>
                      <td>
                        {property.approvalStatus === 'pending' && (
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-success btn-sm me-1"
                              onClick={() => handleApprove(property.id, property.propertyType)}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleReject(property.id, property.propertyType)}
                            >
                              Reject
                            </button>
                          </div>
                        )}
                        {property.approvalStatus === 'approved' && (
                          <span className="text-success">Approved</span>
                        )}
                        {property.approvalStatus === 'rejected' && (
                          <span className="text-danger">Rejected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardBody;