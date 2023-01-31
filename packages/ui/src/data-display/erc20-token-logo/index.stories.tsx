import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import {
    ERC20TokenLogo as ERC20TokenLogoComponent,
    ERC20TokenLogoProps,
} from ".";

export default {
    title: "Data display/ERC20 Token Logo",
    component: ERC20TokenLogoComponent,
} as ComponentMeta<typeof ERC20TokenLogoComponent>;

const Template: Story<ERC20TokenLogoProps> = (props: ERC20TokenLogoProps) => {
    return <ERC20TokenLogoComponent {...props} />;
};

export const ERC20TokenLogo: Story<ERC20TokenLogoProps> = Template.bind({});
ERC20TokenLogo.args = {
    chainId: 1,
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
};
