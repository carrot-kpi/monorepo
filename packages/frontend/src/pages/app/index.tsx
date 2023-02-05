import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home } from "../home";
import { Page } from "../page";
import { Create } from "../create";
import { Campaigns } from "../campaigns";
import { CreateWithTemplateId } from "../create-with-template-id";

interface AppProps {
    customBaseURL?: string;
    templateId?: number;
}

export const App = ({ customBaseURL, templateId }: AppProps) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, [location]);

    return (
        <Routes>
            <Route path="/" element={<Home templateId={templateId} />} />
            <Route
                path="/campaigns/:address"
                element={<Page customBaseURL={customBaseURL} />}
            />
            <Route path="/create" element={<Create />} />
            <Route
                path="/create/:templateId"
                element={<CreateWithTemplateId customBaseURL={customBaseURL} />}
            />
            <Route path="/campaigns" element={<Campaigns />} />
        </Routes>
    );
};
