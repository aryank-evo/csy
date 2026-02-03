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
import BlueTickVerifiedIcon from "@/components/common/BlueTickVerifiedIcon";


const Property = () => {
   const {
      data: properties,
      isLoading,
      isError,
      error
   } = useQuery({
      queryKey: ['allProperties'],
      queryFn: async () => {
         const response = await getAllPropertiesCombined();
         return response.data;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
   });

   // Process properties to get latest 3 and handle missing images
   const latestThree = properties ? properties.slice(0, 3).map((property: any) => ({
      ...property,
      images: property.images && property.images.length > 0 
         ? property.images 
         : [placeholderImage.src],
      carousel_thumb: property.images && property.images.length > 0 
         ? property.images.map((img: string, idx: number) => ({ 
              img, 
              active: idx === 0 ? 'active' : '' 
           }))
         : [{ img: placeholderImage.src, active: 'active' }],
      type: property.sourceTable?.replace('_properties', '') || 'buy'
   })) : [];

   // Function to get property detail link based on property type
   const getPropertyLink = (property: any) => {
      // Map property types to URL paths
      const typeMap: Record<string, string> = {
        'sale': 'buy',
        'rent': 'rent',
        'lease': 'lease',
        'pg': 'pg',
        'commercial': 'commercial',
        'land': 'land'
      };
      
      const propertyType = property.sourceTable?.replace('_properties', '') || property.propertyType?.toLowerCase() || 'sale';
      const urlType = typeMap[propertyType] || 'buy'; // default to buy
      return `/${urlType}/${property.id}`;
   };

   return (
      <div className="xl-mt-120 property-listing-two position-relative z-1 mt-150 pb-150 xl-pb-120 lg-pb-80">
         <div className="container">
            <div className="position-relative">
               <div className="title-one mb-25 lg-mb-20 wow fadeInUp">
                  <h2 className="font-garamond">New Properties</h2>
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
                        <div key={property.id || index} className="col-lg-4 col-md-6 d-flex mt-40 wow fadeInUp" data-wow-delay={`0.${index + 1}s`}>
                           <div className="listing-card-one style-two h-100 w-100">
                              <div className="img-gallery">
                                 <div className="position-relative overflow-hidden">
                                    <div className="tag fw-500">{property.type?.toUpperCase() || property.sourceTable?.replace('_properties', '').toUpperCase() || 'PROPERTY'}</div>
                                    {property.isVerified && (
                                       <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}>
                                          <BlueTickVerifiedIcon size={24} />
                                       </div>
                                    )}
                                    <div id={`carousel${property.id || index}`} className="carousel slide">
                                       <div className="carousel-inner">
                                          {property.carousel_thumb.map((thumb: any, i: number) => (
                                             <div key={i} className={`carousel-item ${thumb.active}`} data-bs-interval="1000000">
                                                <Link href={getPropertyLink(property)} className="d-block">
                                                   <Image 
                                                      src={thumb.img} 
                                                      className="w-100" 
                                                      alt={property.title || property.name || "Property image"} 
                                                      width={300}
                                                      height={200}
                                                      style={{ objectFit: 'cover', aspectRatio: '16 / 9' as any }}
                                                      unoptimized={true}
                                                   />
                                                </Link>
                                             </div>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="property-info p-25">
                                 <Link href={getPropertyLink(property)} className="title tran3s">{property.title || property.name || 'Property Title'}</Link>
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
                                    <Link href={getPropertyLink(property)} className="btn-four"><i className="bi bi-arrow-up-right"></i></Link>
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
      </div>
   )
}

export default Property;
