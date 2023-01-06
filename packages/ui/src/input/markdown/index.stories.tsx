import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { MarkdownInput as MarkdownInputComponent, MarkdownInputProps } from ".";

export default {
    title: "MarkdownInput",
    component: MarkdownInputComponent,
} as ComponentMeta<typeof MarkdownInputComponent>;

const Template: Story<MarkdownInputProps> = (props) => (
    <MarkdownInputComponent {...props} />
);

export const MarkdownInput: Story<MarkdownInputProps> = Template.bind({});
MarkdownInput.args = {
    label: "Markdown input",
};
