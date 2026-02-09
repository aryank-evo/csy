"use client"
import React from "react";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import Wrapper from "@/layouts/Wrapper";
import DynamicContent from "@/components/common/DynamicContent";
import SocialMediaIcons from "@/components/common/SocialMediaIcons";
import { useQuery } from "@tanstack/react-query";
import { fetchCmsPage } from "@/utils/cmsApi";

// export const metadata = {
//   title: "City Builders - Construction Experts",
// };

const CityBuildersPage = () => {
  // Fetch CMS page data to get social media links
  const { data: cmsData } = useQuery({
    queryKey: ['cms-page', 'city-builder'],
    queryFn: () => fetchCmsPage('city-builder'),
  });

  const facebookLink = cmsData?.facebookLink || null;
  const instagramLink = cmsData?.instagramLink || null;
  const youtubeLink = cmsData?.youtubeLink || null;

  return (
    <Wrapper>
      <HeaderOne style={true} />
     <main>
        <BreadcrumbOne title="City Builders" sub_title="Our Construction Partner" style={false} />
        <div className="about-us-section pt-150 lg-pt-100 pb-150 lg-pb-100">
          <div className="container">
            <div className="row">
               <div className="col-lg-5">
                <div className="img-box position-relative z-1 pe-lg-5 md-mb-50">
                  <DynamicContent 
                    slug="city-builder" 
                    type="primaryImage"
                    defaultContent="/user_placeholder.jpg"     
                    as="img"
                    className="w-100 rounded-4 shadow-lg"
                    width={600} 
                    height={600}
                  />
                  <div className="experience-box bg-white p-4 rounded-3 shadow position-absolute bottom-0 start-0 m-4">
                    <h2 className="fw-bold mb-0">29+</h2>
                    <p className="mb-0 text-muted">Years of Excellence</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-7">
                <div className="ps-lg-4">
                  <div className="title-one mb-40">
                    <DynamicContent 
                      slug="city-builder" 
                      type="title"
                      defaultContent="City Builder in Ludhiana" 
                      as="h2"
                      className="font-garamond h3"
                    />
                    <DynamicContent 
                      slug="city-builder" 
                      type="content"
                      defaultContent="City Builder & Contractor is a trusted name in construction and real estate services in Ludhiana, serving residential and commercial clients since 1996." 
                      as="div"
                      className="fs-18 mt-3"
                    />
                  </div>
                  
                  <div className="quote-box bg-light p-4 rounded-3 border-start border-4 border-primary mb-40">
                    <DynamicContent 
                      slug="city-builder" 
                      type="directorMsg" 
                      defaultContent='""'
                      as="p"
                      className="fst-italic mb-0"
                    />
                    <DynamicContent 
                      slug="city-builder" 
                      type="directorName" 
                      defaultContent="— Maninder Singh"
                      as="h6"
                      className="mt-3 mb-0"
                    />
                  </div>
                  
                  {/* Social Media Icons */}
                  {(facebookLink || instagramLink || youtubeLink) && (
                    <div className="mt-4">
                      <SocialMediaIcons 
                        facebookLink={facebookLink}
                        instagramLink={instagramLink}
                        youtubeLink={youtubeLink}
                      />
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </main>
      <FooterOne style={true} />
    </Wrapper>
  );
};

export default CityBuildersPage;