import React from "react";
import { RemoteLogo, RemoteLogoProps } from "../../data-display/remote-logo";
import { getDefaultERC20TokenLogoURL } from "../../utils/erc20";

export type ERC20TokenLogoProps = {
    chainId: number;
    address: string;
} & RemoteLogoProps;

export const ERC20TokenLogo = ({
    chainId,
    address,
    ...rest
}: ERC20TokenLogoProps) => {
    return (
        <RemoteLogo
            defaultSrc={getDefaultERC20TokenLogoURL(chainId, address)}
            {...rest}
        />
    );
};
