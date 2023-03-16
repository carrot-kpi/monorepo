import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { Address, useEnsAvatar, useNetwork } from "wagmi";
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
    address: string;
    variant?: "md" | "lg";
}

export const Avatar = ({ address, variant = "md" }: AvatarProps) => {
    const { chain } = useNetwork();
    const { data: ensAvatar } = useEnsAvatar({
        address: address as Address,
        enabled: !!(chain && chain.contracts && chain.contracts.ensRegistry),
    });

    return (
        <img
            className={rootStyles({ variant })}
            src={ensAvatar || makeBlockie(address)}
        />
    );
};
