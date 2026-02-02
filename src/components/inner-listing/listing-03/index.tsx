"use client"
import FooterOne from "@/layouts/footers/FooterOne"
import FancyBanner from "@/components/common/FancyBanner"
import ListingThreeArea from "./ListingThreeArea"
import HeaderOne from "@/layouts/headers/HeaderOne"

const ListingSix = () => {
   return (
      <>
         <HeaderOne style={true} />
         <ListingThreeArea style={false} />
         <FancyBanner />
           <FooterOne style={true} />
      </>
   )
}

export default ListingSix;
