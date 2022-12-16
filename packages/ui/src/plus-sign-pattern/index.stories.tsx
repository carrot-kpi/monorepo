import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PlusSignPattern } from ".";

export default {
    title: "PlusSignPattern",
    component: PlusSignPattern,
} as ComponentMeta<typeof PlusSignPattern>;

const Template: ComponentStory<typeof PlusSignPattern> = () => (
    <PlusSignPattern />
);

const commonArgTypes = {
    y: { control: "select", options: ["top", "middle", "bottom"] },
    x: { control: "select", options: ["left", "right"] },
};

export const PlusSignPatternPosition = Template.bind({});
PlusSignPatternPosition.args = { x: "left", y: "middle" };
PlusSignPatternPosition.argTypes = commonArgTypes;
