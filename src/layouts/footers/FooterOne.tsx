"use client"
import Image from "next/image"
import Link from "next/link"
import footer_data from "@/data/home-data/FooterData"
import { useQuery } from "@tanstack/react-query"
import { fetchCmsPage } from "@/utils/cmsApi"

import footerLogo_1 from "@/assets/images/logo/logo.png"
import footerLogo_2 from "@/assets/images/logo/logo.png"
import footerShape_1 from "@/assets/images/shape/shape_32.svg"
import footerShape_2 from "@/assets/images/shape/shape_33.svg"

const FooterOne = ({ style }: any) => {
  // Fetch CMS data from contact page for footer address and email
  const { data: contactData } = useQuery({
    queryKey: ['cms-page', 'contact'],
    queryFn: () => fetchCmsPage('contact'),
  })

  // Fetch CMS data from about-us page for social links
  const { data: aboutData } = useQuery({
    queryKey: ['cms-page', 'about-us'],
    queryFn: () => fetchCmsPage('about-us'),
  })

  const footerAddress = contactData?.contactAddress || "11910 Cairo Suite 210, Kafralshakh , Cairo, Egypt"
  const footerEmail = contactData?.contactEmail || "contact@csy.com"
  const facebookLink = aboutData?.facebookLink || "#"
  const instagramLink = aboutData?.instagramLink || "#"
  const youtubeLink = aboutData?.youtubeLink || "#"

  return (
      <div className={`footer-one ${style ? "dark-bg" : ""}`}>
         <div className="position-relative z-1">
            <div className="container">
               <div className="row justify-content-between">
                  <div className="col-lg-4">
                     <div className={`footer-intro ${style ? "position-relative z-1" : ""}`}>
                        <div className="bg-wrapper">
                           <div className="logo mb-20">
                              <Link href="/">
                                 <Image src={style ? footerLogo_2 : footerLogo_1} alt="" />
                              </Link>
                           </div>
                           <p className="mb-60 lg-mb-40 md-mb-20">{footerAddress}</p>
                           <h6>CONTACT</h6>
                           <Link href={`mailto:${footerEmail}`} className={`email tran3s mb-70 lg-mb-50 ${style ? "font-garamond" : "fs-24 text-decoration-underline"}`}>{footerEmail}</Link>
                           <ul className="style-none d-flex align-items-center social-icon">
                              <li><Link href={facebookLink} target="_blank" rel="noopener noreferrer"><i className={`fa-brands fa${style ? "" : "-square"}-facebook`}></i></Link></li>
                              <li><Link href={youtubeLink} target="_blank" rel="noopener noreferrer"><i className={`fa-brands fa${style ? "" : "-square"}-youtube`}></i></Link></li>
                              <li><Link href={instagramLink} target="_blank" rel="noopener noreferrer"><i className={`fa-brands fa${style ? "" : "-square"}-instagram`}></i></Link></li>
                           </ul>
                        </div>
                        {style && <Image src={footerShape_1} alt="" className="lazy-img shapes shape_01" />}
                     </div>
                  </div>

                  <div className="col-lg-8">
                     <div className={`d-flex flex-wrap ${style ? "h-100" : ""}`}>
                        {footer_data.filter((items) => items.page === "home_1").map((item) => (
                           <div key={item.id} className={`footer-nav mt-100 lg-mt-80 ${item.widget_class}`}>
                              <h5 className={`footer-title ${style ? "text-white" : ''}`}>{item.widget_title}</h5>
                              <ul className="footer-nav-link style-none">
                                 {item.footer_link.map((li: any, i) => (
                                    <li key={i}><Link href={li.link} data-bs-toggle={li.data_bs_toggle} data-bs-target={li.data_bs_target}>{li.link_title}</Link></li>
                                 ))}
                              </ul>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
            {style && <Image src={footerShape_2} alt="" className="lazy-img shapes shape_02" />}
         </div>
      </div>
   )
}

export default FooterOne
