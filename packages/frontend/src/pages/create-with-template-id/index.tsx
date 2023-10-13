import React, { useCallback, useEffect, useState } from "react";
import {
    KPITokenCreationForm,
    useIPFSGatewayURL,
    usePreferDecentralization,
} from "@carrot-kpi/react";
import { useTransition, config as springConfig } from "@react-spring/web";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAccount, useNetwork, usePublicClient } from "wagmi";
import { Fetcher, ResolvedTemplate } from "@carrot-kpi/sdk";
import { ErrorFeedback, Loader } from "@carrot-kpi/ui";
import { AnimatedFullscreenModal } from "../../components/fullscreen-modal";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { Authenticate } from "../../components/authenticate";
import { useIsPinningProxyAuthenticated } from "../../hooks/useIsPinningProxyAuthenticated";
import { useInvalidateLatestKPITokens } from "../../hooks/useInvalidateLatestKPITokens";

interface CreateWithTemplateIdProps {
    closing?: boolean;
    onOutAnimationEnd?: () => void;
}

export const CreateWithTemplateId = ({
    closing,
    onOutAnimationEnd,
}: CreateWithTemplateIdProps) => {
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

    const [template, setTemplate] = useState<ResolvedTemplate | null>(
        state && "specification" in state.template ? state.template : null,
    );
    const [show, setShow] = useState(!closing);
    const [formKey, setFormKey] = useState(0);
    const pinningProxyAuthenticated = useIsPinningProxyAuthenticated();

    const transitions = useTransition(show, {
        config: { ...springConfig.default, duration: 100 },
        from: { opacity: 0, translateY: "0.5%", scale: 0.97 },
        enter: { opacity: 1, translateY: "0%", scale: 1 },
        leave: {
            opacity: 0,
            translateY: "0.5%",
            scale: 0.97,
        },
        onDestroyed: onOutAnimationEnd,
    });

    useEffect(() => {
        setShow(!closing);
    }, [closing]);

    // every time the chain or the connected address changes,
    // reset the creation form state
    useEffect(() => {
        setFormKey((prevState) => prevState + 1);
    }, [chain, address]);

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
                    if (!cancelled) setShow(false);
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
                    if (!cancelled) setShow(false);
                    return;
                }
                if (!cancelled) setTemplate(resolvedTemplates[0]);
            } catch (error) {
                console.error(
                    `could not fetch template with id ${templateId}`,
                    error,
                );
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
        setShow(false);
    }, []);

    return transitions((style, show) => {
        return (
            show && (
                <AnimatedFullscreenModal
                    bgColor="green"
                    springStyle={style}
                    onDismiss={handleDismiss}
                >
                    {!pinningProxyAuthenticated ? (
                        <Authenticate onCancel={handleDismiss} />
                    ) : (
                        <KPITokenCreationForm
                            key={formKey}
                            template={template || undefined}
                            fallback={
                                <div className="py-10 text-black flex justify-center">
                                    <Loader />
                                </div>
                            }
                            error={
                                <div className="py-10 flex justify-center">
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
                    )}
                </AnimatedFullscreenModal>
            )
        );
    });
};
