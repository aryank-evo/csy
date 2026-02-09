"use client";
import ListingTwelve from "@/components/inner-listing/listing-12";
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
         <ListingTwelve />
      </Wrapper>
   )
}

export default Index