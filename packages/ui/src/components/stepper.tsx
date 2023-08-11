import React from "react";
import { type ReactElement, useCallback } from "react";
import { mergedCva } from "../utils/components";
import { Typography } from "./typography";

const rootStyles = mergedCva(["cui-flex"], {
    variants: {
        layout: {
            vertical: ["cui-flex-col", "cui-gap-8"],
            horizontal: ["cui-relative", "cui-flex-row", "cui-gap-2"],
            automatic: [
                "cui-relative",
                "cui-gap-2 md:cui-gap-8",
                "cui-flex-row md:cui-flex-col",
            ],
        },
    },
});

const stepStyles = mergedCva(["cui-flex", "cui-items-center", "cui-gap-4"], {
    variants: {
        layout: {
            vertical: [],
            horizontal: ["cui-flex-col", "cui-w-12"],
            automatic: [
                "cui-flex-col md:cui-flex-row",
                "cui-w-12 md:cui-w-full",
            ],
        },
        clickable: {
            true: [
                "hover:cui-underline",
                "hover:cui-cursor-pointer",
                "hover:dark:cui-decoration-white",
            ],
        },
    },
});

const squareStyles = mergedCva(["cui-relative", "cui-h-3", "cui-w-3"], {
    variants: {
        active: {
            true: ["cui-bg-orange"],
            false: ["cui-bg-black"],
        },
        completed: {
            true: ["cui-border", "cui-border-orange"],
            false: [],
        },
    },
});

const lineStyles = mergedCva(["cui-absolute"], {
    variants: {
        layout: {
            vertical: [
                "cui-top-3",
                "cui-left-1/2",
                "cui-h-12",
                "cui-w-[1px]",
                "-cui-translate-x-[0.5px]",
                "-cui-translate-y-[0.5px]",
            ],
            horizontal: [
                "cui-top-1/2",
                "cui-h-[1px]",
                "cui-w-12",
                "-cui-translate-y-[0.5px]",
                "cui-translate-x-[11px]",
            ],
            automatic: [
                "cui-top-1/2 md:cui-top-3",
                "md:cui-left-1/2",
                "cui-h-[1px] md:cui-h-12",
                "cui-w-12 md:cui-w-[1px]",
                "cui-translate-x-[11px] md:-cui-translate-x-[0.5px] md:cui-translate-x-0",
                "-cui-translate-y-[0.5px]",
            ],
        },
        active: {
            true: ["cui-bg-orange"],
            false: ["cui-bg-black"],
        },
    },
});

const labelStyles = mergedCva([], {
    variants: {
        layout: {
            vertical: [],
            horizontal: [
                "cui-text-center",
                "cui-max-w-[100px]",
                "cui-text-ellipsis",
                "cui-overflow-hidden",
            ],
            automatic: [
                "cui-text-center md:cui-text-left",
                "cui-max-w-[100px] md:cui-max-w-full",
                "cui-text-ellipsis",
                "cui-overflow-hidden",
            ],
        },
        visible: {
            true: [],
            false: [],
        },
    },
    compoundVariants: [
        {
            layout: "horizontal",
            visible: false,
            className: ["cui-hidden"],
        },
        {
            layout: "horizontal",
            visible: true,
            className: ["cui-flex"],
        },
        {
            layout: "automatic",
            visible: false,
            className: ["cui-hidden md:cui-flex"],
        },
        {
            layout: "automatic",
            visible: true,
            className: ["cui-flex"],
        },
    ],
});

type StepperLayout = "vertical" | "horizontal" | "automatic";

export interface StepperProps {
    stepTitles: string[];
    activeStep: number;
    lastStepCompleted: number;
    layout?: StepperLayout;
    className?: {
        root?: string;
        step?: string;
        stepLabel?: string;
        square?: string;
        line?: string;
    };
    onClick: (index: number) => void;
}

export const Stepper = ({
    stepTitles,
    activeStep,
    lastStepCompleted,
    layout = "automatic",
    className,
    onClick,
}: StepperProps): ReactElement => {
    const handleStepClick = useCallback(
        (clickedStep: number) => () => {
            onClick(clickedStep);
        },
        [onClick],
    );

    return (
        <div className={rootStyles({ layout, className: className?.root })}>
            {stepTitles.map((title, index) => {
                const currentStep = index === activeStep;
                const squareActive = index <= activeStep;
                const lineActive = index < activeStep;
                const squareCompleted = index <= lastStepCompleted;

                const handleOnClick =
                    index <= lastStepCompleted
                        ? handleStepClick(index)
                        : undefined;

                return (
                    <div
                        key={index}
                        className={stepStyles({
                            layout,
                            clickable: !!onClick,
                            className: className?.step,
                        })}
                        onClick={handleOnClick}
                    >
                        <div
                            className={squareStyles({
                                active: squareActive,
                                completed: squareCompleted,
                                className: className?.square,
                            })}
                        >
                            {index < stepTitles.length - 1 && (
                                <div
                                    className={lineStyles({
                                        layout,
                                        active: lineActive,
                                        className: className?.line,
                                    })}
                                />
                            )}
                        </div>
                        <Typography
                            weight={currentStep ? "medium" : undefined}
                            className={{
                                root: labelStyles({
                                    layout,
                                    visible: currentStep,
                                    className: className?.stepLabel,
                                }),
                            }}
                        >
                            {title}
                        </Typography>
                    </div>
                );
            })}
        </div>
    );
};
