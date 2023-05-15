import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { type Address, useEnsAvatar } from "wagmi";
import { cva } from "class-variance-authority";
import { useEnsName } from "wagmi";
import { mainnet } from "wagmi";

const rootStyles = cva(["rounded-full"], {
    variants: {
        variant: {
            md: ["w-7", "h-7"],
            lg: ["w-10", "h-10"],
        },
    },
});

interface AvatarProps {
    address: Address;
    variant?: "md" | "lg";
}

export const Avatar = ({ address, variant = "md" }: AvatarProps) => {
    const { data: ensName } = useEnsName({
        address,
        chainId: mainnet.id,
    });
    const { data: ensAvatar } = useEnsAvatar({
        name: ensName,
        chainId: mainnet.id,
    });

    return (
        <img
            className={rootStyles({ variant })}
            src={ensAvatar || makeBlockie(address)}
        />
    );
};
