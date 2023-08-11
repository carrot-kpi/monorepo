import React, { type ReactNode, useMemo } from "react";
import type { ReactElement } from "react";
import { matchChildByType, mergedCva } from "../../utils/components";
import { StepCard, type StepCardProps } from "./step-card";
import { NextStepPreview, type NextStepPreviewProps } from "./step-preview";

export * from "./step-card";
export * from "./step-preview";
export * from "./next-button";

const rootStyles = mergedCva([
    "cui-w-full",
    "cui-max-w-xl",
    "cui-flex",
    "cui-flex-col",
]);

const stepsPreviewContainerStyles = mergedCva([
    "cui-mt-20",
    "min-h-fit",
    "w-full",
    "max-w-xl",
]);

export interface MultiStepCardsProps {
    children: ReactNode | ReactNode[];
    activeStep?: number;
    className?: {
        root?: string;
        stepsPreviewContainer?: string;
        stepPreview?: NextStepPreviewProps["className"];
    };
    messages: {
        step?: string;
    };
}

export const MultiStepCards = ({
    children,
    activeStep,
    className,
    messages,
}: MultiStepCardsProps): ReactElement => {
    const childSteps = useMemo(
        () =>
            React.Children.toArray(children).filter((child) =>
                matchChildByType(child, StepCard),
            ),
        [children],
    );
    const stepsCount = useMemo(() => childSteps.length, [childSteps.length]);
    const finalActiveStep = useMemo(() => {
        if (!activeStep) return 0;
        if (activeStep < 0) return 0;
        if (activeStep + 1 > stepsCount) return stepsCount - 1;

        return activeStep;
    }, [activeStep, stepsCount]);
    const derivedStepsTitles = useMemo(
        () =>
            childSteps.map(
                (child) =>
                    ((child as ReactElement).props as StepCardProps).title,
            ),
        [childSteps],
    );

    return (
        <div className={rootStyles({ className: className?.root })}>
            {childSteps[finalActiveStep]}
            <div
                className={stepsPreviewContainerStyles({
                    className: className?.stepsPreviewContainer,
                })}
            >
                {!!derivedStepsTitles[finalActiveStep + 1] && (
                    <NextStepPreview
                        step={`${messages.step} ${finalActiveStep + 2}`}
                        title={derivedStepsTitles[finalActiveStep + 1]}
                    />
                )}
                {!!derivedStepsTitles[finalActiveStep + 2] && (
                    <NextStepPreview
                        step={`${messages.step} ${finalActiveStep + 3}`}
                        title={derivedStepsTitles[finalActiveStep + 2]}
                    />
                )}
            </div>
        </div>
    );
};
