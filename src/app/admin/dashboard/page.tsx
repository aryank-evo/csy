import AdminDashboardWrapper from "@/components/dashboard/admin/AdminDashboardWrapper";
import AdminDashboardIndex from "@/components/dashboard/admin/AdminDashboardIndex";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Admin Dashboard csy - Real Estate Admin Panel",
};

const AdminDashboardPage = () => {
  return (
    <Wrapper>
      <AdminDashboardWrapper>
        <AdminDashboardIndex />
      </AdminDashboardWrapper>
    </Wrapper>
  )
}

export default AdminDashboardPage;