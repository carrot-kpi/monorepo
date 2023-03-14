import React, { useCallback, useEffect, useState } from "react";
import { KPITokenPage } from "@carrot-kpi/react";
import { KPIToken } from "@carrot-kpi/sdk";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTransition, config as springConfig } from "@react-spring/web";
import { Loader } from "@carrot-kpi/ui";
import { AnimatedFullscreenModal } from "../../components/fullscreen-modal";
import { useFetcher } from "@carrot-kpi/react";

interface PageProps {
    customBaseURL?: string;
    closing?: boolean;
    onOutAnimationEnd?: () => void;
}

export const Page = ({ closing, onOutAnimationEnd }: PageProps) => {
    const { i18n } = useTranslation();
    const { state } = useLocation();
    const { address } = useParams();
    const { fetcher } = useFetcher();
    const [kpiToken, setKPIToken] = useState<KPIToken | null>(
        state ? state.kpiToken : null
    );
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
        if (state?.kpiToken) {
            setKPIToken(state.kpiToken);
            return;
        }
        if (!address) {
            console.warn("no kpi token in state and no kpi token address");
            return;
        }
        let cancelled = false;
        const fetchData = async () => {
            try {
                const kpiToken = (
                    await fetcher.fetchKPITokens({
                        addresses: [address],
                    })
                )[address];
                if (!kpiToken)
                    console.warn(`no kpi token with address ${address} found`);
                if (!cancelled) setKPIToken(kpiToken);
            } catch (error) {
                console.error(
                    `could not fetch kpi token with address ${address}`,
                    error
                );
            }
        };
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, [fetcher, address, state?.kpiToken]);

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
                        kpiToken={kpiToken}
                        i18n={i18n}
                        fallback={
                            <div className="flex justify-center py-10 text-black bg-orange">
                                <Loader />
                            </div>
                        }
                        className={{ root: "w-full h-full" }}
                    />
                </AnimatedFullscreenModal>
            )
        );
    });
};
