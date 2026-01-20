"use client"
import { useState } from 'react';
import CmsComponentEditor from './CmsComponentEditor';

const CMS_COMPONENTS = [
  {
    name: 'city-builder',
    displayName: 'City Builder Page',
    fields: [
      { name: 'title', type: 'text' as const, label: 'Page Title' },
      { name: 'description', type: 'html' as const, label: 'Page Description (HTML supported)' },
    ]
  },
  {
    name: 'advertisement-section',
    displayName: 'Advertisement Section',
    fields: [
      { name: 'iframe1_url', type: 'iframe' as const, label: 'Advertisement 1 URL' },
      { name: 'iframe2_url', type: 'iframe' as const, label: 'Advertisement 2 URL' },
      { name: 'iframe3_url', type: 'iframe' as const, label: 'Advertisement 3 URL' },
    ]
  },
  {
    name: 'about-us',
    displayName: 'About Us Page',
    fields: [
      { name: 'title', type: 'text' as const, label: 'Headline' },
      { name: 'content', type: 'html' as const, label: 'Main Content' },
    ]
  },
  {
    name: 'contact-info',
    displayName: 'Contact Information',
    fields: [
      { name: 'email', type: 'text' as const, label: 'Contact Email' },
      { name: 'phone', type: 'text' as const, label: 'Contact Phone' },
      { name: 'address', type: 'text' as const, label: 'Physical Address' },
    ]
  }
];

const CmsDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="cms-dashboard-container">
      <div className="row">
        <div className="col-lg-3">
          <div className="bg-white rounded-3 shadow-sm p-3">
            <h6 className="mb-3 px-2 text-muted text-uppercase small fw-bold">Static Components</h6>
            <div className="nav flex-column nav-pills" role="tablist">
              {CMS_COMPONENTS.map((component, index) => (
                <button 
                  key={index}
                  className={`nav-link text-start mb-2 px-3 py-2 border-0 transition-all ${activeTab === index ? 'active bg-primary text-white' : 'bg-light text-dark'}`}
                  onClick={() => setActiveTab(index)}
                  type="button"
                >
                  {component.displayName}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-9">
          <div className="cms-content-header mb-3">
            <h4 className="fw-500">{CMS_COMPONENTS[activeTab].displayName}</h4>
            <p className="text-muted small">Edit the content for this component. Changes will reflect on the live site immediately after saving.</p>
          </div>
          
          <CmsComponentEditor 
            componentName={CMS_COMPONENTS[activeTab].name} 
            fields={CMS_COMPONENTS[activeTab].fields} 
          />
        </div>
      </div>
    </div>
  );
};

export default CmsDashboard;
