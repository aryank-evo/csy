
"use client";
import Wrapper from "@/layouts/Wrapper";
import HomeTwo from "@/components/homes/home-two";
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
      <HomeTwo />
    </Wrapper>
  )
}

export default Index