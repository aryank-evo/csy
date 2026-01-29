import React from "react";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";

export const metadata = {
  title: "City Builders - Construction Experts",
};

const CityBuildersPage = () => {
  return (
    <div>
      <HeaderOne style={true} />
      <main>
        <BreadcrumbOne title="City Builders" sub_title="Our Construction Partner" style={false} />
        <div className="about-us-section pt-150 lg-pt-100 pb-150 lg-pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="img-box position-relative z-1 pe-lg-5 md-mb-50">
                  <img src="/user_placeholder.jpg" alt="" className="w-100 rounded-4 shadow-lg" />
                  <div className="experience-box bg-white p-4 rounded-3 shadow position-absolute bottom-0 start-0 m-4">
                    <h2 className="fw-bold mb-0">15+</h2>
                    <p className="mb-0 text-muted">Years of Excellence</p>
                  </div>
                </div>
              </div>
              
              <div className="col-lg-6">
                <div className="ps-lg-4">
                  <div className="title-one mb-40">
                    <h2 className="font-garamond">Building Dreams with Precision</h2>
                    <div className="fs-20 mt-3">City Builders is a premier construction firm dedicated to transforming architectural visions into structural realities.</div>
                  </div>
                  
                  <div className="quote-box bg-light p-4 rounded-3 border-start border-4 border-primary">
                    <p className="fst-italic mb-0">&ldquo;Our mission is to build spaces that inspire. We don&#39;t just construct buildings; we create environments where families grow and businesses thrive.&rdquo;</p>
                    <h6 className="mt-3 mb-0">— Managing Director, City Builders</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterOne style={true} />
    </div>
  );
};

export default CityBuildersPage;