import React from "react";
import { Chip, Timer, Typography, Skeleton } from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { Link } from "react-router-dom";
import { KPIToken } from "@carrot-kpi/sdk";

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

interface KPITokenCardProps {
    kpiToken?: KPIToken;
    noBorder?: boolean;
}

export const KPITokenCard = ({ kpiToken, noBorder }: KPITokenCardProps) => {
    return (
        <div className={rootStyles({ noBorder })}>
            <div className="h-60">
                <div className="h-12 flex items-center w-full border-b border-gray-600 p-4">
                    {/* TODO: handle logo fetching for creators */}
                    {/* {!!kpiToken && (
                        <div className="flex items-center border-r border-gray-600">
                            <Skeleton
                                className={{ root: "w-6 h-6 mx-3" }}
                                circular
                            />
                        </div>
                    )} */}
                    <div className="flex items-center justify-between w-full">
                        {!!kpiToken ? (
                            <Typography weight="medium" uppercase>
                                {kpiToken.specification.title}
                            </Typography>
                        ) : (
                            <Skeleton width={80} />
                        )}
                    </div>
                </div>
                <div className="h-48 flex flex-col justify-between p-4">
                    {!!kpiToken ? (
                        <Typography
                            className={{
                                root: "line-clamp-5 overflow-hidden",
                            }}
                        >
                            {kpiToken.specification.description}
                        </Typography>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Skeleton width="100%" />
                            <Skeleton width="100%" />
                            <Skeleton width="100%" />
                            <Skeleton width="20%" />
                        </div>
                    )}
                    <div className="flex items-center space-x-3">
                        {!!kpiToken ? (
                            <Chip>{kpiToken.template.specification.name}</Chip>
                        ) : (
                            <Skeleton variant="xl" width={80} />
                        )}
                        {!!kpiToken ? (
                            kpiToken.specification.tags.map((tag) => (
                                <Chip key={tag}>{tag}</Chip>
                            ))
                        ) : (
                            <Skeleton variant="xl" width={60} />
                        )}
                    </div>
                </div>
            </div>
            <div className="h-12 flex items-center justify-between w-full border-t border-gray-600">
                <div className="flex items-center px-4 h-12 w-[40%]">
                    {!!kpiToken ? (
                        <Typography uppercase>Time left</Typography>
                    ) : (
                        <Skeleton width="60%" />
                    )}
                </div>
                <div className="flex items-center justify-end px-4 h-12 w-[60%] border-l border-gray-600">
                    {!!kpiToken ? (
                        <Timer to={kpiToken.expiration} countdown icon />
                    ) : (
                        <Skeleton width="60%" />
                    )}
                </div>
            </div>
            <Link to={!!kpiToken ? `/campaigns/${kpiToken.address}` : ""}>
                <div className="h-14 flex justify-center items-center w-full border-t border-gray-600">
                    {!!kpiToken ? (
                        <Typography weight="medium">↳ VIEW CAMPAIGN</Typography>
                    ) : (
                        <Skeleton width="40%" />
                    )}
                </div>
            </Link>
        </div>
    );
};
