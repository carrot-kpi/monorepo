import React, { useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { DateInput as DateInputComponent, DateInputProps } from ".";
import dayjs from "dayjs";

export default {
    title: "Input/Date",
    component: DateInputComponent,
} as ComponentMeta<typeof DateInputComponent>;

const Template: Story<DateInputProps> = (props: DateInputProps) => {
    const [value, setValue] = useState(dayjs());

    return <DateInputComponent {...props} value={value} onChange={setValue} />;
};

export const Date: Story<DateInputProps> = Template.bind({});
Date.args = {
    label: "Date input",
    placeholder: "Date input",
};
