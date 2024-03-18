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
    WagmiProvider,
    useAccount,
    useConnect,
    useReadContracts,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { http, type Address } from "viem";
import { Typography } from "../src/components/typography";
import {
    ChainId,
    DATA_CDN_URL,
    ERC20_ABI,
    SUPPORTED_CHAIN,
} from "@carrot-kpi/sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const injectedConnector = injected();

const config = createConfig({
    connectors: [injectedConnector],
    chains: [SUPPORTED_CHAIN[ChainId.Sepolia]],
    transports: {
        [ChainId.Sepolia]: http(),
    },
});

const queryClient = new QueryClient();

const WagmiDecorator: Decorator = (Story) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        </WagmiProvider>
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
        isPending: connecting,
        error: connectionError,
    } = useConnect();
    const { address, isConnected } = useAccount();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<TokenInfoWithBalance | null>(null);
    const [lists, setLists] = useState<TokenListWithBalance[]>([]);
    const [list, setList] = useState<TokenListWithBalance | null>(null);

    const {
        data: rawBalances,
        isLoading: loadingBalances,
        isFetching: fetchingBalances,
    } = useReadContracts({
        contracts:
            address &&
            list?.tokens.map((token) => {
                return {
                    abi: ERC20_ABI,
                    address: token.address as Address,
                    chainId: ChainId.Sepolia,
                    functionName: "balanceOf",
                    args: [address],
                };
            }),
        allowFailure: true,
        query: {
            enabled: !!(list && address),
        },
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
                `${DATA_CDN_URL}/static/token-list.json`,
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
        connect({ connector: injectedConnector });
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
                    chainId={ChainId.Sepolia}
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
