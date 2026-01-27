"use client"
import { useState } from 'react';
import CmsComponentEditor from './CmsComponentEditor';

const CMS_PAGES = [
  {
    slug: 'city-builder',
    displayName: 'City Builder Page',
    defaultTitle: 'City Builder'
  },
  {
    slug: 'about-us',
    displayName: 'About Us Page',
    defaultTitle: 'About Us'
  },
  {
    slug: 'contact-info',
    displayName: 'Contact Information',
    defaultTitle: 'Contact Us'
  },
  {
    slug: 'terms-and-conditions',
    displayName: 'Terms & Conditions',
    defaultTitle: 'Terms & Conditions'
  }
];

const CmsDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="cms-dashboard-container">
      <div className="row">
        <div className="col-lg-3">
          <div className="bg-white rounded-3 shadow-sm p-3">
            <h6 className="mb-3 px-2 text-muted text-uppercase small fw-bold">Manage Pages</h6>
            <div className="nav flex-column nav-pills" role="tablist">
              {CMS_PAGES.map((page, index) => (
                <button 
                  key={index}
                  className={`nav-link text-start mb-2 px-3 py-2 border-0 transition-all ${activeTab === index ? 'active bg-primary text-white' : 'bg-light text-dark'}`}
                  onClick={() => setActiveTab(index)}
                  type="button"
                >
                  {page.displayName}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-9">
          <div className="cms-content-header mb-3">
            <h4 className="fw-500">{CMS_PAGES[activeTab].displayName}</h4>
            <p className="text-muted small">Edit the rich text content for this page. Changes will reflect on the live site immediately after saving.</p>
          </div>
          
          <CmsComponentEditor 
            slug={CMS_PAGES[activeTab].slug} 
            title={CMS_PAGES[activeTab].defaultTitle}
          />
        </div>
      </div>
    </div>
  );
};

export default CmsDashboard;
