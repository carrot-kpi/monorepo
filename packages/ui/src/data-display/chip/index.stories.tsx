import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Chip as ChipComponent, ChipProps } from ".";

export default {
    title: "Data display/Chip",
    component: ChipComponent,
} as ComponentMeta<typeof ChipComponent>;

const Template: Story<ChipProps> = (props: ChipProps) => (
    <div className="cui-flex cui-gap-2">
        <ChipComponent {...props} />
        <ChipComponent {...props} />
    </div>
);

export const Chip: Story<ChipProps> = Template.bind({});
Chip.args = {
    children: "Chip example",
};
