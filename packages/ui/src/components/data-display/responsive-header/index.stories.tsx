import React from "react";
import { ComponentMeta, Story } from "@storybook/react";

import {
    ResponsiveHeader as ResponsiveHeaderComponent,
    ResponsiveHeaderProps,
} from ".";

export default {
    title: "Data display/Responsive Header",
    component: ResponsiveHeaderComponent,
} as ComponentMeta<typeof ResponsiveHeaderComponent>;

const Template: Story<ResponsiveHeaderProps> = (
    props: ResponsiveHeaderProps
) => {
    return <ResponsiveHeaderComponent {...props} />;
};

export const ResponsiveHeader: Story<ResponsiveHeaderProps> = Template.bind({});
ResponsiveHeader.args = {
    autoAlign: true,
    variant: "h1",
    children: "Some text",
};
