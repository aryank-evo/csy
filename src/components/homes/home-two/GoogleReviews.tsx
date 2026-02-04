"use client"

import { useEffect, useState } from 'react';
import Image from "next/image"
import { GoogleReviews as ReactGoogleReviews } from 'react-google-reviews';
import "react-google-reviews/dist/index.css";

import feedbackShape_1 from "@/assets/images/shape/shape_14.svg";
import feedbackShape_2 from "@/assets/images/shape/shape_15.svg";

const GoogleReviewsComponent = () => {
   const [mounted, setMounted] = useState(false);
   
   const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || '';
   const apiKey = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_API_KEY || '';

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      return null;
   }

   // If no credentials are set, show a placeholder or fallback UI
   if (!placeId || !apiKey || placeId === 'your_google_place_id_here') {
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
                     <ReactGoogleReviews 
                        placeId={placeId}
                        apiKey={apiKey}
                        layout="carousel"
                        maxReviews={6}
                        reviewStyles={{
                           backgroundColor: '#ffffff',
                           borderRadius: '12px',
                           padding: '24px',
                           boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                           border: '1px solid #f0f0f0'
                        }}
                        headerStyles={{
                           backgroundColor: 'transparent',
                           padding: '0 0 20px 0'
                        }}
                        carouselOptions={{
                           items: 3,
                           loop: true,
                           autoplay: true,
                           autoplayTimeout: 5000,
                           nav: true,
                           dots: true,
                           responsive: {
                              0: { items: 1 },
                              768: { items: 2 },
                              1024: { items: 3 }
                           }
                        }}
                     />
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
