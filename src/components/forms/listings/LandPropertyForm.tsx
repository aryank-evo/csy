'use client';

import React from 'react';
import BasePropertyForm from './BasePropertyForm';

const LandPropertyForm = () => {
  const CustomFieldsComponent = ({ onChange }: { onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> }) => (
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Land Type</label>
        <select
          name="landType"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Land Type</option>
          <option value="residential_plot">Residential Plot</option>
          <option value="commercial_plot">Commercial Plot</option>
          <option value="agricultural_land">Agricultural Land</option>
          <option value="industrial_land">Industrial Land</option>
          <option value="vacant_land">Vacant Land</option>
          <option value="farm_land">Farm Land</option>
          <option value="orchard">Orchard</option>
          <option value="plantation">Plantation</option>
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
          <option value="for_development">For Development</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Total Area (Sq Ft)</label>
        <input
          type="number"
          name="totalArea"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Total land area in sq ft"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Area Unit</label>
        <select
          name="areaUnit"
          onChange={onChange}
          className="form-control"
        >
          <option value="sqft">Square Feet</option>
          <option value="acre">Acre</option>
          <option value="hectare">Hectare</option>
          <option value="sqyard">Square Yard</option>
          <option value="bigha">Bigha</option>
          <option value="kanal">Kanal</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Plot Width (Feet)</label>
        <input
          type="number"
          name="plotWidth"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Plot width in feet"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Plot Depth (Feet)</label>
        <input
          type="number"
          name="plotDepth"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Plot depth in feet"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Road Facing</label>
        <select
          name="roadFacing"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Road Facing</option>
          <option value="east">East</option>
          <option value="west">West</option>
          <option value="north">North</option>
          <option value="south">South</option>
          <option value="northeast">North-East</option>
          <option value="northwest">North-West</option>
          <option value="southeast">South-East</option>
          <option value="southwest">South-West</option>
        </select>
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Road Width (Feet)</label>
        <input
          type="number"
          name="roadWidth"
          min="0"
          onChange={onChange}
          className="form-control"
          placeholder="Road width in feet"
        />
      </div>
      
      <div className="col-md-6">
        <label className="form-label">Approved By</label>
        <select
          name="approvedBy"
          onChange={onChange}
          className="form-control"
        >
          <option value="">Select Approving Authority</option>
          <option value="municipal_corporation">Municipal Corporation</option>
          <option value="development_authority">Development Authority</option>
          <option value="panchayat">Panchayat</option>
          <option value="private">Private</option>
          <option value="government">Government</option>
        </select>
      </div>
      
      <div className="col-12">
        <label className="form-label">Utilities Available</label>
        <div className="d-flex flex-wrap gap-2">
          {['electricity', 'water', 'sewerage', 'gas', 'drainage', 'internet'].map((utility) => (
            <div key={utility} className="form-check">
              <input
                type="checkbox"
                name={utility}
                value="true"
                onChange={onChange}
                className="form-check-input"
                id={utility}
              />
              <label className="form-check-label" htmlFor={utility}>
                {utility}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="col-12">
        <label className="form-label">Zoning Information</label>
        <textarea
          name="zoningInfo"
          rows={2}
          onChange={onChange}
          className="form-control"
          placeholder="Information about zoning regulations"
        ></textarea>
      </div>
      
      <div className="col-12">
        <label className="form-label">Land Features</label>
        <div className="d-flex flex-wrap gap-2">
          {['level', 'sloped', 'flat', 'hillside', 'water_body_nearby', 'tree_coverage', 'rocky', 'fertile', 'black_soil', 'red_soil', 'sandy', 'clayey'].map((feature) => (
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
        <label className="form-label">Legal Documents</label>
        <div className="d-flex flex-wrap gap-2">
          {['sale_deed', 'property_tax_receipt', 'encumbrance_certificate', 'survey_plan', 'mutation_document', 'revenue_records'].map((document) => (
            <div key={document} className="form-check">
              <input
                type="checkbox"
                name={document}
                value="true"
                onChange={onChange}
                className="form-check-input"
                id={document}
              />
              <label className="form-check-label" htmlFor={document}>
                {document.replace('_', ' ')}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <BasePropertyForm 
      propertyType="land" 
      propertyStatus="land"
      customFields={<CustomFieldsComponent />} />
  );
};

export default LandPropertyForm;