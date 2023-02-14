import React, { useCallback, useEffect, useState } from "react";
import { KPITokenPage, usePreferences } from "@carrot-kpi/react";
import { Fetcher, KPIToken } from "@carrot-kpi/sdk";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProvider } from "wagmi";
import { useTransition, animated } from "@react-spring/web";
import { Navbar } from "../../components/ui/navbar";

interface PageProps {
    customBaseURL?: string;
}

export const Page = ({ customBaseURL }: PageProps) => {
    const { i18n } = useTranslation();
    const { state } = useLocation();
    const navigate = useNavigate();
    const { address } = useParams();
    const provider = useProvider();
    const { preferDecentralization } = usePreferences();

    const [kpiToken, setKPIToken] = useState<KPIToken | null>(
        state ? state.kpiToken : null
    );
    const transitions = useTransition(kpiToken, {
        from: { opacity: 0, transform: "translateY(1%)" },
        enter: { opacity: 1, transform: "translateY(0)" },
        leave: {
            opacity: 0,
            transform: "translateY(1%)",
        },
    });

    useEffect(() => {
        if (!!state.kpiToken) {
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
    }, [preferDecentralization, provider, state.kpiToken, address]);

    const handleDismiss = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return transitions((style, template: KPIToken | null) => {
        return (
            template && (
                <animated.div
                    style={style}
                    className="fixed top-0 left-0 h-screen w-screen overflow-y-auto bg-orange"
                >
                    <Navbar mode="modal" onDismiss={handleDismiss} />
                    <KPITokenPage
                        address={address}
                        i18n={i18n}
                        // TODO: use a proper fallback component
                        fallback="Loading..."
                        customBaseURL={customBaseURL}
                    />
                </animated.div>
            )
        );
    });
};
