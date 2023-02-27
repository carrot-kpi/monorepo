import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Loader as LoaderComponent, LoaderProps } from ".";

export default {
    title: "Feedback/Loader",
    component: LoaderComponent,
} as ComponentMeta<typeof LoaderComponent>;

const Template: Story<LoaderProps> = (props: LoaderProps) => {
    return (
        <div>
            <LoaderComponent {...props} />
        </div>
    );
};

export const Loader: Story<LoaderProps> = Template.bind({});
Loader.args = {
    className: "cui-w-24",
};
