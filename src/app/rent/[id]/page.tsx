import ListingDetailsDynamic from "@/components/ListingDetails/ListingDetailsDynamic";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Rent Property Details - CSY Real Estate",
};

const RentPropertyDetailsPage = ({ params }: { params: { id: string } }) => {
   return (
      <Wrapper>
         <ListingDetailsDynamic id={params.id} type="rent" />
      </Wrapper>
   )
}

export default RentPropertyDetailsPage;
