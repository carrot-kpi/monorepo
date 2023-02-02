import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import {
    MarkdownContent as MarkdownContentComponent,
    MarkdownContentProps,
} from ".";

export default {
    title: "Data display/Markdown Content",
    component: MarkdownContentComponent,
} as ComponentMeta<typeof MarkdownContentComponent>;

const Template: Story<MarkdownContentProps> = (props: MarkdownContentProps) => (
    <MarkdownContentComponent {...props} />
);

export const MarkdownContent: Story<MarkdownContentProps> = Template.bind({});
MarkdownContent.args = {
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
