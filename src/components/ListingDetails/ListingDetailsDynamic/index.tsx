"use client"
import HeaderOne from "@/layouts/headers/HeaderOne"
import ListingDetailsDynamicArea from "./ListingDetailsDynamicArea"
import FancyBanner from "@/components/common/FancyBanner"
import FooterOne from "@/layouts/footers/FooterOne"

const ListingDetailsDynamic = ({ id, type }: { id: string, type?: string }) => {
  return (
    <>
      <HeaderOne style={true} />
      <ListingDetailsDynamicArea id={id} type={type} />
      <FancyBanner />
        <FooterOne style={true} />
    </>
  )
}

export default ListingDetailsDynamic
