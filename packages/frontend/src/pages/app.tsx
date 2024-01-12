import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./home";
import { Page } from "./page";
import { Campaigns } from "./campaigns";
import { CreateWithTemplateId } from "./create-with-template-id";
import { useFathomTrackPageWatch } from "../hooks/useFathomTrackPageWatch";
import { useStagingMode } from "@carrot-kpi/react";
import { StagingModeBanner } from "../components/staging-mode-banner";

interface AppProps {
    templateId?: number;
}

export const App = ({ templateId }: AppProps) => {
    const stagingMode = useStagingMode();

    useFathomTrackPageWatch();

    return (
        <>
            {stagingMode && <StagingModeBanner />}
            <Routes>
                <Route path="/" element={<Home templateId={templateId} />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route
                    path="/create/:templateId/draft/:draftId?"
                    element={<CreateWithTemplateId />}
                />
                <Route path="/campaigns/:address" element={<Page />} />
            </Routes>
        </>
    );
};
