"use client"
import { useState } from 'react';
import CmsComponentEditor from './CmsComponentEditor';
import AdvertisementEditor from './AdvertisementEditor';
import GalleryEditor from './GalleryEditor';

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

const TABS = [
  ...CMS_PAGES,
  {
    slug: 'advertisements',
    displayName: 'Advertisement Section',
    defaultTitle: 'Advertisements',
    isAdvertisement: true
  },
  {
    slug: 'gallery',
    displayName: 'Gallery',
    defaultTitle: 'Gallery',
    isGallery: true
  }
];

const CmsDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const isAdvertisementTab = TABS[activeTab]?.isAdvertisement;
  const isGalleryTab = TABS[activeTab]?.isGallery;

  return (
    <div className="cms-dashboard-container">
      <div className="row">
        <div className="col-lg-3">
          <div className="bg-white rounded-3 shadow-sm p-3">
            <h6 className="mb-3 px-2 text-muted text-uppercase small fw-bold">Manage Pages</h6>
            <div className="nav flex-column nav-pills" role="tablist">
              {TABS.map((tab, index) => (
                <button 
                  key={index}
                  className={`nav-link text-start mb-2 px-3 py-2 border-0 transition-all ${activeTab === index ? 'active bg-primary text-white' : 'bg-light text-dark'}`}
                  onClick={() => setActiveTab(index)}
                  type="button"
                >
                  {tab.isAdvertisement ? (
                    <>
                      <i className="bi bi-megaphone me-2"></i>
                      {tab.displayName}
                    </>
                  ) : tab.isGallery ? (
                    <>
                      <i className="bi bi-images me-2"></i>
                      {tab.displayName}
                    </>
                  ) : (
                    tab.displayName
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-lg-9">
          {isAdvertisementTab ? (
            <>
              <div className="cms-content-header mb-3">
                <h4 className="fw-500">{TABS[activeTab].displayName}</h4>
                <p className="text-muted small">Manage YouTube advertisements. Add, edit, or remove video advertisements that will appear on your website.</p>
              </div>
              <AdvertisementEditor />
            </>
          ) : isGalleryTab ? (
            <>
              <div className="cms-content-header mb-3">
                <h4 className="fw-500">{TABS[activeTab].displayName}</h4>
                <p className="text-muted small">Manage gallery sections with YouTube video links. Create sections with headings and add multiple video links per section.</p>
              </div>
              <GalleryEditor />
            </>
          ) : (
            <>
              <div className="cms-content-header mb-3">
                <h4 className="fw-500">{TABS[activeTab].displayName}</h4>
                <p className="text-muted small">Edit the rich text content for this page. Changes will reflect on the live site immediately after saving.</p>
              </div>
              
              <CmsComponentEditor 
                slug={TABS[activeTab].slug} 
                title={TABS[activeTab].defaultTitle}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CmsDashboard;
