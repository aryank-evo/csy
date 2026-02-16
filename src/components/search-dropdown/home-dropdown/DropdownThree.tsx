import NiceSelect from "@/ui/NiceSelect";

const DropdownOne = () => {

   const selectHandler = (e: any) => { };

   const searchHandler = () => {
      window.location.href = '/listing_07';
   };

   return (
      <form onSubmit={(e) => { e.preventDefault(); searchHandler(); }}>
         <div className="row gx-0 align-items-center">
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left">
                  <div className="label">I&#39;m looking to...</div>
                  <NiceSelect className="nice-select fw-normal"
                     options={[
                        { value: "kothi", text: "Kothi" },
                        { value: "flat", text: "Flat" },
                        { value: "office", text: "Office" },
                        { value: "godown", text: "Godown" },
                        { value: "commercial_property", text: "Commercial Property" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left">
                  <div className="label">Location</div>
                  <NiceSelect className="nice-select location fw-normal"
                     options={[
                        { value: "1", text: "Model Town" },
                        { value: "2", text: "Sarabha Nagar" },
                        { value: "3", text: "Gurdev Nagar" },
                        { value: "4", text: "BRS Nagar" },
                        { value: "5", text: "Civil Lines" },
                        { value: "6", text: "South City" },
                        { value: "7", text: "Pakhowal Road" },
                        { value: "8", text: "Ferozepur Road" },
                        { value: "9", text: "Dugri / Urban Estate Dugri" },
                        { value: "10", text: "Rajguru Nagar" },
                        { value: "11", text: "Sector-39 & Sector-39A" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="col-xl-3 col-lg-4">
               <div className="input-box-one border-left border-lg-0">
                  <div className="label">Budget Range</div>
                  <NiceSelect
                     className="nice-select fw-normal"
                     options={[
                        { value: "1", text: "₹10,000 - ₹200,000" },
                        { value: "2", text: "₹20,000 - ₹300,000" },
                        { value: "3", text: "₹30,000 - ₹400,000" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="col-xl-3">
               <div className="input-box-one lg-mt-10">
                  <button className="fw-500 w-100 tran3s search-btn-three">Search Now</button>
               </div>
            </div>
         </div>
      </form>
   );
};

export default DropdownOne;
