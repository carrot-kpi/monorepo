import React, { type ReactNode } from "react";
import {
    type FooterLink,
    type NavbarLink,
    FOOTER_LINKS,
    NAVBAR_LINKS,
} from "../../constants";
// import { CarrotMarquee } from "../ui/carrot-marquee";
import { Footer } from "../ui/footer";
import { Navbar, type NavbarProps } from "../ui/navbar";

interface LayoutProps {
    navbarLinks?: NavbarLink[];
    navbarBgColor?: NavbarProps["bgColor"];
    noNavbar?: boolean;
    footerLinks?: FooterLink[];
    children?: ReactNode;
}

export const Layout = ({
    navbarLinks,
    navbarBgColor,
    noNavbar,
    footerLinks,
    children,
}: LayoutProps) => {
    return (
        <div className="w-full flex flex-col bg-grid-light dark:bg-grid-dark bg-left-top">
            {!noNavbar && (
                <Navbar
                    links={navbarLinks || NAVBAR_LINKS}
                    bgColor={navbarBgColor}
                />
            )}
            {children}
            {/* <CarrotMarquee /> */}
            <Footer footerLinks={footerLinks || FOOTER_LINKS} />
        </div>
    );
};
