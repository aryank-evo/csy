"use client"
import NavMenu from "./Menu/NavMenu"
import Offcanvas from "./Menu/Offcanvas"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import UseSticky from "@/hooks/UseSticky"
import PropertyTypeModalTrigger from "@/components/common/PropertyTypeModalTrigger";

// import logo_1 from "@/assets/images/logo/logo_01.svg";
import logo_1 from "../../../public/logo.png";

const HeaderOne = ({ style }: any) => {
   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState(false);

   return (
      <>
         <header className={`theme-main-menu menu-overlay menu-style-one sticky-menu  ${sticky ? "fixed" : ""}`} >
            {!style && <div className="alert-wrapper text-center">
               <p className="fs-16 m0 text-white">The <Link href="/buy" className="fw-500">flash sale</Link> go on. The offer will end in — <span>This Sunday</span></p>
            </div>}
            <div className="inner-content gap-one p-3" style={{ backgroundColor: "#ffffffa3" }}>
               <div className="top-header position-relative">
                  <div className="d-flex align-items-center justify-content-between">
                     <div className="logo order-lg-0">
                        <Link href="/" className="d-flex align-items-center">
                           <Image src={logo_1} alt="" />
                        </Link>
                     </div>
                     <div className="right-widget ms-auto ms-lg-0 me-3 me-lg-0 order-lg-3">
                        <ul className="d-flex align-items-center style-none">
                           {/* Removed Login button */}
                           <li className="d-none d-md-inline-block ms-3">
                              <PropertyTypeModalTrigger />
                           </li>
                           <li className="ms-3 d-lg-none">
                              <button 
                                 className="navbar-toggler d-block" 
                                 type="button"
                                 onClick={() => setOffCanvas(true)}
                                 aria-label="Toggle navigation"
                              >
                                 <span></span>
                              </button>
                           </li>
                        </ul>
                     </div>
                     <nav className="navbar navbar-expand-lg p0 order-lg-2 d-none d-lg-block">
                        <div className="navbar-collapse">
                           <NavMenu />
                        </div>
                     </nav>
                  </div>
               </div>
            </div>
         </header>
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
      </>
   )
}

export default HeaderOne
