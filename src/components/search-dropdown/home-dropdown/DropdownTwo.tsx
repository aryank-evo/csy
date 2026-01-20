"use client"
import { useState } from "react";
import NiceSelect from "@/ui/NiceSelect";

const tab_title: string[] = ["Buy", "Rent", "Lease", "PG"];

const DropdownTwo = () => {

   const [activeTab, setActiveTab] = useState(0);
   const [selectedPropertyType, setSelectedPropertyType] = useState(0);

   const selectHandler = (e: any) => {
      // Update selected property type when dropdown is changed
      if (e && e.target && e.target.value !== undefined) {
         const selectedIndex = parseInt(e.target.value);
         setSelectedPropertyType(selectedIndex);
      }
   };

   const handleTabClick = (index: any) => {
      setActiveTab(index);
      setSelectedPropertyType(index);
   };

   const searchHandler = () => {
      const routes = ["/buy", "/rent", "/lease", "/pg"];
      window.location.href = routes[activeTab] || "/buy";
   };

   return (
      <div className="search-wrapper-one layout-two mt-60 lg-mt-40 position-relative">
         <nav className="search-filter-nav-one d-flex">
            <div className="nav nav-tabs border-0" role="tablist">
               {tab_title.map((tab, index) => (
                  <button key={index} onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? "active" : ""}`} id="buy-tab" type="button">{tab}</button>
               ))}
            </div>
         </nav>

         <div className="bg-wrapper border-0 rounded-0">
            <div className="tab-content">
               <div className={`tab-pane show ${activeTab === 0 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-xl-2 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">I&#39;m looking to...</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={[
                                    { value: "kothi", text: "Kothi" },
                                    { value: "flat", text: "Flat" },
                                    { value: "office", text: "Office" },
                                    { value: "godown", text: "Godown" },
                                    { value: "commercial_property", text: "Commercial Property" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
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
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">Keyword</div>
                              <input type="text" placeholder="buy, home, loft, apartment" className="type-input" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
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
                        <div className="col-xl-1">
                           <div className="input-box-one lg-mt-10">
                              <button className="fw-500 text-uppercase tran3s search-btn-two"><i
                                 className="fa-light fa-magnifying-glass"></i></button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div className={`tab-pane show ${activeTab === 1 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-xl-2 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">I&#39;m looking to...</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={[
                                    { value: "kothi", text: "Kothi" },
                                    { value: "flat", text: "Flat" },
                                    { value: "office", text: "Office" },
                                    { value: "godown", text: "Godown" },
                                    { value: "commercial_property", text: "Commercial Property" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
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
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">Keyword</div>
                              <input type="text" placeholder="buy, home, loft, apartment" className="type-input" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
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
                        <div className="col-xl-1">
                           <div className="input-box-one lg-mt-10">
                              <button className="fw-500 text-uppercase tran3s search-btn-two"><i
                                 className="fa-light fa-magnifying-glass"></i></button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div className={`tab-pane show ${activeTab === 2 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-xl-2 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">I&#39;m looking to...</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={[
                                    { value: "godown", text: "Godown" },
                                    { value: "petrol_pump", text: "Petrol Pump" },
                                    { value: "school", text: "School" },
                                    { value: "hotel", text: "Hotel" },
                                    { value: "resort", text: "Resort" },
                                    { value: "land", text: "Land" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
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
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">Keyword</div>
                              <input type="text" placeholder="lease, office, warehouse" className="type-input" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">Price Range</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={[
                                    { value: "1", text: "₹50,000 - ₹500,000" },
                                    { value: "2", text: "₹500,000 - ₹1,000,000" },
                                    { value: "3", text: "₹1,000,000 - ₹2,000,000" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-xl-1">
                           <div className="input-box-one lg-mt-10">
                              <button className="fw-500 text-uppercase tran3s search-btn-two"><i
                                 className="fa-light fa-magnifying-glass"></i></button>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               <div className={`tab-pane show ${activeTab === 3 ? "active" : ""}`} id="buy">
                  <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
                     <div className="row gx-0 align-items-center">
                        <div className="col-xl-2 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">I&#39;m looking to...</div>
                              <NiceSelect className="nice-select fw-normal"
                                 options={[
                                    { value: "co_ed_pg", text: "Co-ed PG" },
                                    { value: "girls_pg", text: "Girls PG" },
                                    { value: "boys_pg", text: "Boys PG" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
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
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">Keyword</div>
                              <input type="text" placeholder="pg, hostel, roommate" className="type-input" />
                           </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                           <div className="input-box-one border-left">
                              <div className="label">Price Range</div>
                              <NiceSelect
                                 className="nice-select fw-normal"
                                 options={[
                                    { value: "1", text: "₹5,000 - ₹10,000" },
                                    { value: "2", text: "₹10,000 - ₹15,000" },
                                    { value: "3", text: "₹15,000 - ₹25,000" },
                                 ]}
                                 defaultCurrent={0}
                                 onChange={selectHandler}
                                 name=""
                                 placeholder="" />
                           </div>
                        </div>
                        <div className="col-xl-1">
                           <div className="input-box-one lg-mt-10">
                              <button className="fw-500 text-uppercase tran3s search-btn-two"><i
                                 className="fa-light fa-magnifying-glass"></i></button>
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

export default DropdownTwo
