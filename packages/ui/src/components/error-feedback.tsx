import React, { type ReactElement } from "react";
import { Typography, type TypographyProps } from "./typography";
import Error from "../icons/error";
import { mergedCx } from "../utils/components";

export interface ErrorFeedbackProps {
    messages: {
        title: string;
        description: string;
    };
    className?: {
        icon?: string;
        title?: TypographyProps["className"];
        description?: TypographyProps["className"];
    };
}

export const ErrorFeedback = ({
    messages,
    className,
}: ErrorFeedbackProps): ReactElement => {
    return (
        <div className="cui-flex cui-flex-col cui-gap-4 cui-h-fit cui-items-center cui-p-8 cui-max-w-lg cui-rounded-xl cui-border cui-border-black dark:cui-border-white cui-bg-white dark:cui-bg-black">
            <Error
                className={mergedCx(
                    "cui-text-black dark:cui-text-white",
                    className?.icon,
                )}
            />
            <Typography
                variant="xl"
                weight="bold"
                className={{ root: `cui-text-center ${className?.title}` }}
            >
                {messages.title}
            </Typography>
            <Typography
                className={{
                    root: `cui-text-center ${className?.description}`,
                }}
            >
                {messages.description}
            </Typography>
        </div>
    );
};
