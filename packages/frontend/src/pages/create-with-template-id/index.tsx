import React, { useCallback, useEffect, useState } from "react";
import {
    KPITokenCreationForm,
    useIPFSGatewayURL,
    usePreferDecentralization,
} from "@carrot-kpi/react";
import { useTransition, config as springConfig } from "@react-spring/web";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProvider } from "wagmi";
import { Fetcher, Template } from "@carrot-kpi/sdk";
import { Loader } from "@carrot-kpi/ui";
import { AnimatedFullscreenModal } from "../../components/fullscreen-modal";
import { useQueryClient } from "@tanstack/react-query";
import { LATEST_KPI_TOKEN_QUERY_KEY_PREFIX } from "../../hooks/useLatestKPITokens";

interface CreateWithTemplateIdProps {
    closing?: boolean;
    onOutAnimationEnd?: () => void;
}

export const CreateWithTemplateId = ({
    closing,
    onOutAnimationEnd,
}: CreateWithTemplateIdProps) => {
    const { i18n } = useTranslation();
    const { state } = useLocation();
    const { templateId } = useParams();
    const provider = useProvider();
    const preferDecentralization = usePreferDecentralization();
    const ipfsGatewayURL = useIPFSGatewayURL();
    const queryClient = useQueryClient();

    const [template, setTemplate] = useState<Template | null>(
        state ? state.template : null
    );
    const transitions = useTransition(!closing && template, {
        config: { ...springConfig.default, duration: 100 },
        from: { opacity: 0, translateY: "0.5%", scale: 0.99 },
        enter: { opacity: 1, translateY: "0%", scale: 1 },
        leave: {
            opacity: 0,
            translateY: "0.5%",
            scale: 0.99,
        },
        onDestroyed: onOutAnimationEnd,
    });

    useEffect(() => {
        if (!!state?.template) {
            setTemplate(state.template);
            return;
        }
        if (!templateId) {
            console.warn("no template in state and no template id");
            return;
        }
        let cancelled = false;
        const fetchData = async () => {
            try {
                const templates = await Fetcher.fetchKPITokenTemplates({
                    provider,
                    ipfsGatewayURL,
                    preferDecentralization,
                    ids: [templateId],
                });
                if (templates.length === 0)
                    console.warn(`no template with id ${templateId} found`);
                if (!cancelled) setTemplate(templates[0]);
            } catch (error) {
                console.error(
                    `could not fetch template with id ${templateId}`,
                    error
                );
            }
        };
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [
        ipfsGatewayURL,
        preferDecentralization,
        provider,
        state.template,
        templateId,
    ]);

    const handleCreate = useCallback(() => {
        // a token has just been created, invalidate latest tokens query
        queryClient.invalidateQueries(
            // FIXME: kinda sus and ugly. The example in the docs say we
            // can use the query prefix direcy, but it's apparently not
            // true here
            LATEST_KPI_TOKEN_QUERY_KEY_PREFIX as unknown as readonly unknown[]
        );
    }, [queryClient]);

    const handleDismiss = useCallback(() => {
        setTemplate(null);
    }, []);

    return transitions((style, template) => {
        return (
            template && (
                <AnimatedFullscreenModal
                    bgColor="green"
                    springStyle={style}
                    onDismiss={handleDismiss}
                >
                    <KPITokenCreationForm
                        template={template}
                        fallback={
                            <div className="bg-green py-10 text-black flex justify-center">
                                <Loader />
                            </div>
                        }
                        i18n={i18n}
                        className={{ root: "w-full h-full" }}
                        onCreate={handleCreate}
                    />
                </AnimatedFullscreenModal>
            )
        );
    });
};
