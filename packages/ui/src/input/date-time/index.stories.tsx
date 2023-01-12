import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { DateTimeInput as DateTimeInputComponent, DateTimeInputProps } from ".";

export default {
    title: "Input/Date Time",
    component: DateTimeInputComponent,
} as ComponentMeta<typeof DateTimeInputComponent>;

const Template: Story<DateTimeInputProps> = (props: DateTimeInputProps) => (
    <DateTimeInputComponent {...props} />
);

export const DateTime: Story<DateTimeInputProps> = Template.bind({});
DateTime.args = {
    label: "Datetime input",
    placeholder: "Datetime input",
};
