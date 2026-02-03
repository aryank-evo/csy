interface DataType {
   id: number;
   id_name: string;
   title: string;
   md_pt?: boolean;
   faq: {
      id: number;
      question: string;
      answer: string;
   }[];
}

const inner_faq_data: DataType[] = [
   {
      id: 1,
      id_name: "Selling",
      title: "SELLING",
      md_pt: true,
      faq: [
         {
            id: 1,
            question: "How can I list my property for sale?",
            answer: "You can list your property by creating an account and adding details like location, price, images, and property specifications from your dashboard.",
         },
         {
            id: 2,
            question: "What types of properties can I sell?",
            answer: "You can sell apartments, independent houses, villas, plots, land, and commercial properties on the platform.",
         },
         {
            id: 3,
            question: "What’s the process of selling a property?",
            answer: "Once listed, interested buyers can contact you directly. You can manage inquiries, schedule visits, and update listing details anytime.",
         },
         {
            id: 4,
            question: "How do you handle fraud or fake listings?",
            answer: "We encourage verified listings and monitor suspicious activity. Listings violating policies may be suspended or removed.",
         },
      ]
   },
   {
      id: 2,
      id_name: "Renting",
      title: "RENTING",
      faq: [
         {
            id: 5,
            question: "Can I list my property for rent or lease?",
            answer: "Yes, property owners can list homes, flats, rooms, PGs, hostels, and commercial spaces for rent or lease easily.",
         },
         {
            id: 6,
            question: "Does the platform support PGs and shared rooms?",
            answer: "Yes, you can search and list PG accommodations, hostels, shared rooms, and single-occupancy units.",
         },
         {
            id: 7,
            question: "How do tenants contact property owners?",
            answer: "Tenants can directly contact owners or agents via phone, email, or in-app messaging if enabled.",
         },
         {
            id: 8,
            question: "Can I update rent or availability later?",
            answer: "Yes, you can edit rental price, availability, and other details anytime from your account dashboard.",
         },
      ]
   },
   {
      id: 3,
      id_name: "Buying",
      title: "BUYING",
      faq: [
         {
            id: 9,
            question: "How can I find properties to buy?",
            answer: "Use advanced filters like location, budget, property type, size, and amenities to find properties that match your needs.",
         },
         {
            id: 10,
            question: "Can I compare multiple properties?",
            answer: "Yes, you can shortlist and compare properties based on price, location, size, and features.",
         },
         {
            id: 11,
            question: "Are property details verified?",
            answer: "We promote verified listings, but buyers are advised to independently verify documents before finalizing a purchase.",
         },
      ]
   },
   {
      id: 4,
      id_name: "Payments",
      title: "PAYMENTS",
      faq: [
         {
            id: 12,
            question: "Which payment methods are supported?",
            answer: "Online payments may be available for subscriptions, featured listings, or booking-related services.",
         },
         {
            id: 13,
            question: "Is my payment information secure?",
            answer: "Yes, all transactions are processed using secure and encrypted payment gateways.",
         },
         {
            id: 14,
            question: "Do you handle property transaction payments?",
            answer: "Property sale or rent payments are handled directly between buyers, tenants, and owners unless stated otherwise.",
         },
      ]
   },
   {
      id: 5,
      id_name: "Terms",
      title: "TERMS & CONDITIONS",
      faq: [
         {
            id: 15,
            question: "Who is responsible for listing accuracy?",
            answer: "Property owners are responsible for ensuring that all listing information is accurate and up to date.",
         },
         {
            id: 16,
            question: "Can my listing be removed?",
            answer: "Yes, listings may be removed if they violate platform guidelines or receive repeated complaints.",
         },
      ]
   },
   {
      id: 6,
      id_name: "Account",
      title: "ACCOUNT",
      faq: [
         {
            id: 17,
            question: "Do I need an account to list a property?",
            answer: "Yes, creating an account is required to list properties and manage inquiries.",
         },
         {
            id: 18,
            question: "Can I manage multiple properties from one account?",
            answer: "Yes, a single account allows you to manage multiple properties for sale, rent, or lease.",
         },
      ]
   },
]

export default inner_faq_data;
