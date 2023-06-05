import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";

import { MultiStepCards as MultiStepCardsComponent } from ".";
import { Typography } from "../../data-display";
import { TagsInput, TextInput } from "../../input";
import { NextStepButton } from "./next-button";
import { StepCard } from "./step-card";

export default {
    title: "Navigation/Multi Step Cards",
    component: MultiStepCardsComponent,
} as Meta<typeof MultiStepCardsComponent>;

const Component = () => {
    const [step, setStep] = useState<number>(0);

    const handleStepNext = () => {
        if (step < 2) {
            setStep(step + 1);
        }
    };

    return (
        <MultiStepCardsComponent activeStep={step} messages={{ step: "Step" }}>
            <StepCard
                step={1}
                title="Nice step title"
                messages={{ step: "Step" }}
                className={{ root: "cui-pb-10" }}
            >
                <div className="cui-flex cui-flex-col cui-gap-6">
                    <Typography variant="h3" weight="medium">
                        Step content
                    </Typography>
                    <Typography variant="h4" weight="medium">
                        More step content
                    </Typography>
                    <TextInput
                        id="text-input"
                        label="Add some input"
                        className={{
                            input: "cui-w-full",
                            inputWrapper: "cui-w-full",
                        }}
                    />
                    <TextInput
                        id="another-text-input"
                        label="Mome input"
                        className={{
                            input: "cui-w-full",
                            inputWrapper: "cui-w-full",
                        }}
                    />
                    <NextStepButton onClick={handleStepNext}>
                        Next
                    </NextStepButton>
                </div>
            </StepCard>
            <StepCard
                step={2}
                title="Another nice step title"
                messages={{ step: "Step" }}
                className={{ root: "cui-pb-10" }}
            >
                <div className="cui-flex cui-flex-col cui-gap-6">
                    <TextInput
                        id="text-input"
                        label="Add some input"
                        className={{
                            input: "cui-w-full",
                            inputWrapper: "cui-w-full",
                        }}
                    />
                    <TextInput
                        id="another-text-input"
                        label="Mome input"
                        className={{
                            input: "cui-w-full",
                            inputWrapper: "cui-w-full",
                        }}
                    />
                </div>
                <NextStepButton onClick={handleStepNext}>Next</NextStepButton>
            </StepCard>
            <StepCard
                step={3}
                title="More step title"
                messages={{ step: "Step" }}
            >
                <div className="cui-flex cui-flex-col cui-gap-6">
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

export const MultiStepCards: StoryObj<typeof TagsInput> = {
    render: Component,
};
