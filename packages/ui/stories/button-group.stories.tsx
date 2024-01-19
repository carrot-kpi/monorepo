import React from "react";
import { Button, ButtonGroup as ButtonGroupComponent } from "../src/components";
import type { Meta, StoryObj } from "@storybook/react";

export default {
    title: "Input/Button group",
    component: ButtonGroupComponent,
} as Meta<typeof ButtonGroupComponent>;

const Component = () => {
    return (
        <ButtonGroupComponent label="Button group" disabled>
            <Button>first button</Button>
            <Button>second button</Button>
            <Button>third button</Button>
        </ButtonGroupComponent>
    );
};

export const ButtonGroup: StoryObj<typeof ButtonGroupComponent> = {
    render: Component,
};
