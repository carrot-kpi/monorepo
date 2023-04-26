import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Meta, DecoratorFn, StoryObj } from "@storybook/react";

import {
    ERC20TokenPicker as ERC20TokenPickerComponent,
    ERC20TokenPickerProps,
} from ".";
import { Button } from "../../input";
import { TokenInfoWithBalance, TokenListWithBalance } from "./types";
import {
    createClient,
    configureChains,
    WagmiConfig,
    useAccount,
    useConnect,
} from "wagmi";
import { gnosis } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Typography } from "../../data-display";

const CHAIN_ID = gnosis.id;

const { chains, provider } = configureChains([gnosis], [publicProvider()]);

const INJECTED_CONNECTOR = new InjectedConnector({ chains });

const client = createClient({
    autoConnect: true,
    connectors: [INJECTED_CONNECTOR],
    provider,
});

const WagmiDecorator: DecoratorFn = (Story) => {
    return (
        <WagmiConfig client={client}>
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
    const [list, setList] = useState<TokenListWithBalance | null>(null);

    const lists = useMemo(() => (list ? [list] : []), [list]);

    useEffect(() => {
        let cancelled = false;
        const fetchData = async () => {
            const response = await fetch(
                "https://carrot-kpi.dev/token-list.json"
            );
            if (!response.ok) {
                console.warn("could not fetch carrot token list");
                return;
            }
            if (!cancelled)
                setList((await response.json()) as TokenListWithBalance);
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

    console.log({ open });

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
                    loading={!list || props.loading}
                    selectedToken={value}
                    onSelectedTokenChange={setValue}
                    open={open}
                    onDismiss={handleDismiss}
                    lists={lists}
                    selectedList={list}
                    chainId={CHAIN_ID}
                    withBalances
                    accountAddress={address}
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
