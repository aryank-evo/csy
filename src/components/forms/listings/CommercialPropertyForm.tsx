'use client';

import React from 'react';
import BasePropertyForm from './BasePropertyForm';

const CommercialPropertyForm = () => {
  const CustomFieldsComponent = ({ onChange }: { onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> }) => (
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Commercial Property Type</label>
        <select
          name="commercialPropertyType"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Property Type</option>
          <option value="office_space">Office Space</option>
          <option value="retail_shop">Retail Shop</option>
          <option value="showroom">Showroom</option>
          <option value="warehouse">Warehouse</option>
          <option value="godown">Godown</option>
          <option value="industrial_building">Industrial Building</option>
          <option value="factory">Factory</option>
          <option value="workshop">Workshop</option>
          <option value="co_working">Co-working Space</option>
          <option value="business_center">Business Center</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Transaction Type</label>
        <select
          name="transactionType"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Transaction Type</option>
          <option value="for_sale">For Sale</option>
          <option value="for_rent">For Rent</option>
          <option value="for_lease">For Lease</option>
          <option value="for_sale_and_rent">For Sale & Rent</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Carpet Area (sq ft)</label>
        <input
          type="number"
          name="carpetArea"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Carpet area in sq ft"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Built-up Area (sq ft)</label>
        <input
          type="number"
          name="builtUpArea"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Built-up area in sq ft"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Floor Number</label>
        <input
          type="number"
          name="floorNumber"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Floor number"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Total Floors</label>
        <input
          type="number"
          name="totalFloors"
          min="1"
          onChange={onChange}
          className="form-control"
          placeholder="Total floors in building"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Parking Spaces</label>
        <input
          type="number"
          name="parkingSpaces"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Number of parking spaces"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Washrooms</label>
        <input
          type="number"
          name="washrooms"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Number of washrooms"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Power Backup</label>
        <select
          name="powerBackup"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Power Backup</option>
          <option value="full_building">Full Building</option>
          <option value="partial">Partial</option>
          <option value="none">None</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Lifts</label>
        <input
          type="number"
          name="lifts"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Number of lifts"
        />
      </div>
      
      <div className="col-12">
        <label className="form-label">Property Features</label>
        <div className="d-flex flex-wrap gap-2">
          {['ac', 'fire_safety', 'generator', 'security', 'reception', 'pantry', 'meeting_rooms', 'terrace_access', 'corner_office', 'high_ceiling', 'glass_walls', 'modular_kitchen'].map((feature) => (
            <div key={feature} className="form-check">
              <input
                type="checkbox"
                name={feature}
                value="true"
                onChange={onChange}
                className="form-check-input"
                id={feature}
              />
              <label className="form-check-label" htmlFor={feature}>
                {feature.replace('_', ' ')}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="col-12">
        <label className="form-label">Description</label>
        <textarea
          name="commercialDescription"
          rows={3}
          onChange={onChange}
          className="form-control"
          placeholder="Detailed description of commercial property"
        ></textarea>
      </div>
    </div>
  );

  return (
    <BasePropertyForm 
      propertyType="commercial" 
      propertyStatus="commercial"
      customFields={<CustomFieldsComponent />} />
  );
};

export default CommercialPropertyForm;