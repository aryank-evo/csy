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
                <p className="text-muted">Coming Soon......!</p>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
                {dealers.map((dealer: Dealer, index: number) => (
                  <div key={index} className="col d-flex">
                    <div
                      className="card dealer-card border-2 rounded-4 text-center w-100 h-100"
                      onClick={() => setSelectedDealer(dealer)}
                      style={{ cursor: "pointer", transition: "all .3s ease" }}
                    >
                      <div className="card-body px-4 py-5">

                        {/* Centered Avatar */}
                        <div className="d-flex justify-content-center mb-4">
                          {dealer.primary_image ? (
                            <img
                              src={dealer.primary_image}
                              alt={dealer.name}
                              className="dealer-avatar"
                            />
                          ) : (
                            <div className="dealer-avatar-placeholder d-flex align-items-center justify-content-center">
                              <i className="bi bi-person fs-2 text-muted"></i>
                            </div>
                          )}
                        </div>

                        {/* Name */}
                        <h5 className="fw-bold mb-2">{dealer.name}</h5>

                        {/* Title */}
                        <p className="text-primary small fw-medium mb-3">
                          {dealer.title}
                        </p>

                        {/* Description */}
                        {dealer.short_description && (
                          <p className="text-muted small mb-4 dealer-desc">
                            {dealer.short_description}
                          </p>
                        )}

                        <hr className="my-3" />

                        {/* CTA */}
                        <button className="btn btn-outline-primary rounded-pill px-4 btn-sm">
                          View Details
                        </button>

                      </div>
                    </div>
                  </div>


                ))}
              </div>
            )}
          </div>
          <style>
            {`
            .dealer-card {
              border: 2px solid #e9ecef;
            background: #fff;
            transition: all 0.3s ease;
}

            .dealer-card:hover {
              border - color: #0d6efd;
            transform: translateY(-6px);
            box-shadow: 0 1rem 2rem rgba(0,0,0,.08);
}

            .dealer-avatar {
              width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid #f8f9fa;
            box-shadow: 0 10px 25px rgba(0,0,0,.08);
}

            .dealer-avatar-placeholder {
              width: 120px;
            height: 120px;
            border-radius: 50%;
            background: #f1f3f5;
            border: 4px solid #f8f9fa;
}

            .dealer-desc {
              display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
}
`}
          </style>
        </div>
      </main>
      <FooterOne style={true} />

      {/* Dealer Detail Modal */}
      {selectedDealer && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedDealer(null)}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header border-0 pb-0 position-relative z-2 p-0 ">
                <button
                  type="button"
                  className="btn-close position-absolute end-0 top-0 m-3 z-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSelectedDealer(null);
                  }}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4 p-lg-5 text-center">

                {/* Profile Image */}
                <div className="mb-4">
                  {selectedDealer.primary_image ? (
                    <img
                      src={selectedDealer.primary_image}
                      alt={selectedDealer.name}
                      className="rounded-circle shadow m-auto"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover"
                      }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto shadow"
                      style={{ width: "150px", height: "150px" }}
                    >
                      <i className="bi bi-person-circle fs-1 text-muted"></i>
                    </div>
                  )}
                </div>

                {/* Name & Title */}
                <h4 className="fw-semibold mb-1">{selectedDealer.name}</h4>
                <p className="text-primary mb-3">{selectedDealer.title}</p>

                {/* About Section */}
                {selectedDealer.full_description && (
                  <div className="mb-4 px-lg-4">
                    <p className="text-muted small mb-0">
                      {selectedDealer.full_description}
                    </p>
                  </div>
                )}

                <hr className="my-4" />

                {/* Contact Section */}
                <div className="mx-auto text-start">
                  <h6 className="fw-semibold text-center mb-4">
                    Contact Information
                  </h6>

                  <div className="row g-3">

                    {/* Phone */}
                    {selectedDealer.phone && (
                      <div className="col-12 col-md-6">
                        <div className="d-flex align-items-center h-100 p-3 border rounded-3 bg-light-subtle">
                          <div
                            className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                            style={{ width: "42px", height: "42px" }}
                          >
                            <i className="bi bi-telephone text-primary"></i>
                          </div>
                          <div>
                            <small className="text-muted d-block">Phone</small>
                            <a
                              href={`tel:${selectedDealer.phone}`}
                              className="text-dark text-decoration-none fw-medium"
                            >
                              {selectedDealer.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    {selectedDealer.email && (
                      <div className="col-12 col-md-6">
                        <div className="d-flex align-items-center h-100 p-3 border rounded-3 bg-light-subtle">
                          <div
                            className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
                            style={{ width: "42px", height: "42px" }}
                          >
                            <i className="bi bi-envelope text-primary"></i>
                          </div>
                          <div>
                            <small className="text-muted d-block">Email</small>
                            <a
                              href={`mailto:${selectedDealer.email}`}
                              className="text-dark text-decoration-none fw-medium"
                            >
                              {selectedDealer.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Address (Full Width) */}
                    {selectedDealer.address && (
                      <div className="col-12">
                        <div className="d-flex align-items-start p-3 border rounded-3 bg-light-subtle">
                          <div
                            className="bg-white rounded-circle d-flex align-items-center justify-content-center me-3 mt-1 shadow-sm"
                            style={{ width: "42px", height: "42px" }}
                          >
                            <i className="bi bi-geo-alt text-primary"></i>
                          </div>
                          <div>
                            <small className="text-muted d-block">Address</small>
                            <p className="mb-0 small text-muted">
                              {selectedDealer.address}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

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
