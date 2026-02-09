"use client";
import ProjectDetails from "@/components/inner-pages/projects/project-details";
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
         <ProjectDetails />
      </Wrapper>
   )
}

export default Index