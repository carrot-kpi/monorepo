import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { useEnsName, useEnsAvatar } from "wagmi";
import { mainnet } from "wagmi/chains";
import { type Address } from "viem";
import { cva } from "class-variance-authority";

const rootStyles = cva(["rounded-full"], {
    variants: {
        variant: {
            md: ["w-8", "h-8"],
            lg: ["w-10", "h-10"],
        },
    },
});

interface AvatarProps {
    address: Address;
    variant?: "md" | "lg";
    className?: {
        root?: string;
    };
}

export const Avatar = ({ address, variant = "md", className }: AvatarProps) => {
    const { data: ensName } = useEnsName({
        address,
        chainId: mainnet.id,
    });

    const { data: ensAvatar } = useEnsAvatar({
        name: ensName || undefined,
        chainId: mainnet.id,
    });

    return (
        <img
            className={rootStyles({ variant, className: className?.root })}
            src={ensAvatar || makeBlockie(address)}
        />
    );
};
