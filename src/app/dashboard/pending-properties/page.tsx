'use client';
import React from 'react';

// import PendingPropertyList from "src/components/dashboard/pending-properties-list";
import PendingPropertyList from "../../../components/dashboard/pending-properties-list";

import Wrapper from "@/layouts/Wrapper";



const PendingPropertiesPage = () => {
  return (
    <Wrapper>
      <PendingPropertyList />
    </Wrapper>
  );
};

export default PendingPropertiesPage;