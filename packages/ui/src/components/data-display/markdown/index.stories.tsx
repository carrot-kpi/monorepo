import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Markdown as MarkdownComponent } from ".";

export default {
    title: "Data display/Markdown",
    component: MarkdownComponent,
} as Meta<typeof MarkdownComponent>;

export const Markdown: StoryObj<typeof MarkdownComponent> = {
    args: {
        children: (
            <>
                <h1>H1 heading</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h2>H2 heading</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h3>H3 heading</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h4>H4 heading</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <pre>
                    <code>some code</code>
                </pre>
                <ul>
                    <li>List element 1</li>
                    <li>List element 2</li>
                    <li>List element 3</li>
                </ul>
                <a>Link to nothing</a>
            </>
        ),
    },
};
