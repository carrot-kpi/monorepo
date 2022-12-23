import React from "react";
import { TextMono } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { VerifiedIcon } from "../icons/verified-icon";
import { RowsWrapper } from "./template-row-wrapper";
import { TemplateCardCorners } from "./template-card-corners";
import { correctColor } from "../../../utils/colors";

interface TemplateCardProps {
    type: string;
    description: string;
    oracle: string;
    version: string;
    creator: string;
    address: string;
    used: number;
    verified?: boolean;
    color: "white" | "black";
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
}: TemplateCardProps) => {
    const correctBorderColor =
        color === "black" ? "border-white" : "border-gray-600";
    return (
        <div className={templateCardStyles({ color })}>
            <TemplateCardCorners color={correctColor(color)} />
            <div className="h-full">
                <div
                    className={`flex items-center w-full border-b ${correctBorderColor}`}
                >
                    <div
                        className={`flex items-center h-12 border-r ${correctBorderColor}`}
                    >
                        <div className="w-6 h-6 mx-3 rounded-full bg-blue"></div>
                    </div>
                    <div className="flex items-center justify-between w-full px-4">
                        <TextMono
                            color={correctColor(color)}
                            weight="medium"
                            caps
                        >
                            {type}
                        </TextMono>
                    </div>
                </div>
            </div>
            <div className="p-4">
                <TextMono color={correctColor(color)}>{description}</TextMono>
            </div>
            <div className="flex">
                {verified && (
                    <div
                        className={`flex flex-col items-center justify-center w-12 border-t border-r ${correctBorderColor}`}
                    >
                        <div className="flex items-center space-x-2 -rotate-90">
                            <VerifiedIcon color={correctColor(color)} />
                            <TextMono
                                caps
                                size="sm"
                                color={correctColor(color)}
                            >
                                verified
                            </TextMono>
                        </div>
                    </div>
                )}
                <div className="flex-1">
                    <RowsWrapper color={correctColor(color)}>
                        <Row title="oracle" color={correctColor(color)}>
                            {oracle}
                        </Row>
                        <Row title="version" color={correctColor(color)}>
                            {version}
                        </Row>
                    </RowsWrapper>
                    <RowsWrapper color={correctColor(color)}>
                        <Row title="creator" color={correctColor(color)}>
                            {creator}
                        </Row>
                        <Row title="address" color={correctColor(color)}>
                            {address}
                        </Row>
                        <Row title="used" color={correctColor(color)}>
                            {used.toString()}
                        </Row>
                    </RowsWrapper>
                </div>
            </div>
            <div
                className={`flex items-center justify-center p-4 space-y-4 border-t ${correctBorderColor}`}
            >
                <button className="w-full">
                    <TextMono color={correctColor(color)} caps weight="medium">
                        ↳ use template
                    </TextMono>
                </button>
            </div>
        </div>
    );
};

const templateCardStyles = cva(
    [
        "relative min-w-[340px] w-[340px] flex flex-col justify-between border m-1",
    ],
    {
        variants: {
            color: {
                black: ["bg-black border-white"],
                white: ["bg-white border-gray-600"],
            },
        },
    }
);

const Row = ({
    title,
    children,
    color,
}: {
    title: string;
    children: string;
    color?: "black" | "white";
}) => (
    <div className="flex items-center justify-between">
        <TextMono size="sm" className="capitalize" color={color}>
            {title}
        </TextMono>
        <TextMono weight="medium" color={color}>
            {children}
        </TextMono>
    </div>
);
