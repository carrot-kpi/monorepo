import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { MarkdownInput as MarkdownInputComponent, MarkdownInputProps } from ".";

export default {
    title: "Input/Markdown",
    component: MarkdownInputComponent,
} as ComponentMeta<typeof MarkdownInputComponent>;

const Template: Story<MarkdownInputProps> = (props) => (
    <MarkdownInputComponent {...props} />
);

export const Markdown: Story<MarkdownInputProps> = Template.bind({});
Markdown.args = {
    label: "Markdown input",
    placeholder: "Markdown input",
};
