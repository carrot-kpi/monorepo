import { Modal, Typography } from "@carrot-kpi/ui";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Chain, useAccount, useNetwork } from "wagmi";
import { DEFAULT_CHAIN, SUPPORTED_CHAINS } from "../constants";
import { ReactComponent as WrongNetwork } from "../assets/wrong-network.svg";
import { useTranslation } from "react-i18next";
import { ReadonlyConnector } from "../connectors";

const SUPPORTED_CHAIN_NAMES = Object.values(SUPPORTED_CHAINS).map((c) =>
    c.name.toLowerCase()
);

export const MultiChainLinksUpdater = () => {
    const { t } = useTranslation();
    const { chain, chains } = useNetwork();
    const { connector: activeConnector } = useAccount();
    const [searchParams, setSearchParams] = useSearchParams();
    const [targetLandingChain, setTargetLandingChain] = useState<Chain | null>(
        null
    );
    const [triedSwitchingAutomatically, setTriedSwitchingAutomatically] =
        useState(false);
    const [freeSwitchingEnabled, setFreeSwitchingEnabled] = useState(false);

    // this effect, executed only once, does a couple things:
    // - if a chain is set in the URL and it is supported it's set as the target chain.
    // - if a chain is not specified or the specified chain is not supported, the current chain
    //   is set used as the url chain param (falls back to the default network if the currently
    //   active chain is not supported). This is also set as the target chain
    useEffect(() => {
        let targetLandingChain: Chain;
        const chainName = searchParams.get("chain");
        if (!chainName || !SUPPORTED_CHAIN_NAMES.includes(chainName)) {
            const currentlyActiveChainSupported =
                chain &&
                chains.some((supportedChain) => {
                    supportedChain.id === chain.id;
                });
            targetLandingChain = currentlyActiveChainSupported
                ? chain
                : DEFAULT_CHAIN;
            setSearchParams((prevValue) => {
                prevValue.set("chain", targetLandingChain.name.toLowerCase());
                return prevValue;
            });
        } else {
            const candidateTargetChain = Object.values(chains).find(
                (chain) => chain.name.toLowerCase() === chainName
            );
            if (!candidateTargetChain) return;
            targetLandingChain = candidateTargetChain;
        }
        setTargetLandingChain(targetLandingChain);

        // disabling exhaustive dependencies rule since this effect is meant to
        // run only once when the component is mounted
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // whenever the target landing chain is set this effect takes
    // care of automatic switching (if supported)
    useEffect(() => {
        let cancelled = false;
        const switchNetwork = async () => {
            try {
                if (
                    !freeSwitchingEnabled &&
                    targetLandingChain &&
                    activeConnector?.switchChain &&
                    !triedSwitchingAutomatically &&
                    chain?.id !== targetLandingChain.id
                )
                    await activeConnector.switchChain(targetLandingChain.id);
            } catch (error) {
                console.warn("could not automatically switch chain", error);
            } finally {
                if (!cancelled) setTriedSwitchingAutomatically(true);
            }
        };
        void switchNetwork();
        return () => {
            cancelled = true;
        };
    }, [
        activeConnector,
        chain?.id,
        freeSwitchingEnabled,
        targetLandingChain,
        triedSwitchingAutomatically,
    ]);

    // this hook is supposed to run when a target chain was specified and automatic
    // switching wasn't successfully completed. In this case the user has to manually
    // switch to the correct chain (with the wrong network modal open in the dapp).
    // This hook simply enables free network switching once the target and currently
    // enabled networks match for the first time.
    useEffect(() => {
        if (freeSwitchingEnabled) return;
        setFreeSwitchingEnabled(
            !!(
                triedSwitchingAutomatically &&
                chain?.id === targetLandingChain?.id
            )
        );
    }, [
        chain,
        freeSwitchingEnabled,
        targetLandingChain,
        triedSwitchingAutomatically,
    ]);

    // this hook keeps the url chain in sync with the currently selected chain
    // on carrot.
    useEffect(() => {
        if (!freeSwitchingEnabled || !chain) return;
        setSearchParams(
            (prevValue) => {
                const currentURLChain = prevValue.get("chain")?.toLowerCase();
                const currentChain = chain.name.toLowerCase();
                if (
                    currentURLChain === currentChain ||
                    !SUPPORTED_CHAIN_NAMES.includes(currentChain)
                )
                    return prevValue;
                prevValue.set("chain", chain.name.toLowerCase());
                return prevValue;
            },
            { replace: true }
        );
    }, [chain, freeSwitchingEnabled, setSearchParams]);

    return (
        <Modal
            open={
                !!(
                    !freeSwitchingEnabled &&
                    triedSwitchingAutomatically &&
                    !(activeConnector instanceof ReadonlyConnector) &&
                    chain?.id !== targetLandingChain?.id
                )
            }
        >
            <div className="bg-white border border-black rounded-xl p-8 flex flex-col items-center gap-4 z-[1] max-w-md">
                <WrongNetwork className="w-40" />
                <Typography variant="h5">{t("wrong.network.title")}</Typography>
                <Typography className={{ root: "text-center" }}>
                    {t("wrong.network.description", {
                        chainName: targetLandingChain?.name,
                    })}
                </Typography>
            </div>
        </Modal>
    );
};
