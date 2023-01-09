import React, { ReactNode } from "react";
import { ReactComponent as CommunityDrivenLogo } from "../../../assets/marquee/community-driven.svg";
import { ReactComponent as NetworkLogo } from "../../../assets/marquee/network.svg";
import { ReactComponent as Decentralized100Logo } from "../../../assets/marquee/decentralized100.svg";
import { ReactComponent as StarsLogo } from "../../../assets/marquee/stars.svg";
import { ReactComponent as CommunityLogo } from "../../../assets/marquee/community.svg";
import { ReactComponent as ClaimBounties } from "../../../assets/marquee/claim-bounties.svg";
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
                green: ["animate-marquee-green"],
                yellow: ["animate-marquee-yellow"],
            },
        },
    }
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
