import FooterOne from "@/layouts/footers/FooterOne"
import HeroBanner from "./HeroBanner"
import FeedbackOne from "./FeedbackOne"
import Property from "./Property"
import BLockFeatureOne from "./BLockFeatureOne"
import FancyBannerOne from "./FancyBannerOne"
import BLockFeatureTwo from "./BLockFeatureTwo"
import FeedbackTwo from "./FeedbackTwo"
import GoogleReviews from "./GoogleReviews"
import Blog from "./Blog"
import FAQ from "./FAQ"
import FancyBannerTwo from "./FancyBannerTwo"
import HeaderOne from "@/layouts/headers/HeaderOne"

const HomeTwo = () => {
  return (
    <>
      <HeaderOne style={true} />
      <HeroBanner />
      <FeedbackOne />
      <Property />
      <BLockFeatureOne />
      <FancyBannerOne />
      <BLockFeatureTwo />
      <FeedbackTwo />
      {/* <GoogleReviews /> */}
      {/* <Blog style={false} /> */}
      <FAQ />
      <FancyBannerTwo/>
      <FooterOne style={true} />
    </>
  )
}

export default HomeTwo
