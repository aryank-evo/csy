"use client"
import { useState, ReactNode } from 'react';
import CmsComponentEditor from './CmsComponentEditor';
import AdvertisementEditor from './AdvertisementEditor';
import GalleryEditor from './GalleryEditor';
import BlogEditor from './BlogEditor';
import DealerEditor from './DealerEditor';
import AbroadEditor from './AbroadEditor';
import AboutUsPageEditor from './AboutUsPageEditor';
import CityBuilderPageEditor from './CityBuilderPageEditor';
import ContactPageEditor from './ContactPageEditor';

interface TabItem {
  slug: string;
  displayName: string;
  defaultTitle: string;
  icon: ReactNode;
}

const TABS: TabItem[] = [
  {
    slug: 'advertisements',
    displayName: 'Advertisement',
    defaultTitle: 'Advertisements',
    icon: <i className="bi bi-megaphone me-2"></i>
  },
  {
    slug: 'about-us',
    displayName: 'About Us Page',
    defaultTitle: 'About Us',
    icon: <i className="bi bi-info-circle me-2"></i>
  },
  {
    slug: 'contact',
    displayName: 'Contact Page',
    defaultTitle: 'Contact Us',
    icon: <i className="bi bi-envelope me-2"></i>
  },
  // {
  //   slug: 'terms-and-conditions',
  //   displayName: 'Terms & Conditions',
  //   defaultTitle: 'Terms & Conditions',
  //   icon: <i className="bi bi-file-text me-2"></i>
  // },
  {
    slug: 'gallery',
    displayName: 'Gallery',
    defaultTitle: 'Gallery',
    icon: <i className="bi bi-images me-2"></i>
  },
  {
    slug: 'blogs',
    displayName: 'Blogs',
    defaultTitle: 'Blogs',
    icon: <i className="bi bi-journal-text me-2"></i>
  },
  {
    slug: 'city-builder',
    displayName: 'City Builder Page',
    defaultTitle: 'City Builder',
    icon: <i className="bi bi-geo-alt me-2"></i>
  },
  {
    slug: 'dealers',
    displayName: 'Dealers',
    defaultTitle: 'Dealers',
    icon: <i className="bi bi-people me-2"></i>
  },
  {
    slug: 'abroad',
    displayName: 'Abroad Properties',
    defaultTitle: 'Abroad Properties',
    icon: <i className="bi bi-globe me-2"></i>
  }
];

const CmsDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const isAdvertisementTab = TABS[activeTab]?.slug === 'advertisements';
  const isGalleryTab = TABS[activeTab]?.slug === 'gallery';
  const isBlogTab = TABS[activeTab]?.slug === 'blogs';
  const isDealerTab = TABS[activeTab]?.slug === 'dealers';
  const isAbroadTab = TABS[activeTab]?.slug === 'abroad';
  const isAboutUsTab = TABS[activeTab]?.slug === 'about-us';
  const isContactTab = TABS[activeTab]?.slug === 'contact';
  const isCityBuilderTab = TABS[activeTab]?.slug === 'city-builder';

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
                    <>
                      <>{tab.icon}</>
                      <>{tab.displayName}</>
                    </>
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
          ) : isBlogTab ? (
            <>
              <div className="cms-content-header mb-3">
                <h4 className="fw-500">{TABS[activeTab].displayName}</h4>
                <p className="text-muted small">Manage your blog posts. Create, edit, and delete blogs with titles, content, images, categories, and keywords.</p>
              </div>
              <BlogEditor />
            </>
          ) : isDealerTab ? (
            <>
              <div className="cms-content-header mb-3">
                <h4 className="fw-500">{TABS[activeTab].displayName}</h4>
                <p className="text-muted small">Manage your dealers. Add, edit, or remove dealers with their contact information and status.</p>
              </div>
              <DealerEditor />
            </>
          ) : isAbroadTab ? (
            <>
              <div className="cms-content-header mb-3">
                <h4 className="fw-500">{TABS[activeTab].displayName}</h4>
                <p className="text-muted small">Manage countries and external property listings for abroad properties. Add countries with thumbnails and link to external property listings.</p>
              </div>
              <AbroadEditor />
            </>
          ) : isAboutUsTab ? (
            <>
              <div className="cms-content-header mb-3">
                <h4 className="fw-500">{TABS[activeTab].displayName}</h4>
                <p className="text-muted small">Manage the About Us page content with custom fields for your company information and team details.</p>
              </div>
              <AboutUsPageEditor />
            </>
          ) : isContactTab ? (
            <>
              <div className="cms-content-header mb-3">
                <h4 className="fw-500">{TABS[activeTab].displayName}</h4>
                <p className="text-muted small">Manage contact page settings including address, phone, email, and Google Maps integration.</p>
              </div>
              <ContactPageEditor />
            </>
          ) : isCityBuilderTab ? (
            <>
              <div className="cms-content-header mb-3">
                <h4 className="fw-500">{TABS[activeTab].displayName}</h4>
                <p className="text-muted small">Manage city builder page content with director message and company information.</p>
              </div>
              <CityBuilderPageEditor />
            </>
          ) : (
            <>
              <div className="cms-content-header mb-3">
                <h4 className="fw-500">{TABS[activeTab].displayName}</h4>
                <p className="text-muted small">Edit the rich text content for this page. Changes will reflect on the live site immediately after saving.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CmsDashboard;