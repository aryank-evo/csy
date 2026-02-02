"use client"
import FooterOne from "@/layouts/footers/FooterOne"
import ListingOneArea from "./ListingOneArea"
import FancyBanner from "@/components/common/FancyBanner"
import HeaderOne from "@/layouts/headers/HeaderOne"

const ListingOne = () => {
   return (
      <>
         <HeaderOne style={true} />
         <ListingOneArea />
         <FancyBanner />
           <FooterOne style={true} />
      </>
   )
}

export default ListingOne;
