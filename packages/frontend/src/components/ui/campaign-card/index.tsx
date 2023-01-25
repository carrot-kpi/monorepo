import React from "react";
import { Chip, Text } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";

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
                        <Text mono weight="medium" uppercase>
                            {title}
                        </Text>
                        {isHolding && (
                            <div className="flex items-center justify-center px-2 py-1 border rounded bg-green">
                                <Text mono weight="medium" size="2xs" uppercase>
                                    holding
                                </Text>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-between p-4 h-52">
                    <Text mono>{question}</Text>
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
                    <Text
                        mono
                        size="sm"
                        className={{ root: "p-4 w-[40%]" }}
                        uppercase
                    >
                        Time left
                    </Text>
                    <Text
                        mono
                        size="sm"
                        className={{
                            root: "text-right w-[60%] p-4 border-l border-gray-600",
                        }}
                        uppercase
                    >
                        {expiration.toString()}
                    </Text>
                </div>
                <button className="w-full py-5 font-mono border-t border-gray-600">
                    <Text mono weight="medium">
                        ↳ VIEW CAMPAIGN
                    </Text>
                </button>
            </div>
        </div>
    </div>
);
