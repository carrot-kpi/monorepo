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
    children: (
        <>
            <h1>Title</h1>
            <h2>Subtitle</h2>
            <strong>Strong text</strong>
            <pre>
                <code>Some code</code>
            </pre>
            <ul>
                <li>Element</li>
                <li>Element</li>
                <li>Element</li>
            </ul>
        </>
    ),
};
