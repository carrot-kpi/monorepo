import React, { useCallback, useEffect, useState } from "react";
import {
    KPITokenCreationForm,
    useIPFSGatewayURL,
    usePreferDecentralization,
} from "@carrot-kpi/react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAccount, useNetwork, usePublicClient } from "wagmi";
import { Fetcher, ResolvedTemplate } from "@carrot-kpi/sdk";
import { ErrorFeedback, Loader } from "@carrot-kpi/ui";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { Authenticate } from "../../components/authenticate";
import { useIsPinningProxyAuthenticated } from "../../hooks/useIsPinningProxyAuthenticated";
import { useInvalidateLatestKPITokens } from "../../hooks/useInvalidateLatestKPITokens";
import { Layout } from "../../components/layout";
import { Permissioned } from "../../components/permissioned";
import { useIsCreatorAllowed } from "../../hooks/useIsCreatorAllowed";

export const CreateWithTemplateId = () => {
    const { i18n, t } = useTranslation();
    const { state } = useLocation();
    const navigate = useNavigate();
    const addTransaction = useAddTransaction();
    const { templateId } = useParams();
    const publicClient = usePublicClient();
    const { chain } = useNetwork();
    const { address } = useAccount();
    const preferDecentralization = usePreferDecentralization();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const invalidateLatestKPITokens = useInvalidateLatestKPITokens();

    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState<ResolvedTemplate | null>(
        state && "specification" in state.template ? state.template : null,
    );
    const [formKey, setFormKey] = useState(0);
    const pinningProxyAuthenticated = useIsPinningProxyAuthenticated();

    const { allowed: creatorAllowed, loading: loadingPermission } =
        useIsCreatorAllowed(address);

    // every time the chain or the connected address changes,
    // reset the creation form state
    useEffect(() => {
        setFormKey((prevState) => prevState + 1);
    }, [chain, address]);

    useEffect(() => {
        const bodyElement = window.document.getElementById("__app_body");
        if (!bodyElement) return;
        bodyElement.scrollIntoView();
    }, []);

    useEffect(() => {
        if (!!state?.template) {
            setTemplate(state.template);
            return;
        }
        if (!templateId) {
            console.warn("no template in state and no template id");
            return;
        }
        const parsedTemplateId = parseInt(templateId);
        if (isNaN(parsedTemplateId)) {
            console.warn(`non numeric template id ${templateId}`);
            return;
        }
        let cancelled = false;
        const fetchData = async () => {
            if (!cancelled) setLoading(true);
            try {
                const templates = await Fetcher.fetchKPITokenTemplates({
                    publicClient,
                    preferDecentralization,
                    ids: [parsedTemplateId],
                });
                if (templates.length !== 1) {
                    console.warn(
                        `inconsistent array length while fetching template with id ${templateId} on ${chain?.name}`,
                    );
                    if (!cancelled) setTemplate(null);
                    return;
                }
                const resolvedTemplates = await Fetcher.resolveTemplates({
                    ipfsGatewayURL,
                    templates: templates,
                });
                if (resolvedTemplates.length !== 1) {
                    console.warn(
                        `inconsistent array length while resolving template with id ${templateId} on ${chain?.name}`,
                    );
                    if (!cancelled) setTemplate(null);
                    return;
                }
                if (!cancelled) setTemplate(resolvedTemplates[0]);
            } catch (error) {
                console.error(
                    `could not fetch template with id ${templateId}`,
                    error,
                );
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [
        chain?.name,
        ipfsGatewayURL,
        preferDecentralization,
        publicClient,
        state?.template,
        templateId,
    ]);

    const handleCreate = useCallback(() => {
        invalidateLatestKPITokens();
    }, [invalidateLatestKPITokens]);

    const handleDismiss = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <Layout navbarBgColor="green" noMarquee>
            <div className="flex-grow bg-grid-light bg-left-top bg-green">
                {loading || loadingPermission ? (
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
                ) : template ? (
                    <KPITokenCreationForm
                        key={formKey}
                        template={template || undefined}
                        fallback={
                            <div className="text-black flex justify-center">
                                <Loader />
                            </div>
                        }
                        error={
                            <div className="h-screen py-20 flex justify-center">
                                <ErrorFeedback
                                    messages={{
                                        title: t(
                                            "error.initializing.creation.title",
                                        ),
                                        description: t(
                                            "error.initializing.creation.description",
                                        ),
                                    }}
                                />
                            </div>
                        }
                        i18n={i18n}
                        className={{ root: "w-full h-full" }}
                        onCreate={handleCreate}
                        navigate={navigate}
                        onTx={addTransaction}
                    />
                ) : (
                    <div className="py-20 flex justify-center">
                        <ErrorFeedback
                            messages={{
                                title: t("error.initializing.creation.title"),
                                description: t(
                                    "error.initializing.creation.description",
                                ),
                            }}
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
};
