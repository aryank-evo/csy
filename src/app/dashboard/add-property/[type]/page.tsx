'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Wrapper from '@/layouts/Wrapper';
import SellPropertyForm from '@/components/forms/listings/SellPropertyForm';
import RentPropertyForm from '@/components/forms/listings/RentPropertyForm';
import PgPropertyForm from '@/components/forms/listings/PgPropertyForm';
import LeasePropertyForm from '@/components/forms/listings/LeasePropertyForm';
import CommercialPropertyForm from '@/components/forms/listings/CommercialPropertyForm';
import LandPropertyForm from '@/components/forms/listings/LandPropertyForm';

const AddPropertyByTypePage = () => {
  const params = useParams();
  const propertyType = params.type as string;

  // Map property type to its corresponding form component
  const renderPropertyForm = () => {
    switch (propertyType) {
      case 'sell':
        return <SellPropertyForm />;
      case 'rent':
        return <RentPropertyForm />;
      case 'pg':
        return <PgPropertyForm />;
      case 'lease':
        return <LeasePropertyForm />;
      case 'commercial':
        return <CommercialPropertyForm />;
      case 'land':
        return <LandPropertyForm />;
      default:
        return (
          <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Invalid Property Type</h2>
            <p className="text-gray-600 text-center">
              Please select a valid property type from the listing selection page.
            </p>
          </div>
        );
    }
  };

  return (
    <Wrapper>
      <div className="pt-25 lg:pt-30 pb-20 lg:pb-25">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center">
            <div className="w-full">
              <div className="section-title mb-8 text-center">
                <h2 className="text-3xl font-bold text-heading">Add Property</h2>
              </div>
            </div>
          </div>
          {renderPropertyForm()}
        </div>
      </div>
    </Wrapper>
  );
};

export default AddPropertyByTypePage;