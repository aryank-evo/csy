import GalleryContent from "@/components/inner-pages/GalleryContent";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Gallery - Real Estate",
};

const GalleryPage = () => {
   return (
      <Wrapper>
         <GalleryContent />
      </Wrapper>
   );
};

export default GalleryPage;
