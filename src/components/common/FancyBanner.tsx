"use client"
import Image from "next/image"
import Link from "next/link"
import titleShape from "@/assets/images/shape/title_shape_06.svg"

const FancyBanner = ({ style }: any) => {
   return (
      <div className="fancy-banner-two position-relative z-1 pt-90 lg-pt-50 pb-90 lg-pb-50">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="title-one text-center text-lg-start md-mb-40 pe-xl-5">
                     <h3 className="text-white m0">Find the right property, without the hassle</h3>
                  </div>
               </div>
               <div className="col-lg-6">
            
                        <button className="btn-two"><Link href="/contact"> Get Started</Link></button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBanner
