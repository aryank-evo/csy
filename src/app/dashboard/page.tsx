import DashboardIndex from "@/components/dashboard/index";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Dashboard HOZN - Real Estate React Next js",
};

const DashboardPage = () => {
  return (
    <Wrapper>
      <DashboardIndex />
    </Wrapper>
  )
}

export default DashboardPage;