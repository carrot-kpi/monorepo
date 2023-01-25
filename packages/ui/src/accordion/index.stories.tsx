import React from "react";
import { ComponentMeta } from "@storybook/react";

import { Accordion, Accordion as AccordionComponent } from ".";
import { AccordionSummary } from "./summary";
import { AccordionDetails } from "./details";
import { Text } from "../text";

export default {
    title: "Data display/Accordions",
    component: AccordionComponent,
} as ComponentMeta<typeof AccordionComponent>;

export const Accordions = () => (
    <div>
        <Accordion>
            <AccordionSummary>
                <Text mono size="md" weight="medium">
                    First accordion
                </Text>
            </AccordionSummary>
            <AccordionDetails>
                <Text mono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Text>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <Text mono size="md" weight="medium">
                    Second accordion
                </Text>
            </AccordionSummary>
            <AccordionDetails>
                <Text mono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Text>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <Text mono size="md" weight="medium">
                    Third accordion
                </Text>
            </AccordionSummary>
            <AccordionDetails>
                <Text mono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Text>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <Text mono size="md" weight="medium">
                    Fourth accordion
                </Text>
            </AccordionSummary>
            <AccordionDetails>
                <Text mono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Text>
            </AccordionDetails>
        </Accordion>
        <Accordion>
            <AccordionSummary>
                <Text mono size="md" weight="medium">
                    Fifth accordion
                </Text>
            </AccordionSummary>
            <AccordionDetails>
                <Text mono size="sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                </Text>
            </AccordionDetails>
        </Accordion>
    </div>
);
