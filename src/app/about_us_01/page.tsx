import React from "react";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import Wrapper from "@/layouts/Wrapper";
import DynamicContent from "@/components/common/DynamicContent";

export const metadata = {
  title: "About Us - Construction Experts",
};

const AboutUsPage = () => {
  return (
    <Wrapper>
      <HeaderOne style={true} />
      <main>
        <BreadcrumbOne title="About Us" sub_title="Our Construction Partner" style={false} />
        <div className="about-us-section pt-150 lg-pt-100 pb-150 lg-pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
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
                    <h2 className="fw-bold mb-0">15+</h2>
                    <p className="mb-0 text-muted">Years of Excellence</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6">
                <div className="ps-lg-4">
                  <div className="title-one mb-40">
                    <DynamicContent 
                      slug="about-us" 
                      type="aboutTitle1"
                      defaultContent="Secure your family's Dream home." 
                      as="h2"
                      className="font-garamond"
                    />
                    <DynamicContent 
                      slug="about-us" 
                      type="aboutDesc1"
                      defaultContent="Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering." 
                      as="div"
                      className="fs-20 mt-3"
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
                      defaultContent="Our founders Dustin Moskovitz & Justin Rosenstein met  leading Engineering teams at Facebook. As operations scaled, they grew frustrated by how difficult coordinate" 
                      as="p"
                      className="fs-20 mt-3"
                    />
                  </div>
                  {/* <DynamicContent 
                    slug="about-us" 
                    type="primaryImage"
                    defaultContent=""
                    as="img"
                    className="w-100 rounded-4 shadow-lg"
                    width={600} 
                    height={600}
                  /> */}
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
                      defaultContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore aliqua." 
                      as="p"
                      className="fs-20 mt-3"
                    />
                  </div>
                  {/* <DynamicContent 
                    slug="about-us" 
                    type="secondaryImage"
                    defaultContent=""
                    as="img"
                    className="w-100 rounded-4 shadow-lg"
                    width={600} 
                    height={600}
                  /> */}
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