"use client"
import Link from "next/link"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"
import { fetchCmsPage } from "@/utils/cmsApi"
import ContactForm from "@/components/forms/ContactForm"

import circleImg from "@/assets/images/icon/icon_39.svg"

const ContactAreaDynamic = () => {
  // Fetch CMS page data for contact page
  const { data: cmsData, isLoading } = useQuery({
    queryKey: ['cms-page', 'contact'],
    queryFn: () => fetchCmsPage('contact'),
  })

  const contactTitle = cmsData?.contactTitle || "Questions? Feel Free to Reach Out Via Message."
  const contactAddress = cmsData?.contactAddress || ""
  const contactPhone = cmsData?.contactPhone || ""
  const contactEmail = cmsData?.contactEmail || ""
  const googleMapEmbedUrl = cmsData?.googleMapEmbedUrl || ""

  if (isLoading) {
    return (
      <div className="contact-us border-top mt-130 xl-mt-100 pt-80 lg-pt-60">
        <div className="container">
          <div className="row">
            <div className="col-xxl-9 col-xl-8 col-lg-10 m-auto mt-4 mb-4">
              <div className="title-one text-center wow fadeInUp">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="contact-us border-top mt-130 xl-mt-100 pt-80 lg-pt-60">
      {/* Contact Info Section */}
      <div className="container">
        <div className="row">
          <div className="col-xxl-9 col-xl-8 col-lg-10 m-auto">
            <div className="title-one text-center wow fadeInUp">
              <h3>{contactTitle}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Address/Contact Details Banner */}
      {(contactAddress || contactPhone || contactEmail) && (
        <div className="address-banner wow fadeInUp mt-60 lg-mt-40">
          <div className="container">
            <div className="d-flex flex-wrap justify-content-center justify-content-lg-between">
              {contactAddress && (
                <div className="block position-relative z-1 mt-25">
                  <div className="d-xl-flex align-items-center">
                    <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                      <Image src={circleImg} alt="" className="lazy-img" />
                    </div>
                    <div className="text">
                      <p className="fs-22">Address</p>
                      <span className="tran3s">{contactAddress}</span>
                    </div>
                  </div>
                </div>
              )}
              
              {contactPhone && (
                <div className="block position-relative z-1 mt-25">
                  <div className="d-xl-flex align-items-center">
                    <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                      <Image src={circleImg} alt="" className="lazy-img" />
                    </div>
                    <div className="text">
                      <p className="fs-22">Phone</p>
                      <Link href={`tel:${contactPhone.replace(/\s/g, '')}`} className="tran3s">
                        {contactPhone}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              
              {contactEmail && (
                <div className="block position-relative z-1 mt-25">
                  <div className="d-xl-flex align-items-center">
                    <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                      <Image src={circleImg} alt="" className="lazy-img" />
                    </div>
                    <div className="text">
                      <p className="fs-22">Email</p>
                      <Link href={`mailto:${contactEmail}`} className="tran3s">
                        {contactEmail}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contact Form and Map Section */}
      <div className="bg-pink mt-150 xl-mt-120 md-mt-80">
        <div className="row">
          {/* Contact Form - Right Side */}
          <div className="col-xl-7 col-lg-6 order-lg-last">
            <div className="form-style-one wow fadeInUp p-4 p-lg-5">
              {/* <h4 className="mb-4">Send us a Message</h4> */}
              <ContactForm />
            </div>
          </div>
          
          {/* Google Map - Left Side */}
          <div className="col-xl-5 col-lg-6 d-flex order-lg-first">
            <div className="contact-map-banner w-100">
              {googleMapEmbedUrl ? (
                <div 
                  className="gmap_canvas h-100 w-100"
                  dangerouslySetInnerHTML={{ 
                    __html: googleMapEmbedUrl.includes('iframe') 
                      ? googleMapEmbedUrl 
                      : `<iframe class="gmap_iframe h-100 w-100" src="${googleMapEmbedUrl}"></iframe>`
                  }}
                />
              ) : (
                <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light">
                  <p className="text-muted">No map configured</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactAreaDynamic
