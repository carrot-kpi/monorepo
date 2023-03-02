import React, { useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { DateTimeInput as DateTimeInputComponent, DateTimeInputProps } from ".";

export default {
    title: "Input/Date Time",
    component: DateTimeInputComponent,
} as ComponentMeta<typeof DateTimeInputComponent>;

const Template: Story<DateTimeInputProps> = (props: DateTimeInputProps) => {
    const [value, setValue] = useState<Date | undefined>();

    return (
        <DateTimeInputComponent {...props} value={value} onChange={setValue} />
    );
};

export const DateTime: Story<DateTimeInputProps> = Template.bind({});
DateTime.args = {
    label: "Datetime input",
    placeholder: "Datetime input",
    min: new Date(),
};
