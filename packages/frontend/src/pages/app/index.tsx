import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../home";
import { Campaign } from "../campaign";
import { Create } from "../create";
import { Navbar } from "../../components/ui/navbar";
import { Footer } from "../../components/ui/footer";
import { navbarLinks } from "./navbar-links";
import { footerLinks } from "./footer-links";
import { CarrotMarquee } from "../../components/ui/carrot-marquee";
import { Campaigns } from "../campaigns";

export function App() {
    return (
        <>
            <Navbar bgColor="orange" links={navbarLinks} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/campaigns/:address" element={<Campaign />} />
                <Route path="/create" element={<Create />} />
                <Route path="/campaigns" element={<Campaigns />} />
            </Routes>
            <CarrotMarquee />
            <Footer footerLinks={footerLinks} />
        </>
    );
}
