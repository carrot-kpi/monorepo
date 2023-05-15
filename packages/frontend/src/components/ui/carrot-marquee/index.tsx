import { Marquee } from "@carrot-kpi/ui";
import React from "react";
import CommunityDrivenLogo from "../../../icons/marquee/community-driven";
import NetworkLogo from "../../../icons/marquee/network";
import Decentralized100Logo from "../../../icons/marquee/decentralized100";
import StarsLogo from "../../../icons/marquee/stars";
import CommunityLogo from "../../../icons/marquee/community";
import ClaimBounties from "../../../icons/marquee/claim-bounties";

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

export const CarrotMarquee = () => {
    return (
        <div>
            <Marquee color="green">
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
                <GreenLogos />
            </Marquee>
            <Marquee color="yellow">
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
                <YellowLogos />
            </Marquee>
        </div>
    );
};
