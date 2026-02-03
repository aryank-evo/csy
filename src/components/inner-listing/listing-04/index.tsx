"use client"
import FooterOne from "@/layouts/footers/FooterOne"
import FancyBanner from "@/components/common/FancyBanner"
import ListingFourArea from "./ListingFourArea"
import HeaderOne from "@/layouts/headers/HeaderOne"

const ListingSix = () => {
   return (
      <>
         <HeaderOne style={true} />
         <ListingFourArea />
         <FancyBanner />
         <FooterOne style={true} />
      </>
   )
}

export default ListingSix;
