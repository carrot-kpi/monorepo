import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Markdown as MarkdownComponent, MarkdownProps } from ".";

export default {
    title: "Data display/Markdown",
    component: MarkdownComponent,
} as ComponentMeta<typeof MarkdownComponent>;

const Template: Story<MarkdownProps> = (props: MarkdownProps) => (
    <MarkdownComponent {...props} />
);

export const Markdown: Story<MarkdownProps> = Template.bind({});
Markdown.args = {
    children:
        "<p>will <em>uniswap v3</em> volume reach <em>34b</em> in 30 days?</p>",
};
