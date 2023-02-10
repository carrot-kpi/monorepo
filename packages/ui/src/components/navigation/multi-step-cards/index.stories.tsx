import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";

import { MultiStepCards as MultiStepCardsComponent } from ".";
import { StepCard } from "./step-card";
import { Typography } from "../../data-display";
import { TextInput } from "../../input";

export default {
    title: "Navigation/Multi Step Cards",
    component: MultiStepCardsComponent,
} as ComponentMeta<typeof MultiStepCardsComponent>;

export const MultiStepCards = () => {
    const [step, setStep] = useState<number>(0);

    const handleStepNext = () => {
        if (step < 2) {
            setStep(step + 1);
        }
    };
    const handleStepPrevious = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <MultiStepCardsComponent activeStep={step}>
            <StepCard
                step={1}
                title="Nice step title"
                onNextStep={handleStepNext}
            >
                <div className="cui-flex cui-flex-col cui-gap-3">
                    <Typography variant="h3" weight="medium">
                        Step content
                    </Typography>
                    <Typography variant="h4" weight="medium">
                        More step content
                    </Typography>
                    <TextInput
                        id="text-input"
                        label="Add some input"
                        className={{ input: "cui-w-full" }}
                    />
                    <TextInput
                        id="another-text-input"
                        label="Mome input"
                        className={{ input: "cui-w-full" }}
                    />
                </div>
            </StepCard>
            <StepCard
                step={2}
                title="Another nice step title"
                onNextStep={handleStepNext}
                onPreviousStep={handleStepPrevious}
            >
                <div className="cui-flex cui-flex-col cui-gap-3">
                    <TextInput
                        id="text-input"
                        label="Add some input"
                        className={{ input: "cui-w-full" }}
                    />
                    <TextInput
                        id="another-text-input"
                        label="Mome input"
                        className={{ input: "cui-w-full" }}
                    />
                </div>
            </StepCard>
            <StepCard
                step={3}
                title="More step title"
                onNextStep={handleStepNext}
                onPreviousStep={handleStepPrevious}
                nextButtonLabel="CONFIRM"
            >
                <div className="cui-flex cui-flex-col cui-gap-3">
                    <Typography variant="lg" weight="medium">
                        More step content
                    </Typography>
                    <Typography variant="lg" weight="medium">
                        More step content
                    </Typography>
                </div>
            </StepCard>
        </MultiStepCardsComponent>
    );
};
