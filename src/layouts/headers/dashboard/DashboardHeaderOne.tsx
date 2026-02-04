"use client"
import Image from "next/image"
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'
import PropertyTypeModalTrigger from '@/components/common/PropertyTypeModalTrigger';
import { toast } from "react-toastify";

import dashboardLogo from "@/assets/images/logo/logo.png";
import dashboardIconActive_1 from "@/assets/images/dashboard/icon/icon_1_active.svg";
import dashboardIcon_1 from "@/assets/images/dashboard/icon/icon_1.svg";
import dashboardIconActive_2 from "@/assets/images/dashboard/icon/icon_2_active.svg";
import dashboardIcon_2 from "@/assets/images/dashboard/icon/icon_2.svg";
import dashboardIconActive_3 from "@/assets/images/dashboard/icon/icon_3_active.svg";
import dashboardIcon_3 from "@/assets/images/dashboard/icon/icon_3.svg";
import dashboardIconActive_4 from "@/assets/images/dashboard/icon/icon_4_active.svg";
import dashboardIcon_4 from "@/assets/images/dashboard/icon/icon_4.svg";
import dashboardIconActive_5 from "@/assets/images/dashboard/icon/icon_5_active.svg";
import dashboardIcon_5 from "@/assets/images/dashboard/icon/icon_5.svg";
import dashboardIconActive_6 from "@/assets/images/dashboard/icon/icon_6_active.svg";
import dashboardIcon_6 from "@/assets/images/dashboard/icon/icon_6.svg";
import dashboardIconActive_7 from "@/assets/images/dashboard/icon/icon_7_active.svg";
import dashboardIcon_7 from "@/assets/images/dashboard/icon/icon_7.svg";
import dashboardIconActive_8 from "@/assets/images/dashboard/icon/icon_8_active.svg";
import dashboardIcon_8 from "@/assets/images/dashboard/icon/icon_8.svg";
import dashboardIconActive_9 from "@/assets/images/dashboard/icon/icon_9_active.svg";
import dashboardIcon_9 from "@/assets/images/dashboard/icon/icon_9.svg";
import dashboardIconActive_10 from "@/assets/images/dashboard/icon/icon_10_active.svg";
import dashboardIcon_10 from "@/assets/images/dashboard/icon/icon_10.svg";
import dashboardIcon_11 from "@/assets/images/dashboard/icon/icon_41.svg";

const DashboardHeaderOne = ({ isActive, setIsActive }: any) => {
   const pathname = usePathname();
   const router = useRouter();

   const handleLogout = (e: React.MouseEvent) => {
      e.preventDefault();
      try {
         localStorage.removeItem('token');
         localStorage.removeItem('userData');
         toast.success("Logged out successfully");
         router.push('/');
      } catch (error) {
         console.error("Logout error:", error);
         router.push('/');
      }
   };

   return (
      <aside className={`dash-aside-navbar ${isActive ? "show" : ""}`}>
         <div className="position-relative">
            <div className="logo d-md-block d-flex align-items-center justify-content-between plr bottom-line pb-30">
               <Link href="/dashboard">
                  <Image src={dashboardLogo} alt="" />
               </Link>
               <button onClick={() => setIsActive(false)} className="close-btn d-block d-md-none"><i className="fa-light fa-circle-xmark"></i></button>
            </div>
            <nav className="dasboard-main-nav pt-30 pb-30 bottom-line">
               <ul className="style-none">
                  <li className="plr"><Link href="/dashboard/" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/dashboard' || pathname === '/dashboard' ? 'active' : ''}`}>
                     <Image src={pathname === '/dashboard/dashboard' || pathname === '/dashboard' ? dashboardIconActive_1 : dashboardIcon_1} alt="" />
                     <span>Dashboard</span>
                  </Link></li>
                  <li className="plr"><Link href="/dashboard/cms" className={`d-flex w-100 align-items-center ${pathname === '/dashboard/cms' ? 'active' : ''}`}>
                     <Image src={pathname === '/dashboard/cms' ? dashboardIconActive_2 : dashboardIcon_2} alt="" />
                     <span>CMS Management</span>
                  </Link></li>
               </ul>
            </nav>

            <div className="plr">
               <button onClick={handleLogout} className="d-flex w-100 align-items-center logout-btn border-0 bg-transparent p-0">
                  <div className="icon tran3s d-flex align-items-center justify-content-center rounded-circle"><Image src={dashboardIcon_11} alt="" /></div>
                  <span>Logout</span>
               </button>
            </div>
         </div>
      </aside>
   )
}

export default DashboardHeaderOne;
