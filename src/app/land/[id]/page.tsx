import ListingDetailsDynamic from "@/components/ListingDetails/ListingDetailsDynamic";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Land Property Details - CSY Real Estate",
};

const LandPropertyDetailsPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <ListingDetailsDynamic id={params.id} type="land" />
    </Wrapper>
  )
}

export default LandPropertyDetailsPage;