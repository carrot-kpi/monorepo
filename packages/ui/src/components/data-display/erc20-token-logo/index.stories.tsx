import { Meta, StoryObj } from "@storybook/react";

import { ERC20TokenLogo as ERC20TokenLogoComponent } from ".";

export default {
    title: "Data display/ERC20 Token Logo",
    component: ERC20TokenLogoComponent,
} as Meta<typeof ERC20TokenLogoComponent>;

export const ERC20TokenLogo: StoryObj<typeof ERC20TokenLogoComponent> = {
    args: {
        chainId: 1,
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    },
};
