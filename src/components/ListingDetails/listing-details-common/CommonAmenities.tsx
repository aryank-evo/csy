const ammenities_data: string[] = ["A/C & Heating", "Garages", "Garden", "Disabled Access", "Swimming Pool", "Parking", "Wifi", "Pet Friendly", "Ceiling Height", "Fireplace", "Play Ground", "Elevator"]

const CommonAmenities = ({ property }: any) => {
   const amenities = property?.amenities || [];
   const amenitiesList = Array.isArray(amenities) ? amenities : (typeof amenities === 'string' ? amenities.split(',') : []);

   return (
      <>
         <h4 className="mb-20">Amenities</h4>
         <p className="fs-20 lh-lg pb-25">This property offers a wide range of amenities to ensure comfort and convenience.</p>
         <ul className="style-none d-flex flex-wrap justify-content-between list-style-two">
            {amenitiesList.length > 0 ? (
               amenitiesList.map((list: string, i: number) => (
                  <li key={i}>{list}</li>
               ))
            ) : (
               <li>No specific amenities listed</li>
            )}
         </ul>
      </>
   )
}

export default CommonAmenities
