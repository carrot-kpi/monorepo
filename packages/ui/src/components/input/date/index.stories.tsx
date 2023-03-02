import React, { useCallback, useState } from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { DateInput as DateInputComponent, DateInputProps } from ".";

export default {
    title: "Input/Date",
    component: DateInputComponent,
} as ComponentMeta<typeof DateInputComponent>;

const Template: Story<DateInputProps> = (props: DateInputProps) => {
    const [value, setValue] = useState<Date | undefined>();

    const handleChange = useCallback((value: Date) => {
        setValue(value);
    }, []);

    return (
        <DateInputComponent {...props} value={value} onChange={handleChange} />
    );
};

export const DateStory: Story<DateInputProps> = Template.bind({});
DateStory.args = {
    label: "Date input",
    placeholder: "Date input",
    min: new Date(),
};
