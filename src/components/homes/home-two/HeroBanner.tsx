"use client"
import Link from "next/link";
import { useState } from "react";
import VideoPopup from "@/modals/VideoPopup";
import DropdownTwo from "@/components/search-dropdown/home-dropdown/DropdownTwo";



const HeroBanner = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <div 
            className="hero-banner-two z-1 position-relative" 
            style={{
               backgroundImage: 'url(/banner.jpg)',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat'
            }}
         >
            <div className="container">
               <div className="position-relative pt-200 md-pt-150 pb-130 xl-pb-100">
                  <div className="row">
                     <div className="col-xxl-9 col-xl-8 col-lg-9 col-md-10">
                        {/* Content can be added here if needed */}
                     </div>
                  </div>

                  <DropdownTwo /> 
               </div>
            </div>
         </div>
         {/* video modal start */}
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId={"tUP5S4YdEJo"}
         />
         {/* video modal end */}
      </>
   )
}

export default HeroBanner
