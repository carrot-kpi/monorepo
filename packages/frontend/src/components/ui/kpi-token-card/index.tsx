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
import sanitizeHtml from "sanitize-html";
import { Link } from "react-router-dom";
import { KPIToken } from "@carrot-kpi/sdk";

const rootStyles = cva(
    [
        "min-w-[320px] max-w-[320px] rounded-xxl flex flex-col justify-between border bg-white border-black dark:bg-black dark:border-white",
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
                <div className="h-40 flex flex-col justify-between p-4 overflow-hidden">
                    {!!kpiToken ? (
                        <Markdown
                            className={{ root: "prose-sm prose-headings:mt-0" }}
                        >
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtml(
                                        kpiToken.specification.description
                                    ),
                                }}
                            />
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
                <div className="h-16 flex items-center gap-3 p-4">
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
                            kpiToken.expiration < Date.now() ? (
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
                <Link to={!!kpiToken ? `/campaigns/${kpiToken.address}` : ""}>
                    <div className="flex justify-center items-center w-full">
                        {!!kpiToken ? (
                            <Typography weight="medium">
                                ↳ VIEW CAMPAIGN
                            </Typography>
                        ) : (
                            <Skeleton width="40%" />
                        )}
                    </div>
                </Link>
            </CardActions>
        </Card>
    );
};
