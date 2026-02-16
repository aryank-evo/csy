"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';
import HeaderOne from '@/layouts/headers/HeaderOne';
import FooterOne from '@/layouts/footers/FooterOne';
import BreadcrumbOne from '@/components/common/breadcrumb/BreadcrumbOne';
import Wrapper from '@/layouts/Wrapper';

interface Listing {
  id: number;
  title: string;
  image?: string;
  link: string;
  display_order: number;
}

interface Country {
  id: number;
  name: string;
  thumbnail?: string;
  description?: string;
  listings?: Listing[];
}

const AbroadPage = () => {
  const [expandedCountry, setExpandedCountry] = useState<number | null>(null);

  const { data: countries = [], isLoading } = useQuery({
    queryKey: ['abroad-countries-with-listings'],
    queryFn: async () => {
      const response = await apiInstance.get('/abroad/countries/with-listings');
      return response.data.data || [];
    }
  });

  return (
    <Wrapper>
      <HeaderOne style={true} />
      <main>
        <BreadcrumbOne
          title="Abroad Properties"
          sub_title="Explore properties from around the world"
          style={false}
        />

        <div className="abroad-section pt-150 lg-pt-100 pb-150 lg-pb-100">
          <div className="container-fluid px-4 px-lg-5">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="title-one text-center mb-60 lg-mb-40">
                  <h2 className="font-garamond">Global Properties</h2>
                  <p className="fs-22 mt-xs">Discover premium properties from international markets</p>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : countries.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">Coming Soon......!</p>
              </div>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                {countries.map((country: Country) => (
                  <div key={country.id} className="col d-flex justify-content-center">
                    <div
                      className="country-card bg-white rounded-4 shadow-sm overflow-hidden h-100 transition-all hover:shadow-lg w-100"
                      onClick={() => setExpandedCountry(expandedCountry === country.id ? null : country.id)}
                      style={{ maxWidth: '400px', cursor: 'pointer' }}
                    >
                      <div className="country-image position-relative">
                        {country.thumbnail ? (
                          <img
                            src={country.thumbnail}
                            alt={country.name}
                            className="w-100"
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        ) : (
                          <div
                            className="w-100 d-flex align-items-center justify-content-center bg-light"
                            style={{ height: '200px' }}
                          >
                            <i className="bi bi-globe fs-1 text-muted"></i>
                          </div>
                        )}
                        <div className="country-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 opacity-0 transition-all hover:opacity-100">
                          <span className="text-white fw-medium">
                            <i className="bi bi-eye me-2"></i>
                            {expandedCountry === country.id ? 'Collapse' : 'View Listings'}
                          </span>
                        </div>
                        <div className="country-count position-absolute bottom-0 end-0 m-3">
                          <span className="badge bg-primary fs-6">
                            {country.listings?.length || 0} listings
                          </span>
                        </div>
                      </div>
                      <div className="country-info p-4">
                        <h4 className="font-garamond mb-2">{country.name}</h4>
                        {country.description && (
                          <p className="text-muted small mb-3 line-clamp-2">
                            {country.description}
                          </p>
                        )}

                        {/* Listings section - expandable */}
                        <div className={`listings-section mt-3 pt-3 border-top ${expandedCountry === country.id ? '' : 'd-none'}`}>
                          <h6 className="fw-medium mb-3">Available Properties</h6>
                          <div className="listings-grid">
                            {country.listings && country.listings.length > 0 ? (
                              country.listings.map((listing) => (
                                <a
                                  key={listing.id}
                                  href={listing.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="listing-item d-flex align-items-center p-2 mb-2 rounded bg-light text-decoration-none text-dark"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {listing.image ? (
                                    <img
                                      src={listing.image}
                                      alt={listing.title}
                                      className="rounded me-3"
                                      style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                    />
                                  ) : (
                                    <div
                                      className="rounded me-3 bg-white d-flex align-items-center justify-content-center"
                                      style={{ width: '60px', height: '60px' }}
                                    >
                                      <i className="bi bi-house text-muted"></i>
                                    </div>
                                  )}
                                  <div className="flex-grow-1 overflow-hidden">
                                    <h6 className="mb-1 text-truncate">{listing.title}</h6>
                                    <small className="text-muted d-flex align-items-center">
                                      <i className="bi bi-box-arrow-up-right me-1"></i>
                                      View Property
                                    </small>
                                  </div>
                                  <i className="bi bi-chevron-right text-muted ms-2"></i>
                                </a>
                              ))
                            ) : (
                              <p className="text-muted small text-center py-2">
                                No listings available for this country.
                              </p>
                            )}
                          </div>
                        </div>
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
    </Wrapper>
  );
};

export default AbroadPage;
