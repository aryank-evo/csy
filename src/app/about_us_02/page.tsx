"use client";
import AboutUsTwo from "@/components/inner-pages/about-us/about-us-two";
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
         <AboutUsTwo />
      </Wrapper>
   )
}

export default Index