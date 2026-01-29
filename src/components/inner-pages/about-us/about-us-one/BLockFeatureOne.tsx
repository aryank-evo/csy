import Image from "next/image"
import Link from "next/link"

import titleShape from "@/assets/images/shape/title_shape_06.svg";
import Count from "@/components/common/Count";
import DynamicContentServer from "@/components/common/DynamicContentServer";

const BLockFeatureOne = () => {
   return (
      <div className="block-feature-two mt-150 xl-mt-100">
         <div className="container">
            <div className="row gx-xl-5">
               <div className="col-lg-6 wow fadeInLeft">
                  <div className="me-xxl-4">
                     <div className="title-one mb-60 lg-mb-40">
                        <DynamicContentServer 
                           slug="about-us" 
                           type="aboutSubtitle" 
                           defaultContent="About us" 
                           as="div"
                           className="upper-title"
                        />
                        <DynamicContentServer 
                           slug="about-us" 
                           type="aboutTitle1" 
                           defaultContent="Secure your family's Dream home." 
                           as="h3"
                        />
                        <DynamicContentServer 
                           slug="about-us" 
                           type="aboutDesc1" 
                           defaultContent="Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering." 
                           as="div"
                           className="fs-22"
                        />
                     </div>
                     <Link href="/contact" className="btn-two">Contact Us</Link>
                  
                  </div>
               </div>

               <div className="col-lg-6 wow fadeInRight">
                  <div className="block-two md-mt-40">
                     <div className="bg-wrapper">
                        <DynamicContentServer 
                           slug="about-us" 
                           type="aboutTitle2" 
                           defaultContent="Who we are?" 
                           as="h5"
                        />
                        <DynamicContentServer 
                           slug="about-us" 
                           type="aboutDesc2" 
                           defaultContent="Our founders Dustin Moskovitz & Justin Rosenstein met  leading Engineering teams at Facebook. As operations scaled, they grew frustrated by how difficult coordinate" 
                           as="p"
                           className="fs-22 lh-lg mt-20"
                        />
                        <DynamicContentServer 
                           slug="about-us" 
                           type="primaryImage" 
                           defaultContent="" 
                           className="img-fluid mt-3"
                        />
                        <DynamicContentServer 
                           slug="about-us" 
                           type="aboutMission" 
                           defaultContent="Our Mission" 
                           as="h5"
                           className="top-line mt-4"
                        />
                        <DynamicContentServer 
                           slug="about-us" 
                           type="aboutDesc3" 
                           defaultContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore aliqua." 
                           as="p"
                           className="fs-22 lh-lg mt-20"
                        />
                        <DynamicContentServer 
                           slug="about-us" 
                           type="secondaryImage" 
                           defaultContent="" 
                           className="img-fluid mt-3"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BLockFeatureOne
