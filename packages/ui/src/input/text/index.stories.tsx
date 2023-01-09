import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { TextInput as TextInputComponent, TextInputProps } from ".";

export default {
    title: "Input/Text",
    component: TextInputComponent,
} as ComponentMeta<typeof TextInputComponent>;

const Template: Story<TextInputProps> = (props: TextInputProps) => (
    <TextInputComponent {...props} />
);

export const Text: Story<TextInputProps> = Template.bind({});
Text.args = {
    label: "Text input",
    placeholder: "Text input",
};
