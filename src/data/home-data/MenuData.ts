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
        link: "/about_us_02",
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
        link: "/listing_01",
    },
    {
        id: 5,
        has_dropdown: false,
        title: "Rent",
        link: "/listing_02",
    },
    {
        id: 6,
        has_dropdown: false,
        title: "Lease",
        link: "/listing_03",
    },
    {
        id: 7,
        has_dropdown: false,
        title: "PG",
        link: "/listing_04",
    },
    {
        id: 8,
        has_dropdown: false,
        title: "City Builder",
        link: "/city-builders",
    },
];
export default menu_data;
