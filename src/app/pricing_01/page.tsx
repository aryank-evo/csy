"use client";
import PricingOne from "@/components/inner-pages/pricing/pricing-one";
import Wrapper from "@/layouts/Wrapper";
import { useState, useEffect } from "react";

const Index = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) {
      return null; // Prevent SSR issues
   }

   return (
      <Wrapper>
         <PricingOne />
      </Wrapper>
   )
}

export default Index