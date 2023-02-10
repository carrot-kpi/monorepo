import { cva } from "class-variance-authority";
import React, { useMemo } from "react";
import { ReactElement } from "react";
import { matchChildByType } from "../../../utils/components";
import { StepCard, StepCardProps } from "./step-card";
import { NextStepPreview, NextStepPreviewProps } from "./step-preview";

export * from "./step-card";
export * from "./step-preview";

const rootStyles = cva([
    "cui-w-full",
    "cui-max-w-xl",
    "cui-flex",
    "cui-flex-col",
]);

const stepsPreviewContainerStyles = cva([
    "cui-mt-20",
    "min-h-fit",
    "w-full",
    "max-w-xl",
]);

export interface MultiStepCardsProps {
    children: ReactElement | ReactElement[];
    activeStep?: number;
    className?: {
        root?: string;
        stepsPreviewContainer?: string;
        stepPreview?: NextStepPreviewProps["className"];
    };
}

export const MultiStepCards = ({
    children,
    activeStep,
    className,
}: MultiStepCardsProps): ReactElement => {
    const childSteps = useMemo(
        () =>
            React.Children.toArray(children).filter((child) =>
                matchChildByType(child, StepCard)
            ),
        [children]
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
                    ((child as ReactElement).props as StepCardProps).title
            ),
        [childSteps]
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
                        step={`Step ${finalActiveStep + 2}`}
                        title={derivedStepsTitles[finalActiveStep + 1]}
                    />
                )}
                {!!derivedStepsTitles[finalActiveStep + 2] && (
                    <NextStepPreview
                        step={`Step ${finalActiveStep + 3}`}
                        title={derivedStepsTitles[finalActiveStep + 2]}
                    />
                )}
            </div>
        </div>
    );
};
