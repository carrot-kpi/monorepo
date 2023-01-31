import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { RemoteLogo as RemoteLogoComponent, RemoteLogoProps } from ".";

export default {
    title: "Data display/Remote Logo",
    component: RemoteLogoComponent,
} as ComponentMeta<typeof RemoteLogoComponent>;

const Template: Story<RemoteLogoProps> = (props: RemoteLogoProps) => {
    return <RemoteLogoComponent {...props} />;
};

export const RemoteLogo: Story<RemoteLogoProps> = Template.bind({});
RemoteLogo.args = {
    src: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
};
