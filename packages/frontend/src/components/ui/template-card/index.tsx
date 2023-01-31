import React from "react";
import { Chip, Typography } from "@carrot-kpi/ui";
import { ReactComponent as VerifiedIcon } from "../../../assets/verified.svg";
import { shortenAddress } from "../../../utils/address";

interface TemplateCardProps {
    name: string;
    description: string;
    tags: string[];
    version: number;
    // creator: string;
    address: string;
    used: number;
    verified?: boolean;
}

export const TemplateCard = ({
    name,
    description,
    tags,
    version,
    // creator,
    address,
    used,
    verified,
}: TemplateCardProps) => {
    return (
        <div className="relative min-w-[340px] w-[340px] flex flex-col justify-between border m-1 bg-white border-gray-600 dark:bg-black dark:border-white">
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-0 left-full -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-full left-full -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-full left-0 -translate-x-1/2 -translate-y-1/2" />
            <div>
                <div className="flex items-center w-full border-b">
                    <div className="flex items-center h-12 border-r">
                        <div className="w-6 h-6 mx-3 rounded-full bg-blue"></div>
                    </div>
                    <div className="flex items-center justify-between w-full px-4">
                        <Typography weight="medium" uppercase>
                            {name}
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between p-4">
                <div className="h-20 mb-2">
                    <Typography
                        className={{
                            root: "line-clamp-3 overflow-hidden",
                        }}
                    >
                        {description}
                    </Typography>
                </div>
                <div className="flex items-center space-x-3">
                    {tags.map((tag) => (
                        <Chip key={tag}>{tag}</Chip>
                    ))}
                </div>
            </div>
            <div className="flex">
                {verified && (
                    <div className="flex flex-col items-center justify-center w-12 border-t border-r">
                        <div className="flex items-center space-x-2 -rotate-90">
                            <VerifiedIcon />
                            <Typography uppercase variant="sm">
                                verified
                            </Typography>
                        </div>
                    </div>
                )}
                <div className="flex-1">
                    <Row title="version">{version.toString()}</Row>
                    <Row title="address">{shortenAddress(address)}</Row>
                    <Row title="used">{used.toString()}</Row>
                </div>
            </div>
            <div className="flex items-center justify-center p-4 space-y-4 border-t">
                <button className="w-full">
                    <Typography uppercase weight="medium">
                        ↳ use template
                    </Typography>
                </button>
            </div>
        </div>
    );
};

const Row = ({ title, children }: { title: string; children: string }) => (
    <div className="flex items-center justify-between p-4 border-t border-black dark:border-white">
        <Typography variant="sm" uppercase>
            {title}
        </Typography>
        <Typography weight="medium">{children}</Typography>
    </div>
);
