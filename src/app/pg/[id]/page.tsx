import ListingDetailsDynamic from "@/components/ListingDetails/ListingDetailsDynamic";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "PG Property Details - CSY Real Estate",
};

const PgPropertyDetailsPage = ({ params }: { params: { id: string } }) => {
   return (
      <Wrapper>
         <ListingDetailsDynamic id={params.id} type="pg" />
      </Wrapper>
   )
}

export default PgPropertyDetailsPage;
