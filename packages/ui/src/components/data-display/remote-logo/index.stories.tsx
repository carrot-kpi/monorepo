import type { Meta, StoryObj } from "@storybook/react";

import { RemoteLogo as RemoteLogoComponent } from ".";

export default {
    title: "Data display/Remote Logo",
    component: RemoteLogoComponent,
} as Meta<typeof RemoteLogoComponent>;

export const RemoteLogo: StoryObj<typeof RemoteLogoComponent> = {
    args: {
        src: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
    },
};
