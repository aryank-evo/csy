"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne';
import Wrapper from '@/layouts/Wrapper';

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
}

const DealersPage = () => {
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);

  const { data: dealers = [], isLoading } = useQuery({
    queryKey: ['dealers', 'active'],
    queryFn: async () => {
      const response = await apiInstance.get('/dealers?active_only=true');
      return response.data.data || [];
    }
  });

  return (
    <Wrapper>
      <HeaderOne style={true} />
      <main>
        <BreadcrumbOne 
          title="Our Dealers" 
          sub_title="Meet our professional team" 
          style={false} 
        />
        
        <div className="dealers-section pt-150 lg-pt-100 pb-150 lg-pb-100">
          <div className="container-fluid px-4 px-lg-5">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="title-one text-center mb-60 lg-mb-40">
                  <h2 className="font-garamond">Meet Our Dealers</h2>
                  <p className="fs-22 mt-xs">Professional team members ready to help you find your dream property</p>
                </div>
              </div>
            </div>
        
            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : dealers.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">No dealers available at the moment.</p>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
                {dealers.map((dealer: Dealer) => (
                  <div key={dealer.id} className="col d-flex justify-content-center">
                    <div 
                      className="dealer-card bg-white rounded-4 shadow-sm overflow-hidden h-100 cursor-pointer transition-all hover:shadow-lg w-100"
                      onClick={() => setSelectedDealer(dealer)}
                      style={{ maxWidth: '300px' }}
                    >
                      <div className="dealer-image position-relative">
                        {dealer.primary_image ? (
                          <img 
                            src={dealer.primary_image} 
                            alt={dealer.name}
                            className="w-100"
                            style={{ height: '280px', objectFit: 'cover' }}
                          />
                        ) : (
                          <div 
                            className="w-100 d-flex align-items-center justify-content-center bg-light"
                            style={{ height: '280px' }}
                          >
                            <i className="bi bi-person-circle fs-1 text-muted"></i>
                          </div>
                        )}
                        <div className="dealer-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 opacity-0 transition-all hover:opacity-100">
                          <span className="text-white fw-medium">
                            <i className="bi bi-eye me-2"></i>View Details
                          </span>
                        </div>
                      </div>
                      <div className="dealer-info p-4">
                        <h4 className="font-garamond mb-2">{dealer.name}</h4>
                        <p className="text-primary mb-3">{dealer.title}</p>
                        {dealer.short_description && (
                          <p className="text-muted small mb-0 line-clamp-2">
                            {dealer.short_description}
                          </p>
                        )}
                        {dealer.phone && (
                          <div className="mt-3 pt-3 border-top">
                            <small className="text-muted">
                              <i className="bi bi-telephone me-2"></i>
                              {dealer.phone}
                            </small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <FooterOne style={true} />

      {/* Dealer Detail Modal */}
      {selectedDealer && (
        <div 
          className="modal fade show d-block" 
          tabIndex={-1} 
          onClick={() => setSelectedDealer(null)}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div 
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <button 
                  type="button" 
                  className="btn-close position-absolute end-0 top-0 m-3" 
                  onClick={() => setSelectedDealer(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-0">
                <div className="row g-0">
                  <div className="col-lg-5">
                    <div className="h-100">
                      {selectedDealer.primary_image ? (
                        <img 
                          src={selectedDealer.primary_image} 
                          alt={selectedDealer.name}
                          className="w-100 h-100"
                          style={{ objectFit: 'cover', minHeight: '400px' }}
                        />
                      ) : (
                        <div 
                          className="w-100 h-100 d-flex align-items-center justify-content-center bg-light"
                          style={{ minHeight: '400px' }}
                        >
                          <i className="bi bi-person-circle fs-1 text-muted"></i>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="p-4 p-lg-5">
                      <h2 className="font-garamond mb-2">{selectedDealer.name}</h2>
                      <p className="text-primary fw-medium mb-4">{selectedDealer.title}</p>
                      
                      {selectedDealer.full_description && (
                        <div className="mb-4">
                          <h5 className="fw-medium mb-2">About</h5>
                          <p className="text-muted">{selectedDealer.full_description}</p>
                        </div>
                      )}
                      
                      <div className="dealer-contact-info">
                        <h5 className="fw-medium mb-3">Contact Information</h5>
                        
                        {selectedDealer.phone && (
                          <div className="d-flex align-items-center mb-3">
                            <div className="icon-wrapper bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="bi bi-telephone text-primary"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block">Phone</small>
                              <a href={`tel:${selectedDealer.phone}`} className="text-dark text-decoration-none">
                                {selectedDealer.phone}
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {selectedDealer.email && (
                          <div className="d-flex align-items-center mb-3">
                            <div className="icon-wrapper bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                              <i className="bi bi-envelope text-primary"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block">Email</small>
                              <a href={`mailto:${selectedDealer.email}`} className="text-dark text-decoration-none">
                                {selectedDealer.email}
                              </a>
                            </div>
                          </div>
                        )}
                        
                        {selectedDealer.address && (
                          <div className="d-flex align-items-start">
                            <div className="icon-wrapper bg-light rounded-circle d-flex align-items-center justify-content-center me-3 mt-1" style={{ width: '40px', height: '40px' }}>
                              <i className="bi bi-geo-alt text-primary"></i>
                            </div>
                            <div>
                              <small className="text-muted d-block">Address</small>
                              <p className="mb-0">{selectedDealer.address}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default DealersPage;
