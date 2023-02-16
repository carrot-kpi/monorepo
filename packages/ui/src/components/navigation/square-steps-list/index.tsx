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
            true: ["hover:cui-underline cui-cursor-pointer"],
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
                "cui-absolute",
                "cui-top-1/2",
                "cui-h-[1px]",
                "cui-w-14",
                "-cui-translate-y-[0.5px]",
            ],
        },
        active: {
            true: ["cui-bg-orange"],
            false: ["cui-bg-black"],
        },
    },
});

type SquareStepsLayout = "vertical" | "horizontal";

export interface SquareStepsListProps {
    stepTitles: string[];
    activeStep: number;
    mostUpdatedStep: number;
    layout?: SquareStepsLayout;
    className?: {
        root?: string;
        step?: string;
        square?: string;
        line?: string;
    };
    onClick: (index: number) => void;
}

export const SquareStepsList = ({
    stepTitles,
    activeStep,
    mostUpdatedStep,
    layout = "vertical",
    className,
    onClick,
}: SquareStepsListProps): ReactElement => {
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
                                    root: "cui-absolute cui-top-6 cui-max-w-[176px] cui-line-clamp-1",
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
