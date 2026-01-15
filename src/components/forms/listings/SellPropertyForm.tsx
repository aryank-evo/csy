'use client';

import React from 'react';
import BasePropertyForm from './BasePropertyForm';

const SellPropertyForm = () => {
  const CustomFieldsComponent = ({ onChange }: { onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> }) => (
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Property Type</label>
        <select
          name="sellPropertyType"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Property Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="villa">Villa</option>
          <option value="penthouse">Penthouse</option>
          <option value="farmhouse">Farm House</option>
          <option value="builder_floor">Builder Floor</option>
          <option value="studio_apartment">Studio Apartment</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Possession Status</label>
        <select
          name="possessionStatus"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Possession Status</option>
          <option value="ready_to_move">Ready to Move</option>
          <option value="under_construction">Under Construction</option>
          <option value="new_launch">New Launch</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Age of Property (Years)</label>
        <input
          type="number"
          name="propertyAge"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Property age in years"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Maintenance Cost (Annual)</label>
        <input
          type="number"
          name="maintenanceCost"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Annual maintenance cost"
        />
      </div>
      
      <div className="col-12">
        <label className="form-label">Features</label>
        <div className="d-flex flex-wrap gap-2">
          {['furnished', 'semi_furnished', 'unfurnished', 'corner_property', 'gated_community'].map((feature) => (
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
    </div>
  );

  return (
    <BasePropertyForm 
      propertyType="sale" 
      propertyStatus="sale"
      customFields={<CustomFieldsComponent />} />
  );
};

export default SellPropertyForm;