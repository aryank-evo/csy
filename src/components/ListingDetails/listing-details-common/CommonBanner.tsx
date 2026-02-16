import Link from "next/link"

const CommonBanner = ({ property, style_3 }: any) => {
   const { title, address, price, propertyType, fieldVisibility } = property || {};
   
   // Helper function to check if a field should be visible
   const isFieldVisible = (fieldKey: string) => {
      if (!fieldVisibility) return true; // Show all if no visibility settings
      return fieldVisibility[fieldKey] !== false; // Show if not explicitly hidden
   };

   return (
      <div className="row">
         <div className="col-lg-6">
            {isFieldVisible('title') && <h3 className="property-titlee">{title || "Property Details"}</h3>}
            <div className="d-flex flex-wrap mt-10">
               {isFieldVisible('propertyType') && <div className={`list-type text-uppercase mt-15 me-3 ${style_3 ? "bg-white text-dark fw-500" : "text-uppercase border-20"}`}>
                  FOR {propertyType?.toUpperCase() || "SALE"}
               </div>}
               {isFieldVisible('address') && <div className="address mt-15"><i className="bi bi-geo-alt"></i> {address || "Location not available"}
               </div>}
            </div>
         </div>
         <div className="col-lg-6 text-lg-end">
            <div className="d-inline-block md-mt-40">
               {isFieldVisible('price') && <div className="price color-dark fw-500">Price: ₹{price?.toLocaleString() || "0"}</div>}
               {/* <div className="est-price fs-20 mt-25 mb-35 md-mb-30">Est. Payment <span
                  className="fw-500 color-dark">₹8,343/mo*</span></div> */}
               <ul className="style-none d-flex align-items-center action-btns">
                  <li className="me-auto fw-500 color-dark"><i className="fa-sharp fa-regular fa-share-nodes me-2"></i>
                     Share</li>
                  <li>
                     <a href={`https://wa.me/?text=Check%20out%20this%20property:%20${window.location.href}`} className="d-flex align-items-center justify-content-center tran3s"><i className="fa-brands fa-whatsapp"></i></a>
                  </li>
                  {/* <li><Link href="#"
                     className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i
                        className="fa-light fa-heart"></i></Link></li>
                  <li><Link href="#"
                     className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i
                        className="fa-light fa-bookmark"></i></Link></li>
                  <li><Link href="#"
                     className={`d-flex align-items-center justify-content-center tran3s ${style_3 ? "" : "rounded-circle"}`}><i
                        className="fa-light fa-circle-plus"></i></Link></li> */}
               </ul>
            </div>
         </div>
      </div>
   )
}

export default CommonBanner
