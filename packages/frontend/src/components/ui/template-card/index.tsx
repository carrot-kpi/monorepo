import React from "react";
import { TextMono } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { correctColor } from "../campaign-card/utils";
import { VerifiedIcon } from "../icons/verified-icon";

interface TemplateCardProps {
    type: string;
    description: string;
    oracle: string;
    version: string;
    creator: string;
    address: string;
    used: number;
    verified?: boolean;
    color?: "white" | "black";
}

export const TemplateCard = ({
    type,
    description,
    oracle,
    version,
    color,
    creator,
    address,
    used,
    verified,
}: TemplateCardProps) => (
    <div className={templateCardStyles({ color })}>
        <CornerSquare y="top" x="left" />
        <CornerSquare y="top" x="right" />
        <CornerSquare y="bottom" x="left" />
        <CornerSquare y="bottom" x="right" />
        <div className="h-full">
            <div className="flex items-center w-full border-b border-gray-600">
                <div className="flex items-center h-12 border-r border-gray-600">
                    <div className="w-6 h-6 mx-3 rounded-full bg-blue"></div>
                </div>
                <div className="flex items-center justify-between w-full px-4">
                    <TextMono color={correctColor(color)} weight="medium" caps>
                        {type}
                    </TextMono>
                </div>
            </div>
        </div>
        <div className="p-4">
            <TextMono>{description}</TextMono>
        </div>
        <div className="flex">
            {verified && (
                <div className="flex flex-col items-center justify-center w-12 border-t border-r">
                    <div className="flex items-center space-x-2 -rotate-90">
                        <VerifiedIcon />
                        <TextMono caps size="sm">
                            verified
                        </TextMono>
                    </div>
                </div>
            )}
            <div className="flex-1">
                <div className="p-4 space-y-3 border-t">
                    <Row title="oracle">{oracle}</Row>
                    <Row title="version">{version}</Row>
                </div>
                <div className="p-4 space-y-3 border-t">
                    <Row title="creator">{creator}</Row>
                    <Row title="address">{address}</Row>
                    <Row title="used">{used.toString()}</Row>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center p-4 space-y-4 border-t">
            <button className="w-full font-mono font-medium uppercase">
                ↳ use template
            </button>
        </div>
    </div>
);

const templateCardStyles = cva(
    [
        "relative min-w-[340px] w-[340px] flex flex-col justify-between border m-1",
    ],
    {
        variants: {
            color: {
                black: ["bg-black border-white"],
                white: ["bg-white border-black"],
            },
        },
        defaultVariants: {
            color: "black",
        },
    }
);

const Row = ({ title, children }: { title: string; children: string }) => (
    <div className="flex items-center justify-between">
        <TextMono size="sm" className="capitalize">
            {title}
        </TextMono>
        <TextMono weight="medium">{children}</TextMono>
    </div>
);

const CornerSquare = ({
    x,
    y,
}: {
    y: "top" | "bottom";
    x: "left" | "right";
}) => <div className={cornerSquareStyles({ x, y })} />;

const cornerSquareStyles = cva(["absolute w-2 h-2 bg-black"], {
    variants: {
        x: {
            left: ["-left-1"],
            right: ["-right-1"],
        },
        y: {
            top: ["-top-1"],
            bottom: ["-bottom-1"],
        },
    },
});
