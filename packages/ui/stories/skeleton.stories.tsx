import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
    Skeleton as SkeletonComponent,
    type SkeletonProps,
} from "../src/components/skeleton";

export default {
    title: "Feedback/Skeleton",
    component: SkeletonComponent,
} as Meta<typeof SkeletonComponent>;

const Component = (props: SkeletonProps) => {
    return (
        <div className="cui-flex cui-flex-col cui-gap-2">
            <SkeletonComponent {...props} />
        </div>
    );
};

export const Skeleton: StoryObj<typeof SkeletonComponent> = {
    render: Component,
    args: {
        width: 100,
        height: 20,
    },
};
