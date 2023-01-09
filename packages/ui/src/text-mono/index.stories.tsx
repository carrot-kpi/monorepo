import React from "react";
import { ComponentMeta, Story } from "@storybook/react";
import { TextMono as TextMonoComponent, TextMonoProps } from ".";

export default {
    title: "TextMono",
    component: TextMonoComponent,
} as ComponentMeta<typeof TextMonoComponent>;

const Template: Story<TextMonoProps> = (props: TextMonoProps) => (
    <TextMonoComponent {...props} />
);

export const TextMono: Story<TextMonoProps> = Template.bind({});
TextMono.args = {
    children: "Just a mono text",
};
