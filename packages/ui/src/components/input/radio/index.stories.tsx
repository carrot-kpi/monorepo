import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Radio as RadioComponent, RadioProps } from ".";

export default {
    title: "Input/Radio",
    component: RadioComponent,
} as ComponentMeta<typeof RadioComponent>;

const Template: Story<RadioProps> = (props: RadioProps) => {
    return <RadioComponent {...props} />;
};

export const Radio: Story<RadioProps> = Template.bind({});
