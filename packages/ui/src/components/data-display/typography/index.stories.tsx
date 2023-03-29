import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Typography as TypographyComponent, TypographyProps } from ".";

export default {
    title: "Data display/Typography",
    component: TypographyComponent,
} as ComponentMeta<typeof TypographyComponent>;

const Template: Story<TypographyProps> = (props: TypographyProps) => {
    return (
        <div className="cui-max-w-xs">
            <TypographyComponent {...props} />
        </div>
    );
};

export const Typography: Story<TypographyProps> = Template.bind({});
Typography.args = {
    children: "Some text",
};
