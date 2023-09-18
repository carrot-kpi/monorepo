import type { Meta, StoryObj } from "@storybook/react";

import { FeedbackBox as FeedbackBoxComponent } from "../src/components/feedback-box";
import { Typography } from "../src";
import React from "react";

export default {
    title: "Data display/Feedback Box",
    component: FeedbackBoxComponent,
} as Meta<typeof FeedbackBoxComponent>;

export const FeedbackBox: StoryObj<typeof FeedbackBoxComponent> = {
    args: {
        variant: "warning",
        messages: {
            title: "Warning",
        },
        children: <Typography>Comprehensive warning text</Typography>,
    },
};
