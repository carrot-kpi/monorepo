import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { type Address, useNetwork, useEnsName, useEnsAvatar } from "wagmi";
import { cva } from "class-variance-authority";

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
    const { chain } = useNetwork();

    const { data: ensName } = useEnsName({
        address,
        enabled: chain && chain.id === 1,
    });
    const { data: ensAvatar } = useEnsAvatar({
        name: ensName,
        enabled: chain && chain.id === 1,
    });

    return (
        <img
            className={rootStyles({ variant })}
            src={ensAvatar || makeBlockie(address)}
        />
    );
};
