import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import { Skeleton as SkeletonComponent, SkeletonProps } from ".";

export default {
    title: "Feedback/Skeleton",
    component: SkeletonComponent,
} as ComponentMeta<typeof SkeletonComponent>;

const Template: Story<SkeletonProps> = (props: SkeletonProps) => {
    return (
        <div className="cui-flex cui-flex-col cui-gap-2">
            <SkeletonComponent {...props} />
        </div>
    );
};

export const Skeleton: Story<SkeletonProps> = Template.bind({});
Skeleton.args = {
    width: 100,
    height: 20,
};
