import TestDynamicContent from "@/components/TestDynamicContent";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Test Dynamic Content - csy",
};

const TestPage = () => {
   return (
      <Wrapper>
         <TestDynamicContent />
      </Wrapper>
   )
}

export default TestPage