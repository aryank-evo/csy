import Image from "next/image"
import Count from "@/components/common/Count";
import AdSection from "./AdSection";

import feedbackAvatar from "@/assets/images/media/img_01.jpg";
import feedbackShape_1 from "@/assets/images/shape/shape_14.svg";
import feedbackShape_2 from "@/assets/images/shape/shape_15.svg";

const Feedback = () => {
   return (
      <div className="feedback-section-two md-pb-40 position-relative z-1">
         <div className="container">
            <div className="row justify-content-center align-items-center">

               <div className="col-lg-8">
                  {/* <div className="row"> */}
                     {/* <div className="col-lg-12 order-lg-last"> */}
                         <div className="bg-wrapper w-100 d-flex flex-column justify-content-center">
                           <div className="row">
                              <div className="col-lg-6 col-md-6">
                                 <div className="counter-block-two ">
                                    <div className="main-count font-garamond fs-1 fw-500"><span className="counter "><Count number={120} /></span>+</div>
                                    <p className="fs-20 fw-light text-white  mt-2">Project handover</p>
                                 </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                 <div className="counter-block-two md-mb-40">
                                    <div className="main-count font-garamond fs-1 fw-500"><span className="counter"><Count number={249} /></span>+</div>
                                    <p className="fs-20 fw-light text-white mt-2">Happy customers</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="main-content position-relative z-1">
                           <div className="feedback-block-two ">
                              <blockquote className="font-garamond text-white">&quot;Extraordinary <span>performance!</span> Quick solutions. Highly recommended.&quot;</blockquote>
                              <div className="d-flex align-items-center mt-75 md-mt-60">
                                 <Image src={feedbackAvatar} alt="" className="rounded-circle avatar" />
                                 <div className="ps-4">
                                    <h6 className="fs-22 text-white fw-normal mb-5">Maninder Singh</h6>
                                    <span className="text-white opacity-50 fw-light">CEO & Head of CSY</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     {/* </div> */}

                     {/* <div className="col-lg-4 d-flex order-lg-first">
                        <div className="bg-wrapper h-100 w-100 d-flex flex-column justify-content-center">
                           <div className="row">
                              <div className="col-lg-12 col-md-6">
                                 <div className="counter-block-two mb-85 xl-mb-50 md-mb-40">
                                    <div className="main-count font-garamond fs-1 fw-500"><span className="counter "><Count number={1200} /></span>+</div>
                                    <p className="fs-20 fw-light text-white  mt-2">Project handover</p>
                                 </div>
                              </div>
                              <div className="col-lg-12 col-md-6">
                                 <div className="counter-block-two md-mb-40">
                                    <div className="main-count font-garamond fs-1 fw-500"><span className="counter"><Count number={1.9} /></span>mil+</div>
                                    <p className="fs-20 fw-light text-white mt-2">Happy customers</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div> */}

                  {/* </div> */}
               </div>

               <div className="col-lg-4 py-5">
                  <AdSection />
               </div>
            </div>
         </div>
         {/* <Image src={feedbackShape_1} alt="" className="lazy-img shapes shape_01" />
         <Image src={feedbackShape_2} alt="" className="lazy-img shapes shape_02" /> */}
      </div>
   )
}

export default Feedback
