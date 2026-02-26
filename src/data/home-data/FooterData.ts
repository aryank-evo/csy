interface DataType {
   id: number;
   page: string;
   widget_title: string;
   widget_class?: string;
   widget_class2?: string;
   footer_link: {
      link: string;
      link_title: string;
      data_bs_toggle?: string;
      data_bs_target?: string;
   }[];

}

const footer_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      widget_class: "xs-mt-50",
      widget_title: "Links",
      footer_link: [{ link: "/", link_title: "Home" }, { link: "/about-us", link_title: "About Us" }, { link: "/blog", link_title: "Blog" }, { link: "#", link_title: "Login", data_bs_toggle: "modal", data_bs_target: "#loginModal" },]
   },
   {
      id: 2,
      widget_class: "xs-mt-30",
      page: "home_1",
      widget_title: "Legal",
      footer_link: [{ link: "/terms", link_title: "Terms & conditions" },{ link: "/privacy-policy", link_title: "Privacy policy" }]
   },
   {
      id: 3,
      widget_class: "xs-mt-30",
      page: "home_1",
      widget_title: "New Listing",
      footer_link: [{ link: "/buy", link_title: "​Buy Properties" }, { link: "/rent", link_title: "Rent Properties" }, { link: "/lease", link_title: "Lease Properties" }, { link: "/pg", link_title: "PG Properties" },]
   },

   // home two

   {
      id: 1,
      page: "home_3",
      widget_title: "Links",
      footer_link: [{ link: "/", link_title: "Home" }, { link: "/dashboard/membership", link_title: "Membership" }, { link: "/about-us", link_title: "About Company" }, { link: "/blog_01", link_title: "Blog" }, { link: "/blog_02", link_title: "Explore Careers" }, { link: "/pricing_02", link_title: "Pricing" }, { link: "/dashboard/dashboard-index", link_title: "Dashboard" }, { link: "#", link_title: "Login / Sign up", data_bs_toggle: "modal", data_bs_target: "#loginModal" },]
   },
   {
      id: 2,
      widget_class: "col-xxl-3 col-xl-4",
      page: "home_3",
      widget_title: "Legal",
      footer_link: [{ link: "/terms", link_title: "Terms & conditions" }, { link: "/privacy-policy", link_title: "Privacy policy" }]
   },
   {
      id: 3,
      page: "home_3",
      widget_title: "New Listing",
      footer_link: [{ link: "/buy", link_title: "​Buy Properties" }, { link: "/rent", link_title: "Rent Properties" }, { link: "/lease", link_title: "Lease Properties" }, { link: "/pg", link_title: "PG Properties" },]
   },

   // home four

   {
      id: 1,
      page: "home_4",
      widget_class: "col-lg-2",
      widget_title: "Links",
      footer_link: [{ link: "/", link_title: "Home" }, { link: "/dashboard/membership", link_title: "Membership" }, { link: "/about-us", link_title: "About Company" }, { link: "/blog_01", link_title: "Blog" }, { link: "/dashboard/dashboard-index", link_title: "Dashboard" }, { link: "#", link_title: "Login / Sign up", data_bs_toggle: "modal", data_bs_target: "#loginModal" },]
   },
   {
      id: 2,
      widget_class: "col-xl-2 col-lg-3",
      page: "home_4",
      widget_title: "New Listing",
      footer_link: [{ link: "/buy", link_title: "​Buy Properties" }, { link: "/rent", link_title: "Rent Properties" }, { link: "/lease", link_title: "Lease Properties" }, { link: "/pg", link_title: "PG Properties" },]
   },
   {
      id: 3,
      widget_class: "col-xl-2 col-lg-3",
      page: "home_4",
      widget_title: "Legal",
      footer_link: [{ link: "/terms", link_title: "Terms & conditions" }, { link: "/privacy-policy", link_title: "Privacy policy" }]
   },

   // home five

   {
      id: 1,
      page: "home_5",
      widget_class: "col-lg-3 ms-auto",
      widget_class2: "ps-xl-5",
      widget_title: "Links",
      footer_link: [{ link: "/", link_title: "Home" }, { link: "/dashboard/membership", link_title: "Membership" }, { link: "/about-us", link_title: "About Company" }, { link: "/blog_01", link_title: "Blog" }, { link: "/blog_02", link_title: "Explore Careers" }, { link: "/pricing_02", link_title: "Pricing" }, { link: "/dashboard/dashboard-index", link_title: "Dashboard" }, { link: "#", link_title: "Login ", data_bs_toggle: "modal", data_bs_target: "#loginModal" },]
   },
   {
      id: 2,
      widget_class: "col-lg-3",
      page: "home_5",
      widget_title: "Legal",
      footer_link: [{ link: "/terms", link_title: "Terms & conditions" }, { link: "/privacy-policy", link_title: "Privacy policy" }]
   },
   {
      id: 3,
      widget_class: "col-lg-2",
      page: "home_5",
      widget_title: "New Listing",
      footer_link: [{ link: "/buy", link_title: "​Buy Properties" }, { link: "/rent", link_title: "Rent Properties" }, { link: "/lease", link_title: "Lease Properties" }, { link: "/pg", link_title: "PG Properties" },]
   },
]

export default footer_data;