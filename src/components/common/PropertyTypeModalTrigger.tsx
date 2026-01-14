'use client';

import React, { useState } from 'react';
import PropertyTypeModal from '../modals/PropertyTypeModal';

const PropertyTypeModalTrigger = () => {
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
        className="btn-two"
      >
        <span>Add Listing</span> <i className="fa-thin fa-arrow-up-right"></i>
      </button>
      
      <PropertyTypeModal 
        isOpen={showModal} 
        onClose={closeModal} 
      />
    </>
  );
};

export default PropertyTypeModalTrigger;