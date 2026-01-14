'use client';

import React from 'react';
import BasePropertyForm from './BasePropertyForm';

const LeasePropertyForm = () => {
  const CustomFieldsComponent = ({ onChange }: { onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> }) => (
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Property Type</label>
        <select
          name="leasePropertyType"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Property Type</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="industrial">Industrial</option>
          <option value="warehouse">Warehouse</option>
          <option value="office_space">Office Space</option>
          <option value="retail_shop">Retail Shop</option>
          <option value="showroom">Showroom</option>
          <option value="godown">Godown</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Lease Period (Months)</label>
        <input
          type="number"
          name="leasePeriod"
          min="1"
          onChange={onChange}
          className="form-control"
          placeholder="Lease period in months"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Monthly Lease Amount</label>
        <input
          type="number"
          name="monthlyLeaseAmount"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Monthly lease amount"
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
        <label className="form-label">Lease Start Date</label>
        <input
          type="date"
          name="leaseStartDate"
          onChange={onChange}
          className="form-control"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Lease End Date</label>
        <input
          type="date"
          name="leaseEndDate"
          onChange={onChange}
          className="form-control"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Renewal Options</label>
        <select
          name="renewalOptions"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Renewal Options</option>
          <option value="negotiable">Negotiable</option>
          <option value="fixed">Fixed</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Maintenance Responsibility</label>
        <select
          name="maintenanceResponsibility"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Maintenance Responsibility</option>
          <option value="owner">Owner</option>
          <option value="tenant">Tenant</option>
          <option value="shared">Shared</option>
        </select>
      </div>
      
      <div className="col-12">
        <label className="form-label">Lease Terms</label>
        <textarea
          name="leaseTerms"
          rows={3}
          onChange={onChange}
          className="form-control"
          placeholder="Describe lease terms and conditions"
        ></textarea>
      </div>
      
      <div className="col-12">
        <label className="form-label">Additional Terms</label>
        <div className="d-flex flex-wrap gap-2">
          {['negotiable_rent', 'escalation_clause', 'tax_inclusive', 'tax_exclusive', 'insurance_required', 'subletting_allowed'].map((term) => (
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
      propertyType="lease" 
      propertyStatus="lease"
      customFields={<CustomFieldsComponent />} />
  );
};

export default LeasePropertyForm;