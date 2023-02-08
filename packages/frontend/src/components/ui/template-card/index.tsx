import React from "react";
import { Chip, Skeleton, Typography } from "@carrot-kpi/ui";
import { shortenAddress } from "../../../utils/address";
import { Link } from "react-router-dom";
import { Template } from "@carrot-kpi/sdk";

interface KPITokenTemplateCardProps {
    template?: Template;
}

export const KPITokenTemplateCard = ({
    template,
}: KPITokenTemplateCardProps) => {
    return (
        <div className="relative min-w-[320px] w-[320px] flex flex-col justify-between border m-1 bg-white border-gray-600 dark:bg-black dark:border-white">
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-0 left-full -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-full left-full -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-full left-0 -translate-x-1/2 -translate-y-1/2" />
            <div>
                <div className="h-12 flex items-center w-full border-b border-gray-600 dark:border-white">
                    <div className="flex items-center justify-between w-full px-4">
                        {!!template ? (
                            <Typography weight="medium" uppercase>
                                {template.specification.name}
                            </Typography>
                        ) : (
                            <Skeleton width={80} />
                        )}
                    </div>
                </div>
            </div>
            <div className="h-42 flex flex-col justify-between p-4">
                <div className="h-20 mb-2">
                    {!!template ? (
                        <Typography
                            className={{
                                root: "line-clamp-3 overflow-hidden",
                            }}
                        >
                            {template.specification.description}
                        </Typography>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Skeleton width="100%" />
                            <Skeleton width="100%" />
                            <Skeleton width="20%" />
                        </div>
                    )}
                </div>
                <div className="h-6 flex items-center space-x-3">
                    {!!template ? (
                        template.specification.tags.map((tag) => (
                            <Chip key={tag}>{tag}</Chip>
                        ))
                    ) : (
                        <Skeleton variant="xl" width={80} />
                    )}
                </div>
            </div>
            <div className="flex flex-col">
                <div className="h-16 flex items-center justify-between p-4 border-t border-black dark:border-white">
                    {!!template ? (
                        <Typography variant="sm" uppercase>
                            Version
                        </Typography>
                    ) : (
                        <Skeleton width="30%" />
                    )}
                    {!!template ? (
                        <Typography weight="medium">
                            {template.version.toString()}
                        </Typography>
                    ) : (
                        <Skeleton width="40%" />
                    )}
                </div>
                <div className="h-16 flex items-center justify-between p-4 border-t border-black dark:border-white">
                    {!!template ? (
                        <Typography variant="sm" uppercase>
                            Address
                        </Typography>
                    ) : (
                        <Skeleton width="30%" />
                    )}
                    {!!template ? (
                        <Typography weight="medium">
                            {shortenAddress(template.address)}
                        </Typography>
                    ) : (
                        <Skeleton width="40%" />
                    )}
                </div>
            </div>
            <Link
                to={!!template ? `/create/${template.id}` : ""}
                state={{ template }}
            >
                <div className="h-16 flex items-center justify-center p-4 space-y-4 border-t border-gray-600 dark:border-white">
                    {!!template ? (
                        <Typography weight="medium">↳ USE TEMPLATE</Typography>
                    ) : (
                        <Skeleton width="40%" />
                    )}
                </div>
            </Link>
        </div>
    );
};
