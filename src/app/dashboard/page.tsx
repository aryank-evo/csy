import DashboardIndex from "@/components/dashboard/index";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <Wrapper>
      <DashboardIndex />
    </Wrapper>
  )
}

export default DashboardPage;