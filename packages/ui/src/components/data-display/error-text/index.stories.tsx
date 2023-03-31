import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { ErrorText as ErrorTextComponent, ErrorTextProps } from ".";

export default {
    title: "Data display/Error Text",
    component: ErrorTextComponent,
} as ComponentMeta<typeof ErrorTextComponent>;

const Template: Story<ErrorTextProps> = (props: ErrorTextProps) => (
    <ErrorTextComponent {...props} />
);

export const ErrorText: Story<ErrorTextProps> = Template.bind({});
ErrorText.args = {
    children: "Error text",
};
