import React from "react";
import { ComponentMeta } from "@storybook/react";

import { SquareStepsList as SquareStepsListComponent } from ".";

export default {
    title: "Navigation/Square Steps List",
    component: SquareStepsListComponent,
} as ComponentMeta<typeof SquareStepsListComponent>;

export const SquareStepsList = () => {
    // const [step, setStep] = useState<number>(0);

    return (
        <SquareStepsListComponent
            stepTitles={["Step 1", "Step 2"]}
            activeStep={0}
            mostUpdatedStep={1}
            onClick={() => {
                console.log("click");
            }}
        />
    );
};
