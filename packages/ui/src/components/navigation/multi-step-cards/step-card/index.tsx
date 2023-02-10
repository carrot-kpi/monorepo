import { cva } from "class-variance-authority";
import React from "react";
import { ReactElement, ReactNode } from "react";
import { Typography } from "../../../data-display";
import { Button } from "../../../input";

const rootStyles = cva([
    "cui-border",
    "dark:cui-border-white",
    "cui-flex",
    "cui-max-w-xl",
    "cui-flex-col",
    "cui-gap-2",
    "cui-bg-white",
    "dark:cui-bg-black",
]);

const headerStyles = cva([
    "cui-flex",
    "cui-flex-col",
    "cui-gap-1",
    "cui-border-b",
    "cui-border-black",
    "dark:cui-border-white",
    "cui-p-6",
]);

const contentStyles = cva(["cui-p-6"]);

const actionsContainerStyles = cva(
    [
        "cui-p-6",
        "dark:cui-bg-black",
        "cui-bg-white",
        "cui-w-full",
        "cui-max-w-xl",
        "cui-flex",
        "cui-border-b-0",
    ],
    {
        variants: {
            first: {
                true: ["cui-justify-end"],
            },
        },
        compoundVariants: [
            {
                first: false,
                className: ["cui-justify-between"],
            },
        ],
    }
);

export interface StepCardProps {
    title: string;
    step: number;
    children: ReactNode;
    onPreviousStep?: () => void;
    onNextStep?: () => void;
    previousButtonLabel?: ReactNode;
    nextButtonLabel?: ReactNode;
    className?: {
        root?: string;
        header?: string;
        content?: string;
        actionsContainer?: string;
    };
}

export const StepCard = ({
    title,
    step,
    children,
    previousButtonLabel,
    nextButtonLabel,
    onPreviousStep,
    onNextStep,
    className,
}: StepCardProps): ReactElement => (
    <div className={rootStyles({ className: className?.root })}>
        <div className={headerStyles({ className: className?.header })}>
            <Typography variant="sm" weight="medium">
                Step {step}
            </Typography>
            <Typography variant="h2">{title}</Typography>
        </div>
        <div className={contentStyles({ className: className?.content })}>
            {children}
        </div>
        <div
            className={actionsContainerStyles({
                className: className?.actionsContainer,
                first: !!!onPreviousStep,
            })}
        >
            {!!onPreviousStep && (
                <Button size="small" onClick={onPreviousStep}>
                    {!!previousButtonLabel ? previousButtonLabel : "PREVIOUS"}
                </Button>
            )}
            {!!onNextStep && (
                <Button size="small" onClick={onNextStep}>
                    {!!nextButtonLabel ? nextButtonLabel : "NEXT"}
                </Button>
            )}
        </div>
    </div>
);
