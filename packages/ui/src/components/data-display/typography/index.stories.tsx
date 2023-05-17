import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Typography as TypographyComponent } from ".";

export default {
    title: "Data display/Typography",
    component: TypographyComponent,
} as Meta<typeof TypographyComponent>;

export const Typography: StoryObj<typeof TypographyComponent> = {
    render: (props) => {
        return <TypographyComponent {...props} />;
    },
    args: {
        children: "Some text",
    },
};
