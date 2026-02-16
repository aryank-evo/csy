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

const AboutUsPage = () => {
  // Fetch CMS page data to get social media links
  const { data: cmsData } = useQuery({
    queryKey: ['cms-page', 'about-us'],
    queryFn: () => fetchCmsPage('about-us'),
  });

  const facebookLink = cmsData?.facebookLink || null;
  const instagramLink = cmsData?.instagramLink || null;
  const youtubeLink = cmsData?.youtubeLink || null;

  return (
    <Wrapper>
      <HeaderOne style={true} />
      <main>
        <BreadcrumbOne title="About Us" sub_title="City Properties" style={false} />
        <div className="about-us-section pt-50 lg-pt-50 pb-50 lg-pb-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className="img-box position-relative z-1 pe-lg-5 md-mb-50">
                  <DynamicContent 
                    slug="about-us" 
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
                      slug="about-us" 
                      type="aboutTitle1"
                      defaultContent="" 
                      as="h2"
                      className="font-garamond h3"
                    />
                    <DynamicContent 
                      slug="about-us" 
                      type="aboutDesc1"
                      defaultContent="" 
                      as="div"
                      className="fs-18 mt-3"
                    />
                  </div>
                  
                  <div className="title-one mb-40">
                    <DynamicContent 
                      slug="about-us" 
                      type="aboutTitle2"
                      defaultContent="Who we are?" 
                      as="h5"
                      className="font-garamond"
                    />
                    <DynamicContent 
                      slug="about-us" 
                      type="aboutDesc2"
                      defaultContent="" 
                      as="p"
                      className="fs-20 mt-3"
                    />
                  </div>
                  
                  <div className="title-one mb-40">
                    <DynamicContent 
                      slug="about-us" 
                      type="aboutMission"
                      defaultContent="Our Mission" 
                      as="h5"
                      className="font-garamond"
                    />
                    <DynamicContent 
                      slug="about-us" 
                      type="aboutDesc3"
                      defaultContent="" 
                      as="p"
                      className="fs-20 mt-3"
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

export default AboutUsPage