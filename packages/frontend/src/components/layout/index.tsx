import React, { ReactNode, useEffect, useState } from "react";
import {
    FooterLink,
    FOOTER_LINKS,
    NavbarLink,
    NAVBAR_LINKS,
} from "../../constants";
import { CarrotMarquee } from "../ui/carrot-marquee";
import { Footer } from "../ui/footer";
import { Navbar } from "../ui/navbar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
    navbarBackgroundColor?: "green" | "orange";
    navbarLinks?: NavbarLink[];
    footerLinks?: FooterLink[];
    children?: ReactNode;
}

const LANDING_RELATIVE_PATH = "/";

export const Layout = ({
    navbarBackgroundColor = "orange",
    navbarLinks,
    footerLinks,
    children,
}: LayoutProps) => {
    const { pathname } = useLocation();
    const [isLanding, setIsLanding] = useState(true);

    useEffect(() => {
        setIsLanding(pathname === LANDING_RELATIVE_PATH);
    }, [pathname]);

    return (
        <>
            <Navbar
                className={{ nav: isLanding ? "lg:px-32" : "lg:px-12" }}
                bgColor={navbarBackgroundColor}
                links={navbarLinks || NAVBAR_LINKS}
            />
            {children}
            <CarrotMarquee />
            <Footer footerLinks={footerLinks || FOOTER_LINKS} />
        </>
    );
};
