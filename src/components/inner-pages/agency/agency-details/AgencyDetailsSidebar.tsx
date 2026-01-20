import AgencyFormTwo from "@/components/forms/AgencyFormTwo";
import NiceSelect from "@/ui/NiceSelect";
import Link from "next/link"

const AgencyDetailsSidebar = () => {

   const selectHandler = (e: any) => { };

   return (
      <div className="col-lg-4">
         <div className="theme-sidebar-one dot-bg p-30 ms-xxl-3 md-mt-60">
            <div className="tour-schedule bg-white p-30 mb-40">
               <h5 className="mb-40">Contact Form</h5>
               <AgencyFormTwo />
               <Link href="tel:+545" className="btn-eight sm text-uppercase w-100 rounded-0 tran3s">CALL NOW</Link>
            </div>

            <div className="agent-finder bg-white p-30">
               <h5 className="mb-40">Search Agency</h5>
               <form onSubmit={(e) => e.preventDefault()}>
                  <div className="input-box-one mb-25">
                     <div className="label">Agency Name</div>
                     <input type="text" placeholder="Type Agency Name" className="type-input" />
                  </div>
                  <div className="input-box-one mb-25">
                     <div className="label">Keyword</div>
                     <input type="text" placeholder="Apartments, Villa" className="type-input" />
                  </div>
                  <div className="input-box-one mb-25">
                     <div className="label">Location</div>
                     <NiceSelect className="nice-select rounded-0"
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
                  <button className="btn-nine text-uppercase w-100 mb-10">SEARCH</button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default AgencyDetailsSidebar
