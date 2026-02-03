interface DataType {
   id: number;
   page: string;
   question: string;
   answer: string;
   showAnswer: boolean;
}

const faq_data: DataType[] = [
   {
      id: 1,
      page: "home_2_faq_1",
      question: "Advanced property search",
      answer: "Use smart filters like location, budget, property type, amenities, and availability to quickly find properties for sale, rent, or lease.",
      showAnswer: false,
   },
   {
      id: 2,
      page: "home_2_faq_1",
      question: "List your property easily",
      answer: "Property owners can list homes, flats, PGs, hostels, rooms, or commercial spaces in a few simple steps from their dashboard.",
      showAnswer: false,
   },
   {
      id: 3,
      page: "home_2_faq_1",
      question: "Verified listings & secure platform",
      answer: "We promote verified listings and provide a secure platform for buyers, tenants, and property owners to connect confidently.",
      showAnswer: false,
   },

   // home_2_faq_2

   {
      id: 1,
      page: "home_2_faq_2",
      question: "How can I find properties for rent or lease?",
      answer: "You can search using rental-specific filters such as monthly rent, furnishing status, lease duration, and move-in date.",
      showAnswer: false,
   },
   {
      id: 2,
      page: "home_2_faq_2",
      question: "Does the platform support PGs and hostels?",
      answer: "Yes, you can easily find or list PG accommodations, hostels, shared rooms, and single-occupancy rooms.",
      showAnswer: false,
   },
   {
      id: 3,
      page: "home_2_faq_2",
      question: "Can I contact property owners directly?",
      answer: "Yes, you can directly contact owners or agents through the provided phone, email, or platform messaging options.",
      showAnswer: false,
   },
   {
      id: 4,
      page: "home_2_faq_2",
      question: "Is there any fee to list a property?",
      answer: "Basic property listings are free. Optional premium features are available to boost visibility and reach more users.",
      showAnswer: false,
   },

   // home_six
   
   {
      id: 1,
      page: "home_six",
      question: "Who are we?",
      answer: "We are a real estate platform focused on simplifying property buying, selling, renting, and PG discovery for users.",
      showAnswer: false,
   },
   {
      id: 2,
      page: "home_six",
      question: "What is our goal?",
      answer: "Our goal is to connect property seekers and owners through a transparent, easy-to-use, and reliable digital platform.",
      showAnswer: false,
   },
   {
      id: 3,
      page: "home_six",
      question: "Our vision",
      answer: "To become a one-stop destination for all real estate needs including homes, rentals, leases, PGs, hostels, and rooms.",
      showAnswer: false,
   },
];

export default faq_data;
