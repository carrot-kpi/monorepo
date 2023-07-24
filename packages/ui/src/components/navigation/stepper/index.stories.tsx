import React, { useState } from "react";
import type { Meta } from "@storybook/react";

import { Stepper as StepperComponent } from ".";
import { Card, CardContent, CardTitle } from "../../surfaces";
import { Typography } from "../../data-display";

export default {
    title: "Navigation/Stepper",
    component: StepperComponent,
} as Meta<typeof StepperComponent>;

const Component = () => {
    const [step, setStep] = useState<number>(0);

    return (
        <div>
            <div className="cui-flex cui-flex-col cui-gap-8">
                <StepperComponent
                    stepTitles={[
                        "Long step title 1",
                        "Step 2",
                        "Step 3",
                        "Step 4",
                    ]}
                    activeStep={step}
                    lastStepCompleted={2}
                    onClick={setStep}
                />
                <div>
                    {step === 0 && (
                        <Card>
                            <CardTitle>
                                <Typography>Long step title 1</Typography>
                            </CardTitle>
                            <CardContent className={{ root: "cui-p-4" }}>
                                <Typography>Sample content</Typography>
                            </CardContent>
                        </Card>
                    )}
                    {step === 1 && (
                        <Card>
                            <CardTitle>
                                <Typography>Step 2</Typography>
                            </CardTitle>
                            <CardContent className={{ root: "cui-p-4" }}>
                                <Typography>More content</Typography>
                            </CardContent>
                        </Card>
                    )}
                    {step === 2 && (
                        <Card>
                            <CardTitle>
                                <Typography>Step 3</Typography>
                            </CardTitle>
                            <CardContent className={{ root: "cui-p-4" }}>
                                <Typography>Another content</Typography>
                            </CardContent>
                        </Card>
                    )}
                    {step === 3 && (
                        <Card>
                            <CardTitle>
                                <Typography>Step 4</Typography>
                            </CardTitle>
                            <CardContent className={{ root: "cui-p-4" }}>
                                <Typography>
                                    Even mpre sample content
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export const Stepper = {
    render: Component,
};
