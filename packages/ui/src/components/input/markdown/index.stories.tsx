import { Meta, StoryObj } from "@storybook/react";

import { MarkdownInput as MarkdownInputComponent } from ".";

export default {
    title: "Input/Markdown",
    component: MarkdownInputComponent,
} as Meta<typeof MarkdownInputComponent>;

export const Markdown: StoryObj<typeof MarkdownInputComponent> = {
    args: {
        label: "Markdown input",
        placeholder: "Markdown input",
    },
};
