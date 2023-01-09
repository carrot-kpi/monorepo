import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { TextInput as TextInputComponent, TextInputProps } from ".";

export default {
    title: "TextInput",
    component: TextInputComponent,
} as ComponentMeta<typeof TextInputComponent>;

const Template: Story<TextInputProps> = (props: TextInputProps) => (
    <TextInputComponent {...props} />
);

export const TextInput: Story<TextInputProps> = Template.bind({});
TextInput.args = {
    label: "Text input",
    placeholder: "Text input",
};
