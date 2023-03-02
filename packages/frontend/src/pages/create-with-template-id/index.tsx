import React, { useCallback, useEffect, useState } from "react";
import {
    KPITokenCreationForm,
    useIPFSGatewayURL,
    usePreferDecentralization,
} from "@carrot-kpi/react";
import { useTransition, config as springConfig } from "@react-spring/web";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BigNumber, providers } from "ethers";
import {
    Address,
    usePrepareSendTransaction,
    useProvider,
    useSendTransaction,
} from "wagmi";
import { Fetcher, Template } from "@carrot-kpi/sdk";
import { Loader } from "@carrot-kpi/ui";
import { AnimatedFullscreenModal } from "../../components/fullscreen-modal";

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

    const [template, setTemplate] = useState<Template | null>(
        state ? state.template : null
    );
    const transitions = useTransition(!closing && template, {
        config: { ...springConfig.default, duration: 200 },
        from: { opacity: 0, translateY: "1%" },
        enter: { opacity: 1, translateY: "0%" },
        leave: {
            opacity: 0,
            translateY: "1%",
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

    const [creationTx, setCreationTx] = useState<
        providers.TransactionRequest & {
            to: string;
        }
    >({
        to: "",
        data: "",
        value: BigNumber.from("0"),
    });

    const { config } = usePrepareSendTransaction({
        request: creationTx,
    });
    const { sendTransactionAsync } = useSendTransaction(config);

    useEffect(() => {
        if (!sendTransactionAsync) return;
        const fetch = async (): Promise<void> => {
            const tx = await sendTransactionAsync();
            await tx.wait();
        };
        void fetch();
    }, [sendTransactionAsync]);

    const handleDone = useCallback(
        (to: Address, data: string, value: BigNumber) => {
            setCreationTx({ to, data, value, gasLimit: 10_000_000 });
        },
        []
    );

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
                        // TODO: use a proper fallback component
                        fallback={
                            <div className="bg-green py-10 text-black flex justify-center">
                                <Loader />
                            </div>
                        }
                        // TODO: use a proper on done callback
                        onDone={handleDone}
                        i18n={i18n}
                        className={{ root: "w-full h-full" }}
                    />
                </AnimatedFullscreenModal>
            )
        );
    });
};
