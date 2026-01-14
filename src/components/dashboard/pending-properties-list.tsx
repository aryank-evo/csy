'use client';

import React, { useState, useEffect } from 'react';
import { getPendingProperties, approveProperty, rejectProperty } from '@/utils/api';

interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  propertyType: string;
  propertyStatus: string;
  createdAt: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

const PendingPropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPendingProperties();
  }, []);

  const fetchPendingProperties = async () => {
    try {
      setLoading(true);
      const response = await getPendingProperties();
      setProperties(response.data);
    } catch (err) {
      setError('Failed to fetch pending properties');
      console.error('Error fetching pending properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      await approveProperty(id);
      // Refresh the list after approval
      fetchPendingProperties();
      alert('Property approved successfully!');
    } catch (err) {
      console.error('Error approving property:', err);
      alert('Failed to approve property');
    }
  };

  const handleReject = async (id: number) => {
    try {
      await rejectProperty(id);
      // Refresh the list after rejection
      fetchPendingProperties();
      alert('Property rejected successfully!');
    } catch (err) {
      console.error('Error rejecting property:', err);
      alert('Failed to reject property');
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <h2 className="mb-4">Pending Property Listings</h2>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <h2 className="mb-4">Pending Property Listings</h2>
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Pending Property Listings</h2>
      
      {properties.length === 0 ? (
        <div className="alert alert-info">No pending property listings at the moment.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.id}</td>
                  <td>
                    <strong>{property.title}</strong>
                    <div className="small text-muted">{property.description.substring(0, 50)}...</div>
                  </td>
                  <td>
                    <span className="badge bg-primary">{property.propertyType}</span>
                  </td>
                  <td>
                    <span className="badge bg-warning text-dark">{property.propertyStatus}</span>
                  </td>
                  <td>{property.location}</td>
                  <td>
                    <div>{property.contactName}</div>
                    <div className="small">{property.contactEmail}</div>
                    <div className="small">{property.contactPhone}</div>
                  </td>
                  <td>{new Date(property.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button 
                        className="btn btn-success btn-sm"
                        onClick={() => handleApprove(property.id)}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleReject(property.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingPropertyList;