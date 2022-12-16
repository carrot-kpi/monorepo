import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../home";
import { Campaign } from "../campaign";
import { Create } from "../create";
import { Navbar } from "../../components/ui/navbar";
import { Footer } from "../../components/ui/footer";
import { IpfsService } from "@carrot-kpi/sdk";

if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    navigator.serviceWorker
        .register(`/sw.js?ipfsGateway=${IpfsService.gateway}`)
        .then(() => {
            console.log("carrot service worker registered successfully");
        })
        .catch((error) => {
            console.error("could not register carrot service worker", error);
        });
}

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
            <Footer />
        </>
    );
}
