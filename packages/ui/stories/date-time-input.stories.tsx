import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
    DateTimeInput as DateTimeInputComponent,
    type DateTimeInputProps,
} from "../src/components/date-time-input";

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
