const CommonContactInfo = ({ property }: any) => {
   const { contactName, contactEmail, contactPhone, fieldVisibility } = property || {};
   
   // Helper function to check if a field should be visible
   const isFieldVisible = (fieldKey: string) => {
      if (!fieldVisibility) return true; // Show all if no visibility settings
      return fieldVisibility[fieldKey] !== false; // Show if not explicitly hidden
   };
   
   // Only show contact section if at least one contact field is visible
   const hasContact = isFieldVisible('contactName') && contactName || 
                      isFieldVisible('contactEmail') && contactEmail || 
                      isFieldVisible('contactPhone') && contactPhone;
   
   if (!hasContact) {
      return null;
   }

   return (
      <>
         <h4 className="mb-20">Contact Information</h4>
         <div className="bg-white shadow4 border-20 p-30">
            <ul className="style-none">
               {isFieldVisible('contactName') && contactName && (
                  <li className="mb-3">
                     <span className="fw-500 color-dark">Name:</span> {contactName}
                  </li>
               )}
               {isFieldVisible('contactEmail') && contactEmail && (
                  <li className="mb-3">
                     <span className="fw-500 color-dark">Email:</span> 
                     <a href={`mailto:${contactEmail}`} className="color-dark text-decoration-none">
                        {contactEmail}
                     </a>
                  </li>
               )}
               {isFieldVisible('contactPhone') && contactPhone && (
                  <li>
                     <span className="fw-500 color-dark">Phone:</span> 
                     <a href={`tel:${contactPhone}`} className="color-dark text-decoration-none">
                        {contactPhone}
                     </a>
                  </li>
               )}
            </ul>
         </div>
      </>
   )
}

export default CommonContactInfo;