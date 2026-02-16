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
      answer: "On City Properties, you can easily search for rental or lease properties using category-specific filters such as Rent, Buy, Lease, or PG, along with location (Ludhiana or nearby areas), Budget Range, property type, and other preferences to find the most suitable options.",
      showAnswer: false,
   },
   {
      id: 2,
      page: "home_2_faq_2",
      question: "Does City Properties support PGs and hostels?",
      answer: "Yes, City Properties fully supports Paying Guest (PG) accommodations, including hostels, shared rooms, and single-occupancy rooms, making it easy to find or list PG options in Ludhiana.",
      showAnswer: false,
   },
   {
      id: 3,
      page: "home_2_faq_2",
      question: "Can I contact property owners or agents directly?",
      answer: "Yes, you can contact property owners or agents directly via phone or email. To ensure genuine enquiries, you are required to fill in basic contact details before viewing full property information or initiating contact.",
      showAnswer: false,
   },
   {
      id: 4,
      page: "home_2_faq_2",
      question: "Is there any fee to list a property on City Properties?",
      answer: "Basic property listings are free on City Properties. We also offer optional premium features to help boost property visibility and reach more potential buyers or tenants.",
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
