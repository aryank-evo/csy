import HeaderFour from "@/layouts/headers/HeaderFour"
import BlogDetailsArea from "./BlogDetailsArea"
import FancyBanner from "@/components/common/FancyBanner"
import FooterOne from "../../../layouts/footers/FooterOne"

const BlogDetails = () => {
   return (
      <>
         <HeaderFour />
         <BlogDetailsArea />
         <FancyBanner />
         <FooterOne style={true} />
      </>
   )
}

export default BlogDetails
