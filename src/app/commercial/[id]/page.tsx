import ListingDetailsDynamic from "@/components/ListingDetails/ListingDetailsDynamic";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Commercial Property Details - CSY Real Estate",
};

const CommercialPropertyDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <ListingDetailsDynamic id={params.id} type="commercial" />
    </Wrapper>
  )
}

export default CommercialPropertyDetailsPage;