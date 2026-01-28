import property_feature_list from "@/data/inner-data/PropertyFeatureListData"

const CommonPropertyFeatureList = ({ property }: any) => {
   const { bedrooms, bathrooms, area, propertyType, propertyStatus, possessionStatus, propertyAge, landArea, commercialArea, landType, leasePeriod, monthlyLeaseAmount, foodIncluded, gender, occupancy, fieldVisibility } = property || {};

   // Helper function to check if a field should be visible
   const isFieldVisible = (fieldKey: string) => {
      if (!fieldVisibility) return true; // Show all if no visibility settings
      return fieldVisibility[fieldKey] !== false; // Show if not explicitly hidden
   };

   const feature_list: { title: string; count: string; fieldKey?: string }[] = [];

   // Add fields based on visibility settings
   if (isFieldVisible('bedrooms') && bedrooms) {
      feature_list.push({ title: "Bedrooms:", count: String(bedrooms || 0), fieldKey: 'bedrooms' });
   }
   if (isFieldVisible('bathrooms') && bathrooms) {
      feature_list.push({ title: "Bathrooms:", count: String(bathrooms || 0), fieldKey: 'bathrooms' });
   }
   if (isFieldVisible('area') && (area || landArea || commercialArea)) {
      feature_list.push({ title: "Sqft:", count: String(area || landArea || commercialArea || 0), fieldKey: 'area' });
   }
   if (isFieldVisible('propertyType') && propertyType) {
      feature_list.push({ title: "Property Type:", count: propertyType || "N/A", fieldKey: 'propertyType' });
   }
   if (isFieldVisible('propertyStatus') && propertyStatus) {
      feature_list.push({ title: "Status:", count: propertyStatus || "N/A", fieldKey: 'propertyStatus' });
   }
   if (isFieldVisible('amenities') && possessionStatus) {
      feature_list.push({ title: "Possession:", count: possessionStatus || "N/A", fieldKey: 'amenities' });
   }
   if (isFieldVisible('description') && propertyAge) {
      feature_list.push({ title: "Property Age:", count: propertyAge || "N/A", fieldKey: 'description' });
   }

   // Add type-specific fields
   if (propertyType?.toLowerCase() === 'lease') {
      feature_list.push({ title: "Lease Period:", count: leasePeriod || "N/A" });
      feature_list.push({ title: "Monthly Lease:", count: String(monthlyLeaseAmount || 0) });
   }

   if (propertyType?.toLowerCase() === 'pg') {
      feature_list.push({ title: "Food Included:", count: foodIncluded ? "Yes" : "No" });
      feature_list.push({ title: "Gender Allowed:", count: gender || "Any" });
      feature_list.push({ title: "Occupancy:", count: occupancy || "N/A" });
   }

   if (propertyType?.toLowerCase() === 'land' && isFieldVisible('title')) {
      feature_list.push({ title: "Land Type:", count: landType || "N/A" });
   }

   const dynamic_feature_list = feature_list.length > 0 ? [
      {
         id: 1,
         title: "Property Details",
         feature_list: feature_list,
      },
   ] : [];

   return (
      <div className="accordion" id="accordionTwo">
         {dynamic_feature_list.map((item) => (
            <div key={item.id} className="accordion-item">
               <h2 className="accordion-header">
                  <button className={`accordion-button ${item.id === 1 ? "" : "collapsed"}`} type="button"
                     data-bs-toggle="collapse" data-bs-target={`#collapse${item.id}`} aria-expanded="false"
                     aria-controls={`collapse${item.id}`}>
                     {item.title}
                  </button>
               </h2>
               <div id={`collapse${item.id}`} className={`accordion-collapse collapse ${item.id === 1 ? "show" : ""}`}
                  data-bs-parent="#accordionTwo">
                  <div className="accordion-body">
                     <div className="feature-list-two">
                        <ul className="style-none d-flex flex-wrap justify-content-between">
                           {item.feature_list.map((list, i) => (
                              <li key={i}><span>{list.title} </span> <span className="fw-500 color-dark">{list.count}</span></li>
                           ))}
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   )
}

export default CommonPropertyFeatureList;
