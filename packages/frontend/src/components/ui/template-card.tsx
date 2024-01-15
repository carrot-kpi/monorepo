import React from "react";
import { Chip, Markdown, Skeleton, Typography } from "@carrot-kpi/ui";
import { shortenAddress } from "../../utils/address";
import { Template } from "@carrot-kpi/sdk";
import { useResolvedTemplate } from "@carrot-kpi/react";
import { Link } from "react-router-dom";

interface KPITokenTemplateCardProps {
    template?: Template;
}

export const KPITokenTemplateCard = ({
    template,
}: KPITokenTemplateCardProps) => {
    const { loading, resolvedTemplate } = useResolvedTemplate({ template });

    return (
        <div className="relative min-w-[320px] w-[320px] flex flex-col justify-between border m-1 bg-white border-gray-600 dark:bg-black dark:border-white">
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-0 left-full -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-full left-full -translate-x-1/2 -translate-y-1/2" />
            <div className="w-2 h-2 bg-black dark:bg-white absolute top-full left-0 -translate-x-1/2 -translate-y-1/2" />
            <div>
                <div className="w-full h-12 px-4 flex items-center justify-between border-b border-gray-600 dark:border-white">
                    {!loading && !!resolvedTemplate ? (
                        <Typography
                            data-testid={`${resolvedTemplate.specification.name}-template-title`}
                            weight="medium"
                            uppercase
                        >
                            {resolvedTemplate.specification.name}
                        </Typography>
                    ) : (
                        <Skeleton width={80} />
                    )}
                </div>
            </div>
            <div className="h-52 flex flex-col">
                <div className="relative">
                    <div className="absolute pointer-events-none top-0 left-0 w-full h-full shadow-vertical-scroller shadow-white dark:shadow-black" />
                    <div className="h-36 p-4 overflow-y-auto scrollbar-none">
                        {!loading && !!resolvedTemplate ? (
                            <Markdown>
                                {resolvedTemplate.specification.description}
                            </Markdown>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Skeleton width="100%" />
                                <Skeleton width="100%" />
                                <Skeleton width="20%" />
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-16 relative flex items-center">
                    <div className="absolute pointer-events-none top-0 left-0 w-full h-full shadow-horizontal-scroller shadow-white dark:shadow-black" />
                    <div className="flex gap-3 overflow-x-auto px-4 scrollbar-none">
                        {!loading && !!resolvedTemplate ? (
                            resolvedTemplate.specification.tags.map((tag) => (
                                <Chip key={tag}>{tag}</Chip>
                            ))
                        ) : (
                            <Skeleton variant="lg" width={80} />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="h-12 flex items-center justify-between px-4 border-t border-black dark:border-white">
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
                        <Skeleton width="10%" />
                    )}
                </div>
                <div className="h-12 flex items-center justify-between px-4 border-t border-black dark:border-white">
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
            <div>
                <Link
                    className="h-14 flex items-center justify-center space-y-4 border-t border-gray-600 dark:border-white"
                    to={
                        !loading && !!resolvedTemplate
                            ? `/create/${resolvedTemplate.id}/draft`
                            : ""
                    }
                    state={{ template: resolvedTemplate }}
                >
                    {!loading && !!resolvedTemplate ? (
                        <Typography
                            data-testid="use-template-button"
                            weight="medium"
                        >
                            ↳ USE TEMPLATE
                        </Typography>
                    ) : (
                        <Skeleton width="40%" />
                    )}
                </Link>
            </div>
        </div>
    );
};
