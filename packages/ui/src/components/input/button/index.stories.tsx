import { Meta, StoryObj } from "@storybook/react";

import { ReactComponent as TickIcon } from "../../../assets/tick.svg";
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
        icon: TickIcon,
        iconPlacement: "left",
    },
};

export const IconOnly: StoryObj<typeof ButtonComponent> = {
    args: {
        icon: TickIcon,
        size: "xsmall",
    },
};

export const Secondary: StoryObj<typeof ButtonComponent> = {
    args: {
        children: "Secondary",
        variant: "secondary",
        icon: TickIcon,
        size: "xsmall",
    },
};

export const Active: StoryObj<typeof ButtonComponent> = {
    args: {
        children: "I'm active",
        icon: TickIcon,
        iconPlacement: "left",
        size: "xsmall",
        active: true,
    },
};

export const ActiveSecondary: StoryObj<typeof ButtonComponent> = {
    args: {
        children: "secondary with active",
        icon: TickIcon,
        iconPlacement: "left",
        size: "xsmall",
        active: true,
    },
};
