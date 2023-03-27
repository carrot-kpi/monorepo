import React, { ReactElement } from "react";
import { Typography, TypographyProps } from "../../data-display";
import { ReactComponent as ErrorSvg } from "../../../assets/error.svg";
import { cx } from "class-variance-authority";

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
        <div className="cui-flex cui-flex-col cui-gap-4 cui-items-center cui-p-8 cui-max-w-lg cui-rounded-xl cui-border cui-border-black dark:cui-border-white cui-bg-white dark:cui-bg-black">
            <ErrorSvg
                className={cx(
                    "cui-text-black dark:cui-text-white",
                    className?.icon
                )}
            />
            <Typography
                variant="2xl"
                weight="bold"
                className={className?.title}
            >
                {messages.title}
            </Typography>
            <Typography className={className?.description}>
                {messages.description}
            </Typography>
        </div>
    );
};
