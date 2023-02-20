import { cva } from "class-variance-authority";
import React from "react";
import { ReactElement, useCallback } from "react";
import { Typography } from "../../data-display";

const rootStyles = cva(["cui-flex"], {
    variants: {
        layout: {
            vertical: ["cui-flex-col", "cui-gap-8"],
            horizontal: ["cui-relative", "cui-flex-row", "cui-gap-2"],
        },
    },
});

const stepStyles = cva(["cui-flex", "cui-items-center", "cui-gap-4"], {
    variants: {
        layout: {
            vertical: [],
            horizontal: ["cui-flex-col", "cui-w-12"],
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

const squareStyles = cva(["cui-relative", "cui-h-3", "cui-w-3"], {
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

const lineStyles = cva(["cui-absolute"], {
    variants: {
        layout: {
            vertical: [
                "cui-left-1/2",
                "cui-top-3",
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
        },
        active: {
            true: ["cui-bg-orange"],
            false: ["cui-bg-black"],
        },
    },
});

type StepperLayout = "vertical" | "horizontal";

export interface StepperProps {
    stepTitles: string[];
    activeStep: number;
    lastStepCompleted: number;
    layout?: StepperLayout;
    className?: {
        root?: string;
        step?: string;
        square?: string;
        line?: string;
    };
    onClick: (index: number) => void;
}

export const Stepper = ({
    stepTitles,
    activeStep,
    lastStepCompleted,
    layout = "vertical",
    className,
    onClick,
}: StepperProps): ReactElement => {
    const handleStepClick = useCallback(
        (clickedStep: number) => () => {
            onClick(clickedStep);
        },
        [onClick]
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
                        {layout === "vertical" ? (
                            <Typography
                                weight={currentStep ? "medium" : undefined}
                            >
                                {title}
                            </Typography>
                        ) : activeStep === index ? (
                            <Typography
                                weight={currentStep ? "medium" : undefined}
                                className={{
                                    root: "cui-text-center cui-max-w-[100px] cui-text-ellipsis cui-overflow-hidden ... cui-line-clamp-2",
                                }}
                            >
                                {title}
                            </Typography>
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};
