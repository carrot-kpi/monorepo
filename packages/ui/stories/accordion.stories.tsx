import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
    Accordion,
    Accordion as AccordionComponent,
} from "../src/components/accordion";
import { AccordionSummary } from "../src/components/accordion/summary";
import { AccordionDetails } from "../src/components/accordion/details";
import { Typography } from "../src/components/typography";

export default {
    title: "Surfaces/Accordions",
    component: AccordionComponent,
} as Meta<typeof AccordionComponent>;

const Component = () => (
    <div>
        <Accordion>
            <AccordionSummary>
                <Typography weight="medium">First accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <Typography weight="medium">Second accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <Typography weight="medium">Third accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <Typography weight="medium">Fourth accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <Typography weight="medium">Fifth accordion</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
    </div>
);

export const Accordions: StoryObj<typeof AccordionComponent> = {
    render: Component,
};
