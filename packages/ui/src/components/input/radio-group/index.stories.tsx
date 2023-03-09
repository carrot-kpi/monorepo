import React, { ChangeEvent, useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { RadioGroup as RadioGroupComponent, RadioGroupProps } from ".";
import { Radio } from "../radio";

export default {
    title: "Input/Radio Group",
    component: RadioGroupComponent,
} as ComponentMeta<typeof RadioGroupComponent>;

enum RadioValue {
    YES = "yes",
    NO = "no",
}

const Template: Story<RadioGroupProps> = (props: RadioGroupProps) => {
    const [radioValue, setRadioValue] = useState(RadioValue.YES);

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRadioValue(event.target.value as RadioValue);
    };

    return (
        <RadioGroupComponent {...props}>
            <Radio
                label="Yes"
                checked={radioValue === RadioValue.YES}
                value={RadioValue.YES}
                onChange={handleRadioChange}
            />
            <Radio
                label="No"
                checked={radioValue === RadioValue.NO}
                value={RadioValue.NO}
                onChange={handleRadioChange}
            />
        </RadioGroupComponent>
    );
};

export const RadioGroup: Story<RadioGroupProps> = Template.bind({});
