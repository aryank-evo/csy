import React from "react";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import Wrapper from "@/layouts/Wrapper";
import DynamicContent from "@/components/common/DynamicContent";

export const metadata = {
  title: "City Builders - Construction Experts",
};

const CityBuildersPage = () => {
  return (
    <Wrapper>
      <HeaderOne style={true} />
      <main>
        <BreadcrumbOne title="City Builders" sub_title="Our Construction Partner" style={false} />
        <div className="about-us-section pt-150 lg-pt-100 pb-150 lg-pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
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
                    <h2 className="fw-bold mb-0">15+</h2>
                    <p className="mb-0 text-muted">Years of Excellence</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6">
                <div className="ps-lg-4">
                  <div className="title-one mb-40">
                    <DynamicContent 
                      slug="city-builder" 
                      type="title"
                      defaultContent="Building Dreams with Precision" 
                      as="h2"
                      className="font-garamond"
                    />
                    <DynamicContent 
                      slug="city-builder" 
                      type="content"
                      defaultContent="City Builders is a premier construction firm dedicated to transforming architectural visions into structural realities." 
                      as="div"
                      className="fs-20 mt-3"
                    />
                  </div>
                  
                  <div className="quote-box bg-light p-4 rounded-3 border-start border-4 border-primary">
                    <DynamicContent 
                      slug="city-builder" 
                      type="directorMsg" 
                      defaultContent='"Our mission is to build spaces that inspire. We don\'t just construct buildings; we create environments where families grow and businesses thrive."'
                      as="p"
                      className="fst-italic mb-0"
                    />
                    <DynamicContent 
                      slug="city-builder" 
                      type="directorName" 
                      defaultContent="— Managing Director, City Builders"
                      as="h6"
                      className="mt-3 mb-0"
                    />
                  </div>
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