import React, { ReactNode } from "react";
import {
    FooterLink,
    FOOTER_LINKS,
    NavbarLink,
    NAVBAR_LINKS,
} from "../../constants";
import { CarrotMarquee } from "../ui/carrot-marquee";
import { Footer } from "../ui/footer";
import { Navbar } from "../ui/navbar";

interface LayoutProps {
    navbarBackgroundColor?: "green" | "orange";
    navbarLinks?: NavbarLink[];
    footerLinks?: FooterLink[];
    children?: ReactNode;
}

export const Layout = ({
    navbarBackgroundColor = "orange",
    navbarLinks,
    footerLinks,
    children,
}: LayoutProps) => {
    return (
        <>
            <Navbar
                bgColor={navbarBackgroundColor}
                links={navbarLinks || NAVBAR_LINKS}
            />
            {children}
            <CarrotMarquee />
            <Footer footerLinks={footerLinks || FOOTER_LINKS} />
        </>
    );
};
