
const CommonLocation = ({ property }: any) => {
   const { address, location, city, state, fieldVisibility } = property || {};
   
   // Helper function to check if a field should be visible
   const isFieldVisible = (fieldKey: string) => {
      if (!fieldVisibility) return true; // Show all if no visibility settings
      return fieldVisibility[fieldKey] !== false; // Show if not explicitly hidden
   };
   
   // Only show location section if at least one location field is visible
   const hasLocation = isFieldVisible('address') && address || 
                       isFieldVisible('location') && location || 
                       isFieldVisible('city') && city || 
                       isFieldVisible('state') && state;
   
   if (!hasLocation) {
      return null;
   }

   const addressString = address || location || city || state || "India";
   const encodedAddress = encodeURIComponent(addressString);
   
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
