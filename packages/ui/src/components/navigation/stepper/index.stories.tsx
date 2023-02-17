import React, { useState } from "react";
import { ComponentMeta } from "@storybook/react";

import { Stepper as StepperComponent } from ".";
import { Card, CardContent, CardTitle } from "../../surfaces";
import { Typography } from "../../data-display";

export default {
    title: "Navigation/Stepper",
    component: StepperComponent,
} as ComponentMeta<typeof StepperComponent>;

export const Stepper = () => {
    const [step, setStep] = useState<number>(0);

    return (
        <div>
            <div className="cui-flex cui-gap-8 cui-items-center">
                <StepperComponent
                    stepTitles={[
                        "Long step title 1",
                        "Step 2",
                        "Step 3",
                        "Step 4",
                    ]}
                    activeStep={step}
                    mostUpdatedStep={2}
                    onClick={setStep}
                    layout="vertical"
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
