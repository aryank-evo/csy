'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ListingTypeSelection = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const listingTypes = [
    { id: 'sell', label: 'Sell', icon: '🏠' },
    { id: 'rent', label: 'Rent', icon: '🏢' },
    { id: 'lease', label: 'Lease', icon: '🏢' },
    { id: 'pg', label: 'PG (Pay Guest)', icon: '🛏️' },
    { id: 'commercial', label: 'Commercial', icon: '🏢' },
  ];

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
  };

  const handleSubmit = () => {
    if (selectedType) {
      router.push(`/dashboard/add-property/${selectedType}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose Property Listing Type</h2>
      <p className="text-gray-600 text-center mb-8">
        Select the type of property listing you want to createe
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listingTypes.map((type) => (
          <div
            key={type.id}
            onClick={() => handleTypeSelect(type.id)}
            className={`border-2 rounded-lg p-6 text-center cursor-pointer transition-all duration-200 ${
              selectedType === type.id
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-4xl mb-3">{type.icon}</div>
            <h3 className="text-lg font-semibold">{type.label}</h3>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className={`px-6 py-3 rounded-lg font-medium ${
            selectedType
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to {selectedType ? listingTypes.find(t => t.id === selectedType)?.label : 'Form'}
        </button>
      </div>
    </div>
  );
};

export default ListingTypeSelection;