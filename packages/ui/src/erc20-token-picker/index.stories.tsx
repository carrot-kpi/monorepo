import React, { useCallback, useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import {
    ERC20TokenPicker as ERC20TokenPickerComponent,
    ERC20TokenPickerProps,
} from ".";
import { Button } from "../button";
import mockList from "./mock-list.json";
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

    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open]);

    const handleDismiss = useCallback(() => {
        setOpen(false);
    }, []);

    return (
        <>
            <Button onClick={handleClick}>Open</Button>
            <ERC20TokenPickerComponent
                {...props}
                selectedToken={value}
                onSelectedTokenChange={setValue}
                open={open}
                onDismiss={handleDismiss}
                lists={[mockList as TokenListWithBalance]}
                selectedList={mockList as TokenListWithBalance}
                chainId={1}
            />
        </>
    );
};

export const ERC20TokenPicker: Story<ERC20TokenPickerProps> = Template.bind({});
ERC20TokenPicker.args = {};
