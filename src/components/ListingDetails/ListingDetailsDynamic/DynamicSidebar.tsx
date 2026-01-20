import FeatureListing from "../listing-details-sidebar.tsx/FeatureListing"
import MortgageCalculator from "../listing-details-sidebar.tsx/MortgageCalculator"
import ScheduleForm from "../listing-details-sidebar.tsx/ScheduleForm"
import Link from "next/link"
import Image from "next/image"
import infoAvatar from "@/assets/images/agent/img_06.jpg"

const DynamicSidebar = ({ property }: any) => {
   const { contactName, contactEmail, contactPhone, location } = property || {};

   return (
      <div className="col-xl-4 col-lg-8 me-auto ms-auto">
         <div className="theme-sidebar-one dot-bg p-30 ms-xxl-3 lg-mt-80">
            <div className="agent-info bg-white border-20 p-30 mb-40">
               <Image src={infoAvatar} alt=""
                  className="lazy-img rounded-circle ms-auto me-auto mt-3 avatar" />
               <div className="text-center mt-25">
                  <h6 className="name">{contactName || "CSY Agent"}</h6>
                  <p className="fs-16">Property Agent & Broker</p>
                  <ul className="style-none d-flex align-items-center justify-content-center social-icon">
                     <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                     <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                     <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                     <li><Link href="#"><i className="fa-brands fa-linkedin"></i></Link></li>
                  </ul>
               </div>
               <div className="divider-line mt-40 mb-45 pt-20">
                  <ul className="style-none">
                     <li>Location: <span>{location || "India"}</span></li>
                     <li>Email: <span><Link href={`mailto:${contactEmail || 'contact@csy.com'}`}>{contactEmail || 'contact@csy.com'}</Link></span>
                     </li>
                     <li>Phone: <span><Link href={`tel:${contactPhone || '+910000000000'}`}>{contactPhone || '+91 000 000 0000'}</Link></span></li>
                  </ul>
               </div>
               <Link href="/contact" className="btn-nine text-uppercase rounded-3 w-100 mb-10">CONTACT AGENT</Link>
            </div>
            <div className="tour-schedule bg-white border-20 p-30 mb-40">
               <h5 className="mb-40">Schedule Tour</h5>
               <ScheduleForm />
            </div>
            <div className="mortgage-calculator bg-white border-20 p-30 mb-40">
               <h5 className="mb-40">Mortgage Calculator</h5>
               <MortgageCalculator />
            </div>
            <FeatureListing />
         </div>
      </div>
   )
}

export default DynamicSidebar
