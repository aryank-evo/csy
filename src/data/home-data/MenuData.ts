interface MenuItem {
    id: number;
    title: string;
    class_name?:string;
    link: string;
    has_dropdown: boolean;
    sub_menus?: {
        link: string;
        title: string;
    }[];
    menu_column?: {
        id: number;
        mega_title: string;
        mega_menus: {
            link: string;
            title: string;
        }[];
    }[]
}[];

const menu_data: MenuItem[] = [
    {
        id: 1,
        has_dropdown: false,
        title: "Home",
        link: "/",
    },
    {
        id: 2,
        has_dropdown: false,
        title: "About",
        link: "/about_us_01",
    },
    {
        id: 3,
        has_dropdown: false,
        title: "Contact",
        link: "/contact",
    },
    {
        id: 4,
        has_dropdown: false,
        title: "Buy",
        link: "/buy",
    },
    {
        id: 5,
        has_dropdown: false,
        title: "Rent",
        link: "/rent",
    },
    {
        id: 6,
        has_dropdown: false,
        title: "Lease",
        link: "/lease",
    },
    {
        id: 7,
        has_dropdown: false,
        title: "PG",
        link: "/pg",
    },
    {
        id: 8,
        has_dropdown: false,
        title: "Gallery",
        link: "/gallery",
    },
    {
        id: 9,
        has_dropdown: false,
        title: "City Builder",
        link: "/city-builders",
    },
    {
        id: 10,
        has_dropdown: false,
        title: "Blog",
        link: "/blog_03",
    },
    {
        id: 11,
        has_dropdown: false,
        title: "Dealers",
        link: "/dealers",
    },
    {
        id: 12,
        has_dropdown: false,
        title: "Abroad",
        link: "/abroad",
    },
];
export default menu_data;
