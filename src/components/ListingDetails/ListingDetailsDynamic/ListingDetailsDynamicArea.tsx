"use client"
import { useEffect, useState } from "react";
import { getPropertyById } from "@/utils/api";
import CommonBanner from "../listing-details-common/CommonBanner";
import DynamicMediaGallery from "./DynamicMediaGallery";
import CommonPropertyOverview from "../listing-details-common/CommonPropertyOverview";
import CommonPropertyFeatureList from "../listing-details-common/CommonPropertyFeatureList";
import CommonAmenities from "../listing-details-common/CommonAmenities";
import CommonPropertyVideoTour from "../listing-details-common/CommonPropertyVideoTour";
import CommonPropertyFloorPlan from "../listing-details-common/CommonPropertyFloorPlan";
import CommonNearbyList from "../listing-details-common/CommonNearbyList";
import CommonSimilarProperty from "../listing-details-common/CommonSimilarProperty";
import CommonProPertyScore from "../listing-details-common/CommonProPertyScore";
import CommonLocation from "../listing-details-common/CommonLocation";
import CommonReviewForm from "../listing-details-common/CommonReviewForm";
import Review from "@/components/inner-pages/agency/agency-details/Review";
import NiceSelect from "@/ui/NiceSelect";
import DynamicSidebar from "./DynamicSidebar";
import LeadCaptureModal from "@/modals/LeadCaptureModal";

const ListingDetailsDynamicArea = ({ id, type }: { id: string, type?: string }) => {
   const [property, setProperty] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   const [showLeadModal, setShowLeadModal] = useState(false);
   const [hasSubmittedLead, setHasSubmittedLead] = useState(false);

   // Check if user has already submitted lead for this property
   useEffect(() => {
      if (id) {
         const leadSubmittedKey = `lead_submitted_${id}`;
         const hasSubmitted = sessionStorage.getItem(leadSubmittedKey);
         if (!hasSubmitted) {
            setShowLeadModal(true);
         } else {
            setHasSubmittedLead(true);
         }
      }
   }, [id]);

   useEffect(() => {
      const fetchProperty = async () => {
         try {
            const response = await getPropertyById(id, type);
            if (response.success) {
               setProperty(response.data);
            }
         } catch (error) {
            console.error("Error fetching property details:", error);
         } finally {
            setLoading(false);
         }
      };

      if (id) {
         fetchProperty();
      }
   }, [id, type]);

   if (loading) {
      return (
         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
         </div>
      );
   }

   if (!property) {
      return (
         <div className="container pt-180 pb-150 text-center">
            <h3>Property not found or not approved yet.</h3>
         </div>
      );
   }

   // Don't show property details until lead form is submitted
   if (!hasSubmittedLead && !showLeadModal) {
      return (
         <div className="container pt-180 pb-150 text-center">
            <div className="spinner-border text-primary" role="status">
               <span className="visually-hidden">Loading...</span>
            </div>
         </div>
      );
   }

   // Helper function to check if a field should be visible
   const isFieldVisible = (fieldKey: string) => {
      if (!property.fieldVisibility) return true; // Show all if no visibility settings
      return property.fieldVisibility[fieldKey] !== false; // Show if not explicitly hidden
   };

   const handleLeadSuccess = () => {
      // Mark lead as submitted for this property in session storage
      const leadSubmittedKey = `lead_submitted_${id}`;
      sessionStorage.setItem(leadSubmittedKey, 'true');
      setHasSubmittedLead(true);
      setShowLeadModal(false);
   };

   return (
      <div className="listing-details-one theme-details-one bg-pink pt-180 lg-pt-150 pb-150 xl-pb-120">
         <div className="container">
            <CommonBanner property={property} />
            <DynamicMediaGallery images={property.images} imageVisibility={property.imageVisibility} />
            <div className="property-feature-list bg-white shadow4 border-20 p-40 mt-50 mb-60">
               <h4 className="sub-title-one mb-40 lg-mb-20">Property Overview</h4>
               <CommonPropertyOverview property={property} />
            </div>
            <div className="row">
               <div className="col-xl-8">
                  {isFieldVisible('description') && (
                  <div className="property-overview mb-50 bg-white shadow4 border-20 p-40">
                     <h4 className="mb-20">Overview</h4>
                     <p className="fs-20 lh-lg">{property.description || "No description available for this property."}</p>
                  </div>
                  )}
                  <div className="property-feature-accordion bg-white shadow4 border-20 p-40 mb-50">
                     <h4 className="mb-20">Property Features</h4>
                     <p className="fs-20 lh-lg">Key features and details about this property listing.</p>
                     <div className="accordion-style-two mt-45">
                        <CommonPropertyFeatureList property={property} />
                     </div>
                  </div>
                  <div className="property-amenities bg-white shadow4 border-20 p-40 mb-50">
                     <CommonAmenities property={property} />
                  </div>
                  {/* Keep other sections if they should be there, but they are currently static */}
                  {/* <div className="property-video-tour mb-50">
                     <CommonPropertyVideoTour />
                  </div>
                  <CommonPropertyFloorPlan style={false} />
                  <div className="property-nearby bg-white shadow4 border-20 p-40 mb-50">
                     <CommonNearbyList />
                  </div>
                  <CommonSimilarProperty />
                  <div className="property-score bg-white shadow4 border-20 p-40 mb-50">
                     <CommonProPertyScore />
                  </div> */}
                  <div className="property-location mb-50">
                     <CommonLocation property={property} />
                  </div>

                  <div className="review-panel-one bg-white shadow4 border-20 p-40 mb-50">
                     <div className="position-relative z-1">
                        <div className="d-sm-flex justify-content-between align-items-center mb-10">
                           <h4 className="m0 xs-pb-30">Reviews</h4>
                           <NiceSelect className="nice-select"
                              options={[
                                 { value: "01", text: "Newest" },
                                 { value: "02", text: "Best Seller" },
                                 { value: "03", text: "Best Match" },
                              ]}
                              defaultCurrent={0}
                              onChange={() => {}}
                              name=""
                              placeholder="" />
                        </div>
                        <Review style={true} />
                     </div>
                  </div>
                  <div className="review-form bg-white shadow4 border-20 p-40">
                     <CommonReviewForm />
                  </div>
               </div>
               <DynamicSidebar property={property} />
            </div>
         </div>

         {/* Lead Capture Modal */}
         <LeadCaptureModal
            isOpen={showLeadModal}
            onClose={() => setShowLeadModal(false)}
            onSubmitSuccess={handleLeadSuccess}
            propertyDetails={property ? {
               id: property.id,
               title: property.title || 'Property',
               price: property.price ? `₹${parseInt(property.price).toLocaleString()}` : undefined,
               location: property.location || property.address,
               type: property.propertyType || type
            } : undefined}
         />
      </div>
   );
};

export default ListingDetailsDynamicArea;
