interface InputField {
   id: number;
   page: string;
   col?: string;
   border_lg?: string;
   label: string;
   options: {
      value: string;
      text: string;
   }[];
   className?: string;
}[]

const dropdoun_data: InputField[] = [
   {
      id: 1,
      page: "home_1",
      col: "col-xl-3",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Buy Apartments" }, { value: "2", text: "Rent Condos" }, { value: "3", text: "Sell Houses" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Rent Industrial" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_1",
      col: "col-xl-4",
      label: "Location",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_1",
      col: "col-xl-3",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹10,000 - ₹200,000" }, { value: "2", text: "₹200,000 - ₹300,000" }, { value: "3", text: "₹300,000 - ₹400,000" },],
   },

   // home_2_tab_1

   {
      id: 1,
      page: "home_2_tab_1",
      col: "col-xl-2",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Buy Apartments" }, { value: "2", text: "Rent Condos" }, { value: "3", text: "Sell Houses" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Rent Industrial" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_2_tab_1",
      col: "col-xl-3",
      label: "Location",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_2_tab_1",
      col: "col-xl-3",
      label: "Price Range",
      options: [{ value: "1", text: "₹10,000 - ₹200,000" }, { value: "2", text: "₹200,000 - ₹300,000" }, { value: "3", text: "₹300,000 - ₹400,000" },],
   },

   // home_2_tab_2

   {
      id: 1,
      page: "home_2_tab_2",
      col: "col-xl-2",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Rent Industrial" }, { value: "2", text: "Rent Condos" }, { value: "3", text: "Sell Houses" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Buy Apartments" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_2_tab_2",
      col: "col-xl-3",
      label: "Location",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_2_tab_2",
      col: "col-xl-3",
      label: "Price Range",
      options: [{ value: "1", text: "₹200,000 - ₹300,000" }, { value: "2", text: "₹10,000 - ₹200,000" }, { value: "3", text: "₹300,000 - ₹400,000" },],
   },

   // home_3_tab_1

   {
      id: 1,
      page: "home_3_tab_1",
      col: "mb-25",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Buy Apartments" }, { value: "2", text: "Rent Condos" }, { value: "3", text: "Sell Houses" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Rent Industrial" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_3_tab_1",
      col: "mb-25",
      label: "Location",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_3_tab_1",
      col: "mb-50 lg-mb-30",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹10,000 - ₹200,000" }, { value: "2", text: "₹200,000 - ₹300,000" }, { value: "3", text: "₹300,000 - ₹400,000" },],
   },

   // home_3_tab_2

   {
      id: 1,
      page: "home_3_tab_2",
      col: "mb-25",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Rent Condos" }, { value: "2", text: "Buy Apartments" }, { value: "3", text: "Sell Houses" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Rent Industrial" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_3_tab_2",
      col: "mb-25",
      label: "Location",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_3_tab_2",
      col: "mb-50 lg-mb-30",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹200,000 - ₹300,000" }, { value: "2", text: "₹10,000 - ₹200,000" }, { value: "3", text: "₹300,000 - ₹400,000" },],
   },

   // home_3_tab_3

   {
      id: 1,
      page: "home_3_tab_3",
      col: "mb-25",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Sell Houses" }, { value: "2", text: "Rent Condos" }, { value: "3", text: "Buy Apartments" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Rent Industrial" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_3_tab_3",
      col: "mb-25",
      label: "Location",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_3_tab_3",
      col: "mb-50 lg-mb-30",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹300,000 - ₹400,000" }, { value: "2", text: "₹200,000 - ₹300,000" }, { value: "3", text: "₹10,000 - ₹200,000" },],
   },

   // home_5_tab_1

   {
      id: 1,
      page: "home_5_tab_1",
      col: "col-lg-3",
      label: "I’m looking to...",
      border_lg: "border-left",
      options: [{ value: "1", text: "Buy Apartments" }, { value: "2", text: "Rent Condos" }, { value: "3", text: "Sell Houses" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Rent Industrial" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_5_tab_1",
      col: "col-lg-4",
      label: "Location",
      border_lg: "border-left",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_5_tab_1",
      col: "col-xl-3 col-lg-4",
      label: "Price Range",
      options: [{ value: "1", text: "₹10,000 - ₹200,000" }, { value: "2", text: "₹200,000 - ₹300,000" }, { value: "3", text: "₹300,000 - ₹400,000" },],
   },

   // home_5_tab_2

   {
      id: 1,
      page: "home_5_tab_2",
      col: "col-lg-3",
      label: "I’m looking to...",
      border_lg: "border-left",
      options: [{ value: "1", text: "Rent Condos" }, { value: "2", text: "Buy Apartments" }, { value: "3", text: "Sell Houses" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Rent Industrial" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_5_tab_2",
      col: "col-lg-4",
      label: "Location",
      border_lg: "border-left",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_5_tab_2",
      col: "col-xl-3 col-lg-4",
      label: "Price Range",
      options: [{ value: "1", text: "₹200,000 - ₹300,000" }, { value: "2", text: "₹10,000 - ₹200,000" }, { value: "3", text: "₹300,000 - ₹400,000" },],
   },

   // home_6_tab_1

   {
      id: 1,
      page: "home_6_tab_1",
      col: "col-xxl-2",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Buy Apartments" }, { value: "2", text: "Rent Condos" }, { value: "3", text: "Sell Houses" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Rent Industrial" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_6_tab_1",
      label: "Location",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_6_tab_1",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹10,000 - ₹200,000" }, { value: "2", text: "₹200,000 - ₹300,000" }, { value: "3", text: "₹300,000 - ₹400,000" },],
   },

   // home_6_tab_2

   {
      id: 1,
      page: "home_6_tab_2",
      col: "col-xxl-2",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Rent Condos" }, { value: "2", text: "Buy Apartments" }, { value: "3", text: "Sell Houses" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Rent Industrial" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_6_tab_2",
      label: "Location",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_6_tab_2",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹200,000 - ₹300,000" }, { value: "2", text: "₹10,000 - ₹200,000" }, { value: "3", text: "₹300,000 - ₹400,000" },],
   },

   // home_6_tab_3

   {
      id: 1,
      page: "home_6_tab_3",
      col: "col-xxl-2",
      label: "I’m looking to...",
      options: [{ value: "1", text: "Sell Houses" }, { value: "2", text: "Rent Condos" }, { value: "3", text: "Buy Apartments" }, { value: "4", text: "Sell Houses" }, { value: "5", text: "Rent Industrial" }, { value: "6", text: "Sell Villas" },],
   },
   {
      id: 2,
      page: "home_6_tab_3",
      label: "Location",
      options: [{ value: "1", text: "Model Town" }, { value: "2", text: "Sarabha Nagar" }, { value: "3", text: "Gurdev Nagar" }, { value: "4", text: "BRS Nagar" }, { value: "5", text: "Civil Lines" }, { value: "6", text: "South City" }, { value: "7", text: "Pakhowal Road" }, { value: "8", text: "Ferozepur Road" }, { value: "9", text: "Dugri / Urban Estate Dugri" }, { value: "10", text: "Rajguru Nagar" }, { value: "11", text: "Sector-39 & Sector-39A" },],
      className: "location",
   },
   {
      id: 3,
      page: "home_6_tab_3",
      border_lg: "border-lg-0",
      label: "Price Range",
      options: [{ value: "1", text: "₹300,000 - ₹400,000" }, { value: "2", text: "₹200,000 - ₹300,000" }, { value: "3", text: "₹10,000 - ₹200,000" },],
   },
];

export default dropdoun_data;