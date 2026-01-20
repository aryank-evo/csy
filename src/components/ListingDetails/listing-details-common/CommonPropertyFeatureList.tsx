import property_feature_list from "@/data/inner-data/PropertyFeatureListData"

const CommonPropertyFeatureList = ({ property }: any) => {
   const { bedrooms, bathrooms, area, propertyType, propertyStatus, possessionStatus, propertyAge, landArea, commercialArea, landType, leasePeriod, monthlyLeaseAmount, foodIncluded, gender, occupancy } = property || {};

   const dynamic_feature_list = [
      {
         id: 1,
         title: "Property Details",
         feature_list: [
            { title: "Bedrooms:", count: String(bedrooms || 0) },
            { title: "Bathrooms:", count: String(bathrooms || 0) },
            { title: "Sqft:", count: String(area || landArea || commercialArea || 0) },
            { title: "Property Type:", count: propertyType || "N/A" },
            { title: "Status:", count: propertyStatus || "N/A" },
            { title: "Possession:", count: possessionStatus || "N/A" },
            { title: "Property Age:", count: propertyAge || "N/A" },
         ],
      },
   ];

   if (propertyType?.toLowerCase() === 'lease') {
      dynamic_feature_list[0].feature_list.push(
         { title: "Lease Period:", count: leasePeriod || "N/A" },
         { title: "Monthly Lease:", count: String(monthlyLeaseAmount || 0) }
      );
   }

   if (propertyType?.toLowerCase() === 'pg') {
      dynamic_feature_list[0].feature_list.push(
         { title: "Food Included:", count: foodIncluded ? "Yes" : "No" },
         { title: "Gender Allowed:", count: gender || "Any" },
         { title: "Occupancy:", count: occupancy || "N/A" }
      );
   }

   if (propertyType?.toLowerCase() === 'land') {
      dynamic_feature_list[0].feature_list.push(
         { title: "Land Type:", count: landType || "N/A" }
      );
   }

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
