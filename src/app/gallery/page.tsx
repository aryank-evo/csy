import GalleryContent from "@/components/inner-pages/GalleryContent";
import Wrapper from "@/layouts/Wrapper";
import HeaderTwo from "@/layouts/headers/HeaderTwo";
import FooterOne from "@/layouts/footers/FooterOne";

export const metadata = {
   title: "Gallery - Real Estate",
};

const GalleryPage = () => {
   return (
      <Wrapper>
         <HeaderTwo style_1={false} style_2={false} />
         <GalleryContent />
         <FooterOne style={true} />
      </Wrapper>
   );
};

export default GalleryPage;
