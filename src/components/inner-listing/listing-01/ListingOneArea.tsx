"use client"
import Image from "next/image"
import Link from "next/link"
import ReactPaginate from "react-paginate"
import NiceSelect from "@/ui/NiceSelect"
import UseShortedProperty from "@/hooks/useShortedProperty"
import DropdownOne from "@/components/search-dropdown/inner-dropdown/DropdownOne";

import icon from "@/assets/images/icon/icon_46.svg"
import featureIcon_1 from "@/assets/images/icon/icon_04.svg"
import featureIcon_2 from "@/assets/images/icon/icon_05.svg"
import featureIcon_3 from "@/assets/images/icon/icon_06.svg"

const ListingOneArea = () => {

   const itemsPerPage = 8;
   const page = "buy";

   const {
      itemOffset,
      sortedProperties,
      currentItems,
      pageCount,
      handlePageClick,
      handleBathroomChange,
      handleBedroomChange,
      handleSearchChange,
      handlePriceChange,
      maxPrice,
      priceValue,
      resetFilters,
      selectedAmenities,
      handleAmenityChange,
      handleLocationChange,
      handleStatusChange,
      handleTypeChange,
      locationOptions,
   } = UseShortedProperty({ itemsPerPage, page });

   const handleResetFilter = () => {
      resetFilters();
   };

   return (
      <div className="property-listing-six bg-pink-two pt-110 md-pt-80 pb-150 xl-pb-120 mt-150 xl-mt-120">
         <div className="container container-large">
            <div className="row">
               <div className="col-lg-8">
                  <div className="ps-xxl-5">
                     <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
                        <div>Showing <span className="color-dark fw-500">{itemOffset + 1}–{itemOffset + currentItems.length}</span> of <span
                           className="color-dark fw-500">{sortedProperties.length}</span> results</div>
                        <div className="d-flex align-items-center xs-mt-20">
                           <div className="short-filter d-flex align-items-center">
                              <div className="fs-16 me-2">Sort by:</div>
                              <NiceSelect
                                 className="nice-select"
                                 options={[
                                     
                                    { value: "price_low", text: "Price Low" },
                                    { value: "price_high", text: "Price High" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={handleTypeChange}
                                 name=""
                                 placeholder="" />
                           </div>
                           <Link href="/rent" className="tran3s layout-change rounded-circle ms-auto ms-sm-3"
                              data-bs-toggle="tooltip" title="Switch To List View">
                              <i className="fa-regular fa-bars"></i>
                           </Link>
                        </div>
                     </div>

                     <div className="row gx-xxl-5">
                        {currentItems.map((item: any) => (
                           <div key={item.id} className="col-md-6 d-flex mb-50 wow fadeInUp" data-wow-delay={item.data_delay_time}>
                              <div className="listing-card-one border-25 h-100 w-100">
                                 <div className="img-gallery p-15">
                                    <div className="position-relative border-25 overflow-hidden">
                                       <div className={`tag border-25 ${item.tag_bg}`}>{item.tag}</div>
                                       <Link href="#" className="fav-btn tran3s"><i className="fa-light fa-heart"></i></Link>
                                       <div id={`carousel${item.carousel}`} className="carousel slide">
                                          <div className="carousel-indicators">
                                             <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                             <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="1" aria-label="Slide 2"></button>
                                             <button type="button" data-bs-target={`#carousel${item.carousel}`} data-bs-slide-to="2" aria-label="Slide 3"></button>
                                          </div>
                                          <div className="carousel-inner">
                                             {item.carousel_thumb.map((thumb: any, i: any) => (
                                                <div key={i} className={`carousel-item ${thumb.active}`} data-bs-interval="1000000">
                                                   <Link href={`/buy/${item.id}`} className="d-block">
                                                      <Image 
                                                         src={thumb.img} 
                                                         className="w-100" 
                                                         alt="..." 
                                                         width={400} 
                                                         height={300} 
                                                         style={{ objectFit: 'cover' }}
                                                      />
                                                   </Link>
                                                </div>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="property-info p-25">
                                    <Link href={`/buy/${item.id}`} className="title tran3s">{item.title}</Link>
                                    <div className="address">{item.address}</div>
                                    <ul className="style-none feature d-flex flex-wrap align-items-center justify-content-between">
                                       <li className="d-flex align-items-center">
                                          <Image src={featureIcon_1} alt=""
                                             className="lazy-img icon me-2" />
                                          <span className="fs-16">{item.property_info.sqft} sqft</span>
                                       </li>
                                       <li className="d-flex align-items-center">
                                          <Image src={featureIcon_2} alt=""
                                             className="lazy-img icon me-2" />
                                          <span className="fs-16">{item.property_info.bed} bed</span>
                                       </li>
                                       <li className="d-flex align-items-center">
                                          <Image src={featureIcon_3} alt=""
                                             className="lazy-img icon me-2" />
                                          <span className="fs-16">{item.property_info.bath} bath</span>
                                       </li>
                                    </ul>
                                    <div className="pl-footer top-border d-flex align-items-center justify-content-between">
                                       <strong className="price fw-500 color-dark">
                                          ₹{item.price.toLocaleString(undefined, {
                                             minimumFractionDigits: item.price_text ? 0 : 2,
                                             maximumFractionDigits: 2
                                          })}{item.price_text && <>/<sub>m</sub></>}
                                       </strong>
                                       <Link href={`/buy/${item.id}`} className="btn-four rounded-circle"><i className="bi bi-arrow-up-right"></i></Link>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                     <ReactPaginate
                        breakLabel="..."
                        nextLabel={<Image src={icon} alt="" className="ms-2" />}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={pageCount}
                        pageCount={pageCount}
                        previousLabel={<Image src={icon} alt="" className="ms-2" />}
                        renderOnZeroPageCount={null}
                        className="pagination-one d-flex align-items-center justify-content-center justify-content-sm-start style-none pt-30"
                     />
                  </div>
               </div>

               <div className="col-lg-4 order-lg-first">
                  <div className="advance-search-panel dot-bg md-mt-80">
                     <div className="main-bg">
                        <DropdownOne
                           handleSearchChange={handleSearchChange}
                           handleBedroomChange={handleBedroomChange}
                           handleBathroomChange={handleBathroomChange}
                           handlePriceChange={handlePriceChange}
                           maxPrice={maxPrice}
                           priceValue={priceValue}
                           handleResetFilter={handleResetFilter}
                           selectedAmenities={selectedAmenities}
                           handleAmenityChange={handleAmenityChange}
                           handleLocationChange={handleLocationChange}
                           handleStatusChange={handleStatusChange}
                           locationOptions={locationOptions}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ListingOneArea
