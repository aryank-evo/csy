
const CommonLocation = ({ property }: any) => {
   const address = property?.address || property?.location || "India";
   const encodedAddress = encodeURIComponent(address);
   const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${encodedAddress}`;
   
   // Fallback to a search URL if no API key
   const fallbackMapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

   return (
      <>
         <h4 className="mb-40">Location</h4>
         <div className="bg-white shadow4 border-20 p-30">
            <div className="map-banner overflow-hidden border-15">
               <div className="gmap_canvas h-100 w-100">
                  <iframe
                     src={fallbackMapUrl}
                     width="600" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade" className="w-100 h-100">
                  </iframe>
               </div>
            </div>
         </div>
      </>
   )
}

export default CommonLocation;
