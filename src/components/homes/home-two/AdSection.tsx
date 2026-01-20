import React from 'react';
import DynamicIframe from '@/components/common/DynamicIframe';

const AdSection = () => {
   const ads = [
      { fieldName: 'iframe1_url', defaultSrc: "https://www.youtube-nocookie.com/embed/QbctGIROqRs" },
      { fieldName: 'iframe2_url', defaultSrc: "https://www.youtube-nocookie.com/embed/QbctGIROqRs" },
      { fieldName: 'iframe3_url', defaultSrc: "https://www.youtube-nocookie.com/embed/QbctGIROqRs" },
   ];

   return (
      <div className="ads-section ps-xl-4 md-mt-60">
         <h4 className="mb-30 text-white font-garamond fst-italic mt-2">Also have a look ~</h4>
         <div className="row g-4">
            {ads.map((ad, index) => (
               <div key={index} className="col-12">
                  <div className="ratio ratio-16x9 rounded overflow-hidden border border-light border-opacity-25 shadow-sm">
                     <DynamicIframe 
                        componentName="advertisement-section"
                        fieldName={ad.fieldName}
                        defaultSrc={ad.defaultSrc}
                        title={`Advertisement ${index + 1}`}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default AdSection;
