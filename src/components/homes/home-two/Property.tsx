"use client"

import Image from "next/image"
import Link from "next/link"
import { useQuery } from '@tanstack/react-query';
import propertyShape from "@/assets/images/shape/shape_17.svg"

// Placeholder image import
import placeholderImage from "@/assets/images/listing/img_01.jpg";

// API import
import { getAllPropertiesCombined } from "@/utils/api";

// Blue tick icon import
import VerifiedProperty from "@/components/common/VerifiedProperty";

// Lead capture imports
import LeadCaptureModal from '@/modals/LeadCaptureModal';
import { useLeadCapture } from '@/hooks/useLeadCapture';

const Property = ({ style }: { style?: boolean }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['latest-properties'],
    queryFn: getAllPropertiesCombined,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Use the lead capture hook
  const { showLeadModal, selectedProperty, openLeadModal, closeLeadModal, handleLeadSuccess } = useLeadCapture();

  // Process properties to get latest 3 and handle missing images
  const latestThree = data?.data ? data.data.slice(0, 3).map((property: any) => {
    // Filter images based on visibility settings
    let filteredImages = [];
    
    if (property.images && property.imageVisibility) {
      // If image visibility settings exist, filter accordingly
      filteredImages = property.images.filter((img: string, index: number) => 
        property.imageVisibility[index] !== false
      );
    } else if (property.images) {
      // If no visibility settings, show all images
      filteredImages = property.images;
    }
    
    // Create carousel structure for the property
    const carouselThumb = filteredImages.length > 0 
      ? filteredImages.map((img: string, index: number) => ({
          img,
          active: index === 0 ? "active" : ""
        }))
      : [{ img: placeholderImage.src, active: "active" }];

    return {
      ...property,
      carousel_thumb: carouselThumb
    };
  }) : [];

  return (
    <div className={`property-listing-one ${style ? "pt-150 xl-pt-100 pb-150 xl-pb-120" : "pt-110 md-pt-80 pb-150 xl-pb-120"}`}>
      <div className="container">
        <div className="position-relative">
          <div className="title-one text-center text-md-start mb-35 lg-mb-20">
            <h3 className="main-font color-blue">Featured Properties</h3>
            <p className="fs-22 mt-xs">Explore latest & featured properties</p>
          </div>

          <div className="row gx-xxl-5">
            {isLoading ? (
              // Show loading state
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="col-lg-4 col-md-6 d-flex mt-40">
                  <div className="listing-card-one style-two h-100 w-100">
                    <div className="img-gallery">
                      <div className="position-relative overflow-hidden">
                        <div className="tag fw-500">Loading...</div>
                        <div className="carousel slide">
                          <div className="carousel-inner">
                            <div className="carousel-item active">
                              <div className="w-100" style={{ height: '200px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Loading...
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="property-info p-25">
                      <div className="title tran3s" style={{ backgroundColor: '#f0f0f0', height: '20px', marginBottom: '10px' }}>&nbsp;</div>
                      <div className="address" style={{ backgroundColor: '#f0f0f0', height: '16px', marginBottom: '10px' }}>&nbsp;</div>
                      <div className="pl-footer top-border d-flex align-items-center justify-content-between">
                        <div className="price fw-500 color-dark" style={{ backgroundColor: '#f0f0f0', height: '20px', width: '80px' }}>&nbsp;</div>
                        <div className="btn-four" style={{ backgroundColor: '#f0f0f0', width: '30px', height: '30px' }}>&nbsp;</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : isError ? (
              // Show error state
              <div className="col-12 text-center">
                <p>Error loading properties. Please try again later.</p>
                <p className="text-danger">{error?.message || 'Unknown error'}</p>
              </div>
            ) : latestThree.length > 0 ? (
              latestThree.map((property: any, index: number) => (
                <div key={`${property.sourceTable || property.type || 'prop'}-${property.id || index}`} className="col-lg-4 col-md-6 d-flex mt-40 wow fadeInUp" data-wow-delay={`0.${index + 1}s`}>
                  <div className="listing-card-one style-two h-100 w-100">
                    <div className="img-gallery">
                      <div className="position-relative overflow-hidden">
                        <div className="tag fw-500">{property.type?.toUpperCase() || property.sourceTable?.replace('_properties', '').toUpperCase() || 'PROPERTY'}</div>
                        {property.isVerified && (
                          <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                            <VerifiedProperty />
                          </div>
                        )}
                        <div id={`carousel${property.id || index}`} className="carousel slide">
                          <div className="carousel-inner">
                            {property.carousel_thumb && property.carousel_thumb.length > 0 ? (
                              property.carousel_thumb.map((thumb: any, i: number) => (
                                <div key={i} className={`carousel-item ${thumb.active}`} data-bs-interval="1000000">
                                  <button 
                                    onClick={() => openLeadModal({
                                      id: property.id,
                                      title: property.title || property.name || 'Property',
                                      price: property.price ? `₹${property.price.toLocaleString()}` : undefined,
                                      location: property.location || property.address,
                                      type: property.type || property.sourceTable?.replace('_properties', '')
                                    })}
                                    className="d-block border-0 bg-transparent p-0"
                                    style={{ width: '100%', cursor: 'pointer' }}
                                  >
                                    <Image 
                                      src={thumb.img} 
                                      className="w-100" 
                                      alt={property.title || property.name || "Property image"} 
                                      width={300}
                                      height={200}
                                      style={{ objectFit: 'cover', aspectRatio: '16 / 9' as any }}
                                      unoptimized={true}
                                    />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div className="carousel-item active">
                                <button 
                                  onClick={() => openLeadModal({
                                    id: property.id,
                                    title: property.title || property.name || 'Property',
                                    price: property.price ? `₹${property.price.toLocaleString()}` : undefined,
                                    location: property.location || property.address,
                                    type: property.type || property.sourceTable?.replace('_properties', '')
                                  })}
                                  className="d-block border-0 bg-transparent p-0"
                                  style={{ width: '100%', cursor: 'pointer' }}
                                >
                                  <Image 
                                    src={placeholderImage.src} 
                                    className="w-100" 
                                    alt="Property placeholder" 
                                    width={300}
                                    height={200}
                                    style={{ objectFit: 'cover', aspectRatio: '16 / 9' as any }}
                                    unoptimized={true}
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="property-info p-25">
                      <button
                        onClick={() => openLeadModal({
                          id: property.id,
                          title: property.title || property.name || 'Property',
                          price: property.price ? `₹${property.price.toLocaleString()}` : undefined,
                          location: property.location || property.address,
                          type: property.type || property.sourceTable?.replace('_properties', '')
                        })}
                        className="title tran3s border-0 bg-transparent p-0 text-start"
                        style={{ cursor: 'pointer', width: '100%' }}
                      >
                        {property.title || property.name || 'Property Title'}
                      </button>
                      <div className="address">{property.address || property.location || 'Property Address'}</div>
                      <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between pb-5">
                        <li className="d-flex align-items-center">
                          <span className="fs-16">{property.area || property.sqft || property.land_area || 0} sqft</span>
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="fs-16">{property.bedrooms || property.no_of_bedrooms || 0} bed</span>
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="fs-16">{property.bathrooms || property.no_of_bathrooms || 0} bath</span>
                        </li>
                      </ul>
                      <div className="pl-footer top-border d-flex align-items-center justify-content-between">
                        <strong className="price fw-500 color-dark">₹{(property.price || property.rent_amount || property.sale_price || property.lease_amount || property.pg_rent || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
                        <button
                          onClick={() => openLeadModal({
                            id: property.id,
                            title: property.title || property.name || 'Property',
                            price: property.price ? `₹${property.price.toLocaleString()}` : undefined,
                            location: property.location || property.address,
                            type: property.type || property.sourceTable?.replace('_properties', '')
                          })}
                          className="btn-four border-0 bg-transparent p-0"
                          style={{ cursor: 'pointer' }}
                        >
                          <i className="bi bi-arrow-up-right"></i>
                        </button>
                       {/* <a
                          href={`https://wa.me/?text=${encodeURIComponent(
                            `${window.location.origin}/property-details/${property.id}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Share on WhatsApp"
                          style={{ cursor: 'pointer' }}
                        >
                          <i className="bi bi-whatsapp"></i>
                        </a> */}
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Show message when no properties are available
              <div className="col-12 text-center">
                <p>No properties available at the moment.</p>
              </div>
            )}
          </div>

          <div className="section-btn text-center md-mt-60">
            <Link href="/buy" className="btn-eight"><span>Explore All</span> <i
               className="bi bi-arrow-up-right"></i></Link>
          </div>
        </div>
      </div>
      <Image src={propertyShape} alt="" className="lazy-img shapes shape_01" />
      
      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadModal}
        onClose={closeLeadModal}
        onSubmitSuccess={handleLeadSuccess}
        propertyDetails={selectedProperty || undefined}
      />
    </div>
  );
};

export default Property;