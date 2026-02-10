import Wrapper from "@/layouts/Wrapper";
import CmsDashboard from "@/components/dashboard/cms/CmsDashboard";
import DashboardHeaderTwo from "@/layouts/headers/dashboard/DashboardHeaderTwo";

export const metadata = {
   title: "CMS Management - csy Real Estate",
};

const CmsPage = () => {
   return (
      <Wrapper>
         <div className="dashboard-body">
            <div className="position-relative">
               <DashboardHeaderTwo title="CMS Management" />
               <h2 className="main-title d-block d-lg-none">CMS Management</h2>
               <CmsDashboard />
            </div>
         </div>
      </Wrapper>
   )
}

export default CmsPage;
