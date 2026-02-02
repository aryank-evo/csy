'use client';

import React, { useState } from 'react';
import PropertyTypeModal from '../modals/PropertyTypeModal';

interface PropertyTypeModalTriggerProps {
  buttonClass?: string;
}

const PropertyTypeModalTrigger = ({ buttonClass }: PropertyTypeModalTriggerProps) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <button 
        onClick={openModal}
        className={buttonClass || "btn-two"}
      >
        <span>Add Listing</span>
      </button>
      
      <PropertyTypeModal 
        isOpen={showModal} 
        onClose={closeModal} 
      />
    </>
  );
};

export default PropertyTypeModalTrigger;