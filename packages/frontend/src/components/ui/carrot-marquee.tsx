import React, { type ReactNode } from "react";
import CommunityDrivenLogo from "../../icons/marquee/community-driven";
import NetworkLogo from "../../icons/marquee/network";
import Decentralized100Logo from "../../icons/marquee/decentralized100";
import StarsLogo from "../../icons/marquee/stars";
import CommunityLogo from "../../icons/marquee/community";
import ClaimBounties from "../../icons/marquee/claim-bounties";
import { cva } from "class-variance-authority";

const GreenLogos = () => (
    <>
        <CommunityDrivenLogo />
        <NetworkLogo />
        <Decentralized100Logo />
        <StarsLogo />
    </>
);

const YellowLogos = () => (
    <>
        <CommunityLogo />
        <ClaimBounties />
    </>
);

interface MarqueeProps {
    children: ReactNode;
    color: "green" | "yellow";
}

const marqueeMainStyles = cva(["flex overflow-x-hidden"], {
    variants: {
        color: {
            green: ["bg-green"],
            yellow: ["bg-yellow"],
        },
    },
});

const marqueeRowStyles = cva(
    ["relative flex items-center h-12 space-x-6 md:h-16"],
    {
        variants: {
            color: {
                green: ["animate-marquee-fast"],
                yellow: ["animate-marquee-slow"],
            },
        },
    },
);

const MarqueeRow = ({ children, color }: MarqueeProps) => (
    <div className={marqueeMainStyles({ color })}>
        <div className={marqueeRowStyles({ color })}>{children}</div>
        <div className={marqueeRowStyles({ color })}>{children}</div>
    </div>
);

export const CarrotMarquee = () => {
    return (
        <div>
            <MarqueeRow color="green">
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
            </MarqueeRow>
            <MarqueeRow color="yellow">
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
            </MarqueeRow>
        </div>
    );
};
