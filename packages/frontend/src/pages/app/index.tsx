import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../home";
import { Campaign } from "../campaign";
import { Create } from "../create";
import { Navbar } from "../../components/ui/navbar/Navbar";

const navbarLinks = [
    {
        title: "About",
        to: "/about",
    },
    {
        title: "Campaigns",
        to: "/campaigns",
    },
    {
        title: "Community",
        to: "/community",
    },
];

export function App() {
    return (
        <>
            <Navbar bgColor="orange" links={navbarLinks} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/campaigns/:address" element={<Campaign />} />
                <Route path="/create" element={<Create />} />
            </Routes>
        </>
    );
}
