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

const squareStyles = cva(["cui-relative", "cui-h-3", "cui-w-3", "cui-z-10"], {
    variants: {
        active: {
            true: ["cui-bg-orange", "cui-z-10"],
            false: ["cui-bg-black"],
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
                "cui-z-0",
            ],
            horizontal: [
                "cui-top-1/2",
                "cui-h-[1px]",
                "cui-w-12",
                "-cui-translate-y-[0.5px]",
                "cui-translate-x-3",
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
    mostUpdatedStep: number;
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
    mostUpdatedStep,
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
                const squareActive = index <= mostUpdatedStep;
                const lineActive = index < mostUpdatedStep;
                const handleOnClick =
                    index <= mostUpdatedStep
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
