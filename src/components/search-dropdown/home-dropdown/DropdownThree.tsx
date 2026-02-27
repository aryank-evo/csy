import NiceSelect from "@/ui/NiceSelect";
import { LUDHIANA_LOCATION_OPTIONS } from "@/constants/searchDropdownOptions";

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
                     options={LUDHIANA_LOCATION_OPTIONS}
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
