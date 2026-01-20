"use client"
import dropdoun_data from "@/data/home-data/DropdownData";
import NiceSelect from "@/ui/NiceSelect";
import { useState } from "react";

const tab_title: string[] = ["Buy", "Rent", "Sell"];

const DropdownFour = () => {

   const selectHandler = (e: any) => { };
   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: any) => {
      setActiveTab(index);
   };

   const searchHandler = () => {
      const routes = ["/buy", "/rent", "/lease", "/pg"];
      window.location.href = routes[activeTab] || "/buy";
   };

   return (
      <div className="search-wrapper-two position-relative ms-xl-5 ms-lg-4 ps-xxl-4 md-mt-60">
         <nav className="search-filter-nav-two d-inline-flex">
            <div className="nav nav-tabs border-0" role="tablist">
               {tab_title.map((tab, index) => (
                  <button key={index} onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? "active" : ""}`} id="buy-tab" type="button">{tab}</button>
               ))}
            </div>
         </nav>

         <div className="bg-wrapper position-relative z-1">
            <h4 className="mb-35 xl-mb-30">Find & Buy Now!</h4>
            <div className="tab-content">
               <div className={`tab-pane show ${activeTab === 0 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">I’m looking to...</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={[
                                    { value: "buy", text: "Buy" },
                                    { value: "rent", text: "Rent" },
                                    { value: "lease", text: "Lease" },
                                    { value: "pg", text: "PG" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">Location</div>
                              <NiceSelect className="nice-select location fw-normal"
                                 options={[
                                    { value: "1", text: "Model Town" },
                                    { value: "2", text: "Sarabha Nagar" },
                                    { value: "3", text: "Gurdev Nagar" },
                                    { value: "4", text: "BRS Nagar" },
                                    { value: "5", text: "Civil Lines" },
                                    { value: "6", text: "South City" },
                                    { value: "7", text: "Pakhowal Road" },
                                    { value: "8", text: "Ferozepur Road" },
                                    { value: "9", text: "Dugri / Urban Estate Dugri" },
                                    { value: "10", text: "Rajguru Nagar" },
                                    { value: "11", text: "Sector-39 & Sector-39A" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-50 lg-mb-30">
                              <div className="label">Price Range</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={[
                                    { value: "1", text: "₹10,000 - ₹200,000" },
                                    { value: "2", text: "₹20,000 - ₹300,000" },
                                    { value: "3", text: "₹30,000 - ₹400,000" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one">
                              <button className="btn-five text-uppercase rounded-0 w-100">Search</button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div className={`tab-pane show ${activeTab === 1 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">I’m looking to...</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={[
                                    { value: "buy", text: "Buy" },
                                    { value: "rent", text: "Rent" },
                                    { value: "lease", text: "Lease" },
                                    { value: "pg", text: "PG" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">Location</div>
                              <NiceSelect className="nice-select location fw-normal"
                                 options={[
                                    { value: "1", text: "Model Town" },
                                    { value: "2", text: "Sarabha Nagar" },
                                    { value: "3", text: "Gurdev Nagar" },
                                    { value: "4", text: "BRS Nagar" },
                                    { value: "5", text: "Civil Lines" },
                                    { value: "6", text: "South City" },
                                    { value: "7", text: "Pakhowal Road" },
                                    { value: "8", text: "Ferozepur Road" },
                                    { value: "9", text: "Dugri / Urban Estate Dugri" },
                                    { value: "10", text: "Rajguru Nagar" },
                                    { value: "11", text: "Sector-39 & Sector-39A" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-50 lg-mb-30">
                              <div className="label">Price Range</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={[
                                    { value: "1", text: "₹10,000 - ₹200,000" },
                                    { value: "2", text: "₹20,000 - ₹300,000" },
                                    { value: "3", text: "₹30,000 - ₹400,000" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one">
                              <button className="btn-five text-uppercase rounded-0 w-100">Search</button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div className={`tab-pane show ${activeTab === 2 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">I’m looking to...</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={[
                                    { value: "buy", text: "Buy" },
                                    { value: "rent", text: "Rent" },
                                    { value: "lease", text: "Lease" },
                                    { value: "pg", text: "PG" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-25">
                              <div className="label">Location</div>
                              <NiceSelect className="nice-select location fw-normal"
                                 options={[
                                    { value: "1", text: "Model Town" },
                                    { value: "2", text: "Sarabha Nagar" },
                                    { value: "3", text: "Gurdev Nagar" },
                                    { value: "4", text: "BRS Nagar" },
                                    { value: "5", text: "Civil Lines" },
                                    { value: "6", text: "South City" },
                                    { value: "7", text: "Pakhowal Road" },
                                    { value: "8", text: "Ferozepur Road" },
                                    { value: "9", text: "Dugri / Urban Estate Dugri" },
                                    { value: "10", text: "Rajguru Nagar" },
                                    { value: "11", text: "Sector-39 & Sector-39A" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one bottom-border mb-50 lg-mb-30">
                              <div className="label">Price Range</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={[
                                    { value: "1", text: "₹10,000 - ₹200,000" },
                                    { value: "2", text: "₹20,000 - ₹300,000" },
                                    { value: "3", text: "₹30,000 - ₹400,000" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-12">
                           <div className="input-box-one">
                              <button className="btn-five text-uppercase rounded-0 w-100">Search</button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DropdownFour
