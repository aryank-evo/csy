'use client';

import React from 'react';
import BasePropertyForm from './BasePropertyForm';

const RentPropertyForm = () => {
  const CustomFieldsComponent = ({ onChange }: { onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> }) => (
    <div className="row g-3 p-4">
      <div className="col-md-6">
        <label className="form-label">Property Type</label>
        <select
          name="rentPropertyType"
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
          <option value="independent_house">Independent House</option>
          <option value="residential_plot">Residential Plot</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Available From</label>
        <input
          type="date"
          name="availableFrom"
          onChange={onChange}
          className="form-control"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Security Deposit</label>
        <input
          type="number"
          name="securityDeposit"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Security deposit amount"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Maintenance Fee (Monthly)</label>
        <input
          type="number"
          name="maintenanceFee"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Monthly maintenance fee"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Preferred Tenant</label>
        <select
          name="preferredTenant"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Preferred Tenant</option>
          <option value="family">Family</option>
          <option value="bachelors">Bachelors</option>
          <option value="bachelors_male">Male Bachelors</option>
          <option value="bachelors_female">Female Bachelors</option>
          <option value="company">Company</option>
          <option value="any">Any</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Furnishing Status</label>
        <select
          name="furnishingStatus"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Furnishing Status</option>
          <option value="fully_furnished">Fully Furnished</option>
          <option value="semi_furnished">Semi Furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>
      </div>
      
      <div className="col-12">
        <label className="form-label">Rental Terms</label>
        <div className="d-flex flex-wrap gap-2">
          {['pet_friendly', 'non_veg_allowed', 'ac_included', 'parking_included', 'power_backup'].map((term) => (
            <div key={term} className="form-check">
              <input
                type="checkbox"
                name={term}
                value="true"
                onChange={onChange}
                className="form-check-input"
                id={term}
              />
              <label className="form-check-label" htmlFor={term}>
                {term.replace('_', ' ')}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <BasePropertyForm 
      propertyType="rent" 
      propertyStatus="rent"
      customFields={<CustomFieldsComponent />} />
  );
};

export default RentPropertyForm;