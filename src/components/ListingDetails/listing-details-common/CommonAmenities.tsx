const ammenities_data: string[] = ["A/C & Heating", "Garages", "Garden", "Disabled Access", "Swimming Pool", "Parking", "Wifi", "Pet Friendly", "Ceiling Height", "Fireplace", "Play Ground", "Elevator"]

const CommonAmenities = ({ property }: any) => {
   const { amenities, fieldVisibility } = property || {};
   
   // Helper function to check if a field should be visible
   const isFieldVisible = (fieldKey: string) => {
      if (!fieldVisibility) return true; // Show all if no visibility settings
      return fieldVisibility[fieldKey] !== false; // Show if not explicitly hidden
   };
   
   const amenitiesList = Array.isArray(amenities) ? amenities : (typeof amenities === 'string' ? amenities.split(',') : []);

   // Only show amenities section if visibility is enabled and there are amenities
   if (!isFieldVisible('amenities') || amenitiesList.length === 0) {
      return null;
   }

   return (
      <>
         <h4 className="mb-20">Amenities</h4>
         <p className="fs-20 lh-lg pb-25">This property offers a wide range of amenities to ensure comfort and convenience.</p>
         <ul className="style-none d-flex flex-wrap justify-content-between list-style-two">
            {amenitiesList.map((list: string, i: number) => (
               <li key={i}>{list.trim()}</li>
            ))}
         </ul>
      </>
   )
}

export default CommonAmenities
