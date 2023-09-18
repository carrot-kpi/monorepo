import React, { useCallback, useEffect, useState } from "react";
import { KPITokenPage, useWatchKPIToken } from "@carrot-kpi/react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useNetwork } from "wagmi";
import { useTransition, config as springConfig } from "@react-spring/web";
import { ErrorFeedback, Loader } from "@carrot-kpi/ui";
import { AnimatedFullscreenModal } from "../../components/fullscreen-modal";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { usePrevious } from "react-use";
import { useBlacklistedTokens } from "../../hooks/useBlacklistedTokens";
import type { ChainId } from "@carrot-kpi/sdk";

interface PageProps {
    customBaseURL?: string;
    closing?: boolean;
    onOutAnimationEnd?: () => void;
}

export const Page = ({ closing, onOutAnimationEnd }: PageProps) => {
    const { i18n, t } = useTranslation();
    const { state } = useLocation();
    const { address } = useParams();
    const addTransaction = useAddTransaction();
    const { chain } = useNetwork();
    const previousChain = usePrevious(chain);
    const { blacklistedKPITokens } = useBlacklistedTokens(chain?.id as ChainId);

    const watchedKPITokenWithData = useWatchKPIToken({
        kpiTokenOrAddress: state?.kpiToken || address,
        blacklisted: blacklistedKPITokens,
    });
    const [show, setShow] = useState(!closing);
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

    useEffect(() => {
        if (!show || !chain || !previousChain) return;
        setShow(previousChain.id === chain.id);
    }, [chain, show, previousChain]);

    const handleDismiss = useCallback(() => {
        setShow(false);
    }, []);

    return transitions((style, show) => {
        return (
            show && (
                <AnimatedFullscreenModal
                    springStyle={style}
                    onDismiss={handleDismiss}
                >
                    <KPITokenPage
                        kpiToken={watchedKPITokenWithData}
                        i18n={i18n}
                        fallback={
                            <div className="bg-orange py-10 text-black flex justify-center">
                                <Loader />
                            </div>
                        }
                        error={
                            <div className="bg-orange bg-grid-light py-10 flex justify-center">
                                <ErrorFeedback
                                    messages={{
                                        title: t(
                                            "error.initializing.page.title",
                                        ),
                                        description: t(
                                            "error.initializing.page.description",
                                        ),
                                    }}
                                />
                            </div>
                        }
                        className={{ root: "w-full h-full" }}
                        onTx={addTransaction}
                    />
                </AnimatedFullscreenModal>
            )
        );
    });
};
