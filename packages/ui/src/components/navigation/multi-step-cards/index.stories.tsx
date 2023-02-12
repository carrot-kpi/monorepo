import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";

import { MultiStepCards as MultiStepCardsComponent } from ".";
import { StepCard } from "./step-card";
import { Typography } from "../../data-display";
import { Button, TextInput } from "../../input";

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
            <StepCard step={1} title="Nice step title">
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
                        className={{ input: "cui-w-full" }}
                    />
                    <TextInput
                        id="another-text-input"
                        label="Mome input"
                        className={{ input: "cui-w-full" }}
                    />
                    <div className="cui-flex cui-justify-end">
                        <Button onClick={handleStepNext} size="small">
                            NEXT
                        </Button>
                    </div>
                </div>
            </StepCard>
            <StepCard step={2} title="Another nice step title">
                <div className="cui-flex cui-flex-col cui-gap-6">
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
                    <div className="cui-flex cui-justify-between">
                        <Button onClick={handleStepPrevious} size="small">
                            PREVIOUS
                        </Button>
                        <Button onClick={handleStepNext} size="small">
                            NEXT
                        </Button>
                    </div>
                </div>
            </StepCard>
            <StepCard step={3} title="More step title">
                <div className="cui-flex cui-flex-col cui-gap-6">
                    <Typography variant="lg" weight="medium">
                        More step content
                    </Typography>
                    <Typography variant="lg" weight="medium">
                        More step content
                    </Typography>
                    <div className="cui-flex cui-justify-between">
                        <Button onClick={handleStepPrevious} size="small">
                            PREVIOUS
                        </Button>
                        <Button onClick={handleStepNext} size="small">
                            DONE
                        </Button>
                    </div>
                </div>
            </StepCard>
        </MultiStepCardsComponent>
    );
};
