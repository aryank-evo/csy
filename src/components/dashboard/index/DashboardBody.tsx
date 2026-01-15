"use client"
import { useState, useEffect } from "react"
import Image, { StaticImageData } from "next/image"
import NiceSelect from "@/ui/NiceSelect"
import RecentMessage from "./RecentMessage"
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo"
import AllPropertiesTab from "../AllPropertiesTab"

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
   console.log("DashboardBody component rendered");
   const [properties, setProperties] = useState<any[]>([]);
   const [activeTab, setActiveTab] = useState<"overview" | "all-properties">("overview");
   const [loading, setLoading] = useState(true);
   const [stats, setStats] = useState({
      totalProperties: 0,
      pending: 0,
      views: 0,
      favourites: 0
   });

   useEffect(() => {
      const fetchProperties = async () => {
         try {
            console.log("Fetching properties from API...");
            const response = await fetch("http://localhost:5000/api/properties/all-combined", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            });
            
            console.log("Response status:", response.status);
            
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            console.log("API Response:", data);
            
            if (data.success) {
               setProperties(data.data);
               setStats({
                  totalProperties: data.count,
                  pending: data.data.filter((p: any) => p.approvalStatus === "pending").length,
                  views: data.count * 50, // Mock view count
                  favourites: Math.floor(data.count * 0.1) // Mock favourite count
               });
               console.log("Properties set:", data.data);
            }
         } catch (error) {
            console.error("Error fetching properties:", error);
         } finally {
            setLoading(false);
         }
      };

      fetchProperties();
   }, []);

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
                           Showing {properties.length} properties
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
            ) : (
               <AllPropertiesTab />
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
