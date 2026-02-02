"use client"
import NavMenu from "./NavMenu"
import { usePathname } from "next/navigation"

interface NavOffcanvasProps {
   offCanvas: boolean
   setOffCanvas: (value: boolean) => void
}

const NavOffcanvas = ({ offCanvas, setOffCanvas }: NavOffcanvasProps) => {
   return (
      <>
         <div className={`offcanvas offcanvas-end sidebar-nav nav-offcanvas ${offCanvas ? "show" : ""}`} id="navOffcanvas">
            <div className="offcanvas-header d-flex justify-content-between align-items-center">
               <div className="logo">
                  <span className="text-dark fw-bold fs-5">Navigation</span>
               </div>
               <button 
                  onClick={() => setOffCanvas(false)} 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="offcanvas" 
                  aria-label="Close"
               ></button>
            </div>
            <div className="wrapper mt-4">
               <NavMenu />
            </div>
         </div>
         <div onClick={() => setOffCanvas(false)} className={`offcanvas-backdrop fade ${offCanvas ? "show" : ""}`}></div>
      </>
   )
}

export default NavOffcanvas
