import BreadcrumbThree from "@/components/common/breadcrumb/BreadcrumbThree"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderFour from "@/layouts/headers/HeaderFour"
import BlogOneArea from "./BlogOneArea"
import FancyBanner from "@/components/common/FancyBanner"

const BlogOne = () => {
   return (
      <>
         <HeaderFour />
         <BreadcrumbThree title="Blog Grid" link="#" link_title="Pages" sub_title="Blog" style={false} />
         <BlogOneArea />
         <FancyBanner />
         <FooterOne style={true} />
      </>
   )
}

export default BlogOne;
