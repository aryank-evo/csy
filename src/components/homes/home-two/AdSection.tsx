import React from 'react';

const AdSection = () => {
   return (
      <div className="ads-section ps-xl-4 md-mt-60">
         <h4 className="mb-30 text-white font-garamond fst-italic mt-2">Also have a look ~</h4>
         <div className="row g-4">
            {[1, 2, 3].map((_, index) => (
               <div key={index} className="col-12">
                  <div className="ratio ratio-16x9 rounded overflow-hidden border border-light border-opacity-25 shadow-sm">
                     <iframe 
                        src="https://www.youtube-nocookie.com/embed/QbctGIROqRs" 
                        title={`Advertisement ${index + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                     ></iframe>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default AdSection;
