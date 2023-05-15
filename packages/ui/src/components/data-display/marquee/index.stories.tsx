import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Marquee as MarqueeComponent } from ".";
import { Typography } from "../typography";

export default {
    title: "Data display/Marquee",
    component: MarqueeComponent,
} as Meta<typeof MarqueeComponent>;

const Component = () => {
    return (
        <>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
            <Typography variant="lg">Marquee</Typography>
        </>
    );
};

export const Marquee: StoryObj<typeof MarqueeComponent> = {
    render: Component,
};
