import React from "react";
import {
    Chip,
    Timer,
    Typography,
    Skeleton,
    Card,
    CardTitle,
    CardContent,
    CardActions,
    Markdown,
} from "@carrot-kpi/ui";
import { cva } from "class-variance-authority";
import { KPIToken } from "@carrot-kpi/sdk";
import { Link } from "react-router-dom";

const rootStyles = cva(
    [
        "min-w-[320px]",
        "max-w-[320px]",
        "rounded-xxl",
        "flex",
        "flex-col",
        "justify-between",
        "border",
        "bg-white",
        "dark:bg-black",
    ],
    {
        variants: {
            noBorder: {
                true: ["border-white dark:border-black"],
                false: ["border-black dark:border-white"],
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
        <Card className={{ root: rootStyles({ noBorder }) }}>
            <CardTitle>
                <div className="flex items-center justify-between w-full">
                    {!!kpiToken ? (
                        <Typography weight="medium" uppercase>
                            {kpiToken.specification.title}
                        </Typography>
                    ) : (
                        <Skeleton width={80} />
                    )}
                </div>
                {/* TODO: handle logo fetching for creators */}
                {/* {!!kpiToken && (
                        <div className="flex items-center border-r border-gray-600">
                            <Skeleton
                                className={{ root: "w-6 h-6 mx-3" }}
                                circular
                            />
                        </div>
                    )} */}
            </CardTitle>
            <CardContent>
                <div className="h-58">
                    <div className="h-40 overflow-hidden px-4 pt-4">
                        {!!kpiToken ? (
                            <Markdown
                                className={{
                                    root: "prose prose-headings:mt-0 line-clamp-5 overflow-hidden",
                                }}
                            >
                                {kpiToken.specification.description}
                            </Markdown>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <Skeleton width="100%" />
                                <Skeleton width="100%" />
                                <Skeleton width="100%" />
                                <Skeleton width="20%" />
                            </div>
                        )}
                    </div>
                    <div className="relative h-16 py-4">
                        <div className="absolute pointer-events-none top-0 left-0 w-full h-full shadow-horizontal-scroller shadow-white dark:shadow-black" />
                        <div className="flex gap-3 overflow-x-auto px-4 scrollbar-none">
                            {!!kpiToken ? (
                                <>
                                    <Chip>
                                        {kpiToken.template.specification.name}
                                    </Chip>
                                    {kpiToken.specification.tags.map((tag) => (
                                        <Chip key={tag}>{tag}</Chip>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <Skeleton variant="xl" width={80} />
                                    <Skeleton variant="xl" width={60} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="h-12 flex items-center justify-between w-full border-t border-black dark:border-white">
                    <div className="flex items-center px-4 h-12 w-[40%]">
                        {!!kpiToken ? (
                            <Typography uppercase>Time left</Typography>
                        ) : (
                            <Skeleton width="60%" />
                        )}
                    </div>
                    <div className="flex items-center justify-end px-4 h-12 w-[60%] border-l border-black dark:border-white">
                        {!!kpiToken ? (
                            kpiToken.expired ? (
                                <Typography
                                    weight="medium"
                                    uppercase
                                    className={{ root: "text-red" }}
                                >
                                    Expired
                                </Typography>
                            ) : (
                                <Timer
                                    to={kpiToken.expiration}
                                    countdown
                                    icon
                                />
                            )
                        ) : (
                            <Skeleton width="60%" />
                        )}
                    </div>
                </div>
            </CardContent>
            <CardActions className={{ root: "justify-center" }}>
                <div className="flex h-6 justify-center items-center w-full">
                    {!!kpiToken ? (
                        <Link
                            to={`/campaigns/${kpiToken.address}`}
                            state={{ kpiToken }}
                        >
                            <Typography weight="medium">
                                ↳ VIEW CAMPAIGN
                            </Typography>
                        </Link>
                    ) : (
                        <Skeleton width="40%" />
                    )}
                </div>
            </CardActions>
        </Card>
    );
};
