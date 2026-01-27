import Image from "next/image"
import Link from "next/link"

import titleShape from "@/assets/images/shape/title_shape_06.svg";
import Count from "@/components/common/Count";
import DynamicContent from "@/components/common/DynamicContent";

interface ContentType {
   sub_title: string;
   desc_1: JSX.Element;
   title_1: string;
   title_2: string;
   desc_2: JSX.Element;
   desc_3: JSX.Element;
}

const feature_content: ContentType = {
   sub_title: "About us",
   desc_1: (<>Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering .</>),
   title_1: "Who we are?",
   title_2: "Our Mission",
   desc_2: (<>Our founders Dustin Moskovitz & Justin Rosenstein met  leading Engineering teams at Facebook. As operations scaled, they grew frustrated by how difficult coordinate</>),
   desc_3: (<>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore aliqua.</>),
}

const { sub_title, desc_1, title_1, title_2, desc_2, desc_3 } = feature_content;

const BLockFeatureOne = () => {
   return (
      <div className="block-feature-two mt-150 xl-mt-100">
         <div className="container">
            <div className="row gx-xl-5">
               <div className="col-lg-6 wow fadeInLeft">
                  <div className="me-xxl-4">
                     <div className="title-one mb-60 lg-mb-40">
                        <div className="upper-title">About us</div>
                        <DynamicContent 
                           slug="about-us" 
                           type="title" 
                           defaultContent="Secure your family's Dream home." 
                           as="h3"
                        />
                        <DynamicContent 
                           slug="about-us" 
                           type="content" 
                           defaultContent="Our founders Dustin Moskovitz and Justin Rosenstein met while leading Engineering." 
                           as="div"
                           className="fs-22"
                        />
                     </div>
                     <Link href="/contact" className="btn-two">Contact Us</Link>
                     <div className="counter-wrapper border-top pt-40 md-pt-10 mt-65 md-mt-40">
                        <div className="row">
                           <div className="col-xxl-6 col-sm-5">
                              <div className="counter-block-one mt-20">
                                 <div className="main-count fw-500 color-dark"><span className="counter"><Count number={1.2} /></span>%</div>
                                 <span>Low interest rate</span>
                              </div>
                           </div>
                           <div className="col-xxl-6 col-sm-7">
                              <div className="counter-block-one mt-20">
                                 <div className="main-count fw-500 color-dark">$<span className="counter"><Count number={1.3} /></span>b+</div>
                                 <span>Cumulative trading volume</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-lg-6 wow fadeInRight">
                  <div className="block-two md-mt-40">
                     <div className="bg-wrapper">
                        <h5>Who we are?</h5>
                        <DynamicContent 
                           slug="about-us" 
                           type="content" 
                           defaultContent="Our founders Dustin Moskovitz & Justin Rosenstein met  leading Engineering teams at Facebook. As operations scaled, they grew frustrated by how difficult coordinate" 
                           as="p"
                           className="fs-22 lh-lg mt-20"
                        />
                        <DynamicContent 
                           slug="about-us" 
                           type="primaryImage" 
                           defaultContent="" 
                           as="img"
                           className="img-fluid mt-3"
                        />
                        <h5 className="top-line mt-4">Our Mission </h5>
                        <DynamicContent 
                           slug="about-us" 
                           type="content" 
                           defaultContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod incididunt ut labore et dolore aliqua." 
                           as="p"
                           className="fs-22 lh-lg mt-20"
                        />
                        <DynamicContent 
                           slug="about-us" 
                           type="secondaryImage" 
                           defaultContent="" 
                           as="img"
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
