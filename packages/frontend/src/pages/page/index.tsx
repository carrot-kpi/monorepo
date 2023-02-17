import React, { useCallback, useEffect, useState } from "react";
import { KPITokenPage, usePreferences } from "@carrot-kpi/react";
import { Fetcher, KPIToken } from "@carrot-kpi/sdk";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProvider } from "wagmi";
import { useTransition, config as springConfig } from "@react-spring/web";
import { Loader } from "@carrot-kpi/ui";
import { AnimatedFullscreenModal } from "../../components/fullscreen-modal";

interface PageProps {
    customBaseURL?: string;
    closing?: boolean;
    onOutAnimationEnd?: () => void;
}

export const Page = ({
    customBaseURL,
    closing,
    onOutAnimationEnd,
}: PageProps) => {
    const { i18n } = useTranslation();
    const { state } = useLocation();
    const { address } = useParams();
    const provider = useProvider();
    const { preferDecentralization } = usePreferences();

    const [kpiToken, setKPIToken] = useState<KPIToken | null>(
        state ? state.kpiToken : null
    );
    const transitions = useTransition(!closing && kpiToken, {
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
        if (!!state?.kpiToken) {
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
                    await Fetcher.fetchKPITokens({
                        provider,
                        preferDecentralization,
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
    }, [preferDecentralization, provider, address, state?.kpiToken]);

    const handleDismiss = useCallback(() => {
        setKPIToken(null);
    }, []);

    return transitions((style, template) => {
        return (
            template && (
                <AnimatedFullscreenModal
                    style={style}
                    onDismiss={handleDismiss}
                >
                    <KPITokenPage
                        kpiToken={kpiToken || undefined}
                        i18n={i18n}
                        fallback={
                            <div className="bg-orange py-10 text-black flex justify-center">
                                <Loader />
                            </div>
                        }
                        customBaseURL={customBaseURL}
                        className="w-full h-full"
                    />
                </AnimatedFullscreenModal>
            )
        );
    });
};
