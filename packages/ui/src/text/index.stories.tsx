import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Text as TextComponent, TextProps } from ".";

export default {
    title: "Data display/Text",
    component: TextComponent,
} as ComponentMeta<typeof TextComponent>;

const Template: Story<TextProps> = (props: TextProps) => {
    return <TextComponent {...props} />;
};

export const Text: Story<TextProps> = Template.bind({});
Text.args = {
    children: "Some text",
};
