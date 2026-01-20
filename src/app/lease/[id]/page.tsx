import ListingDetailsDynamic from "@/components/ListingDetails/ListingDetailsDynamic";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Lease Property Details - CSY Real Estate",
};

const LeasePropertyDetailsPage = ({ params }: { params: { id: string } }) => {
   return (
      <Wrapper>
         <ListingDetailsDynamic id={params.id} type="lease" />
      </Wrapper>
   )
}

export default LeasePropertyDetailsPage;
