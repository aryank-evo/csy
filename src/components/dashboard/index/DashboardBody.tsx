"use client"
import { useState, useEffect } from "react"
import Image, { StaticImageData } from "next/image"
import NiceSelect from "@/ui/NiceSelect"
import RecentMessage from "./RecentMessage"
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo"
import AllPropertiesTab from "../AllPropertiesTab"
import CmsDashboard from "../cms/CmsDashboard"
import { useQuery } from "@tanstack/react-query"
import apiInstance from "@/utils/apiInstance"

import icon_1 from "@/assets/images/dashboard/icon/icon_12.svg"
import icon_2 from "@/assets/images/dashboard/icon/icon_13.svg"
import icon_3 from "@/assets/images/dashboard/icon/icon_14.svg"
import icon_4 from "@/assets/images/dashboard/icon/icon_15.svg"
import DashboardChart from "./DashboardChart"

interface DataType {
   id: number;
   icon: StaticImageData;
   title: string;
   value: string;
   class_name?: string;
}

const getDashboardCardData = (stats: any): DataType[] => [
   {
      id: 1,
      icon: icon_1,
      title: "All Properties",
      value: stats.totalProperties.toString(),
      class_name: "skew-none",
   },
   {
      id: 2,
      icon: icon_2,
      title: "Total Pending",
      value: stats.pending.toString(),
   },
   {
      id: 3,
      icon: icon_3,
      title: "Total Views",
      value: stats.views.toLocaleString(),
   },
   {
      id: 4,
      icon: icon_4,
      title: "Total Favourites",
      value: stats.favourites.toString(),
   },
];

const DashboardBody = () => {
   const [activeTab, setActiveTab] = useState<"overview" | "all-properties" | "cms">("overview");

   // Clean up any lingering modal backdrops when component mounts
   useEffect(() => {
      const cleanupModals = () => {
         // Remove any lingering modal backdrops
         const existingBackdrops = document.querySelectorAll('.modal-backdrop');
         existingBackdrops.forEach(backdrop => {
            if (backdrop.parentNode) {
               backdrop.parentNode.removeChild(backdrop);
            }
         });
         
         // Remove any body classes that might remain from modals
         if (document.body.classList.contains('modal-open')) {
            document.body.classList.remove('modal-open');
         }
      };
      
      // Run cleanup immediately
      cleanupModals();
      
      // Also run on component unmount
      return () => {
         cleanupModals();
      };
   }, []);

   const { data: propertiesData, isLoading: loading } = useQuery({
      queryKey: ["properties", "all-combined"],
      queryFn: async () => {
         const response = await apiInstance.get("/properties/all-combined");
         return response.data;
      }
   });

   const properties = propertiesData?.data || [];
   const stats = {
      totalProperties: propertiesData?.count || 0,
      pending: properties.filter((p: any) => p.approvalStatus === "pending").length,
      views: (propertiesData?.count || 0) * 50,
      favourites: Math.floor((propertiesData?.count || 0) * 0.1)
   };

   const selectHandler = (e: any) => { };

   return (
      <div className="dashboard-body">
         <div className="position-relative">
            <DashboardHeaderTwo title="Dashboard" />

            <h2 className="main-title d-block d-lg-none">Dashboard</h2>
            
            {/* Tab Navigation */}
            <div className="bg-white border-20 mb-4">
               <div className="d-flex border-bottom">
                  <button
                     className={`flex-fill py-3 px-4 text-center border-0 ${activeTab === "overview" ? "bg-primary text-white" : "bg-light text-dark"}`}
                     onClick={() => setActiveTab("overview")}
                  >
                     <i className="bi bi-speedometer2 me-2"></i>Overview
                  </button>
                  <button
                     className={`flex-fill py-3 px-4 text-center border-0 ${activeTab === "all-properties" ? "bg-primary text-white" : "bg-light text-dark"}`}
                     onClick={() => setActiveTab("all-properties")}
                  >
                     <i className="bi bi-house-door me-2"></i>All Properties
                  </button>
                  <button
                     className={`flex-fill py-3 px-4 text-center border-0 ${activeTab === "cms" ? "bg-primary text-white" : "bg-light text-dark"}`}
                     onClick={() => setActiveTab("cms")}
                  >
                     <i className="bi bi-pencil-square me-2"></i>CMS Management
                  </button>
               </div>
            </div>

            {activeTab === "overview" ? (
               <>
                  <div className="bg-white border-20">
                     <div className="row">
                        {getDashboardCardData(stats).map((item) => (
                           <div key={item.id} className="col-lg-3 col-6">
                              <div className={`dash-card-one bg-white border-30 position-relative mb-15 ${item.class_name}`}>
                                 <div className="d-sm-flex align-items-center justify-content-between">
                                    <div className="icon rounded-circle d-flex align-items-center justify-content-center order-sm-1"><Image src={item.icon} alt="" className="lazy-img" /></div>
                                    <div className="order-sm-0">
                                       <span>{item.title}</span>
                                       <div className="value fw-500">{item.value}</div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Property Listings Section - TEST VERSION */}
                  <div className="bg-white border-20 mt-30">
                     <div className="d-flex align-items-center justify-content-between plr">
                        <h5 className="dash-title-two">Recent Property Listings</h5>
                        <div className="fs-14 text-muted">
                           {loading ? "Loading properties..." : `Showing ${properties.length} properties`}
                        </div>
                     </div>
                     
                     <div className="property-listings plr">
                        <div className="row">
                           {properties.slice(0, 6).map((property: any) => (
                              <div key={property.id} className="col-lg-4 col-md-6 mb-25">
                                 <div className="property-card border rounded-3 p-3">
                                    <h6 className="fw-500 mb-2">{property.title || "Untitled Property"}</h6>
                                    <div className="d-flex justify-content-between text-muted small">
                                       <span>Status: {property.approvalStatus || "N/A"}</span>
                                       <span>Type: {property.propertyType || "N/A"}</span>
                                    </div>
                                    {property.price && (
                                       <div className="mt-2 text-success fw-500">
                                          ₹{property.price.toLocaleString()}
                                       </div>
                                    )}
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </>
            ) : activeTab === "all-properties" ? (
               <AllPropertiesTab />
            ) : (
               <CmsDashboard />
            )}



            <div className="row gx-xxl-5 d-flex pt-15 lg-pt-10">
               <div className="col-xl-7 col-lg-6 d-flex flex-column">
                  <div className="user-activity-chart bg-white border-20 mt-30 h-100">
                     <div className="d-flex align-items-center justify-content-between plr">
                        <h5 className="dash-title-two">Property View</h5>
                        <div className="short-filter d-flex align-items-center">
                           <div className="fs-16 me-2">Short by:</div>
                           <NiceSelect className="nice-select fw-normal"
                              options={[
                                 { value: "1", text: "Weekly" },
                                 { value: "2", text: "Daily" },
                                 { value: "3", text: "Monthly" },
                              ]}
                              defaultCurrent={0}
                              onChange={selectHandler}
                              name=""
                              placeholder="" />
                        </div>
                     </div>
                     <div className="plr mt-50">
                        <div className="chart-wrapper">
                           <DashboardChart />
                        </div>
                     </div>
                  </div>
               </div>

               <div className="col-xl-5 col-lg-6 d-flex">
                  <div className="recent-job-tab bg-white border-20 mt-30 plr w-100">
                     <h5 className="dash-title-two">Recent Message</h5>
                     <RecentMessage/>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DashboardBody
