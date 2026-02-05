"use client"

import { useEffect, useState, useCallback } from 'react';
import Image from "next/image"
import { ReactGoogleReviews, dangerouslyFetchPlaceReviews } from 'react-google-reviews';
import "react-google-reviews/dist/index.css";

import feedbackShape_1 from "@/assets/images/shape/shape_14.svg";
import feedbackShape_2 from "@/assets/images/shape/shape_15.svg";

const GoogleReviewsComponent = () => {
   const [mounted, setMounted] = useState(false);
   const [reviews, setReviews] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   
   const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '';
   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_API_KEY || '';

   const fetchReviews = useCallback(async () => {
      if (!placeId || !apiKey || placeId === 'your_google_place_id_here') {
         setLoading(false);
         setError(true);
         return;
      }
      
      try {
         const response = await dangerouslyFetchPlaceReviews(placeId, apiKey);
         if (response.success) {
            setReviews(response.reviews);
         } else {
            setError(true);
         }
      } catch (err) {
         console.error('Error fetching Google reviews:', err);
         setError(true);
      } finally {
         setLoading(false);
      }
   }, [placeId, apiKey]);

   useEffect(() => {
      setMounted(true);
      fetchReviews();
   }, [fetchReviews]);

   if (!mounted) {
      return null;
   }

   // If no credentials are set or there was an error, show a placeholder
   if (error || !placeId || !apiKey || placeId === 'your_google_place_id_here') {
      return (
         <div className="feedback-section-two md-pb-40 position-relative z-1">
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-lg-8 text-center">
                     <div className="title-one mb-50 lg-mb-20 wow fadeInUp">
                        <h2 className="font-garamond">What Our Clients Say</h2>
                        <p className="fs-22 mt-xs">Configure Google Reviews to display customer testimonials</p>
                     </div>
                  </div>
               </div>
            </div>
            <Image src={feedbackShape_1} alt="" className="lazy-img shapes shape_01" />
            <Image src={feedbackShape_2} alt="" className="lazy-img shapes shape_02" />
         </div>
      );
   }

   return (
      <div className="feedback-section-two md-pb-40 position-relative z-1">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-8 text-center">
                  <div className="title-one mb-50 lg-mb-20 wow fadeInUp">
                     <h2 className="font-garamond">What Our Clients Say</h2>
                     <p className="fs-22 mt-xs">Real reviews from Google</p>
                  </div>
               </div>
            </div>
            
            <div className="row">
               <div className="col-12">
                  <div className="google-reviews-wrapper" style={{
                     background: '#fff',
                     borderRadius: '20px',
                     padding: '40px',
                     boxShadow: '0 10px 40px rgba(0,0,0,0.08)'
                  }}>
                     {loading ? (
                        <div className="text-center py-5">Loading reviews...</div>
                     ) : (
                        <ReactGoogleReviews 
                           reviews={reviews}
                           layout="carousel"
                           nameDisplay="firstNamesOnly"
                           theme="light"
                           reviewVariant="card"
                           maxItems={3}
                           carouselAutoplay={true}
                           carouselSpeed={5000}
                           maxCharacters={200}
                           isLoading={loading}
                           accessibility={true}
                           reviewCardClassName="review-card"
                           reviewCardStyle={{
                              backgroundColor: '#ffffff',
                              borderRadius: '12px',
                              padding: '24px',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                              border: '1px solid #f0f0f0',
                           }}
                           carouselClassName="reviews-carousel"
                           carouselBtnClassName="carousel-btn"
                           carouselBtnStyle={{
                              backgroundColor: '#fff',
                              border: '1px solid #ddd',
                              borderRadius: '50%',
                              width: '40px',
                              height: '40px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: 10,
                           }}
                           carouselBtnIconClassName="carousel-btn-icon"
                           carouselCardClassName="carousel-card"
                        />
                     )}
                  </div>
               </div>
            </div>
         </div>
         <Image src={feedbackShape_1} alt="" className="lazy-img shapes shape_01" />
         <Image src={feedbackShape_2} alt="" className="lazy-img shapes shape_02" />
      </div>
   );
};

export default GoogleReviewsComponent;
