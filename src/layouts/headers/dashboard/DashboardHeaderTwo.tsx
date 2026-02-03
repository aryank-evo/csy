"use client"
import Image from "next/image"
import Link from "next/link"
import Notification from "./Notification";
import Profile from "./Profile";
import { useState } from "react";
import DashboardHeaderOne from "./DashboardHeaderOne";
import PropertyTypeModalTrigger from "@/components/common/PropertyTypeModalTrigger";

import dashboardIcon_1 from "@/assets/images/dashboard/icon/icon_43.svg";
import dashboardIcon_2 from "@/assets/images/dashboard/icon/icon_11.svg";
import dashboardAvatar from "@/assets/images/dashboard/avatar_01.jpg";

const DashboardHeaderTwo = ({title}:any) => {

   const [isActive, setIsActive] = useState<boolean>(false);

   return (
      <>
         <header className="dashboard-header">
            <div className="d-flex align-items-center justify-content-start">
               <h4 className="m0 d-none d-lg-block">{title}</h4>
            </div>
         </header>
         <DashboardHeaderOne isActive={isActive} setIsActive={setIsActive} />
      </>
   )
}

export default DashboardHeaderTwo
