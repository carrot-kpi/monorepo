import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { DateTimeInput as DateTimeInputComponent, DateTimeInputProps } from ".";

export default {
    title: "Input/Date Time Picker",
    component: DateTimeInputComponent,
} as Meta<typeof DateTimeInputComponent>;

const Component = (props: DateTimeInputProps) => {
    const [value, setValue] = useState<Date | undefined>();

    return (
        <DateTimeInputComponent {...props} value={value} onChange={setValue} />
    );
};

export const DateTimePicker: StoryObj<typeof DateTimeInputComponent> = {
    render: Component,
    args: {
        label: "Datetime input",
        placeholder: "Datetime input",
        min: new Date(),
    },
};
