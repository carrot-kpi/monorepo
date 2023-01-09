import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import {
    AccordionGroup as AccordionGroupComponent,
    AccordionGroupProps,
} from ".";

export default {
    title: "AccordionGroup",
    component: AccordionGroupComponent,
} as ComponentMeta<typeof AccordionGroupComponent>;

const Template: Story<AccordionGroupProps> = (props) => (
    <AccordionGroupComponent {...props} />
);

export const AccordionGroup: Story<AccordionGroupProps> = Template.bind({});
AccordionGroup.args = {
    accordions: [
        {
            title: "First accordion",
            content: (
                <div>
                    <h1>Title</h1>
                    <p>Just the first accordion content</p>
                </div>
            ),
            isCompleted: true,
        },
        {
            title: "Second accordion",
            content: (
                <div>
                    <h1>Title</h1>
                    <p>Just the second accordion content</p>
                </div>
            ),
            isCompleted: false,
        },
        {
            title: "Third accordion",
            content: (
                <div>
                    <h1>Title</h1>
                    <p>Just the third accordion content</p>
                </div>
            ),
            isCompleted: false,
        },
    ],
};
