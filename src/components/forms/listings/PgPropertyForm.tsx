'use client';

import React from 'react';
import BasePropertyForm from './BasePropertyForm';

const PgPropertyForm = () => {
  const CustomFieldsComponent = ({ onChange }: { onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> }) => (
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label">PG Type</label>
        <select
          name="pgType"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select PG Type</option>
          <option value="boys_pg">Boys PG</option>
          <option value="girls_pg">Girls PG</option>
          <option value="family_pg">Family PG</option>
          <option value="mixed_pg">Mixed PG</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Meal Included</label>
        <select
          name="mealIncluded"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Meal Option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="optional">Optional</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">AC/Non-AC</label>
        <select
          name="acOption"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select AC Option</option>
          <option value="ac">AC</option>
          <option value="non_ac">Non-AC</option>
          <option value="both">Both Available</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Room Type</label>
        <select
          name="roomType"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Room Type</option>
          <option value="single_sharing">Single Sharing</option>
          <option value="double_sharing">Double Sharing</option>
          <option value="triple_sharing">Triple Sharing</option>
          <option value="four_plus_sharing">Four+ Sharing</option>
          <option value="private_room">Private Room</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Monthly Rent</label>
        <input
          type="number"
          name="monthlyRent"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Monthly rent amount"
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
        <label className="form-label">Guest Policy</label>
        <select
          name="guestPolicy"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Guest Policy</option>
          <option value="allowed">Allowed</option>
          <option value="not_allowed">Not Allowed</option>
          <option value="weekends_only">Weekends Only</option>
          <option value="special_approval">Special Approval Required</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Visitors Policy</label>
        <select
          name="visitorsPolicy"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Visitors Policy</option>
          <option value="allowed">Allowed</option>
          <option value="not_allowed">Not Allowed</option>
          <option value="weekends_only">Weekends Only</option>
          <option value="limited_time">Limited Time</option>
        </select>
      </div>
      
      <div className="col-12">
        <label className="form-label">Facilities</label>
        <div className="d-flex flex-wrap gap-2">
          {['wifi', 'food', 'laundry', 'cleaning', 'tv', 'fridge', 'geyser', 'bed', 'study_table', 'cupboard', 'ac', 'power_backup', 'lift', 'parking'].map((facility) => (
            <div key={facility} className="form-check">
              <input
                type="checkbox"
                name={facility}
                value="true"
                onChange={onChange}
                className="form-check-input"
                id={facility}
              />
              <label className="form-check-label" htmlFor={facility}>
                {facility.replace('_', ' ')}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <BasePropertyForm 
      propertyType="pg" 
      propertyStatus="pg"
      customFields={<CustomFieldsComponent />} />
  );
};

export default PgPropertyForm;