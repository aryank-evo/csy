import Link from "next/link"
import Image from "next/image";
import DeleteModal from "@/modals/DeleteModal";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import profileIcon_1 from "@/assets/images/dashboard/icon/icon_23.svg";
import profileIcon_2 from "@/assets/images/dashboard/icon/icon_24.svg";
import profileIcon_3 from "@/assets/images/dashboard/icon/icon_25.svg";

const Profile = () => {
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
      <>
         <div className="user-name-data">
            <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
               <li>
                  <Link className="dropdown-item d-flex align-items-center" href="/profile"><Image src={profileIcon_1} alt="" className="lazy-img" /><span className="ms-2 ps-1">Profile</span></Link>
               </li>
               <li>
                  <Link className="dropdown-item d-flex align-items-center" href="/account-settings"><Image src={profileIcon_2} alt="" className="lazy-img" /><span className="ms-2 ps-1">Account Settings</span></Link>
               </li>
               <li>
                  <button onClick={handleLogout} className="dropdown-item d-flex align-items-center border-0 bg-transparent w-100">
                     <Image src={profileIcon_3} alt="" className="lazy-img" style={{filter: 'hue-rotate(150deg)'}} />
                     <span className="ms-2 ps-1">Logout</span>
                  </button>
               </li>
               <li>
                  <Link className="dropdown-item d-flex align-items-center" href="#" data-bs-toggle="modal" data-bs-target="#deleteModal"><Image src={profileIcon_3} alt="" className="lazy-img"/><span className="ms-2 ps-1">Delete Account</span></Link>
               </li>
            </ul>
         </div>
         <DeleteModal />
      </>
   )
}

export default Profile
