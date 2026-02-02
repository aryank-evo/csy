import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import BlogThreeArea from "./BlogThreeArea"
import FancyBanner from "@/components/common/FancyBanner"

const BlogThree = () => {
   return (
      <>
         <HeaderOne style={true} />
         <BreadcrumbOne title="Our Blog" link="/" link_title="Home" sub_title="Blog" style={true} />
         <BlogThreeArea />
         <FancyBanner />
           <FooterOne style={true} />
      </>
   )
}

export default BlogThree
