import ListingDetailsDynamic from "@/components/ListingDetails/ListingDetailsDynamic";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Buy Property Details - CSY Real Estate",
};

const BuyPropertyDetailsPage = ({ params }: { params: { id: string } }) => {
   return (
      <Wrapper>
         <ListingDetailsDynamic id={params.id} type="sale" />
      </Wrapper>
   )
}

export default BuyPropertyDetailsPage;
