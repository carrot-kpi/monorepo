import React from "react";
import {
    Route,
    RouterProvider,
    createHashRouter,
    createRoutesFromElements,
} from "react-router-dom";
import { Home } from "./home";
import { Page } from "./page";
import { Campaigns } from "./campaigns";
import { CreateWithTemplateId } from "./create-with-template-id";
import { useTemplatePreviewMode } from "@carrot-kpi/react";
import { StagingModeBanner } from "../components/staging-mode-banner";

interface AppProps {
    templateId?: number;
}

export const App = ({ templateId }: AppProps) => {
    const templatePreviewMode = useTemplatePreviewMode();

    const router = createHashRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Home templateId={templateId} />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route
                    path="/create/:templateId/draft/:draftId?"
                    element={<CreateWithTemplateId />}
                />
                <Route path="/campaigns/:address" element={<Page />} />
            </>,
        ),
    );

    return (
        <>
            {templatePreviewMode && <StagingModeBanner />}
            <RouterProvider router={router} />
        </>
    );
};
