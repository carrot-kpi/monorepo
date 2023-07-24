import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TagsInput as TagsInputComponent, TagsInputProps } from ".";

export default {
    title: "Input/Tags",
    component: TagsInputComponent,
} as Meta<typeof TagsInputComponent>;

const Component = (props: TagsInputProps) => {
    const [tags, setTags] = useState<string[]>([]);

    return <TagsInputComponent {...props} value={tags} onChange={setTags} />;
};

export const Tags: StoryObj<typeof TagsInputComponent> = {
    render: Component,
    args: {
        label: "Tags input",
        placeholder: "Tags input",
        value: ["tag1", "tag2"],
        messages: { add: "Add" },
    },
};
