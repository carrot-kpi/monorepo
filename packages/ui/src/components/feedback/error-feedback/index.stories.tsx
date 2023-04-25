import { Meta, StoryObj } from "@storybook/react";

import { ErrorFeedback as ErrorFeedbackComponent } from ".";

export default {
    title: "Feedback/Error Feedback",
    component: ErrorFeedbackComponent,
} as Meta<typeof ErrorFeedbackComponent>;

export const ErrorFeedback: StoryObj<typeof ErrorFeedbackComponent> = {
    args: {
        messages: {
            title: "Something went wrong",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.",
        },
    },
};
