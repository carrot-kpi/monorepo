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
            <h1>H1 heading</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2>H2 heading</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3>H3 heading</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
            <h4>H4 heading</h4>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
            <h5>H5 heading</h5>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
            <h6>H6 heading</h6>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
            <pre>
                <code>some code</code>
            </pre>
            <ul>
                <li>List element 1</li>
                <li>List element 2</li>
                <li>List element 3</li>
            </ul>
        </>
    ),
};
