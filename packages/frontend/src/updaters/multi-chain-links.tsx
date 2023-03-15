import React, { Modal, Typography } from "@carrot-kpi/ui";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Chain, useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { SUPPORTED_CHAINS } from "../constants";
import { ReactComponent as WrongNetwork } from "../assets/wrong-network.svg";
import { useTranslation } from "react-i18next";

const SUPPORTED_CHAIN_URL_NAMES = Object.values(SUPPORTED_CHAINS).map((chain) =>
    chain.name.toLowerCase()
);

export const MultiChainLinksUpdater = () => {
    const { t } = useTranslation();
    const { chain, chains } = useNetwork();
    const { address } = useAccount();
    const { switchNetworkAsync } = useSwitchNetwork();
    const [searchParams, setSearchParams] = useSearchParams();

    const [chainFromSearchParams, setChainFromSearchParams] =
        useState<Chain | null>(null);
    const [wrongChainModalOpen, setWrongChainModalOpen] = useState(false);
    const [switchingChain, setSwitchingChain] = useState(false);

    const [canFreelySwitchNetworks, setCanFreelySwitchNetworks] =
        useState(false);

    // this effect saves to the internal state the target chain as taken from the
    // url search params.
    // it doesn't do that if the user can freely switch networks (i.e. if the user
    // has already landed on the page)
    useEffect(() => {
        if (canFreelySwitchNetworks) return;
        const targetChainName = searchParams.get("chain");
        if (!targetChainName) return;
        const targetChain = chains.find(
            (c) => c.name.toLowerCase() === targetChainName.toLowerCase()
        );
        if (!targetChain) return;
        setChainFromSearchParams(targetChain);
    }, [canFreelySwitchNetworks, chains, searchParams]);

    // in case no url chain is specified or an invalid one is, this sets it
    // to the current chain
    useEffect(() => {
        if (!chain) return;
        const targetChainName = searchParams.get("chain");
        if (
            targetChainName &&
            SUPPORTED_CHAIN_URL_NAMES.indexOf(targetChainName) >= 0
        )
            return;
        searchParams.set("chain", chain.name.toLowerCase());
        setSearchParams(searchParams);
    }, [chain, searchParams, setSearchParams]);

    // if the target chain is different to the currently active chain this effect
    // shows the wrong network modal, inviting the user to switch the network
    // in their wallet (it does so only the first time)
    useEffect(() => {
        if (!chain || canFreelySwitchNetworks) return;
        const targetChainName = searchParams.get("chain");
        if (
            !targetChainName ||
            SUPPORTED_CHAIN_URL_NAMES.indexOf(targetChainName) < 0
        )
            return;

        const targetMatchesChain =
            chain.name.toLowerCase() === targetChainName.toLowerCase();
        setCanFreelySwitchNetworks(targetMatchesChain);

        let cancelled = false;
        const handleNetworkSwitchOrModalShow = async () => {
            const targetChainId = chains.find(
                (c) => c.name.toLowerCase() === targetChainName
            )?.id;
            if (!address && switchNetworkAsync && targetChainId) {
                try {
                    setSwitchingChain(true);
                    await switchNetworkAsync(targetChainId);
                } catch (error) {
                    console.warn("could not switch chain", error);
                } finally {
                    setSwitchingChain(false);
                }
            }
            if (!cancelled)
                setWrongChainModalOpen(!!address && chain.id !== targetChainId);
        };
        void handleNetworkSwitchOrModalShow();
        return () => {
            cancelled = true;
        };
    }, [
        address,
        canFreelySwitchNetworks,
        chain,
        chains,
        searchParams,
        switchNetworkAsync,
    ]);

    // this updates the url when the network is switched
    useEffect(() => {
        if (!chain || !address || switchingChain || !canFreelySwitchNetworks)
            return;
        const targetChainName = chains
            .find((c) => c.id === chain.id)
            ?.name.toLowerCase();
        if (!targetChainName || targetChainName === searchParams.get("chain"))
            return;
        searchParams.set("chain", targetChainName);
        setSearchParams(searchParams);
    }, [
        address,
        canFreelySwitchNetworks,
        chain,
        chains,
        searchParams,
        setSearchParams,
        switchingChain,
    ]);

    return (
        <Modal open={wrongChainModalOpen}>
            <div className="bg-white border border-black rounded-xl p-8 flex flex-col items-center gap-4 z-[1] max-w-md">
                <WrongNetwork className="w-40" />
                <Typography variant="h5">{t("wrong.network.title")}</Typography>
                <Typography className={{ root: "text-center" }}>
                    {t("wrong.network.description", {
                        chainName: chainFromSearchParams?.name,
                    })}
                </Typography>
            </div>
        </Modal>
    );
};
