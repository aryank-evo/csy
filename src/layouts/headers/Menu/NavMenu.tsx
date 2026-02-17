"use client";
import menu_data from "@/data/home-data/MenuData";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

import logo from "@/assets/images/logo/logo_01.svg";

const NavMenu = () => {
    const pathname = usePathname();
    const [navTitle, setNavTitle] = useState("");

    const openMobileMenu = (menu: any) => {
        if (navTitle === menu) {
            setNavTitle("");
        } else {
            setNavTitle(menu);
        }
    };

    // Icon mapping for menu items
    const getMenuIcon = (title: string) => {
        switch (title.toLowerCase()) {
            case "home": return "bi-house-door";
            case "about": return "bi-info-circle";
            case "contact": return "bi-telephone";
            case "buy": return "bi-cart-check";
            case "rent": return "bi-key";
            case "lease": return "bi-file-earmark-text";
            case "pg": return "bi-people";
            case "gallery": return "bi-images";
            case "city builder": return "bi-building";
            case "blog": return "bi-journal-text";
            case "dealers": return "bi-person-badge";
            case "abroad": return "bi-globe";
            default: return "bi-circle";
        }
    };

    return (
        <ul className="navbar-nav align-items-lg-center">
            {menu_data.map((menu: any) => (
                <li
                    key={menu.id}
                    className={`nav-item text-nowrap ${menu.has_dropdown ? "dropdown" : ""} mb-2 mb-lg-0`}
                >
                    <Link
                        href={menu.link}
                        className={`nav-link ${menu.has_dropdown ? "dropdown-toggle" : ""} 
                        ${pathname === menu.link ? "active" : ""} ${navTitle === menu.title ? "show" : ""}
                        d-flex align-items-center `}
                        onClick={() => menu.has_dropdown && openMobileMenu(menu.title)}
                    >
                        <i className={`bi ${getMenuIcon(menu.title)} d-lg-none me-3 fs-20`} style={{ color: '#FF6725' }}></i>
                        <span className="fw-500">{menu.title}</span>
                    </Link>
                    {menu.has_dropdown && menu.title !== "Home" && (
                        <ul className={`dropdown-menu ${navTitle === menu.title ? "show" : ""} border-0 shadow-none ps-3 ps-lg-0`}>
                            {menu.sub_menus &&
                                menu.sub_menus.map((sub_m: any, i: any) => (
                                    <li key={i} className="mb-1">
                                        <Link
                                            href={sub_m.link}
                                            className={`dropdown-item ${pathname === sub_m.link ? "active" : ""} d-flex align-items-center py-2`}
                                        >
                                            <i className="bi bi-chevron-right d-lg-none me-2 fs-12" style={{ color: '#FF6725' }}></i>
                                            <span>{sub_m.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            {menu.menu_column && (
                                <li className="row gx-1">
                                    {menu.menu_column.map((item: any) => (
                                        <div key={item.id} className="col-lg-4">
                                            <div className="menu-column">
                                                <h6 className="mega-menu-title ps-3 ps-lg-0">{item.mega_title}</h6>
                                                <ul className="style-none mega-dropdown-list">
                                                    {item.mega_menus.map((mega_m: any, i: any) => (
                                                        <li key={i} className="mb-1">
                                                            <Link
                                                                href={mega_m.link}
                                                                className={`dropdown-item ${pathname === mega_m.link ? "active" : ""} d-flex align-items-center py-2`}
                                                            >
                                                                <i className="bi bi-chevron-right d-lg-none me-2 fs-12" style={{ color: '#FF6725' }}></i>
                                                                <span>{mega_m.title}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </li>
                            )}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default NavMenu;
