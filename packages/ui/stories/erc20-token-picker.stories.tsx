import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { Meta, StoryObj, Decorator } from "@storybook/react";

import {
    ERC20TokenPicker as ERC20TokenPickerComponent,
    type ERC20TokenPickerProps,
} from "../src/components/erc20-token-picker";
import { Button } from "../src/components/button";
import type {
    TokenInfoWithBalance,
    TokenListWithBalance,
} from "../src/components/erc20-token-picker/types";
import {
    createConfig,
    configureChains,
    WagmiConfig,
    useAccount,
    useConnect,
    useContractReads,
    type Address,
} from "wagmi";
import { gnosis } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Typography } from "../src/components/typography";
import { ERC20_ABI, Service, getServiceURL } from "@carrot-kpi/sdk";

const CHAIN_ID = gnosis.id;

const { chains, publicClient, webSocketPublicClient } = configureChains(
    [gnosis],
    [publicProvider()],
);

const INJECTED_CONNECTOR = new InjectedConnector({ chains });

const config = createConfig({
    autoConnect: true,
    connectors: [INJECTED_CONNECTOR],
    publicClient,
    webSocketPublicClient,
});

const WagmiDecorator: Decorator = (Story) => {
    return (
        <WagmiConfig config={config}>
            <Story />
        </WagmiConfig>
    );
};

export default {
    title: "EVM/ERC20 Token Picker",
    component: ERC20TokenPickerComponent,
    decorators: [WagmiDecorator],
} as Meta<typeof ERC20TokenPickerComponent>;

const Component = (props: ERC20TokenPickerProps) => {
    const {
        connect,
        isLoading: connecting,
        error: connectionError,
    } = useConnect({
        connector: INJECTED_CONNECTOR,
    });
    const { address, isConnected } = useAccount();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<TokenInfoWithBalance | null>(null);
    const [lists, setLists] = useState<TokenListWithBalance[]>([]);
    const [list, setList] = useState<TokenListWithBalance | null>(null);

    const {
        data: rawBalances,
        isLoading: loadingBalances,
        isFetching: fetchingBalances,
    } = useContractReads({
        contracts:
            address &&
            list?.tokens.map((token) => {
                return {
                    abi: ERC20_ABI,
                    address: token.address as Address,
                    chainId: CHAIN_ID,
                    functionName: "balanceOf",
                    args: [address],
                };
            }),
        allowFailure: true,
        enabled: !!(list && address),
    });

    const selectedListWithBalances: TokenListWithBalance | null =
        useMemo(() => {
            if (!list) return null;
            if (rawBalances && rawBalances.length === list.tokens.length) {
                return {
                    ...list,
                    tokens: list.tokens.map((token, index) => {
                        return {
                            ...token,
                            balance: rawBalances[index].result as unknown as
                                | bigint
                                | null,
                        };
                    }),
                };
            }
            return list;
        }, [list, rawBalances]);

    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            let response = await fetch(
                `${getServiceURL(Service.STATIC_CDN, false)}/token-list.json`,
            );
            if (!response.ok) {
                console.warn("could not fetch carrot token list");
                return;
            }
            const carrotList = (await response.json()) as TokenListWithBalance;

            response = await fetch(
                "https://tokens.coingecko.com/uniswap/all.json",
            );
            if (!response.ok) {
                console.warn("could not fetch coingecko token list");
                return;
            }
            const coingeckoList =
                (await response.json()) as TokenListWithBalance;

            if (!cancelled) {
                setLists([carrotList, coingeckoList]);
                setList(carrotList);
            }
        };
        void fetchData();
        return () => {
            cancelled = true;
        };
    }, []);

    const handleConnect = useCallback(() => {
        connect();
    }, [connect]);

    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleDismiss = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <div className="cui-flex cui-flex-col cui-gap-2">
                <Typography>
                    {address
                        ? `Displaying balances for: ${address}`
                        : "No wallet connected"}
                </Typography>
                <Button
                    onClick={isConnected ? handleClick : handleConnect}
                    loading={connecting}
                >
                    {isConnected ? "Open" : "Connect wallet"}
                </Button>
                {connectionError && (
                    <Typography className={{ root: "cui-text-red" }}>
                        Connection error: {connectionError.message}
                    </Typography>
                )}
            </div>
            {!!list && (
                <ERC20TokenPickerComponent
                    {...props}
                    loading={
                        !list ||
                        loadingBalances ||
                        fetchingBalances ||
                        props.loading
                    }
                    selectedToken={value}
                    onSelectedTokenChange={setValue}
                    open={open}
                    onDismiss={handleDismiss}
                    lists={lists}
                    selectedList={selectedListWithBalances}
                    onSelectedListChange={setList}
                    chainId={CHAIN_ID}
                    messages={{
                        search: {
                            title: "Title tokens",
                            inputPlaceholder: "Placeholder",
                            noTokens: "No tokens",
                            manageLists: "Manage lists",
                        },
                        manageLists: {
                            title: "Title list",
                            noLists: "No lists",
                        },
                    }}
                />
            )}
        </>
    );
};

export const ERC20TokenPicker: StoryObj<typeof ERC20TokenPickerComponent> = {
    render: Component,
};
