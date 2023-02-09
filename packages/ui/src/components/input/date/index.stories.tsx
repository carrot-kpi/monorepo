import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { DateInput as DateInputComponent, DateInputProps } from ".";

export default {
    title: "Input/Date",
    component: DateInputComponent,
} as ComponentMeta<typeof DateInputComponent>;

const Template: Story<DateInputProps> = (props: DateInputProps) => (
    <DateInputComponent {...props} />
);

export const Date: Story<DateInputProps> = Template.bind({});
Date.args = {
    label: "Date input",
    placeholder: "Date input",
};
