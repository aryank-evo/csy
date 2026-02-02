"use client"
import FooterOne from "@/layouts/footers/FooterOne"
import FancyBanner from "@/components/common/FancyBanner"
import ListingTwoArea from "./ListingTwoArea"
import HeaderOne from "@/layouts/headers/HeaderOne"

const ListingTwo = () => {
   return (
      <>
         <HeaderOne style={true} />
         <ListingTwoArea style={false} />
         <FancyBanner />
         <FooterOne style={true} />
      </>
   )
}

export default ListingTwo;
