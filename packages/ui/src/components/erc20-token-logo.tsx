import React from "react";
import { RemoteLogo, type RemoteLogoProps } from "./remote-logo";
import { getDefaultERC20TokenLogoURL } from "../utils/erc20";

export type ERC20TokenLogoProps = {
    chainId: number;
    address: string;
    symbol?: string;
} & RemoteLogoProps;

export const ERC20TokenLogo = ({
    chainId,
    address,
    symbol,
    ...rest
}: ERC20TokenLogoProps) => {
    return (
        <RemoteLogo
            defaultSrc={getDefaultERC20TokenLogoURL(chainId, address)}
            defaultText={symbol}
            {...rest}
        />
    );
};
