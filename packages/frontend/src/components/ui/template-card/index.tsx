import React from "react";
import { Chip, Skeleton, Typography } from "@carrot-kpi/ui";
import { shortenAddress } from "../../../utils/address";
import { Template } from "@carrot-kpi/sdk";
import { useResolvedTemplate } from "@carrot-kpi/react";
import { Link } from "react-router-dom";

interface KPITokenTemplateCardProps {
    template?: Template;
}

export const KPITokenTemplateCard = ({
    template,
}: KPITokenTemplateCardProps) => {
    const { loading, resolvedTemplate } = useResolvedTemplate(template);

    return (
        <div className="relative min-w-[320px] w-[320px] flex flex-col justify-between border m-1 bg-white border-gray-600 dark:bg-black dark:border-white">
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-0 left-full -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-full left-full -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-full left-0 -translate-x-1/2 -translate-y-1/2" />
            <div>
                <div className="h-12 flex items-center w-full border-b border-gray-600 dark:border-white">
                    <div className="flex items-center justify-between w-full px-4">
                        {!loading && !!resolvedTemplate ? (
                            <Typography weight="medium" uppercase>
                                {resolvedTemplate.specification.name}
                            </Typography>
                        ) : (
                            <Skeleton width={80} />
                        )}
                    </div>
                </div>
            </div>
            <div className="h-42">
                <div className="h-26 px-4 pt-4">
                    {!loading && !!resolvedTemplate ? (
                        <Typography
                            className={{
                                root: "line-clamp-3 overflow-hidden",
                            }}
                        >
                            {resolvedTemplate.specification.description}
                        </Typography>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Skeleton width="100%" />
                            <Skeleton width="100%" />
                            <Skeleton width="20%" />
                        </div>
                    )}
                </div>
                <div className="relative h-16 py-4">
                    <div className="absolute pointer-events-none top-0 left-0 w-full h-full shadow-horizontal-scroller shadow-white dark:shadow-black" />
                    <div className="flex gap-3 overflow-x-auto px-4 scrollbar-none">
                        {!loading && !!resolvedTemplate ? (
                            resolvedTemplate.specification.tags.map((tag) => (
                                <Chip key={tag}>{tag}</Chip>
                            ))
                        ) : (
                            <Skeleton variant="xl" width={80} />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="h-14 flex items-center justify-between p-4 border-t border-black dark:border-white">
                    {!loading && !!resolvedTemplate ? (
                        <Typography variant="sm" uppercase>
                            Version
                        </Typography>
                    ) : (
                        <Skeleton width="30%" />
                    )}
                    {!loading && !!resolvedTemplate ? (
                        <Typography weight="medium">
                            {resolvedTemplate.version.toString()}
                        </Typography>
                    ) : (
                        <Skeleton width="40%" />
                    )}
                </div>
                <div className="h-14 flex items-center justify-between p-4 border-t border-black dark:border-white">
                    {!loading && !!resolvedTemplate ? (
                        <Typography variant="sm" uppercase>
                            Address
                        </Typography>
                    ) : (
                        <Skeleton width="30%" />
                    )}
                    {!loading && !!resolvedTemplate ? (
                        <Typography weight="medium">
                            {shortenAddress(resolvedTemplate.address)}
                        </Typography>
                    ) : (
                        <Skeleton width="40%" />
                    )}
                </div>
            </div>
            <Link
                to={
                    !loading && !!resolvedTemplate
                        ? `/create/${resolvedTemplate.id}`
                        : ""
                }
                state={{ template: resolvedTemplate }}
            >
                <div className="h-14 flex items-center justify-center space-y-4 border-t border-gray-600 dark:border-white">
                    {!loading && !!resolvedTemplate ? (
                        <Typography weight="medium">↳ USE TEMPLATE</Typography>
                    ) : (
                        <Skeleton width="40%" />
                    )}
                </div>
            </Link>
        </div>
    );
};
