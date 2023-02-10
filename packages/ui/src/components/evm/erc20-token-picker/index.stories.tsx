import React, { useCallback, useEffect, useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import {
    ERC20TokenPicker as ERC20TokenPickerComponent,
    ERC20TokenPickerProps,
} from ".";
import { Button } from "../../input";
import { TokenInfoWithBalance, TokenListWithBalance } from "./types";

export default {
    title: "EVM/ERC20 Token Picker",
    component: ERC20TokenPickerComponent,
} as ComponentMeta<typeof ERC20TokenPickerComponent>;

const Template: Story<ERC20TokenPickerProps> = (
    props: ERC20TokenPickerProps
) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<TokenInfoWithBalance | null>(null);
    const [list, setList] = useState<TokenListWithBalance | null>(null);

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

    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleDismiss = useCallback(() => {
        setOpen(false);
    }, []);

    console.log(list);

    return (
        <>
            <Button onClick={handleClick} loading={!list}>
                Open
            </Button>
            {!!list && (
                <ERC20TokenPickerComponent
                    {...props}
                    selectedToken={value}
                    onSelectedTokenChange={setValue}
                    open={open}
                    onDismiss={handleDismiss}
                    lists={[list]}
                    selectedList={list}
                    // Goerli
                    chainId={5}
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

export const ERC20TokenPicker: Story<ERC20TokenPickerProps> = Template.bind({});
ERC20TokenPicker.args = {};
