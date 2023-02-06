import React from "react";
import { Chip, Typography } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { Link } from "react-router-dom";

const rootStyles = cva(
    [
        "min-w-[340px] w-[340px] rounded-xxl flex flex-col justify-between border bg-white border-black dark:bg-black dark:border-white",
    ],
    {
        variants: {
            noBorder: {
                true: ["border-white dark:border-black"],
            },
        },
        defaultVariants: {
            noBorder: false,
        },
    }
);

interface CampaignCardProps {
    address: string;
    title: string;
    question: string;
    expiration: number;
    templateName: string;
    tags: string[];
    isHolding?: boolean;
    dark?: boolean;
    noBorder?: boolean;
}

export const CampaignCard = ({
    address,
    title,
    question,
    expiration,
    templateName,
    tags,
    isHolding,
    dark,
    noBorder,
}: CampaignCardProps) => (
    <div className={dark ? "dark" : ""}>
        <div className={rootStyles({ noBorder })}>
            <div className="h-full">
                <div className="flex items-center w-full border-b border-gray-600">
                    <div className="flex items-center h-12 border-r border-gray-600">
                        <div className="w-6 h-6 mx-3 rounded-full bg-blue"></div>
                    </div>
                    <div className="flex items-center justify-between w-full px-4">
                        <Typography weight="medium" uppercase>
                            {title}
                        </Typography>
                        {isHolding && (
                            <div className="flex items-center justify-center px-2 py-1 border rounded bg-green">
                                <Typography
                                    weight="medium"
                                    variant="2xs"
                                    uppercase
                                >
                                    holding
                                </Typography>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-between p-4">
                    <div className="h-32 mb-2">
                        <Typography
                            className={{
                                root: "line-clamp-5 overflow-hidden",
                            }}
                        >
                            {question}
                        </Typography>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Chip>{templateName}</Chip>
                        {tags.map((tag) => (
                            <Chip key={tag}>{tag}</Chip>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                {/* TODO: rewards are template-specific */}
                {/* <CampaignCardRow title="Rewards" value={rewards} color={"black"} /> */}
                <div className="flex items-center justify-between w-full  border-t border-gray-600">
                    <Typography
                        variant="sm"
                        className={{ root: "p-4 w-[40%]" }}
                        uppercase
                    >
                        Time left
                    </Typography>
                    <Typography
                        variant="sm"
                        className={{
                            root: "text-right w-[60%] p-4 border-l border-gray-600",
                        }}
                        uppercase
                    >
                        {expiration.toString()}
                    </Typography>
                </div>
                <Link to={`/campaigns/${address}`}>
                    <Typography
                        weight="medium"
                        className={{
                            root: "w-full py-5 font-mono border-t border-gray-600 text-center",
                        }}
                    >
                        ↳ VIEW CAMPAIGN
                    </Typography>
                </Link>
            </div>
        </div>
    </div>
);
