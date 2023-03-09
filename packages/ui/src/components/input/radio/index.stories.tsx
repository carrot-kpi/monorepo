import React, { ChangeEvent, useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Radio as RadioComponent, RadioProps } from ".";

export default {
    title: "Input/Radio",
    component: RadioComponent,
} as ComponentMeta<typeof RadioComponent>;

enum RadioOption {
    NO = 0,
    YES = 1,
}

const Template: Story<RadioProps> = (props: RadioProps) => {
    const [radioValue, setRadioValue] = useState(RadioOption.YES);

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRadioValue(parseInt(event.target.value) as RadioOption);
    };

    return (
        <div>
            <RadioComponent
                {...props}
                label="Yes"
                checked={radioValue === RadioOption.YES}
                value={RadioOption.YES}
                onChange={handleRadioChange}
            />
            <RadioComponent
                {...props}
                label="No"
                checked={radioValue === RadioOption.NO}
                value={RadioOption.NO}
                onChange={handleRadioChange}
            />
        </div>
    );
};

export const Radio: Story<RadioProps> = Template.bind({});
