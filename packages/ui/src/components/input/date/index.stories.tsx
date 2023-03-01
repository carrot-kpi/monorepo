import React, { useCallback, useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { DateInput as DateInputComponent, DateInputProps } from ".";
import dayjs, { Dayjs } from "dayjs";

export default {
    title: "Input/Date",
    component: DateInputComponent,
} as ComponentMeta<typeof DateInputComponent>;

const Template: Story<DateInputProps> = (props: DateInputProps) => {
    const [value, setValue] = useState<Dayjs | undefined>();

    const handleChange = useCallback((value: Dayjs) => {
        setValue(value);
    }, []);

    return (
        <DateInputComponent {...props} value={value} onChange={handleChange} />
    );
};

export const Date: Story<DateInputProps> = Template.bind({});
Date.args = {
    label: "Date input",
    placeholder: "Date input",
    min: dayjs(),
};
