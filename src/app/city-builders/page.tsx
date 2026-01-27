import React from "react";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import Image from "next/image";
import Wrapper from "@/layouts/Wrapper";
import DynamicContent from "@/components/common/DynamicContent";

// import client_img from "@/assets/images/dashboard/avatar_02.jpg";
const client_img = "/user_placeholder.jpg";

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
                  <Image src={client_img} alt="City Builders Owner" width={600} height={600} className="w-100 rounded-4 shadow-lg" />
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
                  
                  <div className="content-box">
                    <p className="mb-30">
                      With over a decade of experience in the construction industry, City Builders has established itself as a leader in residential and commercial development. Our commitment to quality, safety, and innovation sets us apart in every project we undertake.
                    </p>
                    
                    <ul className="list-style-none p-0 mb-40">
                      <li className="d-flex align-items-center mb-3">
                        <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                        <span className="fs-18">Residential Construction & Renovation</span>
                      </li>
                      <li className="d-flex align-items-center mb-3">
                        <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                        <span className="fs-18">Commercial Infrastructure Development</span>
                      </li>
                      <li className="d-flex align-items-center mb-3">
                        <i className="bi bi-check-circle-fill text-success me-3 fs-5"></i>
                        <span className="fs-18">Sustainable Building Solutions</span>
                      </li>
                    </ul>
                    
                    <div className="quote-box bg-light p-4 rounded-3 border-start border-4 border-primary">
                      <p className="fst-italic mb-0">
                        &quot;Our mission is to build spaces that inspire. We don&apos;t just construct buildings; we create environments where families grow and businesses thrive.&quot;
                      </p>
                      <h6 className="mt-3 mb-0">— Managing Director, City Builders</h6>
                    </div>
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
