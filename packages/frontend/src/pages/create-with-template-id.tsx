import React, { useCallback, useEffect } from "react";
import { type SerializableObject } from "@carrot-kpi/react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { Authenticate } from "../components/authenticate";
import { useIsPinningProxyAuthenticated } from "../hooks/useIsPinningProxyAuthenticated";
import { Layout } from "../components/layout";
import { Permissioned } from "../components/permissioned";
import { useIsCreatorAllowed } from "../hooks/useIsCreatorAllowed";
import { CampaignCreationForm } from "../components/campaign-creation-form";
import { Loader } from "@carrot-kpi/ui";

export function CreateWithTemplateId<S extends SerializableObject<S>>() {
    const navigate = useNavigate();
    const { address } = useAccount();

    const pinningProxyAuthenticated = useIsPinningProxyAuthenticated();

    const { allowed: creatorAllowed, loading: loadingPermission } =
        useIsCreatorAllowed(address);

    useEffect(() => {
        const bodyElement = window.document.getElementById("__app_body");
        if (!bodyElement) return;
        bodyElement.scrollIntoView();
    }, []);

    const handleDismiss = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <Layout navbarBgColor="green" noMarquee>
            <div className="flex-grow bg-grid-light bg-left-top bg-green">
                {loadingPermission ? (
                    <div className="h-screen py-20 text-black flex justify-center">
                        <Loader />
                    </div>
                ) : !creatorAllowed ? (
                    <div className="h-screen py-20">
                        <Permissioned onBack={handleDismiss} />
                    </div>
                ) : !pinningProxyAuthenticated ? (
                    <div className="h-screen py-20">
                        <Authenticate onCancel={handleDismiss} />
                    </div>
                ) : (
                    <CampaignCreationForm />
                )}
            </div>
        </Layout>
    );
}
