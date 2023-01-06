import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Title } from ".";

const sizes: [
    "9xl",
    "8xl",
    "7xl",
    "6xl",
    "5xl",
    "4xl",
    "4xl",
    "xxl",
    "xl",
    "sm"
] = ["9xl", "8xl", "7xl", "6xl", "5xl", "4xl", "4xl", "xxl", "xl", "sm"];

export default {
    title: "Title",
    component: Title,
} as ComponentMeta<typeof Title>;

export const AllSizes = () => {
    return (
        <div className="cui-space-y-4">
            {sizes.map((size) => (
                <Title key={size} size={size} color="black">
                    Featured campaigns
                </Title>
            ))}
        </div>
    );
};

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

const commonArgTypes = {
    color: { control: "select", options: ["black", "white"] },
    size: { control: "select", options: sizes },
};

export const TitleDefault = Template.bind({});
TitleDefault.args = { children: "Featured campaigns" };
TitleDefault.argTypes = commonArgTypes;
