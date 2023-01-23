import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Tag as TagComponent, TagProps } from ".";

export default {
    title: "Input/Tags/Tag",
    component: TagComponent,
} as ComponentMeta<typeof TagComponent>;

const Template: Story<TagProps> = (props: TagProps) => (
    <TagComponent {...props} />
);

export const Tag: Story<TagProps> = Template.bind({});
Tag.args = {
    text: "Just a tag",
};
