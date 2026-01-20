"use client"
import HeaderOne from "@/layouts/headers/HeaderOne"
import ListingDetailsDynamicArea from "./ListingDetailsDynamicArea"
import FancyBanner from "@/components/common/FancyBanner"
import FooterFour from "@/layouts/footers/FooterFour"

const ListingDetailsDynamic = ({ id, type }: { id: string, type?: string }) => {
  return (
    <>
      <HeaderOne style={true} />
      <ListingDetailsDynamicArea id={id} type={type} />
      <FancyBanner />
      <FooterFour />
    </>
  )
}

export default ListingDetailsDynamic
