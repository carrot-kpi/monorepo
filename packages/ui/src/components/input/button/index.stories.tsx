import { Meta, StoryObj } from "@storybook/react";

import Tick from "../../../icons/tick";
import { Button as ButtonComponent } from ".";

export default {
    title: "Input/Button",
    component: ButtonComponent,
} as Meta<typeof ButtonComponent>;

export const Default: StoryObj<typeof ButtonComponent> = {
    args: {
        children: "just a button",
    },
};

export const WithIcon: StoryObj<typeof ButtonComponent> = {
    args: {
        children: "Button",
        icon: Tick,
        iconPlacement: "left",
    },
};

export const IconOnly: StoryObj<typeof ButtonComponent> = {
    args: {
        icon: Tick,
        size: "xsmall",
    },
};

export const Secondary: StoryObj<typeof ButtonComponent> = {
    args: {
        children: "Secondary",
        variant: "secondary",
        icon: Tick,
        size: "xsmall",
    },
};

export const Active: StoryObj<typeof ButtonComponent> = {
    args: {
        children: "I'm active",
        icon: Tick,
        iconPlacement: "left",
        size: "xsmall",
        active: true,
    },
};

export const ActiveSecondary: StoryObj<typeof ButtonComponent> = {
    args: {
        children: "secondary with active",
        icon: Tick,
        iconPlacement: "left",
        size: "xsmall",
        active: true,
    },
};
